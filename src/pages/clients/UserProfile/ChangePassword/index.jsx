import { Button, Col, Form, Input, Row, Space } from 'antd';
import * as S from '../style';
import history from '../../../../utils/history';

const ChangePassword = () => {
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
          name='change-password'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          autoComplete='off'
        >
          <Form.Item
            label='Mật khẩu cũ:'
            name='email'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Nhập mật khẩu cũ' />
          </Form.Item>
          <Form.Item
            label='Mật khẩu mới:'
            name='email'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Nhập mật khẩu mới' />
          </Form.Item>
          <Form.Item
            label='Nhập lại mật khẩu:'
            name='email'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Nhập lại mật khẩu' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button
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
