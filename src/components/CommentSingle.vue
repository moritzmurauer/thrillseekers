<template>
  <div class="comment">
      <div class="comment-top">
            <router-link :to="{ name: 'UserProfile', params: {id: song.userId}}"><h4 class="quad">{{song.user}}</h4></router-link>
            <small class="quad ml-1">( {{ formatedTime }} )</small>
      </div>
                <p class="mt-1">{{song.comment}}</p>
                
</div>
</template>

<script>
import moment from "moment"
import { computed, ref } from 'vue';
export default {
   props: ['song'],

    setup(props) {
   const formatedTime = computed(() => {
        return  moment(props.timestamp).format('ll')
    }) 
    return {formatedTime}
    }
 

}
</script>

<style scoped>
   .comment {
       padding: 20px;
   }

   .comment-top {
       display:flex;
       align-items: baseline;
   }
</style>
