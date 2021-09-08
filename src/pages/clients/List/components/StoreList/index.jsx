import { Button, Col, Menu, Row, Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as S from '../../style';
import StoreItem from '../../../../../components/clients/StoreItem';
import { MdRemoveShoppingCart } from 'react-icons/all';
import { useEffect, useState } from 'react';
import history from '../../../../../utils/history';
import { getStoresAction } from '../../../../../redux/actions';

const StoreList = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer);
  const { storeList } = useSelector((state) => state.storeReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const [menuActive, setMenuActive] = useState('created_at');
  const [request, setRequest] = useState(null);
  const [sortAvgType, setSortAvgType] = useState(0);

  useEffect(() => {
    const { pathname, search } = history.location;
    const { origin } = window.location;
    const url = new URL(`${origin}/${pathname}${search}`);
    const searchKey = url.searchParams.get('search');
    let foodRequest = {
      ...request,
      group: null,
      sort: pathname === '/crowded' ? 'total_order' : 'created_at',
      sortType: -1,
      page: 1,
      category: 0,
    };
    if (pathname === '/stores') {
      foodRequest = {
        ...foodRequest,
        search: searchKey,
      };
    }
    setMenuActive('created_at');
    setRequest(foodRequest);
  }, [history.location.pathname]);

  useEffect(() => {
    if (request) {
      if (request?.group !== 'bookmark') {
        dispatch(getStoresAction(request));
      }
    }
  }, [request]);

  useEffect(() => {
    if (userInfo.data.id && request?.group === 'bookmark') {
      dispatch(getStoresAction({
        ...request,
        user: userInfo.data.id,
      }));
    }
  }, [userInfo, request]);

  const renderStore = (span = 4) => {
    return storeList.data.map((store) => {
      return (
        <Col span={span} key={store.id}>
          <StoreItem {...store} />
        </Col>
      );
    });
  };
  const renderCategories = () => {
    return categories.data.map((cate) => {
      if (cate.categoryActive === 1) {
        return <Option value={cate.id}>{cate.storeCateName}</Option>;
      }
    });
  };
  return (
    <div>
      <S.AffixIndex offsetTop={52.7}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#ddd',
          }}
        >
          <Menu
            mode='horizontal'
            selectedKeys={[menuActive]}
            style={{
              flexBasis: '50%',
            }}
          >
            <Menu.Item
              key='created_at'
              onClick={({ key }) => {
                setMenuActive(key);
                setSortAvgType(0);
                setRequest({
                  ...request,
                  group: null,
                  sort: key,
                  sortType: -1,
                });
              }}
            >
              Mới nhất
            </Menu.Item>
            <Menu.Item
              key='bookmark'
              onClick={({ key }) => {
                setMenuActive(key);
                setRequest({
                  ...request,
                  group: key,
                });
              }}
            >
              Đã lưu
            </Menu.Item>
          </Menu>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
              paddingRight: '20px',
              margin: 0,
            }}
          >
            <li>
              <Select
                value={request?.category}
                style={{ width: 160, margin: '0 5px' }}
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(value) => {
                  setRequest({
                    ...request,
                    category: value,
                  });
                }
                }
              >
                < Option value={0} selected hidden disabled>
                  -Danh mục-
                </Option>
                {renderCategories()}
              </Select>
            </li>
            <li>
              <Select
                value={sortAvgType}
                style={{ width: 160 }}
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(value) => {
                  if (menuActive === 'created_at') {
                    setMenuActive(null);
                  }
                  setSortAvgType(value);
                  setRequest({
                    ...request,
                    sort: 'avg_rate',
                    sortType: value,
                  });
                }}
              >
                <Option value={0} selected hidden disabled>
                  -Đánh giá-
                </Option>
                <Option value='1'>Đánh giá tăng dần</Option>
                <Option value='-1'>Đánh giá giảm dần</Option>
              </Select>
            </li>
          </ul>
        </div>
      </S.AffixIndex>
      <div
        style={{
          paddingTop: 20,
          position: 'relative',
          minHeight: '500px',
        }}
      >
        {storeList.total === 0
          ?
          <div
            style={{
              minHeight: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '150%',
              fontWeight: 'bold',
            }}
          >
            <div>
              <MdRemoveShoppingCart
                style={{
                  color: 'red',
                  fontSize: '200%',
                }}
              /><br />
              Không có cửa hàng nào!
            </div>
          </div>
          :
          (
            <Row gutter={[16, 16]}>
              {renderStore(6)}
            </Row>
          )

        }
        {
          storeList.load &&
          <Spin
            size='large'
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -200%)',
            }}
          />
        }
        {storeList.currentPage < storeList.lastPage &&
        <div
          style={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Button
            onClick={() => setRequest({
              ...request,
              page: request?.page + 1,
            })}
          >
            Xem thêm
          </Button>
        </div>
        }
      </div>
    </div>
  );
};
export default StoreList;
