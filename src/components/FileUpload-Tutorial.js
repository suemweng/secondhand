import {useState} from "react";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebaseConfig.js";

// Tutorial: https://www.makeuseof.com/upload-files-to-firebase-using-reactjs/
 
function FileUpload() {
    // State to store uploaded file
    const [file, setFile] = useState("");

    // progress
    const [percent, setPercent] = useState(0);
 
    // Handles input change event and updates state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload() {
        if (!file) {
            alert("Please choose a file first!")
        }

        //A storage reference acts as a pointer to the file in the Cloud you want to operate on.
        //Import ref from the Firebase storage instance and pass in the storage service and file path as an argument.
        const storageRef = ref(storage, `/files/${file.name}`)
        
        // create an upload task by passing the Firebase storage instance to the uploadBytesResumable() function. 
        // There are several methods you can use, but this particular one allows you to pause and resume an upload. It also exposes progress updates.
        // The uploadBytesResumable() function accepts the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        // To monitor the progress and handle errors as the file uploads, listen for state changes, errors, and completion.
        // The state_changed event has three callback functions:
        // In the first function, you're keeping track of the upload progress and uploading the progress state.
        // In the second callback function, handle an error if the upload is unsuccessful.
        // The final function runs once the upload is complete, and gets the download URL, then displays it on the console. 
        // In a real-life application, you could save it in a database.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
     
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        ); 
    }
 
    return (
        <div>
            <input type="file" onChange={handleChange} accept="" />
            <button onClick={handleUpload}>Upload to Firebase</button>
            <p>{percent} "% done"</p>
        </div>
    )
}
 
