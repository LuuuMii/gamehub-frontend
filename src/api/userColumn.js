import request from '@/utils/request'

export function getAllUserColumnsByUsername(username) {
    return request.get(`/user-column/getAllUserColumnsByUsername/${username}`)
}

export function getColumnByArticleId(articleId) {
    return request.get(`/user-column/getColumnByArticleId/${articleId}`)
}