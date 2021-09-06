import { Form, Input } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { adminLoginAction } from '../../redux/actions';
import * as Style from './styles';
import * as AppStyle from '../../styles';

function AdminLoginPage() {
  const dispatch = useDispatch();
  const { responseAction } = useSelector((state) => state.adminReducer);
  document.title = 'Foodbooking | Đăng nhập';

  const onLogin = (value) => {
    dispatch(
      adminLoginAction({
        data: value,
      })
    );
  };
  const [loginForm] = Form.useForm();

  useEffect(() => {
    if (responseAction.login.error) {
      loginForm.setFields([
        {
          name: 'email',
          errors: [' '],
        },
        {
          name: 'password',
          errors: [responseAction.login.error],
        },
      ]);
    }
  }, [responseAction.login]);

  return (
    <Style.LoginWrap>
      <AppStyle.Logo />
      <Style.FormWrap>
        <Style.H3>FOODBOOKING || Quản lý Cửa Hàng</Style.H3>
        <Form onFinish={onLogin} form={loginForm}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email!',
              },
              {
                pattern: new RegExp(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ),
                message: 'Định dạng email không đúng!',
              },
            ]}
          >
            <Input
              placeholder="Tài khoản"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Style.ButtonSubmit
              htmlType="submit"
              loading={responseAction.login.load}
            >
              {!responseAction.login.load && 'Đăng nhập'}
            </Style.ButtonSubmit>
          </Form.Item>
        </Form>
        <p>
          <Link to="/forgot">Quên mật khẩu?</Link>
        </p>
      </Style.FormWrap>
    </Style.LoginWrap>
  );
}

export default AdminLoginPage;
