import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Spin } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import * as S from '../style';
import history from '../../../../utils/history';
import {
  checkEmailExistsAction,
  getAddressAction,
  getDistrictsAction,
  getWardsAction,
  updateUserAction,
} from '../../../../redux/actions';
import { shortAddress } from '../../../../utils/address';
import { PAGE_TITLE } from '../../../../contants';

const EditProfile = () => {
  const userToken = localStorage.userInfo;
  const dispatch = useDispatch();
  const [userForm] = Form.useForm();
  const {
    userInfo: {
      data: {
        address: userAddress,
        birthday,
        description,
        districtCode,
        email: currentEmail,
        firstName,
        gender,
        lastName,
        phone,
        provinceCode,
        wardCode,
      },
    }, responseAction: { checkEmail, update: { load: updateLoad } },
  } = useSelector(({ userReducer }) => userReducer);
  const {
    provinces: { data: provinces },
    districts: { data: districts, load: districtLoad },
    wards: { data: wards },
  } = useSelector(({ addressReducer }) => addressReducer);

  useEffect(() => {
    document.title = PAGE_TITLE.USER_UPDATE;
    dispatch(getAddressAction({
      provinceCode: provinceCode,
      districtCode: districtCode,
    }));
  }, []);

  useEffect(() => {
    if (checkEmail.error) {
      userForm.setFields([{
        name: 'email',
        errors: [checkEmail.error],
      }]);
    }
  }, [checkEmail]);

  const checkEmailExits = () => {
    const email = userForm.getFieldValue('email');
    if (email !== currentEmail) {
      dispatch(checkEmailExistsAction({
        data: { email },
      }));
    }
  };
  const renderAddressInfo = (typeList) => {
    return typeList.map((typeListItem) => {
      return (
        <Select.Option key={typeListItem.code} value={typeListItem.code}>{typeListItem.name}</Select.Option>
      );
    });
  };
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
            C???p nh???t t??i kho???n
          </h3>
        </Col>
      </Row>
      <S.UserProfile>
        <Form
          name='update-user'
          form={userForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          initialValues={{
            firstName: firstName,
            lastName: lastName,
            email: currentEmail,
            phone: phone,
            gender: gender,
            birthday: birthday && moment(birthday),
            description: description,
            address: {
              province: provinceCode,
              district: districtCode,
              ward: wardCode,
              street: (userAddress?.split('-').length === 4 ? userAddress?.split('-')[0].trim() : null),
            },
          }}
          onFinish={(value) => {
            const { accessToken } = JSON.parse(userToken);
            dispatch(updateUserAction({
              accessToken,
              data: {
                ...value,
                provinceCode: value.address.province,
                districtCode: value.address.district,
                wardCode: value.address.ward,
                address: shortAddress(value.address, provinces, districts, wards),
                birthday: value.birthday.format('YYYY-MM-DD'),
              },
            }));
          }}
          autoComplete='off'
        >
          <Form.Item
            label='H??? v?? t??n:' style={{ marginBottom: 0 }}
          >
            <Form.Item
              name='firstName'
              rules={[{ required: true, message: 'Vui l??ng nh???p h???!' }]}
              style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}
            >
              <Input placeholder='H???' />
            </Form.Item>
            <Form.Item
              name='lastName'
              rules={[{ required: true, message: 'Vui l??ng nh???p t??n!' }]}
              style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '0 0 0 8px' }}
            >
              <Input placeholder='T??n' />
            </Form.Item>
          </Form.Item>
          <div style={{ position: 'relative' }}>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: 'Vui l??ng nh???p email' },
                {
                  pattern: new RegExp(
                    '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
                  ),
                  message: '?????nh d???ng email kh??ng ????ng!',
                },
              ]}
              onBlur={checkEmailExits}
            >
              <Input placeholder='Email' />
            </Form.Item>
            {checkEmail.load &&
            <Spin
              style={{
                position: 'absolute',
                top: '50%',
                left: '85%',
                transform: 'translateY(-50%)',
              }}
            />
            }
          </div>
          <Form.Item
            label='S??? ??i???n tho???i'
            name='phone'
            rules={[
              { required: true, message: 'Vui l??ng nh???p s??? ??i???n tho???i' },
              {
                pattern: new RegExp('^(0|\\+84)[3|5|7|8|9][\\d+]{8}$'),
                message: '?????nh d???ng kh??ng h???p l??? (0... / +84...)',
              },
            ]}
          >
            <Input placeholder='S??? ??i???n tho???i' />
          </Form.Item>
          <Form.Item
            label='?????a ch???'
            name='address'
            style={{ marginBottom: 0 }}
          >
            <Input.Group>
              <Row gutter={3}>
                <Col span={12}>
                  <Form.Item
                    name={['address', 'province']}
                    rules={[{ required: true, message: 'Ch???n T???nh / Th??nh ph???!' }]}
                  >
                    <Select
                      placeholder='--T???nh--'
                      style={{ width: '100%' }}
                      onChange={(value) => {
                        dispatch(getDistrictsAction({
                          provinceCode: value,
                        }));
                        userForm.setFieldsValue({
                          address: {
                            district: null,
                            ward: null,
                          },
                        });
                      }}
                    >
                      {renderAddressInfo(provinces)}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name={['address', 'district']}
                    rules={[{ required: true, message: 'Ch???n Qu???n / Huy???n!' }]}
                  >
                    <Select
                      placeholder='--Qu???n/Huy???n--'
                      style={{ width: '100%' }}
                      disabled={districtLoad}
                      onChange={(value) => {
                        dispatch(getWardsAction({
                          districtCode: value,
                        }));
                        userForm.setFieldsValue({
                          address: {
                            ward: null,
                          },
                        });
                      }}
                    >
                      {renderAddressInfo(districts)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={3}>
                <Col span={12}>
                  <Form.Item
                    name={['address', 'ward']}
                    rules={[{ required: true, message: 'Ch???n X?? / Ph?????ng!' }]}
                  >
                    <Select
                      placeholder='--Ph?????ng/X??--'
                      style={{ width: '100%' }}
                      disabled={wards.length === 0}
                    >
                      {renderAddressInfo(wards)}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name={['address', 'street']}
                    rules={[{ required: true, message: 'Ch???n ???????ng / Th??n!' }]}
                  >
                    <Input placeholder='???????ng / Th??n x??m' />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Form.Item>

          <Form.Item
            label='Gi???i t??nh'
            name='gender'
            rules={[{ required: true, message: 'Vui l??ng ch???n gi???i t??nh!' }]}
          >
            <Select>
              <Select.Option value={1}>Nam</Select.Option>
              <Select.Option value={0}>N???</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label='Ng??y sinh'
            name='birthday'
            rules={[
              () => ({
                validator(_, value) {
                  if (moment().valueOf() > moment(value).valueOf()) {
                    return Promise.resolve();
                  }
                  if (!value) {
                    return Promise.reject('Vui l??ng ch???n ng??y sinh!');
                  }
                  return Promise.reject('Ng??y sinh kh??ng h???p l???!');
                },
              }),
            ]}
          >
            <DatePicker
              format={(value) => value.format('DD/MM/YYYY')}
              onClick={() => {
                const birthday = userForm.getFieldValue('birthday');
                if (!birthday) {
                  userForm.setFieldsValue({ birthday: moment('01/01/1970', 'DD/MM/YYYY') });
                }
              }}
              locale={{
                'lang': {
                  'locale': 'vi',
                  'placeholder': 'Ng??y sinh',
                  'today': 'Today',
                  'now': 'Now',
                  'backToToday': 'Back to today',
                  'ok': 'Ok',
                  'clear': 'Clear',
                  'month': 'Month',
                  'year': 'Year',
                  'timeSelect': 'Select time',
                  'dateSelect': 'Select date',
                  'monthSelect': 'Choose a month',
                  'yearSelect': 'Choose a year',
                  'decadeSelect': 'Choose a decade',
                  'yearFormat': 'YYYY',
                  'dateFormat': 'D/M/YYYY',
                  'dayFormat': 'D',
                  'dateTimeFormat': 'M/D/YYYY HH:mm:ss',
                  'monthFormat': 'MMMM',
                  'monthBeforeYear': true,
                  'previousMonth': 'Previous month (PageUp)',
                  'nextMonth': 'Next month (PageDown)',
                  'previousYear': 'Last year (Control + left)',
                  'nextYear': 'Next year (Control + right)',
                  'previousDecade': 'Last decade',
                  'nextDecade': 'Next decade',
                  'previousCentury': 'Last century',
                  'nextCentury': 'Next century',
                },
              }}
            />
          </Form.Item>

          <Form.Item
            label='M?? t??? b???n th??n'
            name='description'
          >
            <Input.TextArea placeholder='H??y vi???t g?? ???? v??? b???n th??n....' style={{ resize: 'none' }} rows={5} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button
                disabled={updateLoad}
                style={{
                  background: '#3380d8',
                  color: 'white',
                }}
                htmlType='submit'
              >
                C???p nh???p
              </Button>
              <Button onClick={() => history.push('/profile/user-info')}>H???y</Button>
              {updateLoad && <Spin />}
            </Space>
          </Form.Item>
        </Form>
      </S.UserProfile>;
    </div>
  );
};
export default EditProfile;
