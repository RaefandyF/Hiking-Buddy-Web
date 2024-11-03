const { ref, uploadBytes } = require('firebase/storage')
const db = require('./db')
const { imagedb } = require('../services/firebaseDb')

// upload imahge community upload 
const uploadImageCommunity = async (data, file) => {

    let arr_index = ['jpg', 'jpeg', 'png']
    
    if(!file){
        return {
            "status": "failed", 
            "message": "not found image!"
        }
    }

    let dotPos = file.originalname.lastIndexOf('.')
    const ext = file.originalname.substring(dotPos + 1).toLowerCase()

    if(!arr_index.includes(ext)){
        return {
            "status": "success", 
            "message": "only jpeg, jpg, png only"
        }
    }

    const newImageName = `${data.UserId}.${ext}`

        const imageref = await ref(imagedb, `images/${newImageName}`)
        await uploadBytes(imageref, file.buffer)

        return {
            "status": "success", 
            "message": "your image has been inserted !", 
            "fileName": newImageName
        }

    // return {
    //     "status": "failed", 
    //     "message": "your format is not true ~"
    // }
}

module.exports = {
    uploadImageCommunity,
}