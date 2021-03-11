<template>

<!-- User Overview -->

  <div class="content">
    <h3>List of all Users</h3>
      <div v-for="user in users" :key="user.id" class="card">
        <router-link :to="{ name: 'UserProfile', params: {id: user.id}}">
        <div>
          <div class="topline">
            <h3>{{user.displayName}}</h3>
            <div class="thumbnail">
            <img class="avatar" v-if="user.avatarUrl" :src="user.avatarUrl">
            <div v-if="!user.avatarUrl"><img class="avatar" src="@/assets/default.png"></div>
            </div>
          </div>
            <p>{{user.bio}}</p>
            <small v-if="user.home">From: {{user.home}}</small>
        </div>
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
  props: ['users'], 
}
</script>

<style scoped>

  

   
  .thumbnail {
    margin-left: 10px;
  }
 


  .info {
    margin: 0 30px;
  }

  .topline {
    display: flex;
  }

</style>