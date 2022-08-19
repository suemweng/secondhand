import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyDYOEF2k60WlqUT-mc9rsuQgnqTjDOiMQ8",
    authDomain: "secondhand-upload.firebaseapp.com",
    projectId: "secondhand-upload",
    storageBucket: "secondhand-upload.appspot.com",
    messagingSenderId: "471043950795",
    appId: "1:471043950795:web:1c34614ccb02ef9113734e"
    //measurementId: <measurementId>,
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;