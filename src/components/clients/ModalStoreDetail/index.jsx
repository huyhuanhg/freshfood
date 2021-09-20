import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AiFillStar } from 'react-icons/all';
import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';

import * as S from './style';
import {
  getBookmarkDetailAction,
  createBookmarkAction,
  updateBookmarkAction,
  createCommentAction,
} from '../../../redux/actions';

import { ROOT_PATH, SERVER_CLIENT_API_URL } from '../../../contants';
import loadAvatarStore from '../../../assets/images/loadStore.png';

const ModalStoreDetail = (
  {
    isShow,
    setShow,
    isComment,
    storeId,
    image,
    address,
    avgRate,
    storeName,
  },
) => {
  const dispatch = useDispatch();
  const [actionForm] = Form.useForm();
  const userToken = localStorage.getItem('userInfo');
  let accessToken = null;
  if (userToken) {
    accessToken = JSON.parse(userToken)?.accessToken;
  }
  const { bookmarkDetail } = useSelector(({ bookmarkReducer }) => bookmarkReducer);
  const { userInfo } = useSelector(({ userReducer }) => userReducer);
  // list nhận ảnh nhận về
  const [fileList, setFileList] = useState([]);
  // //list ảnh form
  const [formImages, setFormImages] = useState([]);
  const [load, setLoad] = useState(false);

  const uploadImages = async (data) => {
    const imagesData = new FormData();
    data.forEach((image, index) => {
      imagesData.append(`images[${index}]`, image.originFileObj);
    });
    try {
      const res = await axios.post(
        `${SERVER_CLIENT_API_URL}/comment-pictures`,
        imagesData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setLoad(false);
      const resData = await res.data.map((dataItem) => camelcaseKeys(dataItem));
      await setFileList([...fileList, ...resData]);
    } catch (err) {
      console.log(err.message);
    }
  };
  const removeImage = async (file) => {
    const fileIndex = fileList.findIndex((fileItem) => fileItem.fileName === file.name);
    const data = new FormData();
    data.append('path', fileList[fileIndex].path);
    const newFiles = [...fileList];
    newFiles.splice(fileIndex, 1);
    setFileList(newFiles);
    try {
      await axios.post(
        `${SERVER_CLIENT_API_URL}/comment-picture-d`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeImages = async () => {
    const data = new FormData();
    fileList.forEach((image, index) => {
      data.append(`paths[${index}]`, image.path);
    });
    try {
      await axios.post(
        `${SERVER_CLIENT_API_URL}/comment-pictures-d`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    // gọi api upload ảnh
    const uploadedCount = fileList.length;
    const newListCount = formImages.length;
    if (newListCount > uploadedCount) {
      const data = formImages.filter((image, imageIndex) => imageIndex >= uploadedCount);
      if (!load) {
        uploadImages(data);
        setLoad(true);
      }
    }
  }, [formImages]);

  useEffect(() => {
    if (!isComment && isShow) {
      dispatch(getBookmarkDetailAction({
        accessToken,
        data: {
          storeId,
        },
      }));
    }
  }, [isShow]);

  const renderFileList = () => {
    return fileList.map((file, fileIndex) => {
      return {
        uid: fileIndex,
        name: file.fileName,
        status: 'done',
        url: `${ROOT_PATH}${file.path}`,
      };
    });
  };
  const handleSubmit = (value) => {
    if (!isComment) {
      if (bookmarkDetail.data.description) {
        dispatch(updateBookmarkAction({
          accessToken,
          data: {
            ...value,
            storeId,
          },
        }));
      } else {
        dispatch(createBookmarkAction({
          accessToken,
          data: {
            ...value,
            storeId,
          },
        }));
      }
    } else {
      const data = {
        ...value,
        accessToken,
        storeId,
        paths: fileList.map((file) => file.path),
        lastName: userInfo.data.lastName,
        firstName: userInfo.data.firstName,
        userAvatar: userInfo.data.avatar,
      };
      dispatch(createCommentAction(data));
      setFormImages([]);
      setFileList([]);
      actionForm.resetFields();
    }
    setShow(false);
  };
  useEffect(() => {
    if (!isComment) {
      actionForm.setFieldsValue({ description: bookmarkDetail.data.description });
    }
  }, [bookmarkDetail.data]);
  return (
    <S.ModalCustom
      title={isComment ? 'Viết bình luận' : 'Lưu vào Bookmarks'}
      visible={isShow}
      onCancel={() => {
        setShow({ isComment, status: false });
        if (isComment && fileList.length > 0) {
          removeImages();
        }
        setFormImages([]);
        setFileList([]);
        actionForm.resetFields();
      }}
      width={1000}
      footer={false}
    >
      <Row gutter={8}>
        <Col span={8}>
          <div>
            <img
              src={
                image
                  ? `${ROOT_PATH}${image}`
                  : loadAvatarStore
              }
              alt={storeName}
              width='100%'
              height={188}
            />
            <div
              style={{
                overflow: 'hidden',
                clear: 'both',
                margin: '0 0 10px 0',
              }}
            >
              <div className='review-points'>
                <span>{avgRate}<AiFillStar /></span>
              </div>
              <div style={{ float: 'left', width: 'calc(100% - 42px)', marginLeft: '10px' }}>
                <div className='fldr-res-title'>{storeName}</div>
                <div className='fldr-res-address'>{address}</div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={16}>
          <S.FormCustom
            onFinish={handleSubmit}
            form={actionForm}
          >
            <div className='form-control'>
              <Form.Item
                name='description'
                rules={[{ required: true, message: ' ' }]}
              >
                <S.TextAreaBox
                  full={isComment}
                  placeholder={isComment ? 'Viết bình luận của bạn...' : 'Thêm mô tả...'}
                  disabled={bookmarkDetail.load}
                />
              </Form.Item>
              {
                isComment &&
                <Form.Item>
                  <Upload
                    accept='image/*'
                    listType='picture-card'
                    beforeUpload={false}
                    fileList={renderFileList()}
                    showUploadList={{ showPreviewIcon: false }}
                    onRemove={removeImage}
                    onChange={({ fileList }) => {
                      setFormImages(fileList);
                    }}
                    maxCount={8}
                    multiple
                  >
                    {fileList.length < 8 &&
                    <div style={{ fontSize: 12 }}>
                      <PlusOutlined />
                      <div>Thêm ảnh</div>
                    </div>
                    }
                  </Upload>
                </Form.Item>
              }
            </div>
            <S.SubmitButton
              htmlType='submit'
              disabled={!isComment && bookmarkDetail.load}
            >
              {isComment ? 'Viết bình luận' : bookmarkDetail.data.description ? '+ Sửa bộ sưư tập' : '+ Lưu vào bộ sưu tập'}
            </S.SubmitButton>
          </S.FormCustom>
        </Col>
      </Row>
    </S.ModalCustom>
  );
};
export default ModalStoreDetail;

ModalStoreDetail.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  isComment: PropTypes.bool,
  image: PropTypes.string,
  address: PropTypes.string,
  avgRate: PropTypes.number,
  storeId: PropTypes.number,
  storeName: PropTypes.string,
};
