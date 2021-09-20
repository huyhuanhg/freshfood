import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';

import * as S from '../style';

import history from '../../../../utils/history';
import { changeFullNameAction, changeNumberPhoneAction, changeEmailAction } from '../../../../redux/actions';

const Profile = () => {
  const userToken = localStorage.userInfo;
  const dispatch = useDispatch();
  const { userInfo } = useSelector(({ userReducer }) => userReducer);
  const [emailForm] = Form.useForm();
  const [updateInfo, setUpdateInfo] = useState({
    fullName: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    if (
      userInfo.changePhoneSuccess ||
      userInfo.changeEmailSuccess ||
      userInfo.changeFullNameSuccess
    ) {
      let updateInfoState = { ...updateInfo };
      if (userInfo.changePhoneSuccess) {
        updateInfoState = {
          ...updateInfoState,
          phone: false,
        };
      }
      if (userInfo.changeEmailSuccess) {
        updateInfoState = {
          ...updateInfoState,
          email: false,
        };
      }
      if (userInfo.changeFullNameSuccess) {
        updateInfoState = {
          ...updateInfoState,
          fullName: false,
        };
      }
      setUpdateInfo(updateInfoState);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.errorChangeEmail) {
      emailForm.setFields([
        {
          name: 'email',
          errors: [userInfo.errorChangeEmail],
        },
      ]);
    }
  }, [userInfo]);

  return (
    <div style={{ paddingBottom: 15 }}>
      <Row gutter={20}>
        <Col span={6} />
        <Col span={18}>
          <h3 style={{
            padding: '24px 0',
            fontSize: 24,
            margin: 0,
          }}>
            Thông tin tài khoản
          </h3>
        </Col>
      </Row>
      <S.UserProfile>
        <Row gutter={20}>
          <Col span={6}>
            <div className='user-profile-title'><span>Họ và tên:</span></div>
            <div className='user-profile-title'><span>Email:</span></div>
            <div className='user-profile-title'><span>Số điện thoại:</span></div>
            <div className='user-profile-title'><span>Địa chỉ:</span></div>
            <div className='user-profile-title'><span>Giới tính:</span></div>
            <div className='user-profile-title'><span>Ngày sinh:</span></div>
            <div className='user-profile-title'><span>Mô tả bản thân:</span></div>
          </Col>
          <Col span={18}>
            <div className='user-content'>
              {
                updateInfo.fullName ?
                  <Form
                    className='only-field'
                    name='edit-full-name'
                    layout='inline'
                    style={{ padding: '7px 0' }}
                    initialValues={{
                      firstName: userInfo.data.firstName,
                      lastName: userInfo.data.lastName,
                    }}
                    onFinish={(value) => {
                      if (value.firstName !== userInfo.data.firstName || value.lastName !== userInfo.data.lastName) {
                        const { accessToken } = JSON.parse(userToken);
                        dispatch(changeFullNameAction({
                          accessToken,
                          data: value,
                        }));
                      } else {
                        setUpdateInfo({
                          ...updateInfo,
                          fullName: false,
                        });
                      }
                    }}
                  >
                    <Form.Item
                      name='firstName'
                      style={{ width: 100 }}
                      rules={[{ required: true, message: ' ' }]}
                    >
                      <Input placeholder='Họ' />
                    </Form.Item>
                    <Form.Item
                      name='lastName'
                      style={{ width: 100 }}
                      rules={[{ required: true, message: ' ' }]}
                    >
                      <Input
                        placeholder='Tên'
                      />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      <Space>
                        <Button
                          disabled={userInfo.loadChangeFullName}
                          htmlType='submit'
                          style={{
                            background: '#3380d8',
                            color: 'white',
                          }}
                        >
                          Sửa
                        </Button>
                        <Button onClick={() => setUpdateInfo({
                          ...updateInfo,
                          fullName: false,
                        })}>Hủy</Button>
                      </Space>
                    </Form.Item>
                  </Form>
                  :
                  <span>
                    {userInfo.data.firstName} {userInfo.data.lastName}
                    <span className='edit' onClick={() => setUpdateInfo({
                      ...updateInfo,
                      fullName: true,
                    })}><EditOutlined /> Cập nhật</span>
                  </span>
              }
            </div>
            <div className='user-content'>
              {
                updateInfo.email ?
                  <Form
                    className='only-field'
                    form={emailForm}
                    name='edit-email'
                    layout='inline'
                    style={{ padding: '7px 0' }}
                    initialValues={{
                      email: userInfo.data.email,
                    }}
                    onFinish={(value) => {
                      if (value.email !== userInfo.data.email) {
                        const { accessToken } = JSON.parse(userToken);
                        dispatch(changeEmailAction({
                          accessToken,
                          data: value,
                        }));
                      } else {
                        setUpdateInfo({
                          ...updateInfo,
                          email: false,
                        });
                      }
                    }}
                  >
                    <Form.Item
                      name='email'
                      style={{ width: 218 }}
                      rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                    >
                      <Input placeholder='Email' />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      <Space>
                        <Button
                          disabled={userInfo.loadChangeEmail}
                          htmlType='submit'
                          style={{
                            background: '#3380d8',
                            color: 'white',
                          }}
                        >
                          Sửa
                        </Button>
                        <Button onClick={() => setUpdateInfo({
                          ...updateInfo,
                          email: false,
                        })}>Hủy</Button>
                      </Space>
                    </Form.Item>
                  </Form>
                  :
                  <span>
                    {userInfo.data.email}
                    <span className='edit' onClick={() => setUpdateInfo({
                      ...updateInfo,
                      email: true,
                    })}><EditOutlined /> Cập nhật</span>
                  </span>
              }
            </div>
            <div className='user-content'>
              {
                updateInfo.phone ?
                  <Form
                    className='only-field'
                    name='edit-phone'
                    layout='inline'
                    style={{ padding: '7px 0' }}
                    initialValues={{
                      phone: userInfo.data.phone,
                    }}
                    onFinish={(value) => {
                      if (value.phone !== userInfo.data.phone) {
                        const { accessToken } = JSON.parse(userToken);
                        dispatch(changeNumberPhoneAction({
                          accessToken,
                          data: value,
                        }));
                      } else {
                        setUpdateInfo({
                          ...updateInfo,
                          phone: false,
                        });
                      }
                    }}
                  >
                    <Form.Item
                      name='phone'
                      style={{ width: 218 }}
                      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    >
                      <Input placeholder='Số điện thoại' />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      <Space>
                        <Button
                          disabled={userInfo.loadChangeNumberPhone}
                          htmlType='submit'
                          style={{
                            background: '#3380d8',
                            color: 'white',
                          }}
                        >
                          Sửa
                        </Button>
                        <Button onClick={() => setUpdateInfo({
                          ...updateInfo,
                          phone: false,
                        })}>Hủy</Button>
                      </Space>
                    </Form.Item>
                  </Form>
                  :
                  <span>
                    {userInfo.data.phone}
                    <span className='edit' onClick={() => setUpdateInfo({
                      ...updateInfo,
                      phone: true,
                    })}><EditOutlined /> Cập nhật</span>
                  </span>
              }
            </div>
            <div className='user-content'>
              <span>
                {userInfo.data.address}
              </span>
            </div>
            <div className='user-content'>
              <span>
                {userInfo.data.gender === 1 ? 'Nam' : 'Nữ'}
              </span>
            </div>
            <div className='user-content'>
              <span>
                {userInfo.data.birthday}
              </span>
            </div>
            <div className='user-content'>
              <span>
                {userInfo.data.description}
              </span>
            </div>
          </Col>
        </Row>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 20 }}>
          <Space>
            <Button
              style={{
                background: '#3380d8',
                color: 'white',
              }}
              onClick={() => history.push('/profile/user-info/edit')}
            >
              Cập nhập tài khoản
            </Button>
            <Button onClick={() => history.push('/profile/user-password')}>Đổi mật khẩu</Button>
          </Space>
        </div>
      </S.UserProfile>;
    </div>
  );
};
export default Profile;
