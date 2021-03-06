import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Form, Input, Select, Spin } from 'antd';

import {
  LockOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import * as AuthStyle from '../style';
import * as RegisterStyle from './style';
import { TITLE, PATH } from '../../../contants';
import { checkEmailExistsAction, resetCheckEmailAction, registerAction } from '../../../redux/actions';


function RegisterPage() {
  document.title = TITLE(PATH.REGISTER);
  const [registerForm] = Form.useForm();
  const [dataRequest, setDataRequest] = useState(null);

  const dispatch = useDispatch();
  const {
    register: { load: loadRegister },
    checkEmail: { error: checkEmailError, load: checkEmailLoad, success: checkEmailSuccess },
  } = useSelector(({ userReducer }) => userReducer.responseAction);

  const [fieldFocus, setFieldFocus] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    phone: false,
    confirmPassword: false,
  });

  const handleFocus = (e) => {
    setFieldFocus({
      ...fieldFocus,
      [e.target.id]: true,
    });
  };
  const handleBlur = (e) => {
    if (!e.target.value) {
      setFieldFocus({
        ...fieldFocus,
        [e.target.id]: false,
      });
    } else {
      if (e.target.id === 'email') {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(e.target.value)) {
          dispatch(checkEmailExistsAction({
            data: { email: e.target.value },
          }));
        }
      }
    }
  };
  const handleSubmit = (value) => {
    setDataRequest({ ...value });
  };
  useEffect(() => {
    dispatch(resetCheckEmailAction());
  }, []);

  useEffect(() => {
    if (checkEmailSuccess && dataRequest) {
      dispatch(registerAction({ data: { ...dataRequest } }));
    }
  }, [dataRequest, checkEmailSuccess]);

  useEffect(() => {
    if (checkEmailError) {
      registerForm.setFields([{
        name: 'email',
        errors: [checkEmailError],
      }]);
    } else {
      registerForm.setFields([{
        name: 'email',
        errors: null,
      }]);
    }
  }, [checkEmailError]);

  return (
    <Form
      layout='vertical'
      form={registerForm}
      style={{ width: 450 }}
      onFinish={handleSubmit}
    >
      <AuthStyle.FormTitle>????ng K??</AuthStyle.FormTitle>
      <Form.Item noStyle>
        <AuthStyle.FormGroup
          name='firstName'
          label='H???'
          focus={fieldFocus.firstName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rules={[
            { required: true, message: 'Nh???p h???!' },
          ]}
          style={{
            display: 'inline-block',
            width: '49.5%',
          }}
        >
          <Input prefix={<UserOutlined />} />
        </AuthStyle.FormGroup>
        <AuthStyle.FormGroup
          name='lastName'
          label='T??n'
          focus={fieldFocus.lastName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rules={[
            { required: true, message: 'Nh???p t??n!' },
          ]}
          style={{
            display: 'inline-block',
            width: '49.5%',
            marginLeft: '1%',
          }}
        >
          <Input prefix={' '} />
        </AuthStyle.FormGroup>
      </Form.Item>
      <Form.Item noStyle>
        <AuthStyle.FormGroup
          name='phone'
          label='S??? ??i???n tho???i'
          focus={fieldFocus.phone}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rules={[
            { required: true, message: 'Vui l??ng nh???p s??? ??i???n tho???i' },
            {
              pattern: new RegExp('^(0|\\+84)[3|5|7|8|9][\\d+]{8}$'),
              message: '?????nh d???ng kh??ng h???p l??? (0... / +84...)',
            },
          ]}
          style={{
            display: 'inline-block',
            width: '65%',
          }}
        >
          <Input prefix={<PhoneOutlined />} />
        </AuthStyle.FormGroup>
        <AuthStyle.Gender>
          <AuthStyle.FormGroup
            label='Gi???i t??nh'
            name='gender'
            focus={fieldFocus.gender}
            rules={[
              { required: true, message: 'Ch???n gi???i t??nh!' },
            ]}
            className='select-gender'
          >
            <Select
              onChange={() => {
                setFieldFocus({ ...fieldFocus, gender: true });
              }}
            >
              <Select.Option value={1}>Nam</Select.Option>
              <Select.Option value={0}>N???</Select.Option>
            </Select>
          </AuthStyle.FormGroup>
          <ManOutlined className='prefix-icon' />
        </AuthStyle.Gender>
      </Form.Item>
      <AuthStyle.FormGroup
        name='email'
        label='Email'
        focus={fieldFocus.email}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rules={[
          { required: true, message: 'Vui l??ng nh???p email' },
          {
            pattern: new RegExp(
              '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
            ),
            message: '?????nh d???ng email kh??ng ????ng!',
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          suffix={checkEmailLoad ? <Spin /> : (checkEmailSuccess && <RegisterStyle.EmailSuccess />)}
        />
      </AuthStyle.FormGroup>
      <AuthStyle.FormGroup
        name='password'
        focus={fieldFocus.password}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label='M???t kh???u'
        rules={[
          { required: true, message: 'Vui l??ng nh???p m???t kh???u!' },
          { min: 6, message: 'M???t kh???u t???i thi???u 6 k?? t???!' },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </AuthStyle.FormGroup>
      <AuthStyle.FormGroup
        name='confirmPassword'
        focus={fieldFocus.confirmPassword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label='Nh???p l???i m???t kh???u'
        rules={[
          { required: true, message: 'Vui l??ng x??c nh???n m???t kh???u!' },
          { min: 6, message: 'M???t kh???u t???i thi???u 6 k?? t???!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value.length < 6 || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Nh???p l???i m???t kh???u kh??ng kh???p!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </AuthStyle.FormGroup>
      <AuthStyle.Agree
        name='agree'
        valuePropName='checked'
        style={{ textAlign: 'left' }}
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error(' ')),
          },
        ]}
      >
        <Checkbox>?????ng ?? v???i ??i???u kho???n c???a ch??ng t??i</Checkbox>
      </AuthStyle.Agree>
      <AuthStyle.BtnSubmit
        htmlType='submit'
        style={{ marginTop: '2rem' }}
        disabled={loadRegister}
      >
        ????ng k??
        <AuthStyle.SubmitLoading size='middle' show={loadRegister} />
      </AuthStyle.BtnSubmit>
      <div
        style={{
          fontSize: '15px',
        }}
      >
        <p>
          ???? c?? t??i kho???n
          <Link to={'/login'}> ????ng nh???p</Link>
        </p>
      </div>
    </Form>
  );
}

export default RegisterPage;
