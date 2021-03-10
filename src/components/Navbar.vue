<template>
<div class="navigation">
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
                    <i class="fas fa-th-large"></i>
                  </div>
                  <div v-else>
                    <img class="avatar mr-1" src="@/assets/default.png">
                  </div>
                </div>
              </div>

               <div v-if="toggleDropdown" @click="toggleDropdown = false">
                <div v-if="user" class="avatar-nav">
                  <div v-if="user">
                   <i class="fas fa-th-large"></i>
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

      
      </div>

      <!-- Mobile------------->

      <div class="mobile-links">
        <div>
          <div class="d-flex align-items-center">
            <div v-if="!user">
                <router-link :to="{ name: 'Signup'}"> <button class="btn"> Sign up </button></router-link>
                <router-link :to="{ name: 'Login'}"> <button class="btn"> Log in </button></router-link>
              </div>
            <div class="pr-1">
              <button v-if="user" @click="userLogout" class="btn">Logout</button>
            </div>
            <div>
              <div v-if="!toggleDropdown" @click="toggleDropdown = true">
                <i class="fas fa-list"></i>
              </div>

               <div v-if="toggleDropdown" @click="toggleDropdown = false">
                <div v-if="user" class="avatar-nav">
                  <div v-if="user">
                   <i class="fas fa-list"></i>
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
              <router-link :to="{ name: 'Posts'}">Posts</router-link>
            </div>

            <div class="d-flex" @click="toggleDropdown = false">
               <router-link :to="{ name: 'Contributors'}">Community</router-link>
            </div>

            <div class="d-flex" @click="toggleDropdown = false">
              <router-link :to="{ name: 'Topspots'}">Topspots</router-link>
            </div>


            
          </div>

        </div>

      
      </div>

      <div class="login-signin" v-if="!user">
                <router-link :to="{ name: 'Signup'}"> <button class="btn"> Sign up </button></router-link>
                <router-link :to="{ name: 'Login'}"> <button class="btn"> Log in </button></router-link>
      </div>


    </nav>
  </div>


  

  <div v-if="user" class="mobile-nav">
    <router-link class="white" :to="{ name: 'AddProfileInfo'}">
     <div class="link">
      <i class="far fa-edit white"></i>
      <p class="white">Edit</p>
    </div>
  </router-link>

<router-link class="white" :to="{ name: 'CreateSpot'}">
    <div class="link">
      <i class="far fa-plus-square white"></i>
      <p class="white">Add</p>
    </div>
  </router-link>

    <router-link class="white" :to="{ name: 'UserProfile', params: {id: user.uid}}">
    <div class="link">
      <i class="far fa-user-circle white"></i>
      <p class="white">Profile</p>
    </div>
    </router-link>
  </div>
  <div v-else>
    
  </div>
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

  .mobile-icon {
    border: 1px solid white;
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
    right: 0px;
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
    top: 30px;
    z-index: 1000;
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

  .navigation {
    position: relative;
  }

  .mobile-nav {
    display: none;
  }

  .mobile-links {
    display: none;
  }

  @media only screen and (max-width: 800px) {
    .topics {
      display: none;
    }

    .links {
    display: none;
  }

  .login-signin {
    display: none;
  }

  .mobile-links {
    display: block;
    margin-left: auto;
    position: relative;
    right: 20px;
  }

  nav .mobile-links a,
  button {
    margin-left: 16px;
    font-size: 14px;
  }

    .mobile-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 92vh;
      background: var(--primary);
      width: 100%;
      padding: 35px 0px;
      z-index: 100000;
    }

    .link {
      margin: 0 60px;
      display: flex;
      justify-content: center;
      align-items: center;

    }

    .link .far {
      margin-right: 5px;
    }

    nav .dropdown-menu {
      margin: auto;
      padding: 0;
      top: 50px;
      right: -14px;
      height: 80vh;
    }

} 


@media only screen and (max-width: 600px) {
   .mobile-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 92vh;
      background: var(--primary);
      width: 100%;
      padding: 13px 0px;
      border-top: 1px solid rgba(255, 215, 215, 0.09);
      z-index: 100000;
    }

    nav .mobile-links a,
    button {
    margin-left: 4px;
    font-size: 14px;
    padding: 10px;
  }

    .link {
      margin: 0 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid white;
      padding: 8px;
      border-radius: 4px;
    }

} 
</style>