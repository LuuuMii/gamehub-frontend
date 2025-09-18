import request from '@/utils/request'

export function loginByUsername(data){
    return request.post('/users/loginByUsername',data)
}

export function getUserInfoById(userId){
    return request.get(`/users/getUserInfoById/${userId}`)
}

export function getUserInfoByToken(token){
    return request.get('/users/getUserInfoByToken',{
        params:{token}
    })
}

