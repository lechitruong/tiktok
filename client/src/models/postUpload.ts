import { UploadFile } from 'antd';

export interface PostUploadModel {
  video: UploadFile<any> | null;
  thumnail: UploadFile<any> | null;
  visibility: 0 | -1 | 1;
  title: string;
}
