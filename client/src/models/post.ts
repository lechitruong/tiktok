import { AbstractModel } from ".";
import { UserModel } from "./user";

export interface PostModel extends AbstractModel {
    likes : number | null | undefined
    views : number | null | undefined
    comments : number | null | undefined
    shares: number | null | undefined
    poster : number | null | undefined
    posterData : UserModel
    title : string | null | undefined
    thumnailUrl : string | null | undefined
    videoUrl : string | null | undefined
    thumnailId : number | null | undefined
    videoId : number | null | undefined
    isLiked : boolean | null | undefined
    isFollow : boolean | null | undefined
    isFriend : boolean | null | undefined
    isMe : boolean | null | undefined
}