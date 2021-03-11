<template>

  <!-- A list of all spots in the collection -->
  
  <div class="content" v-for="spot in spots" :key="spot.id">
     <router-link :to="{name: 'SpotDetails', params: {id: spot.id}}">
      <div class="single">
        <div class="thumbnail">
            <img :src="spot.coverUrl">
        </div>    
        <div class="info">
          <div class="d-flex align-center">
            <h3>{{spot.title}}</h3>
            <div class="ml-1 mb-1 chip">{{spot.category}}</div>
          </div>


  <div class="d-flex align-items-center">
      <div class="avatar-icon">
        <div v-if="spot.avatarUrl">
          <img class="avatar mr-1" :src="spot.avatarUrl">
        </div>
        <div v-else>
          <img class="avatar mr-1" src="@/assets/default.png">
        </div>
      </div>

          <div>
            <p>added by</p>
            <div class="d-flex">
                <p>{{spot.userName}}</p>
            </div>
          </div>
  </div>

  <div class="like-block mt-1">
    {{spot.likes.length}}
    <i class="far fa-heart"></i>
  </div>


        </div>
        
      </div>
   </router-link>

  </div>
  <div class="mb-8">
  </div>
</template>

<script>


export default {
  props: ['spots'],
}

</script>

<style scoped>

    

    .single {
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 10px;
    background: var(--secondary);
    margin: 16px 0;
    transition: all ease 0.2s;
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.1);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
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
  .info {
    margin: 0 30px;
  }
  .song-number {
    margin-left: auto;
  }

  .avatar {
    width: 30px;
    height: 30px;
  }

 

  .like-block {
    position: absolute;
    right: 30px;
    bottom: 15px;
    color: var(--third);
  }



 @media only screen and (max-width: 700px) {
    h3 {
      font-size: 1rem;
    }

    p {
       font-size: 0.8rem;
    }
    
  }

 
</style>