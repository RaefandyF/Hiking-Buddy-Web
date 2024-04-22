const db = require('./db')

// add new category
const addNewCategory = async (data) => {
    const result = await db.query(`
        INSERT INTO ArticleCategory VALUES 
        ('${data.Categoryid}', '${data.Categoryname}')
    `)

    if(result.affectedRows == 0){
        return {
            "status": "error", 
            "message": "data cannot added !"
        }
    }

    return {
        "status": "success", 
        "message": "data has inserted !", 
    }
}

// add new article with article category connect 
const addNewArticlecategoryConnect = async (data) => {
    const result = await db.query(`
        INSERT INTO ArticlecategoryConnect VALUES ('${data.Categoryid}', '${data.Articleid}')
    `)

    if(result.affectedRows == 0){
        return {
            "status": "error", 
            "message": "error in insert data !"
        }
    }

    return {
        "status":"success", 
        "message": "data inserted !"
    }
}

module.exports = {
    addNewCategory, 
    addNewArticlecategoryConnect
}