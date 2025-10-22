import request from '@/utils/request'

export function syncCollectionRecords(userId,targetId,targetType,data) {
    return request.post("/user-collection-record/syncCollectionRecords",data,{
        params:{
            userId:userId,
            targetId:targetId,
            targetType:targetType
        }
    })
}