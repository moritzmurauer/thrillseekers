<template>
  <div class="categories content">

        <router-link  :to="{ name: 'Posts'}"> 
          <div class="chip">
              All
          </div>
        </router-link>

         <router-link  :to="{ name: 'Category', params: {id: cliff}}"> 
          <div class="chip">
              {{cliff}}
          </div>
        </router-link>

        <router-link  :to="{ name: 'Category', params: {id: bridge}}"> 
          <div class="chip">
              {{bridge}}
          </div>
        </router-link>

        <router-link  :to="{ name: 'Category', params: {id: swing}}"> 
          <div class="chip">
              {{swing}}
          </div>
        </router-link>

        <router-link  :to="{ name: 'Category', params: {id: pool}}"> 
          <div class="chip">
              {{pool}}
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

    .categories .chip {
        margin-right: 15px;
    }

    a.router-link-exact-active .chip {
  background-color:#07506842;
}
</style>