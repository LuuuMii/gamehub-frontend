import request from '@/utils/request'

export function syncUnlikeRecord(userId,targetId,targetType,data) {
    return request.post("/user-unlike-record/syncUnlikeRecord",data,{
        params:{
            userId:userId,
            targetId:targetId,
            targetType:targetType
        }
    })
}

export function getUserUnlikeRecord(userId,targetId,targetType) {
    return request.get(`/user-unlike-record/getUserUnlikeRecord/${userId}/${targetId}/${targetType}`)
}