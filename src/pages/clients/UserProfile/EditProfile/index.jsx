import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import * as S from '../style';
import history from '../../../../utils/history';
import { getAddressAction, getDistrictsAction, getWardsAction } from '../../../../redux/actions';

const EditProfile = () => {
  const dispatch = useDispatch();
  const [userForm] = Form.useForm();
  const { userInfo } = useSelector(({ userReducer }) => userReducer);
  const { provinces, districts, wards } = useSelector(({ addressReducer }) => addressReducer);
  useEffect(() => {
    dispatch(getAddressAction({
      provinceCode: userInfo.data.provinceCode,
      districtCode: userInfo.data.districtCode,
    }));
  }, []);

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
            Cập nhật tài khoản
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
            firstName: userInfo.data.firstName,
            lastName: userInfo.data.lastName,
            email: userInfo.data.email,
            phone: userInfo.data.phone,
            gender: userInfo.data.gender,
            birthday: moment(userInfo.data.birthday),
            description: userInfo.data.description,
            address: {
              province: userInfo.data.provinceCode,
              district: userInfo.data.districtCode,
              ward: userInfo.data.wardCode,
              street: (userInfo.data.address.split('-').length === 4 ? userInfo.data.address.split('-')[0].trim() : null),
            },
          }}
          autoComplete='off'
        >
          <Form.Item
            label='Họ và tên:' style={{ marginBottom: 0 }}
          >
            <Form.Item
              name='firstName'
              rules={[{ required: true, message: 'Please input your username!' }]}
              style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}
            >
              <Input placeholder='Họ' />
            </Form.Item>
            <Form.Item
              name='lastName'
              rules={[{ required: true, message: 'Please input your username!' }]}
              style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '0 0 0 8px' }}
            >
              <Input placeholder='Tên' />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item
            label='Số điện thoại'
            name='phone'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input placeholder='Số điện thoại' />
          </Form.Item>
          <Form.Item
            label='Địa chỉ'
            name='address'
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ marginBottom: 0 }}
          >
            <Input.Group>
              <Row gutter={3}>
                <Col span={12}>
                  <Form.Item
                    name={['address', 'province']}
                    // rules={[{ required: true, message: 'Province is required' }]}
                  >
                    <Select
                      placeholder='--Tỉnh--'
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
                      {renderAddressInfo(provinces.data)}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name={['address', 'district']}
                    // rules={[{ required: true, message: 'Province is required' }]}
                  >
                    <Select
                      placeholder='--Quận/Huyện--'
                      style={{ width: '100%' }}
                      disabled={districts.load}
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
                      {renderAddressInfo(districts.data)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={3}>
                <Col span={12}>
                  <Form.Item
                    name={['address', 'ward']}
                    // rules={[{ required: true, message: 'Province is required' }]}
                  >
                    <Select
                      placeholder='--Phường/Xã--'
                      style={{ width: '100%' }}
                      disabled={wards.data.length === 0}
                    >
                      {renderAddressInfo(wards.data)}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name={['address', 'street']}
                    rules={[{ required: true, message: 'Street is required' }]}
                  >
                    <Input placeholder='Đường / Thôn xóm' />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Form.Item>

          <Form.Item
            label='Giới tính'
            name='gender'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select>
              <Select.Option value={1}>Nam</Select.Option>
              <Select.Option value={0}>Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label='Ngày sinh'
            name='birthday'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <DatePicker
              format={(value) => value.format('DD/MM/YYYY')}
              defaultValue={moment('01/01/2015', 'DD/MM/YYYY')}
              locale={{
                'lang': {
                  'locale': 'vi',
                  'placeholder': 'Ngày sinh',
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
            label='Mô tả bản thân'
            name='description'
          >
            <Input.TextArea placeholder='Hãy viết gì đó về bản thân....' style={{ resize: 'none' }} rows={5} />
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
                Cập nhập
              </Button>
              <Button onClick={() => history.push('/profile/user-info')}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </S.UserProfile>;
    </div>
  );
};
export default EditProfile;
