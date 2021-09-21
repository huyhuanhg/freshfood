import {
  Affix,
  Col,
  Menu,
  Rate,
  Row,
  Skeleton,
} from 'antd';
import PropTypes from 'prop-types';
import {
  AiFillStar,
  BiTime,
  BsFillBookmarkFill,
  FaCommentDots,
  FaPhoneAlt,
  FaShareAlt,
  MdDescription,
  MdNavigateNext,
  TiLocationArrow,
} from 'react-icons/all';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Redirect, Route, Switch } from 'react-router-dom';
import StoreDetailFood from './componets/StoreDetailFood';
import loadAvatarStore from '../../../assets/images/loadStore.png';
import * as ClientStyle from '../styles';
import * as StoreDetailStyle from './style';
import { ROOT_PATH, TITLE } from '../../../contants';
import history from '../../../utils/history';
import StoreDetailComment from './componets/StoreDetailComment';
import StoreDetailPicture from './componets/StoreDetailPicture';
import ModalStoreDetail from '../../../components/clients/ModalStoreDetail';
import { createRateAction, getStoreDetailAction } from '../../../redux/actions';

const StoreDetail = ({ setShowLogin, match }) => {
  const dispatch = useDispatch();
  const {
    storeDetail: {
      data: storeDetail,
      error: storeDetailError,
      load: storeDetailLoad,
    },
  } = useSelector(({ storeReducer }) => storeReducer);

  const { userInfo } = useSelector(({ userReducer }) => userReducer);

  const [showFoodDetail, setShowFoodDetail] = useState(false);
  const [isOpen, setIsOpen] = useState(null);

  const [isShowAction, setIsShowAction] = useState({
    status: false,
    isComment: true,
  });

  const [defaultActiveMenu, setDefaultActiveMenu] = useState('food');

  document.title = storeDetail.storeName || TITLE.STORE_DETAIL;

  const userToken = localStorage.userInfo;

  useEffect(() => {
    const pathArr = history.location.pathname.replace('/stores/', '').split('/');
    const content = pathArr[1];
    if (pathArr.length > 1 && content !== '') {
      setDefaultActiveMenu(content);
    }
  }, []);
  useEffect(() => {
    const request = {
      slug: match.params.slug,
    };
    if (!userToken || userInfo.error) {
      dispatch(getStoreDetailAction(request));
    } else {
      if (userInfo.data.id) {
        dispatch(
          getStoreDetailAction({
            ...request,
            user: userInfo.data.id,
          }),
        );
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (storeDetail.openTime && storeDetail.closeTime) {
      const openTime = moment(storeDetail.openTime, 'H:m');
      const closeTime = moment(storeDetail.closeTime, 'H:m');
      const now = moment(moment().format('H:m'), 'H:m');
      const open = now > openTime && now < closeTime;
      setIsOpen(open);
    }
  }, [storeDetail]);
  const checkLogin = () => {
    if (!userInfo.data.id) {
      setShowLogin(true);
    } else {
      return true;
    }
  };
  if (!!storeDetailError && !storeDetailLoad) {
    return <Redirect to='/stores' />;
  }
  return (
    <ClientStyle.Section style={{ backgroundColor: '#eee' }}>
      <ClientStyle.Container>
        <StoreDetailStyle.MicroHeader>
          <Row>
            <Col span={10} style={{ overflow: 'hidden' }}>
              <StoreDetailStyle.MainImg>
                <StoreDetailStyle.ImageWrap>
                  <StoreDetailStyle.StoreImg
                    src={
                      storeDetailLoad
                        ? loadAvatarStore
                        : `${ROOT_PATH}${storeDetail.storeImage}`
                    }
                    alt=''
                  />
                </StoreDetailStyle.ImageWrap>
              </StoreDetailStyle.MainImg>
            </Col>
            <Col span={14}>
              <StoreDetailStyle.MainInformation>
                <StoreDetailStyle.ResCommon>
                  {storeDetailLoad && (
                    <Skeleton loading={storeDetailLoad} active />
                  )}
                  <Skeleton loading={storeDetailLoad} title={false} active>
                    <StoreDetailStyle.MainInfoTitle>
                      <StoreDetailStyle.StoreName>
                        {storeDetail.storeName}
                      </StoreDetailStyle.StoreName>
                      <StoreDetailStyle.StoreCategory>
                        <small>{storeDetail.storeCateName}</small>
                      </StoreDetailStyle.StoreCategory>
                    </StoreDetailStyle.MainInfoTitle>

                    <StoreDetailStyle.ResSummaryPoint>
                      <StoreDetailStyle.MicroPoints>
                        <StoreDetailStyle.MicroReviewCount>
                          {storeDetail.avgRate === '0'
                            ? '--'
                            : storeDetail.avgRate}
                          {storeDetail.avgRate !== '0' && <AiFillStar />}
                        </StoreDetailStyle.MicroReviewCount>
                        <StoreDetailStyle.MicroReviewText>
                          Trung bình
                        </StoreDetailStyle.MicroReviewText>
                      </StoreDetailStyle.MicroPoints>
                      <StoreDetailStyle.MicroPoints>
                        <StoreDetailStyle.MicroReviewCount>
                          {storeDetail.totalComment}
                        </StoreDetailStyle.MicroReviewCount>
                        <StoreDetailStyle.MicroReviewText>
                          Bình luận
                        </StoreDetailStyle.MicroReviewText>
                      </StoreDetailStyle.MicroPoints>
                      <StoreDetailStyle.MicroPoints>
                        <StoreDetailStyle.MicroReviewCount>
                          {storeDetail.totalFood}
                        </StoreDetailStyle.MicroReviewCount>
                        <StoreDetailStyle.MicroReviewText>
                          Món ăn
                        </StoreDetailStyle.MicroReviewText>
                      </StoreDetailStyle.MicroPoints>
                      <StoreDetailStyle.MicroPoints>
                        <StoreDetailStyle.MicroReviewCount>
                          {storeDetail.totalRating}
                        </StoreDetailStyle.MicroReviewCount>
                        <StoreDetailStyle.MicroReviewText>
                          Lượt đánh giá
                        </StoreDetailStyle.MicroReviewText>
                      </StoreDetailStyle.MicroPoints>
                      <StoreDetailStyle.YourRate>
                        <div>
                          <Rate
                            disabled={!!storeDetail.userRate || !userInfo.data.id}
                            defaultValue={storeDetail.userRate}
                            onChange={(value) => {
                              if (checkLogin()) {
                                const { accessToken } = JSON.parse(userToken);
                                dispatch(createRateAction({
                                  accessToken,
                                  data: {
                                    storeId: storeDetail.id,
                                    rate: value,
                                  },
                                }));
                              }
                            }}
                          />
                        </div>
                        <StoreDetailStyle.YourRateCount>
                          {!storeDetail.userRate
                            ? '--'
                            : storeDetail.userRate}
                          {!!storeDetail.userRate && <AiFillStar />}
                        </StoreDetailStyle.YourRateCount>
                        <StoreDetailStyle.YourRateText>
                          Đánh giá của bạn
                        </StoreDetailStyle.YourRateText>
                      </StoreDetailStyle.YourRate>
                    </StoreDetailStyle.ResSummaryPoint>
                    <div>
                      <StoreDetailStyle.StoreAddress>
                        <TiLocationArrow />
                        <span>{storeDetail.storeAddress}</span>
                      </StoreDetailStyle.StoreAddress>
                      <StoreDetailStyle.StoreTime>
                        <BiTime />

                        {isOpen === null ? (
                          <span className='itsopen' title=''>
                            Luôn mở cửa
                          </span>
                        ) : isOpen ? (
                          <span className='itsopen' title=''>
                            Đang mở cửa
                          </span>
                        ) : (
                          <span className='itsclosed' title=''>
                            Chưa mở cửa
                          </span>
                        )}
                        {isOpen !== null && (
                          <span>
                            &nbsp;{storeDetail.openTime} -{' '}
                            {storeDetail.closeTime}
                          </span>
                        )}
                      </StoreDetailStyle.StoreTime>

                      <StoreDetailStyle.StoreTime>
                        <MdDescription />
                        <span>{storeDetail.storeDescription}</span>
                      </StoreDetailStyle.StoreTime>
                    </div>
                  </Skeleton>
                </StoreDetailStyle.ResCommon>
              </StoreDetailStyle.MainInformation>
            </Col>
          </Row>
        </StoreDetailStyle.MicroHeader>
        <StoreDetailStyle.MicroMainMenu>
          <Row gutter={20}>
            <Col span={4}>
              <Affix offsetTop={61.188}>
                <Menu
                  theme='light'
                  style={{
                    background: '#fff',
                    height: 'auto',
                  }}
                  selectedKeys={[defaultActiveMenu]}
                  mode='inline'
                >
                  <Menu.Item
                    key='food'
                    icon={<MdNavigateNext className='custom-icon-position' />}
                    onClick={() => {
                      setDefaultActiveMenu('food');
                      history.push(
                        `/stores/${storeDetail.storeNotMark}.${storeDetail.id}`,
                      );
                    }}
                  >
                    Món ăn
                  </Menu.Item>
                  <Menu.Item
                    key='promotion'
                    icon={<MdNavigateNext className='custom-icon-position' />}
                    onClick={() => {
                      setDefaultActiveMenu('promotion');
                      history.push(
                        `/stores/${storeDetail.storeNotMark}.${storeDetail.id}/promotion`,
                      );
                    }}
                  >
                    Khuyến mãi
                  </Menu.Item>
                  <Menu.Item
                    key='comment'
                    icon={<MdNavigateNext className='custom-icon-position' />}
                    onClick={() => {
                      setDefaultActiveMenu('comment');
                      history.push(
                        `/stores/${storeDetail.storeNotMark}.${storeDetail.id}/comment`,
                      );
                    }}
                  >
                    Bình luận
                  </Menu.Item>
                  <Menu.Item
                    key='picture'
                    icon={<MdNavigateNext className='custom-icon-position' />}
                    onClick={() => {
                      setDefaultActiveMenu('picture');
                      history.push(
                        `/stores/${storeDetail.storeNotMark}.${storeDetail.id}/picture`,
                      );
                    }}
                  >
                    Hình ảnh
                  </Menu.Item>
                </Menu>
              </Affix>
            </Col>
            <Col span={20} style={{ minHeight: '300px' }}>
              <ModalStoreDetail
                isShow={isShowAction.status}
                setShow={setIsShowAction}
                isComment={isShowAction.isComment}
                storeId={storeDetail.id}
                slug={match.params.slug}
                avgRate={storeDetail.avgRate}
                image={storeDetail.storeImage}
                address={storeDetail.storeAddress}
                storeName={storeDetail.storeName}
              />
              <Affix offsetTop={61.188}>
                <StoreDetailStyle.StoreToolbar>
                  <ul>
                    <li>
                      <FaPhoneAlt /> Gọi điện thoại
                    </li>
                    <li onClick={() => {
                      if (checkLogin()) {
                        setIsShowAction({ status: true, isComment: true });
                      }
                    }}>
                      <FaCommentDots /> Bình luận
                    </li>
                    <li onClick={() => {
                      if (checkLogin()) {
                        setIsShowAction({ status: true, isComment: false });
                      }
                    }}>
                      <BsFillBookmarkFill /> Lưu bộ sưu tập
                    </li>
                    <li>
                      <FaShareAlt /> Chia sẻ
                    </li>
                  </ul>
                </StoreDetailStyle.StoreToolbar>
              </Affix>
              <Switch>
                <Route exact path='/stores/:slug'>
                  <StoreDetailFood
                    showFoodDetail={showFoodDetail}
                    setShowLogin={setShowLogin}
                    setShowFoodDetail={setShowFoodDetail}
                    slug={match.params.slug}

                  />
                </Route>
                <Route exact path='/stores/:slug/comment'>
                  <StoreDetailComment
                    slug={match.params.slug}
                    checkLogin={checkLogin}
                    setShowLogin={setShowLogin}
                    setShowComment={setIsShowAction}
                  />
                </Route>
                <Route exact path='/stores/:slug/promotion'>
                  <StoreDetailFood
                    showFoodDetail={showFoodDetail}
                    setShowFoodDetail={setShowFoodDetail}
                    setShowLogin={setShowLogin}
                    slug={match.params.slug}
                  />
                </Route>
                <Route exact path='/stores/:slug/picture'>
                  <StoreDetailPicture slug={match.params.slug} />
                </Route>
                <Route
                  render={() => {
                    return <Redirect to='/stores' />;
                  }}
                />
              </Switch>
            </Col>
          </Row>
        </StoreDetailStyle.MicroMainMenu>
      </ClientStyle.Container>
    </ClientStyle.Section>
  );
};
export default StoreDetail;

StoreDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }),
  setShowLogin: PropTypes.func.isRequired,
};
