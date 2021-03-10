<template>
  <div class="add-song">
    
      <form @submit.prevent="handleSubmit">
          <h4>Add a Comment</h4>
          <small>commenting as {{user.displayName}}</small>
          <input type="text" placeholder="comment..." required v-model="comment">
          <button class="btn">Add</button>
      </form>

  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'
import getUser from '@/composables/getUser'
import getDocument from '@/composables/getDocument'


export default {
name: 'AddSong',
props: ['playlist'],

setup(props) {

  const comment = ref('')
  const showForm = ref(false)
  const {updateDoc} = useDocument('playlists', props.playlist.id)
  const {user} = getUser()
  const {document: userInfo} = getDocument('users', user.value.uid)




  
  const handleSubmit = async () => {
      const newSong = {
          comment: comment.value,
          id: Math.floor(Math.random() * 10000000),   
          user: user.value.displayName,
          userId: user.value.uid,
          timestamp: Date.now()   
      }
      
      await updateDoc({
          songs: [...props.playlist.songs, newSong]
      })

      comment.value = ''
      
  }





  return {comment, showForm, handleSubmit, userInfo, user}
  
}



}
</script>

<style scoped>
      .add-song {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
    margin: 0;
    background-color:white ;
  }

  .btn {
    width: 100%;
  }
</style>