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
  const { storeDetail } = useSelector((state) => state.storeReducer);

  const { userInfo } = useSelector((state) => state.userReducer);

  const [showFoodDetail, setShowFoodDetail] = useState(false);
  const [isOpen, setIsOpen] = useState(null);

  const [isShowAction, setIsShowAction] = useState({
    status: false,
    isComment: true,
  });

  const [defaultActiveMenu, setDefaultActiveMenu] = useState('food');

  document.title = storeDetail.data.store_name || TITLE.STORE_DETAIL;

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
    let open = null;
    if (storeDetail.data.openTime && storeDetail.data.closeTime) {
      const openTime = moment(storeDetail.data.openTime, 'H:m');
      const closeTime = moment(storeDetail.data.closeTime, 'H:m');
      const now = moment(moment().format('H:m'), 'H:m');
      if (now > openTime && now < closeTime) {
        open = true;
      } else {
        open = false;
      }
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
  if (!!storeDetail.error && !storeDetail.load) {
    return <Redirect to='/stores' />;
  }
  return (
    <ClientStyle.Section style={{ backgroundColor: '#eee' }}>
      <ClientStyle.Container>
        <StoreDetailStyle.MicroHeader>
          <Row>
            <Col span={10} style={{ overflow: 'hidden' }}>
              {/*main image*/}
              <StoreDetailStyle.MainImg>
                <StoreDetailStyle.ImageWrap>
                  <StoreDetailStyle.StoreImg
                    src={
                      storeDetail.load
                        ? loadAvatarStore
                        : `${ROOT_PATH}${storeDetail.data.storeAvatar}`
                    }
                    alt=''
                  />
                </StoreDetailStyle.ImageWrap>
              </StoreDetailStyle.MainImg>
            </Col>
            <Col span={14}>
              {/*main-information*/}
              <StoreDetailStyle.MainInformation>
                <StoreDetailStyle.ResCommon>
                  {storeDetail.load && (
                    <Skeleton loading={storeDetail.load} active />
                  )}
                  <Skeleton loading={storeDetail.load} title={false} active>
                    <StoreDetailStyle.MainInfoTitle>
                      <StoreDetailStyle.StoreName>
                        {storeDetail.data.storeName}
                      </StoreDetailStyle.StoreName>
                      <StoreDetailStyle.StoreCategory>
                        <small>{storeDetail.data.storeCateName}</small>
                      </StoreDetailStyle.StoreCategory>
                    </StoreDetailStyle.MainInfoTitle>

                    <StoreDetailStyle.ResSummaryPoint>
                      <StoreDetailStyle.MicroPoints>
                        <StoreDetailStyle.MicroReviewCount>
                          {storeDetail.data.avgRate === '0'
                            ? '--'
                            : storeDetail.data.avgRate}
                          {storeDetail.data.avgRate !== '0' && <AiFillStar />}
                        </StoreDetailStyle.MicroReviewCount>
                        <StoreDetailStyle.MicroReviewText>
                          Trung bình
                        </StoreDetailStyle.MicroReviewText>
                      </StoreDetailStyle.MicroPoints>
                      <StoreDetailStyle.MicroPoints>
                        <StoreDetailStyle.MicroReviewCount>
                          {storeDetail.data.totalComment}
                        </StoreDetailStyle.MicroReviewCount>
                        <StoreDetailStyle.MicroReviewText>
                          Bình luận
                        </StoreDetailStyle.MicroReviewText>
                      </StoreDetailStyle.MicroPoints>
                      <StoreDetailStyle.MicroPoints>
                        <StoreDetailStyle.MicroReviewCount>
                          {storeDetail.data.totalFood}
                        </StoreDetailStyle.MicroReviewCount>
                        <StoreDetailStyle.MicroReviewText>
                          Món ăn
                        </StoreDetailStyle.MicroReviewText>
                      </StoreDetailStyle.MicroPoints>
                      <StoreDetailStyle.MicroPoints>
                        <StoreDetailStyle.MicroReviewCount>
                          {storeDetail.data.totalRating}
                        </StoreDetailStyle.MicroReviewCount>
                        <StoreDetailStyle.MicroReviewText>
                          Lượt đánh giá
                        </StoreDetailStyle.MicroReviewText>
                      </StoreDetailStyle.MicroPoints>
                      <StoreDetailStyle.YourRate>
                        <div>
                          <Rate
                            disabled={!!storeDetail.data.userRate || !userInfo.data.id}
                            defaultValue={storeDetail.data.userRate}
                            onChange={(value) => {
                              if (checkLogin()) {
                                const { accessToken } = JSON.parse(userToken);
                                dispatch(createRateAction({
                                  accessToken,
                                  data: {
                                    storeId: storeDetail.data.id,
                                    rate: value,
                                  },
                                }));
                              }
                            }}
                          />
                        </div>
                        <StoreDetailStyle.YourRateCount>
                          {!storeDetail.data.userRate
                            ? '--'
                            : storeDetail.data.userRate}
                          {!!storeDetail.data.userRate && <AiFillStar />}
                        </StoreDetailStyle.YourRateCount>
                        <StoreDetailStyle.YourRateText>
                          Đánh giá của bạn
                        </StoreDetailStyle.YourRateText>
                      </StoreDetailStyle.YourRate>
                    </StoreDetailStyle.ResSummaryPoint>
                    <div>
                      <StoreDetailStyle.StoreAddress>
                        <TiLocationArrow />
                        <span>{storeDetail.data.storeAddress}</span>
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
                            &nbsp;{storeDetail.data.openTime} -{' '}
                            {storeDetail.data.closeTime}
                          </span>
                        )}
                      </StoreDetailStyle.StoreTime>

                      <StoreDetailStyle.StoreTime>
                        <MdDescription />
                        <span>{storeDetail.data.storeDescription}</span>
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
              <Affix offsetTop={59.188}>
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
                    icon={<MdNavigateNext />}
                    onClick={() => {
                      setDefaultActiveMenu('food');
                      history.push(
                        `/stores/${storeDetail.data.storeNotMark}.${storeDetail.data.id}`,
                      );
                    }}
                  >
                    Món ăn
                  </Menu.Item>
                  <Menu.Item
                    key='promotion'
                    icon={<MdNavigateNext />}
                    onClick={() => {
                      setDefaultActiveMenu('promotion');
                      history.push(
                        `/stores/${storeDetail.data.storeNotMark}.${storeDetail.data.id}/promotion`,
                      );
                    }}
                  >
                    Khuyến mãi
                  </Menu.Item>
                  <Menu.Item
                    key='comment'
                    icon={<MdNavigateNext />}
                    onClick={() => {
                      setDefaultActiveMenu('comment');
                      history.push(
                        `/stores/${storeDetail.data.storeNotMark}.${storeDetail.data.id}/comment`,
                      );
                    }}
                  >
                    Bình luận
                  </Menu.Item>
                  <Menu.Item
                    key='picture'
                    icon={<MdNavigateNext />}
                    onClick={() => {
                      setDefaultActiveMenu('picture');
                      history.push(
                        `/stores/${storeDetail.data.storeNotMark}.${storeDetail.data.id}/picture`,
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
                storeId={storeDetail.data.id}
                avgRate={storeDetail.data.avgRate}
                avatar={storeDetail.data.storeAvatar}
                address={storeDetail.data.storeAddress}
                storeName={storeDetail.data.storeName}
              />
              <Affix offsetTop={59.188}>
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
                      <BsFillBookmarkFill /> Bộ sưu tập
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
                  <StoreDetailPicture storeId={storeDetail.data.id} />
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
