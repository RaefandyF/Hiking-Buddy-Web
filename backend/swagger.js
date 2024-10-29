const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        openapi: "3.0.0", 
        info: {
            title: "API documentation", 
            version: "1.0.0", 
            description: "API docs Hiking Buddy"
        }, 
        tags: [
            {
                name: 'Community', 
                description: 'Community group of route Api'
            }, 
            {
                name: 'Article', 
                description: 'Article group of route API'
            }
        ], 
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    }, 
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
module.exports = swaggerDocs