const mysql = require('mysql2/promise')
const config = require('../config')
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

async function query(sql, params){
    const connection = await mysql.createConnection(config.db)
    const [results, ] = await connection.execute(sql, params)

    return results
}

const firebaseConfig = {
    apiKey: "AIzaSyC0VCXNz_zISy1DcAVwvgcrwZO3D_0SPcc",
    authDomain: "hikingbuddyimagedb.firebaseapp.com",
    projectId: "hikingbuddyimagedb",
    storageBucket: "hikingbuddyimagedb.appspot.com",
    messagingSenderId: "121237455477",
    appId: "1:121237455477:web:cb6b4f7a24ae21c70e2e3c"
  };

const app = initializeApp(firebaseConfig);
export const imagedb = getStorage(app)

module.exports = {
    query, 
}
