import request from '@/utils/request'

export function addViewRecord(data){
    return request.post('/article-view-record/addViewRecord',data)
}