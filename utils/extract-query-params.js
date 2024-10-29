export function extractQueryParams(query){
    return query.slice(1).split('&').reduce((acc, queryParam) => {
        const [key, value] = queryParam.split('=')
        acc[key] = value
        return acc
    }
    , {})
}