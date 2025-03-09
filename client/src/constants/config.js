
export const API_NOTIFICATION_MSG = {
    loading : {
        title: 'Loading...',
        message: 'Data is being loaded, please wait'
    },
    success : {
        title: 'Success',
        message: 'Data successfully loaded'
    },
    requestFailure : {
        title: 'Error',
        message: 'Error while parsing the data'
    },
    responseFailure : {
        title: 'Error',
        message: 'An error occured while fetching the response from server, please try again'
    },
    networkError : {
        title: 'Error',
        message: 'Unable to connect with the server. Please check internet connectivity and try again later'
    }
}

//API service call

export const SERVICE_URL= {
    userSignup : { url: '/signup' , method: 'POST'},
    userLogin : { url: '/login' , method: 'POST'},
    getAllPosts: { url: '/posts', method: 'GET', params: true },
    uploadFile: { url: '/file/upload', method: 'POST' },
    createPost: { url: '/create', method: 'POST' },
    getPostById: { url: 'post', method: 'GET', query: true },
    updatePost: { url: 'update', method: 'PUT', query: true },
    deletePost: { url: 'delete', method: 'DELETE', query: true },
    newComment: { url: '/comment/new', method: 'POST' },
    getAllComments: { url: '/comments', method: 'GET', query: true },
    deleteComment: { url: '/comment/delete', method: 'DELETE', query: true },
}