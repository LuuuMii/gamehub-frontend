import request from '@/utils/request'

export function getUserCollectionFoldersByUserId(userId) {
    return request.get(`/user-collection-folder/getUserCollectionFoldersByUserId/${userId}`)
}

export function getUserCollectionFoldersByUserIdForTarget(userId,targetId,targetType) {
    return request.get(`/user-collection-folder/getUserCollectionFoldersByUserIdForTarget/${userId}`,{
        params:{
            targetId:targetId,
            targetType:targetType
        }
    })
}

export function addUserCollectionFolder(data) {
    return request.post('/user-collection-folder/addUserCollectionFolder',data)
}


