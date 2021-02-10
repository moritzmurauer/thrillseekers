<template>

  
  <div v-for="post in posts" :key="post.id">
     <SinglePost :post="post" />
  </div>
</template>

<script>

import SinglePost from '@/components/Home/SinglePost'

export default {
  props: ['posts'],
  components: {SinglePost},

  setup () {  
  }
}

</script>

<style scoped>
    


  
</style>