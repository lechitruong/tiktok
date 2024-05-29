import { axiosToken } from '@/axios';
import { PostModel } from '@/models/post';
import AbstractPayload from '@/utils/abtractPayloadType';
const routePath = '/post';
export interface PostsPayload extends AbstractPayload {
  posts: PostModel[];
}
export interface PostPayload extends AbstractPayload {
  post: PostModel;
}
const PostService = {
  async getPosts() {
    return new Promise<PostsPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + '/');
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async sharePost(postId: number) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.post(routePath + '/share/' + postId);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async likePost(postId: number) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        //  3. Send Like Request with Token
        const resp = await axiosToken.post(routePath + '/like/' + postId);
        // 5. Display Error Message
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async unlikePost(postId: number) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.post(routePath + '/unlike/' + postId);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async uploadPost(
    postFormData: FormData,
    onUploadProgress: (progressEvent: any) => void
  ) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.post(
          routePath + '/upload/',
          postFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
          }
        );
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default PostService;
