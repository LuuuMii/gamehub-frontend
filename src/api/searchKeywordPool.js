import request from '@/utils/request'

export function suggestSearch(data) {
    return request.post('/search-keyword-pool/suggestSearch',data)
}