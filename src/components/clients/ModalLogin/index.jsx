import { Button, Form, Input } from 'antd';
import * as S from './style';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../../redux/actions';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const ModalLogin = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { responseAction } = useSelector((state) => state.userReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (userInfo.data.id) {
      setVisible(false);
    }
    if (responseAction.login.error) {
      form.setFields([
        {
          name: 'email',
          errors: [' '],
        },
        {
          name: 'password',
          errors: ['Email hoặc mật khẩu không đúng!'],
        },
      ]);
    }
  }, [userInfo.data, responseAction.login.error]);
  const handleLogin = (value) => {
    dispatch(
      loginAction({
        data: value,
      })
    );
  };
  return (
    <S.ModalLoginCustom visible={visible} onCancel={() => setVisible(false)} footer={false}>
      <div>
        <h2>FoodBooking</h2>
        <h5>Đăng nhập để mua sắm</h5>
        <S.FormCustom form={form} layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              {
                pattern: new RegExp(
                  '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
                ),
                message: 'Định dạng email không đúng!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 kí tự!' },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={responseAction.login.load}>
              Đăng nhập
              <S.SubmitLoading size="middle" show={responseAction.login.load} />
            </Button>
          </Form.Item>
        </S.FormCustom>
        <Link to="/forgot">Quên mật khẩu?</Link>
        <p>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </div>
    </S.ModalLoginCustom>
  );
};
export default ModalLogin;

ModalLogin.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};
