<template>
  <div class="home pt-2">
    <div v-if="error" class="error">Could not fetch the data</div>

<!--
    <div class="content">
      <h4>Search for your spot</h4>
      <input type="text" placeholder="search spot.." v-model="search">
    </div>
-->

      <SelectCategory />
      <div v-if="spotList"> 
        <ListView :spots="spotList" />
      </div>
      <div class="content" v-else>
        loading...
      </div>
    </div>

    <Footer />
 
  
</template>

<script>

import SelectCategory from '@/components/SelectCategory.vue'
import ListView from '../components/ListView.vue'
import getCollection from '../composables/getCollection'
import Footer from '@/components/Footer.vue'
import { computed, ref } from 'vue'

export default {
  name: 'Home',
  components: { ListView, SelectCategory, Footer },

  setup() {
    const search = ref("")
    const { error, documents: spotList } = getCollection('playlists')

    

   
/*
    const spotsWithSearch = 
      computed(() => {
        return spotList.value.filter((parameter) => parameter.title.toLowerCase().includes(search.value.toLowerCase()))
    })
*/
  


   

    
    

    
    return { error,  search,  spotList}
  }
  }

</script>

<style scoped>
  input {
    margin: 0;
    margin-bottom: 30px;
    margin-top: 5px;

  }
</style>

