import { AbstractModel } from ".";

export interface AvatarModel extends AbstractModel{
    publicId : string | null | undefined;
    url : string | null | undefined;
    code : string | null | undefined;
    
}