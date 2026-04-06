import request from '@/utils/request'

export function getArticleById(id) {
    return request.get(`/article/getArticleById/${id}`,)
}

export function addDraftArticle(data) {
    return request.post('/article/addDraftArticle',data)
}

export function updateDraftArticle(data) {
    return request.post('/article/updateDraftArticle',data)
}

export function publishArticle(data) {
    return request.post('/article/publishArticle',data)
}

export function getAllDraftByUsername(username) {
    return request.post(`/article/getAllDraftByUsername/${username}`)
}

export function scheduledReleaseArticle(data) {
    return request.post('/article/scheduledReleaseArticle',data)
}

export function getHotArticle() {
    return request.get('/article/getHotArticle')
}

export function getArticleList(query) {
    return request.post('/article/getArticleList',query)
}

export function getHotArticleByCategory(query) {
    return request.post('/article/getHotArticleByCategory',query)
}

export function getArticleFromEs(query) {
    return request.post('/article/getArticleFromEs',query)
}




