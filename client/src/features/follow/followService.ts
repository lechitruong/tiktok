import { axiosToken } from "@/axios";
import { AbstractModel } from "@/models";
import { FollowModel } from "@/models/follow";
import { UserModel } from "@/models/user";
import AbstractPayload from "@/utils/abtractPayloadType";

const routePath = "/follow/"
const FollowService = {
    async followUser(userId : number) {
        return new Promise<FollowModel>(async (resolve, reject) => {
            try {
                // 3. Send Follow Request with Token
                const resp = await axiosToken.post(routePath + userId);
                // 5. Display Error Message
                resolve(resp.data);
            } catch (error) {
                reject(error);
            }
        })
    },
    async unfollowUser(userId : number) {
        return new Promise<AbstractModel>(async (resolve, reject) => {
            try {
                const resp = await axiosToken.delete(routePath + userId);
                resolve(resp.data);
            } catch (error) {
                reject(error);
            }
        })
    }
    
}
export default FollowService;