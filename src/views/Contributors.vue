<template>
  <div v-if="topList
  " class="home">

      <div v-for="(user, index) in topList"  :key="user.id" >

      <router-link :to="{ name: 'UserProfile', params: {id: user.id}}">
        <div class="content card mt-2 p-1">
          <div class="d-flex mt-1 space-between">

            


        <div class="d-flex">
          <div class="counter mt-1">
            <strong class="pr-1">{{++index}}</strong>
          </div>
          <div class="pr-1 " v-if="topList">
            
            <img class="avatar avatar-user" v-if="user.avatarUrl" :src="user.avatarUrl">
            <img class="avatar avatar-user" v-if="!user.avatarUrl" src="@/assets/default.png">
          </div>
          <div class="display-name">
            <p>{{user.displayName}}</p>
          </div>
          <div class="chip ml-1 ">
            Visit Profile
          </div>
        </div>

          <div class=" mr-3">
            <p><strong>Spots </strong></p>
            <p>{{user.addedSpots}}</p>
            
          </div>
          </div>
        </div>
        </router-link>  
      </div>
    </div>
  
</template>

<script>


import getOrderedCollection from '@/composables/getOrderedCollection'

export default {
  name: 'Home',
  setup() { 

    const {documents: topList} = getOrderedCollection(10)

    
    return { topList}
  }
  }

</script>

<style scoped>
  .avatar-user {
       width: 40px;
  height: 40px;
  }

  .display-name {
    margin-top: 8px;
  }

  
</style>
