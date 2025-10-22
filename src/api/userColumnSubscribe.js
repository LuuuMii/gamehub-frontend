import request from '@/utils/request'

export function getSubscribeDetail(userId,columnId){
    return request.get(`/user-column-subscribe/getSubscribeDetail/${userId}/${columnId}`)
}

export function subscribeColumn(data){
    return request.post('/user-column-subscribe/subscribeColumn',data)
}

export function unsubscribeColumn(data){
    return request.post('/user-column-subscribe/unsubscribeColumn',data)
}