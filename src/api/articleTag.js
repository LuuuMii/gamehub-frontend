import request from '@/utils/request'

export function getAllArticleTag() {
    return request.get('/article-tag/getAllArticleTag')
}

export function getArticleTagByES(keyword) {
    return request.get('/article-tag/getArticleTagByES',{
        params:{keyword}
    })
}

export function addArticleTagByUser(data) {
    return request.post('/article-tag/addArticleTagByUser',data)
}