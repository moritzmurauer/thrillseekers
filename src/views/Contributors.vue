<template>
  <div v-if="userInfo" class="home">
      <div v-for="user in userInfo" :key="user.id">

      <router-link :to="{ name: 'UserProfile', params: {id: user.id}}">
        <div class="content card mt-2 p-1">
          <div class="d-flex mt-1 space-between">

        <div class="d-flex">
          <div class="pr-1 " v-if="userInfo">
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
            <p><strong>Passion:</strong></p>
            <div>
            {{user.sport}}
            <div v-if="!user.sport">No data</div>
            </div>
          </div>

          
          </div>
        </div>
        </router-link>  
      </div>
    </div>
  
</template>

<script>


import Users from '../components/Users.vue'
import getLimitedCollection from '@/composables/getLimitedCollection'

export default {
  name: 'Home',

  setup() {
    const {documents: userInfo} = getLimitedCollection('users', 10)

    
    
    return { userInfo  }
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
