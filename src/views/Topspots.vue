<template>
  <div v-if="topSpots" class="content">


      <div class="mt-3 d-flex space-between align-items-baseline ">
        <h2>Top 10 <span class="secondary">Spots </span> </h2>
        <p>The community's favourites!</p>
      </div>
    <div class="outer-grid space-between mt-3">
      <div v-for="(spot, index) in topSpots"  :key="spot.id">

      <router-link :to="{name: 'SpotDetails', params: {id: spot.id}}">
      <div class="single">
        <div class="thumbnail">
          <h4 class="spot-title">{{spot.title}}</h4>
            <div class="spot-title spot-likes d-flex">
              {{spot.likes.length}}
              <i class="white far fa-heart"></i>
          </div>
          <p class="counter secondary">#{{++index}}</p>
          <img class="cover" :src="spot.coverUrl">           
        </div> 
      </div>
      </router-link>

      

      </div>
    </div>


    </div>
  
</template>

<script>


import getTopSpots from '@/composables/getTopSpots'

export default {
  name: 'Home',
  setup() { 

    const {documents: topSpots} = getTopSpots(10)

    
    return { topSpots}
  }
  }

</script>

<style scoped>
 

  .counter {
    position: absolute;
    color: white;
    text-shadow: 1px 2px 3px rgba(50, 50, 50, 0.8);
    text-decoration: underline;
    right: 15px;
    top: 15px;
    z-index: 10;

  }

  .outer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }

  .chip {
    width: 80px;
  }

  .spot-title {
    position: absolute;
    color: white;
    text-shadow: 1px 2px 3px rgba(50, 50, 50, 0.8);
    text-align: center;
    top: 45%;
    right: 50%;
    transform: translateY(-50%);
    transform: translateX(50%);
    z-index: 11;
  }

  .spot-likes {
    top: 85%;
  }

  .cover {
    object-fit: cover;
    border-radius: 10px;
    width: 100%;
    height: 200px;
    filter: brightness(80%);
    z-index: 0;
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.2);
    transition: all ease 0.2s;
  }

  .cover:hover {
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.4);
    transform: scale(1.02);
    transition: all ease 0.2s;
    filter: brightness(40%);
  }

  .single {
    cursor: pointer;
  }


  .thumbnail {
    position: relative;
    padding: 0;
    margin: 0;
    place-items: center;
  }

  .fa-heart {
    font-size: 1rem;
    margin-left: 5px;
  }

  @media only screen and (max-width: 800px) {
    .outer-grid {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      margin-bottom: 200px;
    }

    .cover {
      height: 150px;
    }
  }

  @media only screen and (max-width: 600px) {
    .outer-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .cover {
      height: 120px;
    }

    h4 {
      font-size: 0.7rem;
    }

    .spot-likes {
      top:78%;
    }
  }

</style>
