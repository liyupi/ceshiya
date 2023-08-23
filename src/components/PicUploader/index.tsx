import { message, Upload } from 'antd';
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// @ts-ignore
import type { RcCustomRequestOptions, UploadChangeParam } from 'antd/lib/upload/interface';
import { uploadFile } from './service';
import { doGameUnitSucceed, ERROR_FILE_NAME } from '@/games/gameState';
import './index.less';

async function beforeUpload(file: File) {
  const isFileTypeValid =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/svg+xml' ||
    file.type === 'image/webp' ||
    file.type === 'image/gif';
  if (!isFileTypeValid) {
    doGameUnitSucceed('illegalUpload');
    return true;
  }
  if (file.name.toLowerCase() === ERROR_FILE_NAME.toLowerCase()) {
    doGameUnitSucceed('0day');
    return true;
  }
  const isGt100M = file.size / 1024 / 1024 > 100;
  if (isGt100M) {
    doGameUnitSucceed('tooBigUpload');
    return true;
  }
  if (file.size === 8767) {
    doGameUnitSucceed('pretendYupi');
  }
  return true;
}

interface PicUploaderProps {
  onChange?: (url: string) => void;
  value?: string;
}

/**
 * 图片上传组件
 * @author liyupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
const PicUploader: React.FC<PicUploaderProps> = (props) => {
  const { value, onChange } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  /**
   * 上传状态变更
   * @param info
   * @return {Promise<void>}
   */
  const handleChange = async (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log('img upload succeed');
      const newCount = count + 1;
      if (newCount > 3) {
        doGameUnitSucceed('frequentUpload');
      }
      setCount(count + 1);
      message.success('上传成功');
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        onChange?.(imageUrl);
      });
    }
  };

  /**
   * 自实现上传
   * @param fileObj
   * @return {Promise<void>}
   */
  const doUpload = async (fileObj: RcCustomRequestOptions) => {
    await uploadFile(fileObj.file);
    fileObj.onSuccess(fileObj.file);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={doUpload}
    >
      {value ? <img src={value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default PicUploader;
