import request from '@/utils/request'

export function loginByUsername(data){
    return request.post('/users/loginByUsername',data)
}

export function getUserInfoById(userId){
    return request.get(`/users/getUserInfoById/${userId}`)
}

export function getUserInfoByUsername(username){
    return request.get(`/users/getUserInfoByUsername/${username}`)
}

export function getUserInfoByToken(token){
    return request.get('/users/getUserInfoByToken',{
        params:{token}
    })
}

export function getAuthorDataForArticlePage(username){
    return request.get(`/users/getAuthorDataForArticlePage/${username}`)
}

