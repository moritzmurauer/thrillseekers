<template>
      <div class="categories-main">
          
          <div class="main-content" id="main">
    <h2>Pick your <span class="secondary">Category</span></h2>
    <div class="main-categories">

  <!--CLIFF--------------------------------------------------------------------------->
  <router-link  :to="{ name: 'Category', params: {id: cliff}}">
      <div class="category-card">
        <div class="category-surf card-front">
          <a href=""><img src="@/assets/imgs/cardflip/cliff.png" alt="cliffdive"></a>
          <h3>Cliffs</h3>
        </div>
        <div class="card-back">
          <a href=""><img src="@/assets/imgs/cardflip/cliff_back.png" alt="cliffdive vector"></a>
        </div>
      </div>
  </router-link>


  <!--BRIDGE--------------------------------------------------------------------------->

  <router-link  :to="{ name: 'Category', params: {id: bridge}}">
      <div class="category-card">
        <div class="category-skate card-front">
          <a href=""><img src="@/assets/imgs/cardflip/bridge.png" alt="bridgedive"></a>
          <h3>Bridges</h3>
        </div>
        <div class="card-back">
          <a href=""><img src="@/assets/imgs/cardflip/bridge_back.png" alt="bridgedive vector"></a>
        </div>
      </div>
  </router-link>

  <!--SWING--------------------------------------------------------------------------->

  <router-link  :to="{ name: 'Category', params: {id: swing}}">
      <div class="category-card">
        <div class="category-street card-front">
          <a href=""><img src="@/assets/imgs/cardflip/rope.png" alt="ropeswing"></a>
          <h3>Ropeswings</h3>
        </div>
        <div class="card-back">
          <a href=""><img src="@/assets/imgs/cardflip/rope_back.png" alt="ropeswing vector"></a>
        </div>
      </div>
  </router-link>

  <!--POOL--------------------------------------------------------------------------->

  <router-link  :to="{ name: 'Category', params: {id: pool}}">
      <div class="category-card">
        <div class="category-portrait card-front">
          <a href=""><img src="@/assets/imgs/cardflip/pool.png" alt="pooldiving platform"></a>
          <h3>Pools</h3>
        </div>
        <div class="card-back">
          <a href=""><img src="@/assets/imgs/cardflip/platform_back.png" alt="pool jump Vector"></a>
        </div>
      </div>
  </router-link>

</div>
</div>
      </div>


  

</template>

<script>
import { ref } from 'vue'
export default {
    name: 'Categories',

    setup() {

      
      const cliff = ref('Cliff')
      const bridge = ref('Bridge')
      const swing = ref('Swing')
      const pool = ref('Pool')

      return {cliff, bridge, swing, pool}
    }
}
</script>

<style scoped>
    .categories-main {
        margin-top: 8rem;
    }


.categories-main {
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  position: relative;
  max-width: 100%;
  height: 280px;
  margin: 30px 0;
  perspective: 1000px;
}



.card-back,
.card-front {
  position: absolute;
}

.card-front {
  transform: rotateX(0deg);
  backface-visibility: hidden;
  transition: 0.5s;
}

.card-back {
  transform: rotateX(180deg);
  backface-visibility: hidden;
  transition: 0.5s;
}

.category-card:hover .card-front {
  transform: rotateX(-180deg);
  backface-visibility: hidden;
}

.category-card:hover .card-back {
  transform: rotateX(0deg);
  backface-visibility: hidden;
}

.category-card img {
  max-width: 100%;
  height: auto;
  margin: 10px 0;
  border-radius: 8px;
  transition: ease-in-out 250ms;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.category-card>.card-front h3 {
  position: absolute;
  color: white;
  z-index: 999;
  right: 47%;
  top: 50%;
  text-align: center;
  text-transform: uppercase;
}

.category-card>.card-front>a>img:hover {
  transition: ease-in-out 250ms;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.category-card .card-back {
  display: block;
}

/*-----------------------------------------------------------*/

@media (max-width: 1100px) {
  .category-card {
    margin: 0;
    height: 260px;
  }
}


/*------------------------------------------------------------*/

@media (max-width: 875px) {
  

.category-card {
  margin: 0 1rem;
  height: 200px;
}

.category-card>.card-front h3 {
    right: 40%;
}

}



/*------------------------------------------------------------*/



@media (max-width: 600px) {

.category-card {
  height: 150px;
}

}

/*------------------------------------------------------------*/

@media (max-width: 500px) {



.category-card {
  height: 130px;
}

.category-card>.card-front h3 {
  font-size: 1.5rem;
}

}

/*------------------------------------------------------------*/


@media (max-width: 450px) {


.category-card {
  height: 110px;
}

.category-card>.card-front h3 {
  font-size: 1.2rem;
}

}

/*------------------------------------------------------------*/

@media (max-width: 380px) {


.category-card {
  height: 100px;
}

}

</style>