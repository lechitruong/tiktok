import { UploadFile } from "antd"

export interface PostUploadModel {
    video : UploadFile<any>|null
    imageUrl : string
    image : UploadFile<any>|null
    title : string
}