const db = require('./db')

// add new article 
const addNewArticle = async (data) => {
    const result = await db.query(`
        INSERT INTO Article VALUES ('${data.Articleid}', '${data.Articletext}', '${data.Articlebrief}', '${data.Articletitle}')
    `)
    console.log(result)
    if(result.affectedRows == 0){
        return {
            "status": "error", 
            "message": "data article cannot added !"
        }
    }

    return {
        "status": "success",
        "message": "article inserted !"
    }
}

// add Article author 
const addArticleAuthor = async (data) => {
    const result = await db.query(`
        INSERT INTO ArticleAuthor VALUES ('${data.Articleid}', '${data.Userid}')
    `)

    if(result.affectedRows == 0){
        return {
            "status": "error",
            "message": "cannot add to database !"
        }
    }

    return {
        "status": "success", 
        "message": "data inserted !"
    }
}

// get top article data 
const GetTopArticle = async () => {
    const articles = await db.query(`
    SELECT * 
    FROM Article ar 
    JOIN ArticleAuthor aa 
    ON ar.Articleid = aa.Articleid
    JOIN Users us 
    ON us.Userid = aa.Userid
    LIMIT 6
    `)

    return {
        "status": "success", 
        "article": articles
    }
}

// get detail article id 
const getDetailArticle = async (id) => {
    const articleDet = await db.query(`
    SELECT * 
    FROM Article ar 
    JOIN ArticleAuthor aa 
    ON ar.Articleid = aa.Articleid
    JOIN Users us 
    ON us.Userid = aa.Userid
    WHERE ar.Articleid = '${id}'
    `)

    return {
        "status": "success", 
        "article": articleDet
    }
}

module.exports = {
    addNewArticle, 
    addArticleAuthor,
    GetTopArticle, 
    getDetailArticle
}