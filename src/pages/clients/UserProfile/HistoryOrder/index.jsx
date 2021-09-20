import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { MdRemoveShoppingCart } from 'react-icons/all';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { Collapse, Pagination, Tag } from 'antd';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { Link } from 'react-router-dom';

import * as S from '../style';
import { getordersAction } from '../../../../redux/actions';
import { ROOT_PATH } from '../../../../contants';

const HistoryOrder = () => {
  const dispatch = useDispatch();
  const { accessToken } = JSON.parse(localStorage.userInfo);
  const { orderList } = useSelector(({ orderReducer }) => orderReducer);
  useEffect(() => {
    dispatch(getordersAction({
      accessToken,
    }));
  }, []);
  const getStatus = (status) => (
    <Tag color={status === 0 ? 'geekblue' : 'green'} key={status}>
      {status === 0 ? ('Chờ xử lý').toUpperCase() : ('Đang giao hàng').toUpperCase()}
    </Tag>
  );
  const moneyFormat = (money) => {
    return (
      <NumberFormat
        style={{ color: 'red' }}
        value={money}
        displayType={'text'}
        thousandSeparator
        suffix={'đ'}
      />
    );
  };
  const expandIcon = ({ expanded, onExpand, record }) =>
    expanded ? (
      <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
    ) : (
      <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
    );
  const openDetail = (record) => (
    <div>
      <S.OrderInfo>
        <p><span>Số điện thoại: </span>{record.orderPhone}</p>
        <p><span>Địa chỉ nhận: </span>{record.orderAddress}</p>
        {record.orderNote && <p><span>Ghi chú: </span>{record.orderNote}</p>}
      </S.OrderInfo>
      <Collapse expandIconPosition='right'>
        {record.detail.map(({ storeId, storeImage, storeName, storeNotMark, totalMoney, foods }) => {
          return (
            <Collapse.Panel
              key={storeId}
              header={
                <S.StoreList>
                  <div>
                    <img
                      src={`${ROOT_PATH}${storeImage}`}
                      alt={storeName}
                    />
                    <Link to={`/stores/${storeNotMark}.${storeId}`}>
                      {storeName}
                    </Link>
                  </div>
                  <div>
                    <NumberFormat
                      style={{ color: 'red' }}
                      value={totalMoney}
                      displayType={'text'}
                      thousandSeparator
                      suffix={'đ'}
                    />
                  </div>
                </S.StoreList>
              }
            >
              {foods.map((food) => {
                return (
                  <S.FoodList key={food.foodId}>
                    <div>
                      <img
                        src={`${ROOT_PATH}${food.foodImage}`}
                        alt={food.foodName}
                      />
                      {food.foodName}
                    </div>
                    <div>
                      <p>
                        <span>Giá: </span>
                        <span className='value'>
                          <NumberFormat
                            value={food.discount}
                            displayType={'text'}
                            thousandSeparator
                            suffix={'đ'}
                          />
                        </span>
                      </p>
                      <p><span>Số lượng: </span> <span className='value'>{food.quantity}</span></p>
                      <p>
                        <span>Tổng tiền: </span>
                        <span className='value'>
                          <NumberFormat
                            value={food.quantity * food.discount}
                            displayType={'text'}
                            thousandSeparator
                            suffix={'đ'}
                          />
                        </span>
                      </p>
                    </div>
                  </S.FoodList>
                );
              })}
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </div>
  );
  const columns = [
    {
      title: 'Tên người nhận',
      dataIndex: 'orderName',
      key: 'orderName',
      width: 200,
      className: 'order-name',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalMoney',
      key: 'totalMoney',
      width: 100,
      render: moneyFormat,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      className: 'order-created-at',
    },
    {
      title: 'Tình trạng',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      width: 100,
      render: getStatus,
    },
  ];
  const renderOrderList = () => {
    return orderList.data.map((orderItem) => {
      return {
        key: orderItem.id,
        orderName: orderItem.orderName,
        orderPhone: orderItem.orderPhone,
        orderAddress: orderItem.orderAddress,
        orderNote: orderItem.orderNote,
        totalMoney: orderItem.totalMoney,
        createdAt: moment(orderItem.createdAt).format('DD-MM-YY'),
        orderStatus: orderItem.orderStatus,
        detail: orderItem.detail,
      };
    });
  };
  return (
    <div>
      {
        orderList.total === 0 ?
          <S.ProfileEmpty>
            <div>
              <MdRemoveShoppingCart />
            </div>
            <div>Lịch sử giao dịch trống</div>
          </S.ProfileEmpty>
          :
          <div style={{ paddingBottom: 15 }}>
            <S.TitleContent>
              Đơn hàng đã đặt
            </S.TitleContent>
            <S.TableCustom
              loading={orderList.load}
              columns={columns}
              expandable={{
                expandedRowRender: openDetail,
                expandRowByClick: true,
                expandIcon,
                columnWidth: 20,
              }}
              pagination={false}
              dataSource={renderOrderList()}
            />
            <S.PaginationBox>
              <Pagination
                hideOnSinglePage={true}
                showLessItems={true}
                current={orderList.currentPage}
                total={orderList.total}
                pageSize={10}
                onChange={(current) => {
                  dispatch(getordersAction({
                    accessToken,
                    params: {
                      page: current,
                    },
                  }));
                }}
              />
            </S.PaginationBox>
          </div>
      }
    </div>
  );
};
export default HistoryOrder;
