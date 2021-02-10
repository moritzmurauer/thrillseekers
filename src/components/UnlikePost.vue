<template>
  <div class="remove-like">
          <button @click="handleSubmit">Unlike</button>
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

  const showForm = ref(false)
  const {updateDoc} = useDocument('playlists', props.playlist.id)
  const {user} = getUser()
  const {document: userInfo} = getDocument('users', user.value.uid)


const handleSubmit = async (id) => {
        const songs = playlist.value.likes.filter((like) => like.id != id)
        await updateDoc({ likes })
      }







  return {showForm, handleSubmit, userInfo}
  
}



}
</script>

<style scoped>
      .remove-like {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
</style>