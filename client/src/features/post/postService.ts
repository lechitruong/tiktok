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
