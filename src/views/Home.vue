<template>

<div class="header">     
  <div class="header-content">
    <h1 >Jump into your <br> next <span class="secondary">adventure</span>!</h1>
    <p>The ultimate platform for endless opportunities to explore the unknown and challenge yourself to the maximum - get ready to send it!</p>
    <div class="button-header"><router-link class="btn-orange" :to="{ name: 'Posts'}">Explore</router-link></div>
  </div>
</div>  


<div class="card-search card content">
             <div class="searchcard text-center pt-2">
             <h3 class="pt-1">Thrillseeker</h3> 
             <input type="text" placeholder="Search title.."/>         
             </div>       
</div>

<div class="postContent content">
<div class="mt-6 c d-flex space-between">
  <h2>Explore <span class="secondary">Spots</span> </h2>
  <router-link  :to="{ name: 'Posts'}">See all</router-link>
</div>
<div class="spots  ">
  <PostsHome :posts="documents" />
</div>
</div>


<!--
<div class="content mt-6">
<div class="d-flex space-between">
  <h2>Upcoming  <span class="secondary">Events</span></h2>
  <router-link  :to="{ name: 'Posts'}">See all</router-link>
</div>
<div class="events  mt-1">
  <div class="card p-1">
    <p>first</p>
  </div>
  <div class="card p-1">
    <p>second</p>
  </div>
  <div class="card p-1">
    <p>third</p>
  </div>
  <div class="card p-1">
    <p>quad</p>
  </div>
</div>
</div>
-->



<div class="content mt-6 ">
    <div class="d-flex space-between mb-1">
  <h2>Meet the top <span class="secondary">contributors!</span> </h2>
  <router-link  :to="{ name: 'Contributors'}">Meet them</router-link>
  </div>
<div class="contributors ">
  <UsersHome :users="userDocs" />
</div>
</div>


<div class="community mt-6">
  <div class="content m-auto community-inside">
    <div class="community-content pb-8">

      <div v-if="!user">
      <h2 class="mb-2">Join the community</h2>
      <p class="mb-2">Submit own spots, connect with divers from all over the world, take part in awesome events and be part of something amazing!</p>
      <div class="button-header"><router-link class="btn-orange" :to="{ name: 'Signup'}">Explore</router-link></div>
      </div>

      <div v-if="user">
        <h2 class="mb-2">Meet others from the community!</h2>
        <p class="mb-2">Submit own spots, connect with divers from all over the world, take part in awesome events and be part of something amazing!</p>
        <div class="button-header"><router-link class="btn-orange" :to="{ name: 'Contributors'}">Meet them</router-link></div>
      </div>
    </div>
    <img class="m-auto" src="@/assets/imgs/community.png" alt="">
  </div>
</div>


<div class="mt-6">
  <Categories />
</div>



 
 

<Footer />
</template>

<script>

import UsersHome from '../components/Home/UsersHome.vue'
import PostsHome from '../components/Home/PostsHome.vue'
import Categories from '../components/Categories.vue'
import Footer from '../components/Footer.vue'
import getLimitedCollection from '../composables/getLimitedCollection'
import getOrderedCollection from '@/composables/getOrderedCollection'
import getUser from '../composables/getUser'

export default {
  name: 'Home',
  components: { PostsHome, UsersHome, Categories, Footer },

  setup() {
    const { error, documents } = 
    getLimitedCollection(
    'playlists', 4
    )

    const {user} = getUser()
    const {error: userError, documents: userDocs} = getOrderedCollection(6)

        // 
   // <UsersHome :users="userDocs" />
   // 


    
    return { error, documents, userDocs, userError, user }
  }
  }

</script>

<style scoped>

  .header {
    height: 85vh;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    background-image: url("../assets/imgs/Background_cliff.png");
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 10rem
  }

  .header-content p {
    padding-top: 20px;
    width: 500px;
    line-height: 1.6;
  }

  .button-header {
    margin-top: 3rem;
  }



  input {
      padding: 6px 130px;
      color: rgba(0,0,0,.70);
      border: 1px solid rgba(0,0,0,.12);
      transition: .15s all ease-in-out;
      background: white;
      max-width: 300px;
      }
      

     input:focus {
        outline: none;
        transform: scale(1.05);
        }

        input + label  {
          font-size: 10px;
          transform: translateY(-24px) translateX(-12px);
        }

        input::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(0,0,0,.50);
          font-weight: 100;
      }

    .card-search {
      margin: 0 auto !important;
    } 
  

.searchcard {
    height: 20vh;
    background-image: url("../assets/imgs/backgroundsearch.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}


.spots, .events {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
  }

  .contributors {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
  }

  .community {
    background: var(--secondary);
  }

  .community img {
    max-width: 90%;
    height: auto;
    padding: 50px;
    position: relative;
  }

  .community-inside {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }

  .community-content {
   position: absolute; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    z-index: 1;
    
    width: 600px; /* Need a specific value to work */
  }




  @media only screen and (max-width: 1200px) {
    .header-content {
      padding-left: 100px;
    }
}
</style>

