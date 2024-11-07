// import { initializeApp } from "firebase/app";
const firebase = require("firebase/app");
const storage = require("firebase/storage");
const admin = require("firebase-admin");
const serviceAccount = require("../hikingbuddyimagedb-firebase-adminsdk-7z4lj-fbb4c5889a.json");
// import {getStorage} from "firebase/storage"

// const firebaseConfig = {
//     apiKey: "AIzaSyC0VCXNz_zISy1DcAVwvgcrwZO3D_0SPcc",
//     authDomain: "hikingbuddyimagedb.firebaseapp.com",
//     projectId: "hikingbuddyimagedb",
//     storageBucket: "hikingbuddyimagedb.appspot.com",
//     messagingSenderId: "121237455477",
//     appId: "1:121237455477:web:cb6b4f7a24ae21c70e2e3c"
//   };

// const app = firebase.initializeApp(firebaseConfig);
// const imagedb = storage.getStorage(app)

// firebas admin config
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "hikingbuddyimagedb.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
