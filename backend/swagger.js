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
            },
            {
                name: 'Article_v2', 
                description: 'Article v2 that used for group article route data'
            }, 
            {
                name: 'Ticket_v2', 
                description: 'Ticket v2 that used for route group ticket data'
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
            '/api/v2/users/register': {
                post: {
                    tags: ['Customer_v2'], 
                    summary: 'register new user', 
                    description: 'register new user data', 
                    requestBody: {
                        required: true, 
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object', 
                                    properties: {
                                        UserFullname: {
                                            type: 'string', 
                                            description: 'user fullname data', 
                                            example: 'Pedri'
                                        }, 
                                        UserEmail: {
                                            type: 'string', 
                                            description: 'user email data', 
                                            example: 'pedri123@gmail.com'
                                        }, 
                                        UserPhone: {
                                            type: 'string', 
                                            description: 'user phone data', 
                                            example: '082143121'
                                        }, 
                                        UserRole: {
                                            type: 'string', 
                                            description: 'user role data', 
                                            example: 'Member'
                                        }, 
                                        UserPassword: {
                                            type: 'string', 
                                            description: 'user password data', 
                                            example: 'francis123'
                                        }, 
                                        UserConfirmPassword: {
                                            type: 'string', 
                                            description: 'user password confirm data', 
                                            example: 'francis123'
                                        }, 
                                        Username: {
                                            type: 'string', 
                                            description: 'username data', 
                                            example: 'francis_1'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v2/threads/get-all-thread': {
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
                                                    description: 'Unique identifier for the thread',
                                                    example: '03266c91-6d77-4fd2-b9b2-cca2697389c8'
                                                },
                                                ThreadDescription: {
                                                    type: 'string',
                                                    description: 'Description of the thread',
                                                    example: 'testes'
                                                },
                                                ThreadDateRelease: {
                                                    type: 'string', 
                                                    format: 'date-time',
                                                    description: 'The release date of the thread in ISO format', 
                                                    example: '2022-12-31T17:00:00.000Z'
                                                }, 
                                                TotalLike: {
                                                    type: 'integer', 
                                                    description: 'Total number of likes on the thread', 
                                                    example: 0
                                                }, 
                                                TotalComment: {
                                                    type: 'integer', 
                                                    description: 'Total number of comments on the thread', 
                                                    example: 0
                                                }, 
                                                TotalShare: {
                                                    type: 'integer',
                                                    description: 'Total number of shares on the thread', 
                                                    example: 0
                                                }, 
                                                Username: {
                                                    type: 'string', 
                                                    description: 'Username of the thread creator', 
                                                    example: 'francis'
                                                },
                                                imageUrl: {
                                                    type: 'string',
                                                    description: 'URL of the image associated with the thread',
                                                    example: 'https://storage.googleapis.com/hikingbuddyimagedb.appspot.com/images/03266c91-6d77-4fd2-b9b2-cca2697389c8?GoogleAccessId=firebase-adminsdk-7z4lj%40hikingbuddyimagedb.iam.gserviceaccount.com&Expires=16730989200&Signature=q5rJgOEpUQ50qy4bO6rFWVhMvAPxY6JdY43pKR6r42T55fYTMmz2VOlFxsEnQ5pTzDP3zDEDrGasqu%2FTc5R%2BTyYriIw4vbw8fvU73fzYEKhvyIF%2FH3vo7sTys48j1hsL6JYlstCnB0qnRARoOL0yNZsyLH%2FA1ztk4e6IA9DCLW1Y0R9wkAyBHpVRz7E%2FC9GukPlvFN3w93q4%2FYIqs263NBLTJyUhfEgqutmchylDjOvLJUzT7glvLBXr6ao5pcMkvOGo7axQPazjufkC6VAozjdA6OYpZcjitrquUbuTZeuk%2BLFQvWtdAPpfidxqEJ9G38AdVX6A%2FXs%2B3NuPjS5uwQ%3D%3D'
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
            'api/v2/threads/get-total-like?threadId=[threadId]': {
                get: {
                    tags: ['Thread_v2'], 
                    summary: 'get total like of thread', 
                    description: 'get total thread likes', 
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            in: 'query', 
                            name: 'threadId', 
                            schema:{
                                type: 'string'
                            }, 
                            required: true
                        }
                    ], 
                    responses: {
                        200: {
                            description: 'succesful get all like', 
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object', 
                                        properties: {
                                            TotalLike: {
                                                type: 'integer', 
                                                description: 'total like of thread'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v2/threads/get-total-comment?threadId=[ThreadId]':{
                get: {
                    tags: ['Thread_v2'], 
                    summary: 'get total comment thread', 
                    description: 'get total comment thread data', 
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            in: 'query', 
                            name: 'threadId', 
                            schema:{
                                type: 'string'
                            }, 
                            required: true
                        }
                    ], 
                    responses: {
                        200: {
                            description: 'succesful get all like', 
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object', 
                                        properties: {
                                            TotalComment: {
                                                type: 'integer', 
                                                description: 'total comment of thread'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v2/threads/get-total-share?threadId=[ThreadId]':{
                get: {
                    tags: ['Thread_v2'], 
                    summary: 'get thread total comment', 
                    description: 'get thread total comment from ThreadPostHeader', 
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            in: 'query', 
                            name: 'threadId', 
                            schema:{
                                type: 'string'
                            }, 
                            required: true
                        }
                    ], 
                    responses: {
                        200: {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object', 
                                        properties: {
                                            TotalShare: {
                                                type: 'integer', 
                                                description: 'total share of thread'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/v2/threads/add-new-thread": {
                        "post": {
                        "tags": ["Thread_v2"], 
                        "summary": "Add new thread with image",
                        "consumes": [
                            "multipart/form-data"
                        ],
                        "parameters": [
                            {
                            "name": "imageName",
                            "in": "formData",
                            "description": "The image file to upload",
                            "required": true,
                            "type": "file"
                            },
                            {
                            "name": "UserId",
                            "in": "formData",
                            "description": "The ID of the user",
                            "required": true,
                            "type": "string",
                            "format": "uuid"
                            },
                            {
                            "name": "ThreadDescription",
                            "in": "formData",
                            "description": "Description of the thread",
                            "required": true,
                            "type": "string"
                            },
                            {
                            "name": "ThreadDateRelease",
                            "in": "formData",
                            "description": "Release date of the thread",
                            "required": true,
                            "type": "string",
                            "format": "date"
                            }
                        ],
                        "responses": {
                            "200": {
                            "description": "Successful upload and thread creation",
                            "schema": {
                                "type": "object",
                                "properties": {
                                "status": {
                                    "type": "string"
                                },
                                "message": {
                                    "type": "string"
                                },
                                "imageUrl": {
                                    "type": "string"
                                }
                                }
                            }
                            },
                            "400": {
                            "description": "Bad request, validation error"
                            },
                            "500": {
                            "description": "Server error"
                            }
                        }
                        }
                    },
            '/api/v2/threads/add-like-thread': {
                post: {
                    tags: ['Thread_v2'], 
                    summary: 'add thread like', 
                    description: 'add thread like in thread page', 
                    requestBody: {
                        required: true, 
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object', 
                                    properties: {
                                        ThreadId: {
                                            type: 'string', 
                                            description: 'thread id',
                                            example: 'TE99999'
                                        },
                                        UserId: {
                                            type: 'string', 
                                            description: 'image upload data',
                                             example: 'US99999'
                                        }
                                    }, 
                                    required: ['ThreadId', 'UserId']
                                }
                            }
                        }
                    }, 
                    responses: {
                        200: {
                            description: 'Likr uploaded successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'status',
                                                example: 'success',
                                            },
                                            message: {
                                                type: 'string', 
                                                description: 'message', 
                                                example: 'You have successful give like !'
                                            }
                                        },
                                    },
                                },
                            },
                        }, 
                        400:  {
                            description: 'Bad Request - Invalid file or file type',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Invalid file type. Only images are allowed.',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    }
                }
            }, 
            '/api/v2/threads/add-thread-comment': {
                post: {
                    tags: ['Thread_v2'], 
                    summary: 'add thread comment', 
                    description: 'add thread comment in thread page', 
                    requestBody: {
                        required: true, 
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object', 
                                    properties: {
                                        ThreadId: {
                                            type: 'string', 
                                            description: 'thread id',
                                            example: 'TE99999'
                                        },
                                        UserId: {
                                            type: 'string', 
                                            description: 'image upload data',
                                             example: 'US99999'
                                        }, 
                                        CommentData: {
                                            type: 'string', 
                                            description: 'add comment data',
                                            example: 'halooo haloo haii'
                                        }
                                    }, 
                                    required: ['ThreadId', 'UserId', 'CommentData']
                                }
                            }
                        }
                    }, 
                    responses: {
                        200: {
                            description: 'comment insert successful',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'status',
                                                example: 'success',
                                            },
                                            message: {
                                                type: 'string', 
                                                description: 'message',
                                                example: 'success give comment data !'
                                            }
                                        },
                                    },
                                },
                            },
                        }, 
                    }
                }
            },
            '/api/v2/articles/get-all-article': {
                get: {
                    tags: ['Article_v2'],
                    summary: 'Get all article data',
                    description: 'Get all article data from database',
                    responses: {
                        200: {
                            description: 'Data for get article successful',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: { // Use "items" to specify the type of objects in the array
                                            type: 'object',
                                            properties: {
                                                ArticleId: {
                                                    type: 'string',
                                                    description: 'Display ArticleId',
                                                    example: 'AR99999'
                                                },
                                                ArticleTitle: {
                                                    type: 'string',
                                                    description: 'Display the article title data',
                                                    example: 'Gunung rinjani sebagai pesona alam indonesia'
                                                }, 
                                                ArticleData: {
                                                    type: 'string', 
                                                    description: 'Display the description of the data', 
                                                    example: 'engaku pecinta alam dan penikmat gunung? Belum lengkap rasanya jika belum merasakan sensasi mendaki di gunung yang terkenal sangat cantik akan pesona alamnya ini. Gunung Rinjani terletak di utara Pulau Lombok, Nusa Tenggara Barat, dan merupakan gunung berapi kedua tertinggi di Indonesia dengan ketinggian 3.726 mdpl.'
                                                }, 
                                                ArticleDateRelease: {
                                                    type: 'date', 
                                                    description: 'display date of the data', 
                                                    example: '2024-01-30'
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
            '/api/v2/tickets/get-list-ticket': {
                get: {
                    tags: ['']
                }
            }
        }
    }, 
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
module.exports = swaggerDocs