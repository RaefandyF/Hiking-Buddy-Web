const db = require('./db')

// add new community 
const addNewCommunity = async(newcom) => {
    const result = await db.query(`
        INSERT INTO Community 
        VALUES 
        ('${newcom.Communityid}', '${newcom.Communityname}','${newcom.CommunityDateRelease}', '${newcom.Communitydesc}')
    `)

    if(result.affectedRows == 0){
        return {
            "status": "error", 
            "message": "data cannot be inserted !"
        }
    }

    return {
        "status": "success", 
        "message": "data inserted !"
    }
}


// add create community connect 
const addNewCommunityConnect = async (newcc) => {
    const result = db.query(`
        INSERT INTO CreateCommunityConnect 
        VALUES ('${newcc.Userid}', '${newcc.Communityid}')
    `)

    if(result.affectedRows == 0){
        return {
            "status": "error", 
            "message": "data cannot be inserted !"
        }
    }

    return {
        "status": "success", 
        "message": "data create community connect inserted !"
    }
}

// get all community 
const getAllCommunity = async () => {
    const result = await db.query(`
        SELECT * FROM Community
    `)

    return {
        "status": "success", 
        "data": result
    }
}

// get detail community 
const getCommunityById = async(id) => {
    const result = await db.query(`
        SELECT * FROM Community 
        WHERE Communityid = '${id}'
    `)

    return {
        "status": "success", 
        "data": result
    }
}

// get comment community 
const getCommentCommunity = async(communityid) => {
    const result = await db.query(`
        select * from Comment
        JOIN CommunityCommentConnect ccc
        ON Comment.Commentid = ccc.Commentid
        JOIN Community com 
        ON ccc.Communityid = com.Communityid
        JOIN 
        Users us 
        ON us.Userid = Comment.Userid
        WHERE com.Communityid = '${communityid}'
    `)

    return {
        "status": "success", 
        "data": result
    }
}

// get comment reply data 
const getReplyComment = async (commentid, communityid) => {
    const result = await db.query(`
    SELECT * 
    FROM Comment com 
    JOIN 
    ReplyComment rc 
    ON com.Commentid = rc.Commentid
    JOIN 
    Users us ON us.Userid = rc.Userid
    JOIN CommunityCommentConnect ccc 
    ON ccc.Commentid = com.Commentid
    WHERE rc.Commentid = '${commentid}'
    AND ccc.Communityid = '${communityid}'
    `)

    return {
        "status": "success", 
        "data": result 
    }
}

module.exports = {
    addNewCommunity, 
    addNewCommunityConnect, 
    getAllCommunity,
    getCommunityById,
    getCommentCommunity, 
    getReplyComment
}