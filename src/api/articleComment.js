import request from '@/utils/request'

export function getArticleCommentByArticleId(articleId) {
    return request.get(`/article-comment/getArticleCommentByArticleId/${articleId}`)
}

export function addArticleComment(data) {
    return request.post('/article-comment/addArticleComment',data)
}