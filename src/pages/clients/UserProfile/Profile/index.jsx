import { Button, Col, Form, Input, Row, Space } from 'antd';
import * as S from '../style';
import { useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import history from '../../../../utils/history';
import { useState } from 'react';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.userReducer);
  const [updateInfo, setupdateInfo] = useState({
    fullName: false,
    email: false,
    phone: false,
  });
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
            <p className='user-profile-title'><span>Họ và tên:</span></p>
            <p className='user-profile-title'><span>Email:</span></p>
            <p className='user-profile-title'><span>Số điện thoại:</span></p>
            <p className='user-profile-title'><span>Địa chỉ:</span></p>
            <p className='user-profile-title'><span>Giới tính:</span></p>
            <p className='user-profile-title'><span>Ngày sinh:</span></p>
            <p className='user-profile-title'><span>Mô tả bản thân:</span></p>
          </Col>
          <Col span={18}>
            <p>
              {
                updateInfo.fullName ?
                  <Form
                    name='edit-full-name'
                    layout='inline'
                    style={{ padding: '7px 0' }}
                    initialValues={{
                      firstName: userInfo.data.firstName,
                      lastName: userInfo.data.lastName,
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
                          htmlType='submit'
                          style={{
                            background: '#3380d8',
                            color: 'white',
                          }}
                        >
                          Sửa
                        </Button>
                        <Button onClick={() => setupdateInfo({
                          ...updateInfo,
                          fullName: false,
                        })}>Hủy</Button>
                      </Space>
                    </Form.Item>
                  </Form>
                  :
                  <span>
                    {userInfo.data.firstName} {userInfo.data.lastName}
                    <span className='edit' onClick={() => setupdateInfo({
                      ...updateInfo,
                      fullName: true,
                    })}><EditOutlined /> Cập nhật</span>
                  </span>
              }
            </p>
            <p>
              {
                updateInfo.email ?
                  <Form
                    name='edit-email'
                    layout='inline'
                    style={{ padding: '7px 0' }}
                    initialValues={{
                      email: userInfo.data.email,
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
                          htmlType='submit'
                          style={{
                            background: '#3380d8',
                            color: 'white',
                          }}
                        >
                          Sửa
                        </Button>
                        <Button onClick={() => setupdateInfo({
                          ...updateInfo,
                          email: false,
                        })}>Hủy</Button>
                      </Space>
                    </Form.Item>
                  </Form>
                  :
                  <span>
                    {userInfo.data.email}
                    <span className='edit' onClick={() => setupdateInfo({
                      ...updateInfo,
                      email: true,
                    })}><EditOutlined /> Cập nhật</span>
                  </span>
              }
            </p>
            <p>
              {
                updateInfo.phone ?
                  <Form
                    name='edit-email'
                    layout='inline'
                    style={{ padding: '7px 0' }}
                    initialValues={{
                      phone: userInfo.data.phone,
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
                          htmlType='submit'
                          style={{
                            background: '#3380d8',
                            color: 'white',
                          }}
                        >
                          Sửa
                        </Button>
                        <Button onClick={() => setupdateInfo({
                          ...updateInfo,
                          phone: false,
                        })}>Hủy</Button>
                      </Space>
                    </Form.Item>
                  </Form>
                  :
                  <span>
                    {userInfo.data.phone}
                    <span className='edit' onClick={() => setupdateInfo({
                      ...updateInfo,
                      phone: true,
                    })}><EditOutlined /> Cập nhật</span>
                  </span>
              }
            </p>
            <p>
              <span>
                {userInfo.data.address}
              </span>
            </p>
            <p>
              <span>
                {userInfo.data.gender === 1 ? 'Nam' : 'Nữ'}
              </span>
            </p>
            <p>
              <span>
                {userInfo.data.birthday}
              </span>
            </p>
            <p>
              <span>
                {userInfo.data.description}
              </span>
            </p>
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
