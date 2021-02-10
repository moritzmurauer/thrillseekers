import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

// refs & signup outside of exported function
// they don't need to be re-created every time we invoke useSignup
const error = ref(null);
const isPending = ref(false)

// logout function
const logout = async () => {
    error.value = null
    isPending.value = true
    try {
        await projectAuth.signOut()
        isPending.value = true
    } catch (error) {
        console.log(err.message)
        error.value = err.message;
        isPending.value = false
    }
}


const useLogout =  () => {
    return { logout, error, isPending }
}


export default useLogout