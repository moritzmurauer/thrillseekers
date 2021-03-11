<template>
    <form class="mt-3" @submit.prevent="handleSubmit">
        <h3>Hey let the community know who you are!</h3>

        <div class="d-flex align-center">
        <label class="custom-file-upload">
            <input type="file" @change="handleChange">
            <h4><i class="far fa-file-image"></i> update your avatar</h4>
        </label>
        
        <div class="mt-2 ml-1" v-if="userInfo">
            <img class="avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl">
            <img class="avatar" v-if="!userInfo.avatarUrl" src="@/assets/default.png">
        </div>
        
        </div>
        <p v-if="formError" class="error">{{formError}}</p>
        <small class="file-name" v-if="file">{{file.name}}</small>

        

        
    <div>
        <div v-if="userInfo" class="field">
        <label for="bio">Biography</label>
        <input  type="textarea" placeholder="Tell us something about yourself!" required v-model="userInfo.bio">
        </div>
        
        <div v-if="userInfo" class="field">
        <label for="age">Age:</label>
        <input type="number" placeholder="How old are you?" required v-model="userInfo.age">
        </div>

        <div v-if="userInfo" class="field">
        <label for="home">Hometown:</label>
        <input type="text" placeholder="Where are you living?" v-model="userInfo.home">
        </div>

        <div v-if="userInfo" class="field">
        <label for="age">Sport</label>
        <input type="text" required placeholder="Favourite Sport?" v-model="userInfo.sport">
        </div>

        <div v-if="userInfo" class="field">
        <label for="age">Diving Crews:</label>
        <input type="text" required placeholder="Part of any Crew?" v-model="userInfo.crew">
        </div>
    </div>


        
        
        
        


        



        <div class="error"></div>

        <button v-if="!isPending" class="btn">Update Info</button>
        <button v-else disabled class="btn-create">Saving...</button>
    </form>
</template>

<script>
    import {ref} from 'vue'
    import useStorage from '@/composables/useStorage'
    import useDocument from '@/composables/useDocument'
    import getUser from '@/composables/getUser'
    import getDocument from '@/composables/getDocument'
    import { useRouter } from 'vue-router'
    

    export default {

        setup() {

            const {user} = getUser()
            const {url, filePath, uploadProfilePicture} = useStorage()
            const {document: userInfo} = getDocument('users', user.value.uid)
            const {error, updateDoc} = useDocument('users', user.value.uid)
            
            
            
            
            console.log(user.value.uid);

            const router = useRouter()

            const bio = ref('')
            const age = ref('')
            const home = ref('')
            const sport = ref('')
            const crew = ref('')
            const file = ref(null)
            const fileError = ref(null)
            const isPending = ref(false)
            var formError = ref(null)
            //const checkedCategory = ref([])


            const handleSubmit = async () => {
                if (!file.value) {
                    formError.value = "missing photo"
                    return
                }
                if(file.value) {
                    isPending.value = true
                    
                await uploadProfilePicture(file.value)
                   const res =  await updateDoc({
                        bio: userInfo.value.bio,
                        age: userInfo.value.age,
                        home: userInfo.value.home,
                        sport: userInfo.value.sport,
                        crew: userInfo.value.crew,
                        profileId: user.value.uid,
                        avatarUrl: url.value,
                        filePath: filePath.value,
                    })

                    console.log(res);

                    isPending.value = false
                    if(!error.value) {
                        console.log('Info updated')
                        router.push({name: 'UserProfile', params: {id: user.value.uid}})               
                    }
                } 
            }

            

            //allowed file types

            const types = ['image/png', 'image/jpeg']

            const handleChange = (event) => {
                const selected = event.target.files[0]
                formError.value = null
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
                age,
                bio,
                home,
                sport,
                crew,
                file,
                handleSubmit,
                handleChange,
                fileError,
                isPending,
                userInfo,
                formError
            }
        }
    }
    
</script>

<style scoped>
    .category input {
        padding: 0;
        margin: 0;
        display: flex;
        width: 100%;
    }

    .category-field {
        margin-right: 25px;

    }

    .avatar {
        width: 35px;
        height: 35px;
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
        height: 200px;
    }

    .field {
        margin: 30px 0;
        
    }

    input {
        margin: 0 !important;
    }



    .custom-file-upload {
        margin-top: 2rem !important;
        border: 1px solid rgb(204, 133, 0);
        padding: 100px;
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
    color: rgb(255, 115, 0);
}

.btn-create {
        margin: 0;
}
</style>