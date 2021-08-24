import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CheckOutlined, LockOutlined, MailOutlined, ManOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {Checkbox, Col, Row, Select, Spin} from "antd";

import * as LoginStyle from '../style';

import {TITLE} from "../../../contants";

import '../style-custom.css';
import {checkEmailExistsAction, registerAction} from "../../../redux/actions";

function RegisterPage() {
    document.title = TITLE.REGISTER;

    const dispatch = useDispatch();

    const {register} = useSelector(state => state.userReducer.responseAction);

    const {responseAction} = useSelector(state => state.userReducer);

    const [readySubmit, setReadySubmit] = useState(false);

    const [valid, setValid] = useState({
        valid: {
            email: false,
            password: false,
            first_name: false,
            last_name: false,
            phone: false,
            gender: false,
            confirm_password: false,
            agree: false
        },
        message: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: '',
            confirm_password: '',
            gender: '',
            agree: ''
        }
    });

    const [field, setField] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        gender: 'false',
        confirm_password: '',
        agree: false
    });

    const [fieldFocus, setFieldFocus] = useState({
        email: false,
        password: false,
        first_name: false,
        last_name: false,
        phone: false,
        confirm_password: false,
    });

    useEffect(()=>{
        if (register.email.error){
            setValid({
                ...valid,
                message: {
                    ...valid.message,
                    email: register.email.error
                }
            });
        }
    },[register.email.error]);

    const handleBeforeSubmit = () => {
        let fields = valid.valid;
        let ready = true;
        for (let field in fields) {
            if (!fields[field]) {
                ready = false;
                break;
            }
        }
        setReadySubmit(ready);
    }
    const validateRule = (name, value, errors) => {
        let msg = '';
        if (name === 'email') {
            let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
                msg = "Mật khẩu tối thiểu 6 kí tự!";
            }
        }
        if (name === 'first_name' || name === 'last_name') {
            // let regex = /^[\w'\-,.][^0-9_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
            // if (!regex.test(value)) {
            //     msg = 'Họ và tên không hợp lệ!';
            // }
            if (value === '') {
                msg = 'Vui lòng nhập họ tên!';
            }
        }
        if (name === 'phone') {
            let regex = /^(0|\+84)[3|5|7|8|9][\d+]{8}$/;
            if (!regex.test(value)) {
                msg = 'Định dạng không hợp lệ (0... / +84...)';
            }
            if (value === '') {
                msg = 'Vui lòng nhập số điện thoại!';
            }
        }
        if (name === 'confirm_password') {
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
            }
        }
    }
    const handleValid = () => {
        let invalid = {...valid};
        for (let rule in field) {
            invalid = validateRule(rule, field[rule], invalid);
        }
        setValid(invalid);
    }
    const handleFocus = (e) => {
        setFieldFocus({
            ...fieldFocus,
            [e.target.name]: true,
        });
        setValid({
            ...valid,
            message: {
                ...valid.message,
                [e.target.name]: ''
            }
        })
    }
    const handleBlur = (e) => {
        setFieldFocus({
            ...fieldFocus,
            [e.target.name]: !!field[e.target.name],
        });
        let invalid = validateRule(e.target.name, e.target.value, {...valid});
        setValid(invalid);
        if (e.target.name === 'email') {
            dispatch(checkEmailExistsAction({
                data: {
                    email: field.email
                }
            }))
        }
    }

    const handleChangeField = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleValid();
        handleBeforeSubmit();
        if (readySubmit) {
            dispatch(registerAction({
                data: field
            }))
        }
    }
    return (
        <form style={{width: 450}} onSubmit={handleSubmit}>
            <LoginStyle.FormTitle>Đăng Ký</LoginStyle.FormTitle>
            <Row gutter={10} style={{
                position: "relative"
            }}>
                <Col span={12}>
                    <LoginStyle.FormGroup
                        className={`form-group ${fieldFocus.first_name && 'focus'} ${(valid.message.first_name || valid.message.last_name) && 'error'}`}
                        style={{paddingLeft: 5}}
                    >
                        <LoginStyle.IconWrap>
                            <UserOutlined
                                className={`i ${(valid.message.first_name || valid.message.last_name) && 'error'}`}
                                style={{transition: '0.3s', fontSize: 20}}
                            />
                        </LoginStyle.IconWrap>
                        <div style={{height: 45, position: "relative"}}>
                            <LoginStyle.TitleFormControl htmlFor="first_name">Họ</LoginStyle.TitleFormControl>
                            <LoginStyle.FormControl id="first_name" type="text" name="first_name"
                                                    value={field.first_name}
                                                    autoComplete="off"
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    onChange={handleChangeField}
                            />
                        </div>
                    </LoginStyle.FormGroup>
                </Col>
                <Col span={12}>
                    <LoginStyle.FormGroup
                        className={`form-group ${fieldFocus.last_name && 'focus'} ${(valid.message.first_name || valid.message.last_name) && 'error'}`}
                    >
                        <div></div>
                        <div style={{height: 45, position: "relative"}}>
                            <LoginStyle.TitleFormControl htmlFor="last_name">Tên</LoginStyle.TitleFormControl>
                            <LoginStyle.FormControl id="last_name" type="text" name="last_name" value={field.last_name}
                                                    autoComplete="off"
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    onChange={handleChangeField}
                                                    style={{
                                                        width: '100%'
                                                    }}
                            />
                        </div>
                    </LoginStyle.FormGroup>
                </Col>
                <LoginStyle.InvalidMsg
                    style={{
                        bottom: '0'
                    }}
                >
                    {(valid.message.first_name || valid.message.last_name)}
                </LoginStyle.InvalidMsg>
            </Row>

            <Row gutter={10} style={{
                position: "relative"
            }}>
                <Col span={15}>
                    <LoginStyle.FormGroup
                        className={`form-group ${fieldFocus.phone && 'focus'} ${valid.message.phone && 'error'}`}
                        style={{paddingLeft: 5}}>
                        <LoginStyle.IconWrap>
                            <PhoneOutlined className={`i ${valid.message.phone && 'error'}`}
                                           style={{transition: '0.3s', fontSize: 20}}/>
                        </LoginStyle.IconWrap>
                        <div style={{height: 45, position: "relative"}}>
                            <LoginStyle.TitleFormControl htmlFor="phone">
                                Số điện thoại
                            </LoginStyle.TitleFormControl>
                            <LoginStyle.FormControl id="phone" type="text" name="phone" value={field.phone}
                                                    autoComplete="off"
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    onChange={handleChangeField}
                            />
                        </div>
                    </LoginStyle.FormGroup>
                </Col>
                <Col span={9}>
                    <LoginStyle.FormGroup
                        className={`form-group ${valid.message.gender && 'error'}`}
                    >
                        <LoginStyle.IconWrap>
                            <ManOutlined className={`i ${valid.message.gender && 'error'}`}
                                         style={{transition: '0.3s', fontSize: 20}}/>
                        </LoginStyle.IconWrap>
                        <div style={{height: 45, position: "relative"}}>
                            <select id="gender" name="gender" defaultValue={field.gender}
                                    onChange={(e) => {
                                        setField({
                                            ...field,
                                            gender: e.target.value,
                                        })
                                        let invalid = validateRule('gender', e.target.value, {...valid});
                                        setValid(invalid);
                                    }}
                                    style={{
                                        paddingLeft: '5px',
                                        width: '100%',
                                        border: "none",
                                        outline: "none",
                                        background: "unset",
                                        cursor: "pointer",
                                        transform: 'translateY(40%)',
                                        color: '#999',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                    }}
                            >
                                <option value='false' disabled hidden>Giới tính</option>
                                <option value={1}>Nam</option>
                                <option value={0}>Nữ</option>
                            </select>
                        </div>
                    </LoginStyle.FormGroup>
                </Col>
                <LoginStyle.InvalidMsg
                    style={{
                        bottom: 0,
                        left: 0,
                        transform: 'translateX(-20%)'
                    }}
                >
                    {valid.message.phone}
                </LoginStyle.InvalidMsg>
            </Row>

            <LoginStyle.FormGroup
                className={`form-group ${fieldFocus.email && 'focus'} ${valid.message.email && 'error'}`}>
                <LoginStyle.IconWrap>
                    <MailOutlined className={`i ${valid.message.email && 'error'}`}
                                  style={{transition: '0.3s', fontSize: 20}}/>
                </LoginStyle.IconWrap>
                <div style={{height: 45, position: "relative"}}>
                    <LoginStyle.TitleFormControl htmlFor="email">Email</LoginStyle.TitleFormControl>
                    <LoginStyle.FormControl id="email" type="text" name="email" value={field.email}
                                            autoComplete="off"
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            onChange={handleChangeField}
                    />
                    {(register.email.load && <Spin size="middle" style={{
                        position: "absolute",
                        top: '50%',
                        right: 10,
                        transform: 'translateY(-50%)'
                    }}/>) || (register.email.success && (<div style={{
                        position: "absolute",
                        top: '50%',
                        background: "#38d39f",
                        right: 10,
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        transform: 'translateY(-50%)',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <CheckOutlined style={{
                            color: "white",
                        }}/>
                    </div>))}
                </div>
                <LoginStyle.InvalidMsg>{valid.message.email}</LoginStyle.InvalidMsg>
            </LoginStyle.FormGroup>

            <LoginStyle.FormGroup
                className={`form-group ${fieldFocus.password && 'focus'} ${valid.message.password && 'error'}`}>
                <LoginStyle.IconWrap>
                    <LockOutlined className={`i ${valid.message.password && 'error'}`}
                                  style={{transition: '0.3s', fontSize: 20}}/>
                </LoginStyle.IconWrap>
                <div style={{height: 45, position: "relative"}}>
                    <LoginStyle.TitleFormControl htmlFor="password">Mật khẩu</LoginStyle.TitleFormControl>
                    <LoginStyle.FormControl id="password" type="password" name="password"
                                            value={field.password}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            onChange={handleChangeField}
                    />
                </div>
                <LoginStyle.InvalidMsg>{valid.message.password}</LoginStyle.InvalidMsg>
            </LoginStyle.FormGroup>

            <LoginStyle.FormGroup
                className={`form-group ${fieldFocus.confirm_password && 'focus'} ${valid.message.confirm_password && 'error'}`}>
                <LoginStyle.IconWrap>
                    <LockOutlined className={`i ${valid.message.confirm_password && 'error'}`}
                                  style={{transition: '0.3s', fontSize: 20}}/>
                </LoginStyle.IconWrap>
                <div style={{height: 45, position: "relative"}}>
                    <LoginStyle.TitleFormControl htmlFor="confirm_password">
                        Nhập lại mật khẩu
                    </LoginStyle.TitleFormControl>
                    <LoginStyle.FormControl id="confirm_password" type="password" name="confirm_password"
                                            value={field.confirm_password}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            onChange={handleChangeField}
                    />
                </div>
                <LoginStyle.InvalidMsg>{valid.message.confirm_password}</LoginStyle.InvalidMsg>
            </LoginStyle.FormGroup>
            <div className={valid.message.agree && 'check-error'}
                 style={{
                     width: '100%',
                     textAlign: "left",
                 }}>
                <Checkbox name='agree' value={field.agree}
                          style={{
                              color: "#1890ff"
                          }}
                          onClick={(e) => {
                              setField({
                                  ...field,
                                  agree: e.target.checked,
                              })
                              let invalid = validateRule('agree', e.target.checked, {...valid});
                              setValid(invalid);
                          }}>
                    Đồng ý với điều khoản của chúng tôi?
                </Checkbox>
            </div>
            <LoginStyle.BtnSubmit htmlType="submit" disabled={responseAction.login.load}>
                Đăng ký {responseAction.login.load && <Spin size="middle" style={{
                position: "absolute",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}/>}
            </LoginStyle.BtnSubmit>
            <div>
                <p>
                    Đã có tài khoản

                    <Link to={'/login'}> Đăng nhập</Link>
                </p>
            </div>
        </form>
    );
}

export default RegisterPage;
