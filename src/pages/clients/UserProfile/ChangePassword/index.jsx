import { Button, Col, Form, Input, Row, Space } from 'antd';
import * as S from '../style';
import history from '../../../../utils/history';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordAction, resetErrorPasswordAction } from '../../../../redux/actions';
import { useEffect } from 'react';

const ChangePassword = () => {
  const userToken = localStorage.userInfo;
  const dispatch = useDispatch();
  const { userInfo } = useSelector(({ userReducer }) => userReducer);
  const [changePasswordForm] = Form.useForm();

  useEffect(() => {
    dispatch(resetErrorPasswordAction());
  }, []);

  useEffect(() => {
    if (userInfo.errorChangePassword) {
      const errors = { ...userInfo.errorChangePassword };
      const fieldError = [];
      for (const field in errors) {
        fieldError.push({ name: field, errors: [errors[field][0]] });
      }
      changePasswordForm.setFields(fieldError);
    } else {
      changePasswordForm.resetFields();
    }
  }, [userInfo]);

  return (
    <div style={{ paddingBottom: 15 }}>
      <Row gutter={20}>
        <Col span={8} />
        <Col span={16}>
          <h3 style={{
            padding: '24px 0',
            fontSize: 24,
            margin: 0,
          }}>
            Đổi mật khẩu
          </h3>
        </Col>
      </Row>
      <S.UserProfile>
        <Form
          form={changePasswordForm}
          name='change-password'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          autoComplete='off'
          onFinish={(value) => {
            const { accessToken } = JSON.parse(userToken);
            dispatch(changePasswordAction({
              accessToken,
              data: value,
            }));
          }}
        >
          <Form.Item
            label='Mật khẩu cũ:'
            name='oldPassword'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
          >
            <Input.Password placeholder='Nhập mật khẩu cũ' />
          </Form.Item>
          <Form.Item
            label='Mật khẩu mới:'
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password placeholder='Nhập mật khẩu mới' />
          </Form.Item>
          <Form.Item
            label='Nhập lại mật khẩu:'
            name='confirmPassword'
            rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
          >
            <Input.Password placeholder='Nhập lại mật khẩu' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button
                disabled={userInfo.loadChangePassword}
                style={{
                  background: '#3380d8',
                  color: 'white',
                }}
                htmlType='submit'
              >
                Đổi mật khẩu
              </Button>
              <Button onClick={() => history.push('/profile/user-info')}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </S.UserProfile>;
    </div>
  );
};
export default ChangePassword;
