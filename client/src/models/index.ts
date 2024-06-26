export interface AbstractModel {
    id : number | null | undefined
    createdAt : Date | null
    updatedAt : Date | null
}
export interface PaginationModel {
    orderBy : string
    page : number
    pageSize : number
    orderDirection : string
    totalItems : number
    totalPages : number
}