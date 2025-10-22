import request from '@/utils/request'

export function syncUserFollowRecord(data) {
    return request.post("/user-follow-record/syncUserFollowRecord",data)
}

export function getUserFollowRecord(followerId,followeeId) {
    return request.get(`/user-follow-record/getUserFollowRecord/${followerId}/${followeeId}`)
}
