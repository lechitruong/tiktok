import { axiosToken } from "@/axios";
import { UserModel } from "@/models/user";
import AbstractPayload from "@/utils/abtractPayloadType";

export interface GetUserParams {
    userId : number
}
export interface UserPayload extends AbstractPayload {
    user : UserModel
    
}
const routePath = "/user"
const UserService = {
    async me() {
        return new Promise<UserPayload>(async (resolve, reject) => {
            try {
                const resp = await axiosToken.get(routePath +'/me',);
                resolve(resp.data);
            } catch (error) {
                reject(error);
            }
        })
    },
    async getUser(userId : GetUserParams) {
        return new Promise(async (resolve, reject) => {
            try {
                const resp = await axiosToken.get(routePath + userId,);
                resolve(resp.data);
            } catch (error) {
                reject(error);
            }
        })
    },
    
}
export default UserService;