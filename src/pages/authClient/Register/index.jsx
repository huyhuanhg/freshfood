import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import {
  CheckOutlined,
  LockOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';

import * as AuthStyle from '../style';
import * as RegisterStyle from './style';

import { TITLE } from '../../../contants';

import { checkEmailExistsAction, registerAction } from '../../../redux/actions';

function RegisterPage() {
  document.title = TITLE.REGISTER;

  const dispatch = useDispatch();

  const {
    register: { load: loadRegister },
    checkEmail: { error: checkEmailError, load: checkEmailLoad, success: checkEmailSuccess },
  } = useSelector(({ userReducer }) => userReducer.responseAction);

  const [readySubmit, setReadySubmit] = useState(false);

  const [valid, setValid] = useState({
    valid: {
      email: false,
      password: false,
      firstName: false,
      lastName: false,
      phone: false,
      gender: false,
      confirmPassword: false,
      agree: false,
    },
    message: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: '',
      gender: '',
      agree: '',
    },
  });

  const [field, setField] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    gender: 'false',
    confirmPassword: '',
    agree: false,
  });

  const [fieldFocus, setFieldFocus] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    phone: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (checkEmailError) {
      setValid({
        valid: {
          ...valid.valid,
          email: false,
        },
        message: {
          ...valid.message,
          email: checkEmailError,
        },
      });
    }
  }, [checkEmailError]);

  useEffect(() => {
    const fields = valid.valid;
    let ready = true;
    for (const field in fields) {
      if (!fields[field]) {
        ready = false;
        break;
      }
    }
    setReadySubmit(ready);
  }, [valid.valid]);

  const validateRule = (name, value, errors) => {
    let msg = '';
    if (name === 'email') {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(value)) {
        msg = 'Định dạng email không đúng!';
      }
      if (value === '') {
        msg = 'Vui lòng nhập email!';
      }
    }
    if (name === 'password') {
      if (value === '') {
        msg = 'Vui lòng nhập mật khẩu!';
      } else if (value.length < 6) {
        msg = 'Mật khẩu tối thiểu 6 kí tự!';
      }
    }
    if (name === 'firstName' || name === 'lastName') {
      if (value === '') {
        msg = 'Vui lòng nhập họ tên!';
      }
    }
    if (name === 'phone') {
      const regex = /^(0|\+84)[3|5|7|8|9][\d+]{8}$/;
      if (!regex.test(value)) {
        msg = 'Định dạng không hợp lệ (0... / +84...)';
      }
      if (value === '') {
        msg = 'Vui lòng nhập số điện thoại!';
      }
    }
    if (name === 'confirmPassword') {
      if (value === '') {
        msg = 'Vui lòng xác nhận mật khẩu!';
      }
      if (value !== field.password) {
        msg = 'Nhập lại mật khẩu không đúng!';
      }
    }
    if (name === 'gender') {
      if (value === 'false') {
        msg = 'invalid';
      }
    }
    if (name === 'agree') {
      if (!value) {
        msg = 'invalid';
      }
    }
    return {
      valid: {
        ...errors.valid,
        [name]: !msg,
      },
      message: {
        ...errors.message,
        [name]: msg,
      },
    };
  };
  const handleValid = () => {
    let invalid = { ...valid };
    for (const rule in field) {
      invalid = validateRule(rule, field[rule], invalid);
    }
    setValid(invalid);
  };
  const handleFocus = (e) => {
    setFieldFocus({
      ...fieldFocus,
      [e.target.name]: true,
    });
    setValid({
      ...valid,
      message: {
        ...valid.message,
        [e.target.name]: '',
      },
    });
  };
  const handleBlur = (e) => {
    setFieldFocus({
      ...fieldFocus,
      [e.target.name]: !!field[e.target.name],
    });
    const invalid = validateRule(e.target.name, e.target.value, { ...valid });
    setValid(invalid);
    if (e.target.name === 'email') {
      dispatch(
        checkEmailExistsAction({
          data: {
            email: field.email,
          },
        }),
      );
    }
  };

  const handleChangeField = (e) => {
    setField({
      ...field,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleValid();
    if (readySubmit) {
      dispatch(
        registerAction({
          data: field,
        }),
      );
    }
  };
  return (
    <form style={{ width: 450 }} onSubmit={handleSubmit}>
      <AuthStyle.FormTitle>Đăng Ký</AuthStyle.FormTitle>
      <Row gutter={10} style={{ position: 'relative' }}>
        <Col span={12}>
          <AuthStyle.FormGroup
            grid
            focus={fieldFocus.firstName}
            error={!!valid.message.firstName || !!valid.message.lastName}
          >
            <AuthStyle.IconWrap
              focus={fieldFocus.firstName}
              error={!!valid.message.firstName || !!valid.message.lastName}
            >
              <RegisterStyle.IconCustom icon={UserOutlined} />
            </AuthStyle.IconWrap>
            <AuthStyle.FormControlWrap>
              <AuthStyle.TitleFormControl
                htmlFor='firstName'
                focus={fieldFocus.firstName}
              >
                Họ
              </AuthStyle.TitleFormControl>
              <AuthStyle.FormControl
                id='firstName'
                type='text'
                name='firstName'
                value={field.firstName}
                autoComplete='off'
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChangeField}
              />
            </AuthStyle.FormControlWrap>
          </AuthStyle.FormGroup>
        </Col>
        <Col span={12}>
          <AuthStyle.FormGroup
            focus={fieldFocus.lastName}
            error={!!valid.message.firstName || !!valid.message.lastName}
          >
            <div />
            <AuthStyle.FormControlWrap>
              <AuthStyle.TitleFormControl
                htmlFor='lastName'
                focus={fieldFocus.lastName}
              >
                Tên
              </AuthStyle.TitleFormControl>
              <AuthStyle.FormControl
                id='lastName'
                type='text'
                name='lastName'
                value={field.lastName}
                autoComplete='off'
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChangeField}
                style={{ width: '100%' }}
              />
            </AuthStyle.FormControlWrap>
          </AuthStyle.FormGroup>
        </Col>
        <AuthStyle.InvalidMsg centerGrid>
          {valid.message.firstName || valid.message.lastName}
        </AuthStyle.InvalidMsg>
      </Row>

      <Row gutter={10} style={{ position: 'relative' }}>
        <Col span={15}>
          <AuthStyle.FormGroup
            focus={fieldFocus.phone}
            error={!!valid.message.phone}
            grid
          >
            <AuthStyle.IconWrap
              focus={fieldFocus.phone}
              error={!!valid.message.phone}
            >
              <RegisterStyle.IconCustom icon={PhoneOutlined} />
            </AuthStyle.IconWrap>
            <AuthStyle.FormControlWrap>
              <AuthStyle.TitleFormControl htmlFor='phone' focus={fieldFocus.phone}>
                Số điện thoại
              </AuthStyle.TitleFormControl>
              <AuthStyle.FormControl
                id='phone'
                type='text'
                name='phone'
                value={field.phone}
                autoComplete='off'
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChangeField}
              />
            </AuthStyle.FormControlWrap>
          </AuthStyle.FormGroup>
        </Col>
        <Col span={9}>
          <AuthStyle.FormGroup error={!!valid.message.gender}>
            <AuthStyle.IconWrap error={!!valid.message.gender}>
              <RegisterStyle.IconCustom icon={ManOutlined} />
            </AuthStyle.IconWrap>
            <AuthStyle.FormControlWrap>
              <RegisterStyle.SelectCustom
                id='gender'
                name='gender'
                defaultValue={field.gender}
                onChange={(e) => {
                  setField({
                    ...field,
                    gender: e.target.value,
                  });
                  const invalid = validateRule('gender', e.target.value, {
                    ...valid,
                  });
                  setValid(invalid);
                }}
              >
                <option value='false' disabled hidden>
                  Giới tính
                </option>
                <option value={1}>Nam</option>
                <option value={0}>Nữ</option>
              </RegisterStyle.SelectCustom>
            </AuthStyle.FormControlWrap>
          </AuthStyle.FormGroup>
        </Col>
        <AuthStyle.InvalidMsg leftGrid>{valid.message.phone}</AuthStyle.InvalidMsg>
      </Row>

      <AuthStyle.FormGroup focus={fieldFocus.email} error={!!valid.message.email}>
        <AuthStyle.IconWrap focus={fieldFocus.email} error={!!valid.message.email}>
          <RegisterStyle.IconCustom icon={MailOutlined} />
        </AuthStyle.IconWrap>
        <AuthStyle.FormControlWrap>
          <AuthStyle.TitleFormControl htmlFor='email' focus={fieldFocus.email}>
            Email
          </AuthStyle.TitleFormControl>
          <AuthStyle.FormControl
            id='email'
            type='text'
            name='email'
            value={field.email}
            autoComplete='off'
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChangeField}
          />
          {(checkEmailLoad && <RegisterStyle.ControlLoading size='middle' />) ||
          (checkEmailSuccess && (
            <RegisterStyle.IconCheck icon={CheckOutlined} />
          ))}
        </AuthStyle.FormControlWrap>
        <AuthStyle.InvalidMsg>{valid.message.email}</AuthStyle.InvalidMsg>
      </AuthStyle.FormGroup>

      <AuthStyle.FormGroup
        focus={fieldFocus.password}
        error={!!valid.message.password}
      >
        <AuthStyle.IconWrap
          focus={fieldFocus.password}
          error={!!valid.message.password}
        >
          <RegisterStyle.IconCustom icon={LockOutlined} />
        </AuthStyle.IconWrap>
        <AuthStyle.FormControlWrap>
          <AuthStyle.TitleFormControl htmlFor='password' focus={fieldFocus.password}>
            Mật khẩu
          </AuthStyle.TitleFormControl>
          <AuthStyle.FormControl
            id='password'
            type='password'
            name='password'
            value={field.password}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChangeField}
          />
        </AuthStyle.FormControlWrap>
        <AuthStyle.InvalidMsg>{valid.message.password}</AuthStyle.InvalidMsg>
      </AuthStyle.FormGroup>

      <AuthStyle.FormGroup
        focus={fieldFocus.confirmPassword}
        error={!!valid.message.confirmPassword}
      >
        <AuthStyle.IconWrap
          focus={fieldFocus.confirmPassword}
          error={!!valid.message.confirmPassword}
        >
          <RegisterStyle.IconCustom icon={LockOutlined} />
        </AuthStyle.IconWrap>
        <AuthStyle.FormControlWrap>
          <AuthStyle.TitleFormControl
            htmlFor='confirmPassword'
            focus={fieldFocus.confirmPassword}
          >
            Nhập lại mật khẩu
          </AuthStyle.TitleFormControl>
          <AuthStyle.FormControl
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            value={field.confirmPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChangeField}
          />
        </AuthStyle.FormControlWrap>
        <AuthStyle.InvalidMsg>{valid.message.confirmPassword}</AuthStyle.InvalidMsg>
      </AuthStyle.FormGroup>
      <RegisterStyle.CheckboxWrap>
        <RegisterStyle.CheckboxCustom
          name='agree'
          value={field.agree}
          error={!!valid.message.agree}
          onClick={(e) => {
            setField({
              ...field,
              agree: e.target.checked,
            });
            const invalid = validateRule('agree', e.target.checked, {
              ...valid,
            });
            setValid(invalid);
          }}
        >
          Đồng ý với điều khoản của chúng tôi?
        </RegisterStyle.CheckboxCustom>
      </RegisterStyle.CheckboxWrap>
      <AuthStyle.BtnSubmit
        htmlType='submit'
        disabled={loadRegister}
        style={{ marginTop: '2rem' }}
      >
        Đăng ký
        <AuthStyle.SubmitLoading size='middle' show={loadRegister} />
      </AuthStyle.BtnSubmit>
      <div
        style={{
          fontSize: '15px',
        }}
      >
        <p>
          Đã có tài khoản
          <Link to={'/login'}> Đăng nhập</Link>
        </p>
      </div>
    </form>
  );
}

export default RegisterPage;
