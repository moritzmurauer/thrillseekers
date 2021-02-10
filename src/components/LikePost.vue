<template>
  <div class="add-like">
          <button @click="handleSubmit">Like</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'
import getUser from '@/composables/getUser'
import getDocument from '@/composables/getDocument'


export default {
props: ['playlist'],

setup(props) {

  const artist = ref('')
  const showForm = ref(false)
  const {updateDoc} = useDocument('playlists', props.playlist.id)
  const {user} = getUser()
  const {document: userInfo} = getDocument('users', user.value.uid)




  
  const handleSubmit = async () => {
      const newLike = {
          user: user.value.displayName,
          user: user.value.uid,
      }
      
      await updateDoc({
          likes: [...props.playlist.likes, newLike]
      })

      
  }





  return {showForm, handleSubmit, userInfo}
  
}



}
</script>

<style scoped>
      .add-like {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
</style>