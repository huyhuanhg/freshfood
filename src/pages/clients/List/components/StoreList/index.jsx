import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { MdRemoveShoppingCart } from 'react-icons/all';
import { Button, Col, Menu, message, Row, Select, Spin } from 'antd';

import * as S from '../../style';

import StoreItem from '../../../../../components/clients/StoreItem';
import history from '../../../../../utils/history';
import { getCategoryListAction, getStoresAction } from '../../../../../redux/actions';
import { Filter as FilterStyle } from '../../../../../styles';
import { PATH, TITLE } from '../../../../../contants';

const StoreList = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const { categories: { data: categories } } = useSelector(({ categoryReducer }) => categoryReducer);
  const {
    storeList: {
      currentPage,
      data: storeData,
      lastPage,
      load,
      total,
    },
  } = useSelector(({ storeReducer }) => storeReducer);
  const { userInfo } = useSelector(({ userReducer }) => userReducer);

  const [menuActive, setMenuActive] = useState('created_at');
  const [request, setRequest] = useState(null);
  const [sortAvgType, setSortAvgType] = useState(0);

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  useEffect(() => {
    const { pathname, search } = history.location;
    document.title = TITLE(pathname);
    const { origin } = window.location;
    const url = new URL(`${origin}/${pathname}${search}`);
    const searchKey = url.searchParams.get('search');
    let foodRequest = {
      ...request,
      group: null,
      sort: pathname === PATH.CROWDED ? 'total_order' : 'created_at',
      sortType: -1,
      page: 1,
      category: 0,
    };
    if (pathname === PATH.STORE) {
      foodRequest = {
        ...foodRequest,
        search: searchKey,
      };
    }
    setMenuActive('created_at');
    setRequest(foodRequest);
  }, [history.location.pathname, history.location.search]);

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
    return storeData.map((store) => {
      return (
        <Col xs={12} sm={8} lg={span} md={8} key={store.id}>
          <StoreItem {...store} />
        </Col>
      );
    });
  };
  const renderCategories = () => {
    return categories.map(({ categoryActive, id, storeCateName }) => {
      if (categoryActive === 1) {
        return <Option value={id} key={id}>{storeCateName}</Option>;
      }
    });
  };
  return (
    <div>
      <S.AffixIndex offsetTop={88.375} className='store-list'>
        <FilterStyle>
          <S.PrefixFilter>
            <Menu
              mode='horizontal'
              selectedKeys={[menuActive]}
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
                    page: 1,
                  });
                }}
              >
                Mới nhất
              </Menu.Item>
              <Menu.Item
                key='bookmark'
                onClick={({ key }) => {
                  if (userInfo.data.id) {
                    setMenuActive(key);
                    setRequest({
                      ...request,
                      group: key,
                      page: 1,
                    });
                  } else {
                    message.error('Vui lòng đăng nhập!');
                  }
                }}
              >
                Đã lưu
              </Menu.Item>
            </Menu>
          </S.PrefixFilter>
          <S.SuffixFilter>
            <li className='category-filter'>
              <Select
                value={request?.category}
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(value) => {
                  setRequest({
                    ...request,
                    category: value,
                    page: 1,
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
            <li className='sort-by'>
              <Select
                value={sortAvgType}
                style={{ margin: '0 5px' }}
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
                    page: 1,
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
          </S.SuffixFilter>
        </FilterStyle>
      </S.AffixIndex>
      <div className='p-relative pt-2r' style={{ minHeight: '500px' }}>
        {total === 0
          ?
          <div
            className='d-flex vertical-center horizontal-center fw-b t-center'
            style={{
              minHeight: '500px',
              fontSize: '150%',
            }}
          >
            <div>
              <MdRemoveShoppingCart
                style={{
                  color: '#f5222d',
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
          load &&
          <Spin
            size='large'
            className='p-absolute'
            style={{
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -200%)',
            }}
          />
        }
        {currentPage < lastPage &&
        <div className='d-flex vertical-center horizontal-center mt-3r'>
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
