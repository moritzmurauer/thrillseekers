<template>
  <div class="categories content">

        <router-link  :to="{ name: 'Posts'}"> 
          <div class="chip top">
              All
          </div>
        </router-link>

         <router-link  :to="{ name: 'Category', params: {id: cliff}}"> 
          <div class="chip">
            <div class="d-flex align-items-center">
              <img class="icon" src="@/assets/imgs/icons/icons8-cliff.png" alt="cliff icon">
              <p>{{cliff}}</p>
            </div>
          </div>
        </router-link>

        <router-link  :to="{ name: 'Category', params: {id: bridge}}"> 
          <div class="chip">
              <div class="d-flex align-items-center">
              <img class="icon" src="@/assets/imgs/icons/icons8-bridge.png" alt="cliff icon">
              <p>{{bridge}}</p>
            </div>
          </div>
        </router-link>

        <router-link  :to="{ name: 'Category', params: {id: swing}}"> 
          <div class="chip">
               <div class="d-flex align-items-center">
              <img class="icon" src="@/assets/imgs/icons/icons8-tire_swing.png" alt="cliff icon">
              <p>{{swing}}</p>
            </div>
          </div>
        </router-link>

        <router-link  :to="{ name: 'Category', params: {id: pool}}"> 
          <div class="chip">
              <div class="d-flex align-items-center">
              <img class="icon" src="@/assets/imgs/icons/icons8-diving.png" alt="cliff icon">
              <p>{{pool}}</p>
            </div>
          </div>
        </router-link>
      </div>
</template>

<script>
import { ref } from 'vue'

export default {
    setup () {
    const cliff = ref('Cliff')
    const bridge = ref('Bridge')
    const swing = ref('Swing')
    const pool = ref('Pool')

    return {cliff, bridge, swing, pool}
    }
}
</script>

<style>
    .categories {
        margin: 15px 0;
    }

    .icon {
      width: 20px;
      margin-right: 5px;
    }

    .categories .chip {
        margin-right: 15px;
    }

    .top {
      margin-bottom: 100px;
    }

    a.router-link-exact-active .chip {
  background-color:#07506842;
}
</style>