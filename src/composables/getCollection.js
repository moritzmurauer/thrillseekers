import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';


const getCollection = (collection, query) => {

    const documents = ref(null)
    const error = ref(null)


    // Saving selected Collection and querying through it
    let collectionRef = projectFirestore.collection(collection)

    if(query) {
        collectionRef = collectionRef.where(...query)
    }
 
  // Creating Realtime Eventlistener to track changes but also unsubing it after action save costs and optimize performance
  const unsub = collectionRef.onSnapshot((snap) => {
        console.log('snapshot');
        let results = []
        snap.docs.forEach(doc => {

            //must wait for the server to create timestamp and send it back
            results.push({...doc.data(), id: doc.id})
        })

        //update values
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch data'
    })

    watchEffect((onInvalidate) => {
        //unsub from prev collection
        onInvalidate(() => unsub())
    })

    return {documents, error}
}


export default getCollection