<template>

  <div v-if="playlist" class="content">
    <div class="details-header  mt-3">
      <h2>{{ playlist.title }}</h2>
      <div class="chip ml-1">
        <p>{{playlist.category}}</p>
      </div>
    </div>

    

    <div class="d-flex space-between ">
      
<!-- Likessystem -------------------------------------------------->
      <div>
        <div class="likes">
          <div  class="secondary d-flex">

            <div class="pr-1"><div></div> {{playlist.likes.length}} <small>liked this spot</small> </div>
            <div v-if="user">
                 <!-- Like -->
                <i v-if="!playlist.likes.includes(user.uid)" @click="handleLikes" class="far fa-heart"></i>

                <!-- unlike -->
                <i v-if="playlist.likes.includes(user.uid)" @click="handleLikes" class="fas fa-heart secondary"></i> 
            </div>

            
            </div>
        </div>
      </div>
    
<!---------------------------------------------------------------------------->

      <!-- Author of the spot -------------------------------------------------->
      <router-link :to="{ name: 'UserProfile', params: {id: playlist.userId}}">
      <div class="added-by">
       
        <div class="text-right">
           <p>added by</p>
           <p class="quad">{{ playlist.userName }}</p> 
        </div>

        <div class="ml-1">
         <div v-if="playlist.avatarUrl">
          <img class="avatar mr-1" :src="playlist.avatarUrl">
        </div>
        <div v-else>
          <img class="avatar mr-1" src="@/assets/default.png">
        </div>
        </div>
        
      </div>
      </router-link>
      <!---------------------------------------------------------------------->


    
    </div>
  </div>

  <div class="spot-outer">
  <div class="content mt-2 pt-3">
    <div class="error" v-if="error">{{ error }}</div>
    <div v-if="playlist" class="playlist-details">




      <!-- playlist information -->
      <div class="playlist-info">
        <div class="cover">
          <img :src="playlist.coverUrl">
        </div>


 
        
        <h4 class="pt-2 mb-1">Details</h4>
        <p class="description">{{ playlist.description }}</p>

        <h4 class="pt-2 mb-1">Height:</h4>
        <p class="description">{{ playlist.height + " meters" }}</p>



       <h4 class="pt-2 mb-1">Commentsection</h4> 
      <div v-if="!playlist.songs.length">No Comments yet</div>
        <div v-for="song in playlist.songs" class="card card-comment mt-1" :key="song.id">
          <CommentSingle v-if="song" :song="song" />
          <button class="btn-delete" @click="deleteSong(song.id)" v-if="ownership">delete</button>
        </div>
        <AddComment v-if="user" :playlist="playlist" />
      </div>

      <!-- song list -->
      <div class="song-list">
        <div class="card p-1">
          <div class="map-location">
            <i class="fas fa-map-marker-alt"></i>
            <a target="_blank" :href="spotUrl">    
            <p class="pb-2">{{ playlist.location }}</p>
        </a>
        </div>

        <Gmap :disableUI="false" :zoom="8" mapType="roadmap" :center="playlist.position"
          :markers="[playlist.position]">
        </Gmap>

       
        
        </div>
      </div>
       <button class="btn warningbtn mb-1" v-if="ownership" @click="handleDelete">Delete Spot</button>
    </div>
  </div>
  </div>

  <div class="content mt-8">
    <h4>Explore more spots!</h4>
    <div class="more-spots">
     <PostsHome :posts="spotsLimited" />

    </div>
    
  </div>
</template>

<script>
  import PostsHome from '@/components/Home/PostsHome.vue'
  import useStorage from '@/composables/useStorage'
  import useDocument from '@/composables/useDocument'
  import getDocument from '@/composables/getDocument'
  import getUser from '@/composables/getUser'
  import Footer from '@/components/Footer.vue'
  import CommentSingle from '@/components/CommentSingle.vue'
  import AddComment from '@/components/AddComment.vue'
  import {computed,ref} from 'vue'
  import {useRouter} from 'vue-router'
  import Gmap from '@/components/GoogleMaps/Gmap.vue'
  import getLimitedCollection from '@/composables/getLimitedCollection'

  export default {
    props: ['id'],
    components: {
      AddComment,
      Gmap,
      CommentSingle,
      PostsHome,
      Footer
    },

    setup(props) {

      const { documents: spotsLimited } = getLimitedCollection(
      'playlists', 4
      )

      const router = useRouter()
      let {document: playlist,error} = 
        getDocument('playlists', props.id)

      const {user} = getUser()


      const {updateDoc: spotCounter } = useDocument('users', user.uid)
      const {document: userInfo} = getDocument('users', user.uid)
      const {deleteDoc, updateDoc} = useDocument('playlists', props.id)
      const {deleteImage} = useStorage()

      const googleUrl = 'https://www.google.com/maps/search/?api=1&query='


      const handleLikes = async () => {
        const userLiked = playlist.value.likes.includes(user.value.uid)
        if (!userLiked) {
          const newLike = user.value.uid
          await updateDoc({
          likes: [...playlist.value.likes, newLike]
         })
        } else {
            const likedIndex = playlist.value.likes.indexOf(user.value.uid)
            const likes = playlist.value.likes
            const newLikes = likes.splice(likedIndex, 1)
            await updateDoc({
            likes
         })
        }  
         playlist = getDocument('playlists', props.id).document    
      }


      const handleDelete = async () => {
        await deleteDoc()
        await deleteImage(playlist.value.filePath)
        await spotCounter({
          addedSpots: userInfo.value.addedSpots - 1
        })
        
        router.push({
          name: 'Posts'
        })
      }

      console.log(props);

      const deleteSong = async (id) => {
        const songs = playlist.value.songs.filter((song) => song.id != id)
        await updateDoc({
          songs
        })
      }


      const spotUrl = computed(() => {
        return googleUrl + playlist.value.position.lat + ", " + playlist.value.position.lng
      })


      const ownership = computed(() => {
        return playlist.value && user.value && user.value.uid == playlist.value.userId
      })


      console.log(playlist);


      return {
        playlist,
        error,
        ownership,
        deleteSong,
        handleDelete,
        user,
        spotUrl,
        spotsLimited,
        userInfo,
        handleLikes
      }



    }



  }
</script>

<style scoped>

  .more-spots {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
  }

  .card {
    background-color: white;
  }

  .card-comment {
    position: relative;
  }

  .btn-delete {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
    margin: 20px;
    color: rgb(255, 255, 255);
    background-color: #db5000;
    border: none;
    border-width: 0px;
    border-style: solid;
    border-radius: 8px;
    transition: ease-in 250ms;
    text-align: center;
    cursor: pointer;
  }

  .fa-heart {
    cursor: pointer;
  }

  .text-right {
    text-align: right;
  }

  .details-header {
    display: flex;
  }

  .spot-outer {
    background-color: var(--secondary)
  }

  .playlist-details {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 80px;
  }

  .comment-info {
    position: relative;
  }



  .details {
    display: flex;
  }

  .cover {
    overflow: hidden;
    border-radius: 5px;
    position: relative;
    padding: 160px;
  }

  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 120%;
    max-height: 120%;
  }

  

  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }

  .playlist-info p {
    margin-bottom: 20px;
  }

  .username {
    color: #999;
  }

  .description {
    text-align: left;
  }

  .single-song {
    padding: 10px 5px;
    display: flex;
    background-color: rgba(255, 255, 255);
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }

  .warningbtn {
    background-color: var(--warning);
  }

  .added-by {
    display: flex;
    align-items: center;
  }

  .added-by i {
    font-size: 1.5rem;
  }

  .avatar {
    width: 50px;
    height: 50px;
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.2);
  }

  .likes {
    font-size: 1.2rem;
  }

  .map {
  width: 100%;
  height: 300px;
  background-color: azure;
}

.map-location {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.map-location i {
  font-size: 1.7rem;
  padding: 10px 0;
}
  
</style>