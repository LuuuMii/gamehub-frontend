import request from '@/utils/request'

export function syncLikeRecord(userId,targetId,targetType,data) {
    return request.post("/user-like-record/syncLikeRecord",data,{
        params:{
            userId:userId,
            targetId:targetId,
            targetType:targetType
        }
    })
}

export function insertUserLikeRecord(userId,targetId,targetType,data) {
    return request.post("/user-like-record/insertUserLikeRecord",data,{
        params:{
            userId:userId,
            targetId:targetId,
            targetType:targetType
        }
    })
}

export function getUserLikeRecord(userId,targetId,targetType) {
    return request.get(`/user-like-record/getUserLikeRecord/${userId}/${targetId}/${targetType}`)
}