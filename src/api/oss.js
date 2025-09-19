import request from '@/utils/request'

export function uploadCoverImg(data) {
    return request.post('/oss/uploadCoverImg', data)
}


export function uploadArticleImg(data) {
    return request.post('/oss/uploadArticleImg', data)
}


export function deleteFiles(data) {
    return request.post('/oss/deleteFiles', data)
}

export function uploadImgByUrl(data) {
    return request.post('/oss/uploadImgByUrl', data)
}


