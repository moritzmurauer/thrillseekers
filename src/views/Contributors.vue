<template>
  <div v-if="topList" class="content">

    <!-- A list of the top 10 contributors who posted the most spots yet -->
    <div class="mt-3 d-flex space-between align-items-baseline ">
      <h2>Top 10 <span class="secondary">contributors </span> </h2>
      <p>Number of added Spots</p>
    </div>
    <div v-for="(user, index) in topList" :key="user.id">

      <router-link :to="{ name: 'UserProfile', params: {id: user.id}}">
        <div class="card mt-2 p-1">
          <div class="d-flex mt-1 grid">


            <div class="d-flex">
              <div class="counter">
                <h2 class="pr-3">{{++index}}</h2>
              </div>
              <div class="pr-1 " v-if="topList">

                <img class="avatar avatar-user" v-if="user.avatarUrl" :src="user.avatarUrl">
                <img class="avatar avatar-user" v-if="!user.avatarUrl" src="@/assets/default.png">
              </div>
              <div>
                <p><strong>{{user.displayName}}</strong></p>
                <div class="display-name">
                  <p v-if="user.sport">{{user.sport}}</p>
                  <p v-else>User</p>
                </div>
              </div>

            </div>

            <div class="chip ml-1 ">
              Visit Profile
            </div>


            <h3 class="pl-10 quad">{{user.addedSpots}}</h3>

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

      return {
        topList
      }
    }
  }
</script>

<style scoped>
  .avatar-user {
    width: 40px;
    height: 40px;
  }

  .display-name {
    margin-top: 6px;
  }

  .counter {
    margin-top: 6px;
  }

  .grid {
    display: grid;
    grid-template-columns: 2fr 4fr 0.2fr;
  }

  .chip {
    width: 80px;
  }
</style>
