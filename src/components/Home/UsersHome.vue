<template>
  <div v-for="user in users" :key="user.id" class="card">
        <router-link :to="{ name: 'UserProfile', params: {id: user.id}}">
        <div class="userAtts">
          <div class="topline">
            
            <div class="thumbnail mt-1 mb-1">
             <img class="avatar" v-if="user.avatarUrl" :src="user.avatarUrl">
            <div  v-if="!user.avatarUrl"><img class="avatar" src="@/assets/default.png"></div>
            </div>

            <div class="chip">{{user.addedSpots}} added Spots</div>
            <h4>{{user.displayName}}</h4>
            <div class="mb-1">
             <small v-if="user.sport">{{user.sport}}</small>
             <small v-else>User</small>
            </div>
          </div>
           
            
        </div>
        </router-link>
      </div>
</template>

<script>


export default {
  props: ['users'],
}

</script>

<style scoped>
    .single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    transition: all ease 0.2s;
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }

  .avatar {
    margin: 0 auto;
    width: 80px;
  height: 80px;
  }

  .song-number {
    margin-left: auto;
  }

  .userAtts {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      justify-content: center;
  }
</style>