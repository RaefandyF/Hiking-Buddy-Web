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
            },
            {
                name: 'Customer', 
                description: 'Customer group of route API'
            }, 
            {
                name: 'Customer_v2', 
                description: 'Customer v2 that used for group the Customer Route Data'
            }
        ], 
        servers: [
            {
                url: "http://localhost:8080"
            }
        ], 
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Optional, for JWT tokens
                    description: 'Enter your Bearer token in the format `Bearer <token>`.',
                },
            },
        },
        paths: {
                '/api/v2/users/get-current-login': {
                    get: {
                        tags: ['Customer_v2'],
                        summary: 'Get current user login data',
                        description: 'Get the current user login data',
                        security: [
                            {
                                bearerAuth: [],
                            },
                        ],
                        responses: {
                            200: {
                                description: 'Data for the current logged-in user',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'array',
                                            items: { // Use "items" to specify the type of objects in the array
                                                type: 'object',
                                                properties: {
                                                    UserId: {
                                                        type: 'string',
                                                        description: 'Display UserId',
                                                        example: 'US99999'
                                                    },
                                                    UserEmail: {
                                                        type: 'string',
                                                        description: 'Display the email data',
                                                        example: 'budi@gmail.com'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, 
            '/api/v2/users/login': {
                post: {
                    tags: ['Customer_v2'], 
                    summary: 'login the data', 
                    description: 'login the data to HikingBuddy', 
                    requestBody: {
                        required: true, 
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object', 
                                    properties: {
                                        email: {
                                            type: 'string', 
                                            description: 'email user data', 
                                            example: 'budi@gmail.com'
                                        },
                                        password: {
                                            type: 'string', 
                                            description: 'password user data', 
                                            example: 'budi111'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, 
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
module.exports = swaggerDocs