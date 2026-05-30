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

export function initUpload(objectName){
    return request.post("/oss/upload/init",null,
        {
            params:{
                objectName
            }
        }
    )
}

export function uploadChunk(file,objectName,uploadId,partNumber,totalChunks){
    const formData = new FormData();
    formData.append("file", file);
    formData.append("objectName", objectName);
    formData.append("uploadId", uploadId);
    formData.append("partNumber", partNumber);
    formData.append("totalChunks", totalChunks);
    return request.post("/oss/upload/chunk",formData)
}

export function completeUpload(objectName,uploadId){
    return request.post("/oss/upload/complete",null,
        {
            params:{
                objectName,
                uploadId
            }
        }
    )
}

export function listParts(objectName,uploadId){
    return request.post("/oss/upload/listParts",null,
        {
            params:{
                objectName,
                uploadId
            }
        }
    )
}