const { ref, uploadBytes } = require('firebase/storage')
const db = require('./db')
const { imagedb } = require('./firebaseDb')

// upload imahge community upload 
const uploadImageCommunity = async (data) => {

    let arr_index = ['jpg', 'jpeg', 'png']

    let dotPos = data.imageName.indexOf('.')
    console.log(data.imageName)
    // if(arr_index.includes(data.imageName.substring(dotPos+1))){
        const imageref = await ref(imagedb, `images/`)
        uploadBytes(imageref, data.image)

        return {
            "status": "success", 
            "message": "your image has been inserted !"
        }
    // }

    // return {
    //     "status": "failed", 
    //     "message": "your format is not true ~"
    // }
}

module.exports = {
    uploadImageCommunity,
}