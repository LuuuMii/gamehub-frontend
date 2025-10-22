import request from '@/utils/request'

export function getAllArticleCategory() {
    return request.get('/article-category/getAllArticleCategory',)
}