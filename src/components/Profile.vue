<template>

  <!-- User Profile head Informations -->
  <div class="content">
    <div class="card">
      <div>
        <div class="topline">
          <h3>{{user.displayName}}</h3>
          <div class="thumbnail">
            <img class="avatar" v-if="user.avatarUrl" :src="user.avatarUrl">
            <img class="avatar" v-if="!user.avatarUrl" src="@/assets/default.png">
          </div>
        </div>

        <p>{{user.bio}}</p>
        <small>{{user.profileId}}</small>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['user'],
  }
</script>

<style scoped>
  .topline {
    display: flex;
  }

  .single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 16px 0;
    transition: all ease 0.2s;
  }

  .single:hover {
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }

  .thumbnail {
    margin-left: 10px;

  }

  .info {
    margin: 0 30px;
  }
</style>