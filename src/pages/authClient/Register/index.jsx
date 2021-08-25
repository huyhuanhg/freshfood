import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "antd";
import {CheckOutlined, LockOutlined, MailOutlined, ManOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";

import * as AuthStyle from '../style';
import * as RegisterStyle from './style';

import {TITLE} from "../../../contants";

import {checkEmailExistsAction, registerAction} from "../../../redux/actions";

function RegisterPage() {
    document.title = TITLE.REGISTER;

    const dispatch = useDispatch();

    const {register} = useSelector(state => state.userReducer.responseAction);

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

    useEffect(() => {
        if (register.email.error) {
            setValid({
                valid: {
                    ...valid.valid,
                    email: false,
                },
                message: {
                    ...valid.message,
                    email: register.email.error
                }
            });
        }
    }, [register.email.error]);

    useEffect(() => {
        let fields = valid.valid;
        let ready = true;
        for (let field in fields) {
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
        if (readySubmit) {
            dispatch(registerAction({
                data: field
            }))
        }
    }
    return (
        <form style={{width: 450}} onSubmit={handleSubmit}>
            <AuthStyle.FormTitle>Đăng Ký</AuthStyle.FormTitle>
            <Row gutter={10} style={{position: "relative"}}>
                <Col span={12}>
                    <AuthStyle.FormGroup grid focus={fieldFocus.first_name}
                                         error={!!valid.message.first_name || !!valid.message.last_name}
                    >
                        <AuthStyle.IconWrap focus={fieldFocus.first_name}
                                            error={!!valid.message.first_name || !!valid.message.last_name}>
                            <RegisterStyle.IconCustom icon={UserOutlined}/>
                        </AuthStyle.IconWrap>
                        <AuthStyle.FormControlWrap>
                            <AuthStyle.TitleFormControl htmlFor="first_name"
                                                        focus={fieldFocus.first_name}>
                                Họ
                            </AuthStyle.TitleFormControl>
                            <AuthStyle.FormControl id="first_name" type="text" name="first_name"
                                                   value={field.first_name}
                                                   autoComplete="off"
                                                   onFocus={handleFocus}
                                                   onBlur={handleBlur}
                                                   onChange={handleChangeField}
                            />
                        </AuthStyle.FormControlWrap>
                    </AuthStyle.FormGroup>
                </Col>
                <Col span={12}>
                    <AuthStyle.FormGroup focus={fieldFocus.last_name}
                                         error={!!valid.message.first_name || !!valid.message.last_name}>
                        <div></div>
                        <AuthStyle.FormControlWrap>
                            <AuthStyle.TitleFormControl htmlFor="last_name"
                                                        focus={fieldFocus.last_name}>
                                Tên
                            </AuthStyle.TitleFormControl>
                            <AuthStyle.FormControl id="last_name" type="text" name="last_name" value={field.last_name}
                                                   autoComplete="off"
                                                   onFocus={handleFocus}
                                                   onBlur={handleBlur}
                                                   onChange={handleChangeField}
                                                   style={{width: '100%'}}
                            />
                        </AuthStyle.FormControlWrap>
                    </AuthStyle.FormGroup>
                </Col>
                <AuthStyle.InvalidMsg children={valid.message.first_name || valid.message.last_name} centerGrid/>
            </Row>

            <Row gutter={10} style={{position: "relative"}}>
                <Col span={15}>
                    <AuthStyle.FormGroup focus={fieldFocus.phone} error={!!valid.message.phone} grid>
                        <AuthStyle.IconWrap focus={fieldFocus.phone} error={!!valid.message.phone}>
                            <RegisterStyle.IconCustom icon={PhoneOutlined}/>
                        </AuthStyle.IconWrap>
                        <AuthStyle.FormControlWrap>
                            <AuthStyle.TitleFormControl htmlFor="phone" focus={fieldFocus.phone}>
                                Số điện thoại
                            </AuthStyle.TitleFormControl>
                            <AuthStyle.FormControl id="phone" type="text" name="phone" value={field.phone}
                                                   autoComplete="off"
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
                            <RegisterStyle.IconCustom icon={ManOutlined}/>
                        </AuthStyle.IconWrap>
                        <AuthStyle.FormControlWrap>
                            <RegisterStyle.SelectCustom id="gender" name="gender" defaultValue={field.gender}
                                                        onChange={(e) => {
                                                            setField({
                                                                ...field,
                                                                gender: e.target.value,
                                                            })
                                                            let invalid = validateRule('gender', e.target.value, {...valid});
                                                            setValid(invalid);
                                                        }}
                            >
                                <option value='false' disabled hidden>Giới tính</option>
                                <option value={1}>Nam</option>
                                <option value={0}>Nữ</option>
                            </RegisterStyle.SelectCustom>
                        </AuthStyle.FormControlWrap>
                    </AuthStyle.FormGroup>
                </Col>
                <AuthStyle.InvalidMsg children={valid.message.phone} leftGrid/>
            </Row>

            <AuthStyle.FormGroup focus={fieldFocus.email} error={!!valid.message.email}>
                <AuthStyle.IconWrap focus={fieldFocus.email} error={!!valid.message.email}>
                    <RegisterStyle.IconCustom icon={MailOutlined}/>
                </AuthStyle.IconWrap>
                <AuthStyle.FormControlWrap>
                    <AuthStyle.TitleFormControl htmlFor="email" focus={fieldFocus.email}>
                        Email
                    </AuthStyle.TitleFormControl>
                    <AuthStyle.FormControl id="email" type="text" name="email" value={field.email}
                                           autoComplete="off"
                                           onFocus={handleFocus}
                                           onBlur={handleBlur}
                                           onChange={handleChangeField}
                    />
                    {
                        register.email.load && <RegisterStyle.ControlLoading size="middle"/> ||
                        register.email.success && <RegisterStyle.IconCheck icon={CheckOutlined}/>
                    }
                </AuthStyle.FormControlWrap>
                <AuthStyle.InvalidMsg children={valid.message.email}/>
            </AuthStyle.FormGroup>

            <AuthStyle.FormGroup focus={fieldFocus.password} error={!!valid.message.password}>
                <AuthStyle.IconWrap focus={fieldFocus.password} error={!!valid.message.password}>
                    <RegisterStyle.IconCustom icon={LockOutlined}/>
                </AuthStyle.IconWrap>
                <AuthStyle.FormControlWrap>
                    <AuthStyle.TitleFormControl htmlFor="password" focus={fieldFocus.password}>
                        Mật khẩu
                    </AuthStyle.TitleFormControl>
                    <AuthStyle.FormControl id="password" type="password" name="password"
                                           value={field.password}
                                           onFocus={handleFocus}
                                           onBlur={handleBlur}
                                           onChange={handleChangeField}
                    />
                </AuthStyle.FormControlWrap>
                <AuthStyle.InvalidMsg children={valid.message.password}/>
            </AuthStyle.FormGroup>

            <AuthStyle.FormGroup focus={fieldFocus.confirm_password} error={!!valid.message.confirm_password}>
                <AuthStyle.IconWrap focus={fieldFocus.confirm_password} error={!!valid.message.confirm_password}>
                    <RegisterStyle.IconCustom icon={LockOutlined}/>
                </AuthStyle.IconWrap>
                <AuthStyle.FormControlWrap>
                    <AuthStyle.TitleFormControl htmlFor="confirm_password" focus={fieldFocus.confirm_password}>
                        Nhập lại mật khẩu
                    </AuthStyle.TitleFormControl>
                    <AuthStyle.FormControl id="confirm_password" type="password" name="confirm_password"
                                           value={field.confirm_password}
                                           onFocus={handleFocus}
                                           onBlur={handleBlur}
                                           onChange={handleChangeField}
                    />
                </AuthStyle.FormControlWrap>
                <AuthStyle.InvalidMsg children={valid.message.confirm_password}/>
            </AuthStyle.FormGroup>
            <RegisterStyle.CheckboxWrap>
                <RegisterStyle.CheckboxCustom name='agree' value={field.agree} error={!!valid.message.agree}
                                              onClick={(e) => {
                                                  setField({
                                                      ...field,
                                                      agree: e.target.checked,
                                                  })
                                                  let invalid = validateRule('agree', e.target.checked, {...valid});
                                                  setValid(invalid);
                                              }}>
                    Đồng ý với điều khoản của chúng tôi?
                </RegisterStyle.CheckboxCustom>
            </RegisterStyle.CheckboxWrap>
            <AuthStyle.BtnSubmit htmlType="submit" disabled={register.load}>
                Đăng ký
                <AuthStyle.SubmitLoading size="middle" show={register.load}/>
            </AuthStyle.BtnSubmit>
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
