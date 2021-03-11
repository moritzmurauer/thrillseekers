<template>

<!-- All posts with category selector -->
  <div class="home pt-2 mb-8">
    <div v-if="error" class="error">Could not fetch the data</div>
      <SelectCategory />
      <div  v-if="spotList"> 
        <ListView :spots="spotList" />
      </div>
      <div class="content" v-else>
        loading...
      </div>
    
    </div>

 
  
</template>

<script>

import SelectCategory from '@/components/SelectCategory.vue'
import ListView from '../components/ListView.vue'
import getCollection from '../composables/getCollection'
import { computed, ref } from 'vue'

export default {
  name: 'Home',
  components: { ListView, SelectCategory },

  setup() {
    const search = ref("")
    const { error, documents: spotList } = getCollection('playlists')
    
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

