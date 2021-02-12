<template>
<div class="single-post">
  <router-link :to="{name: 'SpotDetails', params: {id: post.id}}">
      <div class="single">
        <div class="thumbnail">
            <img :src="post.coverUrl">
        </div>    
        
        <div class="info">
            <h4 class="">{{post.title}}</h4>
            <div class="chip mt-1">
                  <small>{{post.category}}</small>
            </div>
            <div class="ml-1 d-flex align-items-baseline chip">
                <i class="fas fa-angle-double-up quad">
                <small class="quad chip-text"> {{post.height}} m</small></i>
            </div>
            <br>  
            <small >{{snippet}}</small>
            
            <div class="pt-1 postBottom">
              <div class="addedBy">
                
                <div class="avatar-icon">
                  <div v-if="post.avatarUrl">
                    <img class="avatar mr-1" :src="post.avatarUrl">
                 </div>
                   <div v-else>
                     <img class="avatar mr-1" src="@/assets/default.png">
                  </div>
                </div>

                <small>added by <br> <router-link :to="{ name: 'UserProfile', params: {id: post.userId}}"> {{post.userName}} </router-link></small>
              </div>
                <p class="secondary"><i class="far fa-heart"></i> {{post.likes.length}}</p>
                
            </div>
        </div>

        
      </div>
   </router-link>
</div>
</template>



<script>
import { computed } from 'vue'


export default {
    props: ['post'],
    setup(props) {

    

    const snippet = computed(() => {
        return props.post.description.substring(0,65) + '....'
    }) 

    return { snippet }
}
}
</script>

<style scoped>
    .single {
    display: flex;
    flex-direction: column;
    padding: 0;
    border-radius: 10px;
    background: var(--secondary);
    margin: 16px 0;
    transition: all ease 0.2s;
    border: 1px solid var(--secondary);
    
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .thumbnail {
    max-width: 100%;
    max-height: 200px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    max-width: 150%;
    max-height: 150%;
    display: block;
  }
  .info {
      padding: 20px;
  }


  .addedBy {
    display: flex;
    align-items: center;
  }

  .addedBy i {
    font-size: 1.4rem;
    padding-right: 10px;
  }

  .postBottom {
    display:flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .chip-text {
    margin-left: 5px;
  }
</style>