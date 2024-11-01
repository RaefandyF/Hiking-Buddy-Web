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
            }, 
            {
                name: 'Thread_v2', 
                description: 'Thread v2 that used for group the Thread Route data'
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
            }, 
            '/api/v2/thread/get-all-thread': {
                get: {
                    tags: ['Thread_v2'], 
                    summary: 'get all threads data', 
                    description: 'route for get all thread data', 
                    responses: {
                        200: {
                            description: 'Data for get all threads',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: { // Use "items" to specify the type of objects in the array
                                            type: 'object',
                                            properties: {
                                                ThreadId: {
                                                    type: 'string',
                                                    description: 'Display ThreadId',
                                                    example: 'TE99999'
                                                },
                                                ThreadDescription: {
                                                    type: 'string',
                                                    description: 'Display the thread description data',
                                                    example: 'baguss asli banget !'
                                                },
                                                ThreadDateRelease: {
                                                    type: 'date', 
                                                    description: 'display thread date', 
                                                    example: '2024-12-01'
                                                }, 
                                                TotalLike: {
                                                    type: 'integer', 
                                                    description: 'display total like', 
                                                    example: '111'
                                                }, 
                                                TotalComment: {
                                                    type: 'integer', 
                                                    description: 'display total comment', 
                                                    example: '10'
                                                }, 
                                                TotalShare: {
                                                    type: 'integer',
                                                    description: 'display total share', 
                                                    example: '10'
                                                }, 
                                                UserFullName: {
                                                    type: 'string', 
                                                    description: 'display full name', 
                                                    example: 'Zaky Yusuf'
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
            '/api/v2/thread/add-new-thread': {
                post: {
                    tags: ['Thread_v2'], 
                    summary: 'add new thread data', 
                    description: 'add new thread data for thread page application', 
                    requestBody: {
                        required: true, 
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object', 
                                    properties: {
                                        UserId: {
                                            type: 'string', 
                                            description: 'id user', 
                                            example: 'US99999'
                                        }, 
                                        ThreadId: {
                                            type: 'string', 
                                            description: 'thread id', 
                                            example: 'TE99999'
                                        },
                                        TotalLike: {
                                            type: 'integer', 
                                            description: 'total like that use for display total like of thread', 
                                            example: '12'
                                        }, 
                                        TotalComment: {
                                            type: 'integer', 
                                            description: 'total comment that displayed for every thread', 
                                            example: '111'
                                        }, 
                                        TotalShare: {
                                            type: 'integer', 
                                            description: 'total share that getted for every thread', 
                                            example: 10
                                        }, 
                                        ThreadDescription: {
                                            type: 'string', 
                                            description: 'main content of the thread', 
                                            example: 'pemandangan sangat bagus'
                                        }, 
                                        ThreadDateRelease: {
                                            type: 'date', 
                                            description: 'thread date release', 
                                            example: '21 January 2024'
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