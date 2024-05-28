import Button from '@/components/Button';
import { setPostUpload } from '@/features/post/postSlice';
import { postUploadSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import {
  GetProp,
  Modal,
  Select,
  UploadFile,
  Upload as UploadFileComponent,
  UploadProps,
  message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FaImage } from 'react-icons/fa6';
import { IoIosInformationCircleOutline, IoMdCloudUpload } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
const { Dragger } = UploadFileComponent;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const ThumnailUpload = ({ videoUrl }: { videoUrl: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const postUpload = useSelector(postUploadSelector);
  const thumnail = postUpload?.thumnail;
  const thumnailRef = useRef<HTMLImageElement>(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const props: UploadProps = {
    name: 'file',
    accept: 'image/jpeg, image/png',
    showUploadList: false,
    maxCount: 1,
    multiple: false,
    beforeUpload: (file) => {
      return false;
    },
    async onChange(info) {
      const file = info.file as FileType | undefined;
      if (
        file &&
        ['image/jpg', 'image/jpeg', 'image/png'].includes(info.file.type!) &&
        thumnailRef.current
      ) {
        const src = URL.createObjectURL(file);
        if (thumnailRef.current) {
          thumnailRef.current.src = src;
          setThumbnailUrl(src);
        }
        dispatch(
          setPostUpload({
            ...postUpload,
            thumnail: info.fileList[info.fileList.length - 1],
          })
        );
        setIsModalOpen(false);
        info.fileList = [];
      } else {
        message.error('Just support formats: JPG, JPEG, PNG');
      }
    },
  };
  useEffect(() => {
    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailUrl]);
  return (
    <div>
      <div className="font-semibold flex gap-3 my-5 mb-2">
        <p className="my-auto">Cover</p>
        <IoIosInformationCircleOutline
          type="button"
          fontSize={20}
          className="my-auto text-gray-400"
          data-tooltip-target="tooltip-default"
        />
      </div>
      <div
        id="tooltip-default"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-950 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Select a cover or upload one from your device. An engaging cover can
        effectively capture viewers’ interest.
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div
        className="w-[150px] h-[200px] relative overflow-hidden rounded-sm shadow-sm"
        onClick={showModal}
      >
        {!thumnail && (
          <video
            muted
            preload="auto"
            className="w-full h-full  object-cover object-center"
            src={videoUrl || ''}
          />
        )}
        {
          <img
            ref={thumnailRef}
            width="100%"
            height="100%"
            className="w-full h-full  object-cover object-center"
          />
        }
        <div className="absolute bottom-0 start-0 end-0 h-[80px]  bg-gradient-to-t from-[#000000c7] to-[#00000000]"></div>
        <div className="absolute bottom-[10px] start-0 end-0 flex">
          <div className="flex w-fit gap-4 mx-auto">
            <FaImage fontSize={20} className="text-white my-auto" />
            <p className="text-white font-bold">Edit cover</p>
          </div>
        </div>
      </div>
      <Modal
        title={<p className="text-[24px] font-bold ">Upload cover</p>}
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        footer={() => <div></div>}
        closeIcon={<IoClose fontSize={32} />}
      >
        <Dragger {...props} className="w-full flex-1">
          <p className="ant-upload-drag-icon flex">
            <IoMdCloudUpload className="mx-auto text-[#A8A8A8]" fontSize={50} />
          </p>
          <p className="font-bold text-[24px]">
            Drap and drop a image file here
          </p>
          <p className="text-[16px] font-semibold text-[#A8A8A8]">
            Or <span className="text-[#2b5db9]">select a file</span>
          </p>
          <p className="text-gray-300 mt-8 text-[14px]">
            Supported formats: JPG, JPEG, and PNG.
          </p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default ThumnailUpload;
