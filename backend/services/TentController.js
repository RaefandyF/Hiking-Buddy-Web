const db = require('./db')

// add new tent 
const addNewTent = async (data) => {
    const result = db.query(`
        INSERT INTO Tent 
        VALUES 
        ('${data.Tentid}', '${data.Tentname}', ${data.Tentcapacity}, ${data.isCarpet}, 
        '${data.CategoryRentid}')
    `)

    if(result.affectedRows == 0){
        return {
            "status": "error", 
            "message": "data cannot inserted"
        }
    }

    return {
        "status": "success", 
        "message": "data success inserted"
    }
}

// add new category rent 
const addNewCategoryTent = async (data) => {
    const result = db.query(`
        INSERT INTO CategoryRent 
        VALUES 
        ('${data.CategoryRentid}', '${data.CategoryRentName}')
    `)

    if(result.affectedRows == 0){
        return {
            "status": "error", 
            "message": "data cannot be inserted !"
        }
    }

    return {
        "status": "success", 
        "message": "data success inserted !"
    }
}

module.exports = {
    addNewTent, 
    addNewCategoryTent
}