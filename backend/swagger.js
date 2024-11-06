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
            '/api/v2/threads/add-new-thread': {
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
            '/api/v2/threads/upload-img-thread': {
                post: {
                    tags: ['Thread_v2'], 
                    summary: 'add new thread image', 
                    description: 'add new thread image to firestore', 
                    requestBody: {
                        required: true, 
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object', 
                                    properties: {
                                        UserId: {
                                            type: 'string', 
                                            description: 'user id',
                                            example: 'US99999'
                                        },
                                        imageName: {
                                            type: 'string', 
                                            format: 'binary', 
                                            description: 'image upload data'
                                        }
                                    }, 
                                    required: ['imageName']
                                }
                            }
                        }
                    }, 
                    responses: {
                        200: {
                            description: 'Image uploaded successfully, with URL returned',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            imageUrl: {
                                                type: 'string',
                                                description: 'URL of the uploaded image',
                                                example: 'https://firebasestorage.googleapis.com/v0/b/example.appspot.com/o/image.jpg?alt=media',
                                            },
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
            }
        }
    }, 
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
module.exports = swaggerDocs