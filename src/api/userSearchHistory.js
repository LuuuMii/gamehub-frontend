import request from '@/utils/request'

export function insertUserSearchHistory(data) {
    return request.post('/user-search-history/insertUserSearchHistory',data)
}

export function getUserSearchHistory(userId) {
    return request.get(`/user-search-history/getUserSearchHistory/${userId}`)
}

export function deleteUserSearchHistory(data) {
    return request.post('/user-search-history/deleteUserSearchHistory',data)
}

export function deleteAllHistory(userId) {
    return request.post(`/user-search-history/deleteAllHistory/${userId}`)
}