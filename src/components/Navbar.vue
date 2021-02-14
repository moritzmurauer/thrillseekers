<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/imgs/artwork_logo.png">
      <div class="d-flex align-items-baseline">
        <h2>
          <router-link class="logo-link font-pacifico" :to="{ name: 'Home'}">Thrillseekers</router-link>
        </h2>
        <div class="topics">
          <router-link :to="{ name: 'Posts'}">Posts</router-link>
          <router-link :to="{ name: 'Contributors'}">Community</router-link>
          <router-link :to="{ name: 'Topspots'}">Topspots</router-link>
        </div>
      </div>

      <div class="links">


        <div v-if="user">
          <div class="d-flex align-items-center">
            <div class="pr-1">
              <p>Hey, <span class="secondary">{{user.displayName}}</span>!</p>
            </div>
            <div>
              <div v-if="!toggleDropdown" @click="toggleDropdown = true">
                <div v-if="user" class="avatar-nav">
                  <div v-if="user">
                    <i class="fas fa-folder-minus"></i>
                  </div>
                  <div v-else>
                    <img class="avatar mr-1" src="@/assets/default.png">
                  </div>
                </div>
              </div>

               <div v-if="toggleDropdown" @click="toggleDropdown = false">
                <div v-if="user" class="avatar-nav">
                  <div v-if="user">
                    <i class="fas fa-folder-minus"></i>
                  </div>
                  <div v-else>
                    <img class="avatar active-dropdown mr-1" src="@/assets/default.png">
                  </div>
                </div>
              </div>

              </div>
          </div>

          <div>
            
          </div>

          <div class="dropdown-menu" v-if="toggleDropdown">

            <div class="d-flex mt-1" @click="toggleDropdown = false">
              <i class="far fa-plus-square"></i>
              <router-link :to="{ name: 'CreateSpot'}">Add Spot</router-link>
            </div>

            <div class="d-flex" @click="toggleDropdown = false">
              <i class="far fa-user-circle"></i>
              <router-link :to="{ name: 'UserProfile', params: {id: user.uid}}">Profile</router-link>
            </div>

            <div class="d-flex" @click="toggleDropdown = false">
              <i class="far fa-edit"></i>
              <router-link :to="{ name: 'AddProfileInfo'}">Update Info</router-link>
            </div>


            <button @click="userLogout" class="btn">Logout</button>
          </div>

        </div>

      <div v-if="!user">
        <router-link :to="{ name: 'Signup'}"> <button class="btn"> Sign up </button></router-link>
        <router-link :to="{ name: 'Login'}"> <button class="btn"> Log in </button></router-link>
      </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import getUser from '@/composables/getUser'
  import getDocument from '@/composables/getDocument'
  import useLogout from '@/composables/useLogout'
  import {
    useRouter
  } from 'vue-router'
  import {
    ref
  } from 'vue'

  export default {
    setup() {
      const router = useRouter()
      const {
        logout
      } = useLogout()
      const { user } = "" || getUser()
      const { document: userInfo } = getDocument('users', user.uid) || getDocument('users', user.uid)
      const toggleDropdown = ref(false)



      const userLogout = async () => {
        await logout()
        console.log('user logged out');
        router.push({
          name: 'Login'
        })
      }

      return {
        userLogout,
        user,
        toggleDropdown,
        userInfo
      }
    }


  }
</script>

<style scoped>
  a.router-link-exact-active {
    border-radius: 5px;
  }

  .logo-link {
    background-color: transparent !important;
    padding: 0 !important;
  }

  .navbar {
    padding: 16px 10px;
    background: white;
    border-bottom: 1px solid var(--secondary);
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.1);

  }

  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  nav img {
    max-height: 60px;
  }

  nav h2 {
    margin-left: 10px;
  }

  nav .links {
    margin-left: auto;

    position: relative;
    right: 40px;
  }

  nav .links a,
  button {
    margin-left: 16px;
    font-size: 14px;

  }

  nav .links button {
    margin: 10px;

  }

  nav .topics a {
    margin-left: 25px;
  }

  nav .dropdown-menu {
    display: flex;
    padding: 0 30px;
    flex-direction: column;
    position: absolute;
    right: 5px;
    background-color: var(--secondary);
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.3);
  }

  nav .dropdown-menu div {
    padding: 10px 20px;
  }

  nav .dropdown-menu div:hover {
    background-color: rgba(128, 128, 128, 0.109);
  }

  


  
  .avatar {
    width: 25px;
  height: 25px;
  }


  .avatar-nav:hover {
    cursor: pointer;
    color: rgba(44, 44, 255, 0.26);
  }

  .active-dropdown {
    border: 1px solid var(--primary);
  }

  .btn {
    color: white;
  }
</style>