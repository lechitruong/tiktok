import { AbstractModel } from ".";

export interface FollowModel extends AbstractModel{
    follower : number 
    followee : number 
}