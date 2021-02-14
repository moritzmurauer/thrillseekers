<template>
   
  <div v-if="!mapComplete" class="map pt-3 mapcontent">

    <h4 class="mb-1">Where is the spot you wanna submit?</h4>


    <Gmap class="mb-1"
        :disableUI="false" 
        :zoom="zoomNum" 
        mapType="roadmap" 
        :center="{ lat: 51.1657, lng: 10.4515 }"
        :markers="markers" 
        :mapDidLoad="handleMapDidLoad">  
    </Gmap>


    <input class="searchfield" type="text" v-model="location" placeholder="enter Location...">

    <small class="error ml-1 " v-if="mapError">{{mapError}}</small>
    
    <div class="d-flex">
        <div>
    <button class="btn-orange mt-1" @click="findLocation">
      Search location
      <i class="white fas fa-map-marker-alt"></i>
    </button>

    
    </div>


    <div v-if="locResult">
        <button class="mt-1 ml-3 btn" @click="submitForm">
            Add Infos 
            <i class="white fas fa-arrow-circle-right"></i>
            
        </button>
      
      
    </div>
</div>

  </div>

  <!-- form -->
   
    <form v-if="mapAdded" class="mt-2" @submit.prevent="handleSubmit">
        <h3>Add Infos to your spot!</h3>
        <hr class="mt-1 mb-2">

        
        <h4 class="mb-1 mt-1">Location: </h4>

        <input type="text" requires   v-model="locResult.address">

        <input type="text" requires placeholder="Name of the spot" v-model="title">
        <input type="number" requires placeholder="Maximum height" v-model="height">
        <textarea v-model="description" placeholder="Say a few words about the spot!"></textarea>
        


        <!-- category -->

        <div  class="field mt-2 mb-2">
            <h4>Please select a category</h4>
  <select class="mb-1 mt-1 pl-3 p-3 pt-1 pb-1" v-model="selected">
    <option selected="category?" class="p-3" v-for="option in options" :key="option.value">
      {{ option.text }}
    </option>
  </select>
  <p>Category: {{ selected }}</p>
</div>



        <!-- upload playlist image -->
        <h4>File Upload</h4>
        
        <label class="custom-file-upload">
            <input type="file" @change="handleChange">
            Upload image here
        </label>


        <p class="error" v-if="fileError">{{fileError}}</p>
        <small class="file-name" v-if="file">{{file.name}}</small>
        



        <div class="error"></div>

        <button v-if="!isPending" class=" btn btn-create">Create</button>
        <button v-else disabled class="btn btn-create">Saving...</button>
    </form>
</template>

<script>
    
    import {ref} from 'vue'
    import useStorage from '@/composables/useStorage'
    import useCollection from '@/composables/useCollection'
    import useDocument from '@/composables/useDocument'
    import getDocument from '@/composables/getDocument'
    import getUser from '@/composables/getUser'
    import {timestamp} from '@/firebase/config'
    import Gmap from '@/components/GoogleMaps/Gmap.vue'
    import {  useRouter } from 'vue-router'
    
    

    export default {
        components: {
        Gmap
        },  

        setup() {

            let geoCoderService = null
            const location = ref("")
            const locResult = ref("")
            let zoomNum = ref(5)
            const markers = ref([])

            
            const {url, filePath, uploadImage} = useStorage()
            const {error, addDoc} = useCollection('playlists')
            const {user} = getUser()
            const {document: userInfo} = getDocument('users', user.value.uid)
            const {updateDoc} = useDocument('users', user.value.uid)

            const router = useRouter()

            const title = ref('')
            const description = ref('')
            const spotAdress = ref('')
            const height = ref('')
            const file = ref(null)
            const fileError = ref(null)
            const isPending = ref(false)

            const mapAdded = ref(false)
            const mapComplete = ref(false)
            const mapError = ref("")




           

           //finds lat, lng information basen on adress
      const findLocation = () => {

        geoCoderService.geocode({
            address: location.value
          },
          (results, status) => {
            if (status !== "OK") {

                location.value = ""
                const errorStatus = "Couldn't find your location. Try Again!"
                mapError.value = errorStatus
                console.log(mapError.value);
                console.log("That didnt work!" + status);
            } else {
              console.log(results);

              mapError.value = "" 
              locResult.value = {
                position: results[0].geometry.location.toJSON(),
                address: results[0].formatted_address
              };

              zoomNum.value = 7
              location.value = locResult.value.address



              addLocation(locResult.value)
            }
          })
      }

      const addLocation = (location) => {

        
        markers.value = [...markers.value, {
          ...location.position,
          title: `<strong>${location.address}</strong>`
        }]

      };

      const submitForm = () => {
         mapAdded.value = true,
         mapComplete.value = true 
        console.log(locResult.value.position.lat);
        console.log(locResult.value.position.lng);
        console.log(locResult.value.position);
        console.log(locResult.value.address);
      }



      const handleMapDidLoad = (map, GServices) => {
        console.log("handle  map did load");
        console.log("map", map.mapUrl);
        console.log("Gservices", GServices);
        
        geoCoderService = new GServices.Geocoder();
        
      }
            const options= ref([
                { text: 'Cliff', value: 'A' },
                { text: 'Bridge', value: 'B' },
                { text: 'Pool', value: 'C' },
                { text: 'Swing', value: 'C' }
                ])

            const selected = ref('')
            //const checkedCategory = ref([])
            

            const handleSubmit = async () => {
                if(file.value) {
                    isPending.value = true
                    await uploadImage(file.value)
                   const res =  await addDoc({
                        title: title.value,
                        location: locResult.value.address,
                        position: locResult.value.position,
                        description: description.value,
                        avatarUrl: userInfo.value.avatarUrl || "",
                        userId: user.value.uid,
                        userName: user.value.displayName,
                        coverUrl: url.value,
                        height: height.value,
                        filePath: filePath.value,
                        songs: [],
                        likes: [],
                        category: selected.value,
                        createdAt: timestamp()
                    })

                    await updateDoc({
                        addedSpots: userInfo.value.addedSpots + 1
                    })

                    // const newSpot = {
                    //    spotId: res.id,
                    //    spotName: res.title
                    // }

                    // await updateDoc({
                    //     addedSpots: [...docRef, newSpot]
                    // })

                    

                    isPending.value = false
                    if(!error.value) {
                        console.log('Playlist added')
                        router.push({name: 'SpotDetails', params: {id: res.id}})               
                    }
                }
                
            }

            

            //allowed file types

            const types = ['image/png', 'image/jpeg']

            const handleChange = (event) => {
                const selected = event.target.files[0]
                console.log(selected);

                if (selected && types.includes(selected.type)) {
                    file.value = selected
                    fileError.value = null
                } else {
                    file.value = null
                    fileError.value = 'Please select an image file (png or jpeg)'
                }
            }





            return {
                title,
                description,
                height,
                file,
                handleSubmit,
                handleChange,
                fileError,
                isPending,
                options,
                selected,
                mapAdded,
                markers,
                addLocation,
                zoomNum,
                handleMapDidLoad,
                findLocation,
                location,
                locResult,
                submitForm,
                mapComplete,
                mapError,
                updateDoc,
                userInfo,
                user
                
            }
        }

    }
</script>

<style scoped>
    .mapcontent {
        max-width: 600px;
        margin: 0 auto;
        
    }


    .searchfield {
        margin: 0 !important;
    }

    .error {
        margin: 10px 10px;
    }

    

    .category input {
        padding: 0;
        margin: 0;
        display: flex;
        width: 100%;
    }

    .category-field {
        margin-right: 25px;

    }

    .category {
        margin-bottom: 50px;
        border: 1px solid rgba(128, 128, 128, 0.609);
        border-radius: 20px;
        padding: 10px;
        display: flex;
    }

    .category-headline {
        margin-bottom: 10px;
    }

    textarea {
        height: 100px;
    }



    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }

    input[type="file"] {
    display: none;
}


.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    margin: 10px 0;
}

.file-name {
    display: block;
    color: rgb(0, 38, 53);
}

.btn-create {
        margin: 0;
}

textarea {
    line-height: 1.4rem;
}
</style>