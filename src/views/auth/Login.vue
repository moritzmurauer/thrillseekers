<template>
<div class="bg">
<div class="background-cliff">


  <form class="mt-8 formblock" @submit.prevent="handleSubmit">

      <h3>Login</h3>
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="password">
      <div class="error" v-if="error">{{error}}</div>

      <button class="btn" v-if="!isPending">Login</button>
      <button class="btn" v-if="isPending" disabled>Loading...</button>

      <p class="mt-1 d-flex justify-content-center align-center">No Account yet? Sign up&nbsp; <router-link  :to="{ name: 'Signup'}"><span class="underline-link">here</span></router-link> </p>
  </form>
  </div>
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

.formblock {
    box-shadow: 4px 6px 4px 4px rgba(50, 50, 50, 0.2);
}

.underline-link {
        text-decoration: underline;
    }

  .bg {
  height: 100%;
  position: relative;
}

.background-cliff {
  /* The image used */
  position: absolute;
  background-image: url("../../assets/imgs/drew-farwell-N4WBPmuxmBo-unsplash.jpg");

  /* Full height */
  height: 91vh;
  width: 100%;
  overflow: hidden;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>