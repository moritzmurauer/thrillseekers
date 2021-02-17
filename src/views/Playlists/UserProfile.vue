<template>

<div class="user-header content mt-2 align-items-center">
<div v-if="spots" class="user-top ">
  <div class="thumbnail">
            <img class="avatar avatar-profile" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl">
            <img class="avatar avatar-profile" v-if="!userInfo.avatarUrl" src="@/assets/default.png">
  </div>
  <div class="user-info ml-2">
   
    <h2 class="mb-1">{{userInfo.displayName}}</h2>
    <p class="mb-1"><strong>{{spots.length}}</strong> added Spots</p>
    <p v-if="userInfo.sport" class="quad">{{userInfo.sport}}</p>
    <p v-else class="quad">User</p>
  </div>

  
</div>



</div>


<div class="profile-outer mt-3">
  <div class="content profile-inner pt-3">

    <div class="user-info">
      <div v-if="userInfo" class="card">
        <strong  class="quad">Userinfo</strong>
        <div class="d-flex mb-1 mt-1 age-field">
          <i class="far fa-calendar-alt mr-1"></i>
          <p>Age:</p>
          <p><strong class="ml-1"><small>{{userInfo.age}}</small> </strong></p>
        </div>
        <div class="d-flex mb-1">
          <i class="fas fa-home mr-1"></i>
          <p>From:</p>
          <p><strong class="ml-1"><small> {{userInfo.home}}</small></strong></p>
        </div>
        <div class="d-flex mb-1">
          <i class="far fa-heart mr-1"></i>
          <p>Passion:</p>
          <p><strong class="ml-1"><small>{{userInfo.sport}}</small></strong></p>
        </div>
        <div class="d-flex mb-1">
          <i class="fas fa-users mr-1"></i>
          <p>Crews:</p>
          <p><strong class="ml-1"><small>{{userInfo.crew}}</small></strong></p>
        </div>
      </div>
    </div>


    <div class="user-posts" v-if="spots">
      <div class="d-flex space-between">
        <h4>All spots from <span class="quad">{{userInfo.displayName}}</span> </h4>
        
      </div>
      
      <p v-if="spots.length == 0">
        No Spots posted yet
      </p>
      
      <div v-for="spot in spots" :key=spot.id>
         <router-link :to="{name: 'SpotDetails', params: {id: spot.id}}">
      <div class="single">
        <div class="thumbnail">
            <img :src="spot.coverUrl">
        </div>    
        <div class="info">
          <div class="d-flex align-items-center">
            <h3 class="spot-headline">{{spot.title}}</h3> 

        

            <span class="chip ml-1">{{spot.category}}</span>
            </div>

          <div class="d-flex">
         <p>Added by {{spot.userName}}</p>
            <div v-if="userInfo" class="spot-avatar">
            <img class="avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl">
            <img class="avatar" v-if="!userInfo.avatarUrl" src="@/assets/default.png">
        </div>
        </div>
        </div>
        <div class="song-number mr-1">
         
        </div>
      </div>
      
   </router-link>
      </div>

    </div>

    <div class="user-posts">
        <h4>Who to <span class="quad">follow</span> </h4>
        <div v-if="userDocs">
        <div class="d-flex user-single align-center card card-user" v-for="userDoc in userDocs" :key="userDoc.id">
          
          <div v-if="userDocs.length" class="pr-1">
          <img class="avatar avatar-user" v-if="userDoc.avatarUrl" :src="userDoc.avatarUrl">
          <img class="avatar avatar-user" v-if="!userDoc.avatarUrl" src="@/assets/default.png">
          </div>

           <router-link :to="{ name: 'UserProfile', params: {id: userDoc.id}}">
              <p class="user-link"><small>{{userDoc.displayName}}</small></p>
           </router-link>
          
        </div>

      </div>
      
    </div>
  </div>
</div>


</template>



<script>



import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import getLimitedCollection from '@/composables/getLimitedCollection'
import getDocument from '@/composables/getDocument'
import ListView from '@/components/ListView.vue'
import Profile from '@/components/Profile.vue'
import { useRoute } from 'vue-router'
export default {

components: {ListView, Profile},

setup() {

  
  const route = useRoute()
  console.log();

  const {user} = getUser()
  const {document: userInfo} = getDocument('users', route.params.id)
  const {documents: userDocs} = getLimitedCollection('users', 8)
  const {documents: spots } = getCollection(
    'playlists',
    ['userId', '==', route.params.id]
    )






  return {spots, userInfo, userDocs, route, user}
}

}
</script>

<style scoped>

  
  .thumbnail {
    max-width: 120px;
    max-height: 120px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    max-width: 150%;
    max-height: 150%;
    display: block;
  }


  .spot-headline {
    margin-top: 5px;
  }
 
  .song-number {
    margin-left: auto;
  }

 .spot-avatar {
   margin-left: 5px;
 }

 .avatar-user {
   width: 40px;
  height: 40px;
 }

.profile-outer {
  background-color: var(--secondary);
  min-height: 65vh;
}

.profile-inner {
  display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 20px;
}

.avatar-profile {
  width: 100px;
  height: 100px;
}

  .topline {
      display: flex;
  }

  

    .single {
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: white;
    transition: all ease 0.2s;
    margin: 15px 0;
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  
  .user-top {
    display: flex;
    align-items: center;
  }

  .info {
    margin: 0 30px;
  }

  .user-header {
    display: flex;
    justify-content: space-between;
  }

  .user-info .card, .user-explore .card {
    background: white;
    padding: 20px; 
  }

  .card-user {
    background: white;
  }

  .age-field {
    margin-left: 4px;
  }

  .user-posts  {
    background: white;
    padding: 20px;
  }

  .user-single {
    padding: 16px 0;
  }

  .user-link {
    margin-top: 8px;
  }
</style>