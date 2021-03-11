
import { ref } from 'vue';
import getUser from '@/composables/getUser'
import {projectStorage} from  '../firebase/config';


// Logged in User information
const { user } = getUser()

const useStorage = () => {

    //Refs
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)


        //Upload an Image to Firebase Storage
        const uploadImage = async (file) => {
            filePath.value = `covers/${user.value.uid}/${file.name}`
            const storageRef = projectStorage.ref(filePath.value)

            try {
                const res = await storageRef.put(file)
                url.value = await res.ref.getDownloadURL()

            } catch (err) {
                console.log(err.message)
                error.value = err.message;
            }
        }

            // upload a profile picture
            const uploadProfilePicture = async (file) => {
            filePath.value = `avatar/${user.value.uid}/${file.name}`
            const storageRef = projectStorage.ref(filePath.value)

            try {
                const res = await storageRef.put(file)
                url.value = await res.ref.getDownloadURL()

            } catch (err) {
                console.log(err.message)
                error.value = err.message;
            }
        }

        //Delete an Image from Firebase Storage
        const deleteImage = async (path) => {
            const storageRef = projectStorage.ref(path)

            try {
              storageRef.delete()
            } catch (error) {
              console.log(err.message)
              error.value = err.message;      
            }
        }



    return {url, filePath, error, uploadImage, deleteImage, uploadProfilePicture}
}


export default useStorage

