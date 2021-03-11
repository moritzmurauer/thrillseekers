<template>
<div class="bg">
<div class="background-cliff">
    <form class="mt-4 formblock" @submit.prevent="handleSubmit">

      <h3>Sign up</h3>
      <input type="text" v-model="displayName" placeholder="Name">
      <input type="textarea" v-model="bio" placeholder="Biograhpy">
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="password">
      <div class="error" v-if="error">{{error}}</div>

      <button class="btn outline" v-if="!isPending">Sign up</button>
      <button v-if="isPending" disabled>Loading...</button>

      <p class="mt-1 d-flex justify-content-center align-center">Already have an Account? Log in&nbsp;<router-link  :to="{ name: 'Login'}"><span class="underline-link">here</span> </router-link> </p>
  </form>
   </div>
  </div>
</template>

<script>

    import useSignup from  '@/composables/useSignup'
    import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {

    const {error, signup, isPending}  = useSignup()
    const router = useRouter()
     
     const bio = ref('')
     const email = ref('')
     const password = ref('')
     const addedSpots = ref(0)
     const displayName = ref('')

     const handleSubmit = async () => {
         const res =  await signup(email.value, password.value, displayName.value, bio.value, addedSpots.value)
         if(!error.value) {
             router.push({name: 'UserProfile', params: {id: res.user.uid}})
         }
     }

     

     return {email, password, displayName, handleSubmit, bio, error, isPending, addedSpots}
     
     
    }


}
</script>

<style scoped>
    .btn {
        width: 100%;
    }

    .underline-link {
        text-decoration: underline;
    }

  .formblock {
    box-shadow: 4px 6px 4px 4px rgba(50, 50, 50, 0.2);
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