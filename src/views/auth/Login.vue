<template>

<div class="background-cliff">
  <form class="mt-8" @submit.prevent="handleSubmit">

      <h3>Login</h3>
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="password">
      <div class="error" v-if="error">{{error}}</div>

      <button class="btn" v-if="!isPending">Login</button>
      <button class="btn" v-if="isPending" disabled>Loading...</button>
  </form>
  </div>
</template>


<script>

import useLogin from  '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {

     const router = useRouter()
     const {error, login, isPending} = useLogin()

     const email = ref('')
     const password = ref('')

     const handleSubmit = async () => {
         const res = await login(email.value, password.value)
         if(!error.value) {
             router.push({name: 'UserProfile', params: {id: res.user.uid}})
         }
     }

     return {email, password, handleSubmit, error, isPending}
     
     
    }
}
</script>

<style scoped>
.btn {
        width: 100%;
    }
</style>