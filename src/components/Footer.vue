<template>
    <footer>
        <div class="content footer-container mt-8">
            <div class="footer-top mb-4">
                <h2 class="mr-2">Seek with <span class="secondary">us.</span> </h2>
                <router-link class="btn-orange" :to="{ name: 'Signup'}"> Sign up </router-link>>
            </div>

            <div class="footer-sections">
                <div>
                    <h4>Your Account</h4>
                    <p>Log in</p>
                    <p>Sign up</p>
                </div>
                <div>
                    <h4>Legal</h4>
                    <p>Impressum</p>
                    <p>Cookies</p>
                </div>
                <div>
                    <h4>Thrillseeker</h4>
                    <p>Spots</p>
                    <p>Events</p>
                    <p>Community</p>
                </div>
            </div>

            <h4 class="mt-5 mb-1">Social</h4>
            <div class="social-media">
                <a class="icon" href="#"><i class="fab fa-instagram"></i></a>
                <a class="icon" href="#"><i class="fab fa-facebook"></i></a>
                <a class="icon" href="#"><i class="fab fa-youtube"></i></a>
             </div>


             <div class="legal mt-6">
                <h4 class="mr-3">© 2020 Thrillseeker</h4> 
                <router-link :to="{ name: 'Signup'}">Terms of service</router-link>
                <router-link :to="{ name: 'Signup'}">Impressum </router-link>
                <router-link :to="{ name: 'Signup'}">Cookies Policy</router-link>
             </div>
            </div>
    </footer>
</template>

<script>
    import getUser from '../composables/getUser'
    export default {


        setup() {
            const {
                user
            } = getUser()



            return {
                user
            }
        }
    }
</script>

<style scoped>
    footer {
        background: var(--primary);
        
    }

    .footer-container {
        padding: 60px 0;
    }


    .footer-container h2, h3, p, h4{
        color: white !important;
        
    }

    .footer-top {
        display: flex;
        align-items: center;
    }

    .footer-sections {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
    }

    .footer-sections p {
        padding-top: 40px;
    }

    .social-media, .legal {
        display: flex;
        flex-direction: row;
    }

    .icon > i {
        color: white !important;
        padding-right: 15px;
    }

    .legal a {
       padding-right: 50px; 
       color: white
    }

     @media only screen and (max-width: 1200px) {
    footer {
      padding: 40px;
    }
}
</style>