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
import { DYNAMIC, PAGE_TITLE, PATH, ROOT_PATH } from '../../../contants';
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

  const [defaultActiveMenu, setDefaultActiveMenu] = useState(PATH.STORE_MENU_FOOD);

  document.title = storeDetail.storeName || PAGE_TITLE.STORE_DETAIL;

  const userToken = localStorage.userInfo;

  useEffect(() => {
    const pathArr = history.location.pathname.replace(`${PATH.STORE}/`, '').split('/');
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
    return <Redirect to={PATH.STORE} />;
  }
  return (
    <ClientStyle.Section style={{ backgroundColor: '#eee' }}>
      <ClientStyle.Container>
        <StoreDetailStyle.MicroHeader>
          <Row>
            <Col lg={10} md={10} sm={24} xs={24} style={{ overflow: 'hidden' }}>
              <StoreDetailStyle.MainImg>
                <StoreDetailStyle.ImageWrap src={
                  storeDetailLoad
                    ? loadAvatarStore
                    : `${ROOT_PATH}${storeDetail.storeImage}`
                } />
              </StoreDetailStyle.MainImg>
            </Col>
            <Col lg={14} md={14} sm={24} xs={24}>
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
                        <span>
                          {isOpen === null ? (
                            <span className='its-open' title=''>
                              Luôn mở cửa
                            </span>
                          ) : isOpen ? (
                            <span className='its-open' title=''>
                              Đang mở cửa
                            </span>
                          ) : (
                            <span className='its-closed' title=''>
                              Chưa mở cửa
                            </span>
                          )}
                          {isOpen !== null && (
                            <span>
                              &nbsp;{storeDetail.openTime} -{' '}
                              {storeDetail.closeTime}
                            </span>
                          )}
                        </span>
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
            <Col lg={4} md={4} sm={0} xs={0}>
              <Affix offsetTop={89}>
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
                    key={PATH.STORE_MENU_FOOD}
                    icon={<MdNavigateNext className='custom-icon-position' />}
                    onClick={() => {
                      setDefaultActiveMenu(PATH.STORE_MENU_FOOD);
                      history.push(PATH.STORE_DETAIL(`${storeDetail.storeNotMark}.${storeDetail.id}`));
                    }}
                  >
                    Món ăn
                  </Menu.Item>
                  <Menu.Item
                    key={PATH.STORE_MENU_PROMOTION}
                    icon={<MdNavigateNext className='custom-icon-position' />}
                    onClick={() => {
                      setDefaultActiveMenu(PATH.STORE_MENU_PROMOTION);
                      history.push(PATH.STORE_DETAIL(`${storeDetail.storeNotMark}.${storeDetail.id}`, PATH.STORE_MENU_PROMOTION));
                    }}
                  >
                    Khuyến mãi
                  </Menu.Item>
                  <Menu.Item
                    key={PATH.STORE_MENU_COMMENT}
                    icon={<MdNavigateNext className='custom-icon-position' />}
                    onClick={() => {
                      setDefaultActiveMenu(PATH.STORE_MENU_COMMENT);
                      history.push(PATH.STORE_DETAIL(`${storeDetail.storeNotMark}.${storeDetail.id}`, PATH.STORE_MENU_COMMENT));
                    }}
                  >
                    Bình luận
                  </Menu.Item>
                  <Menu.Item
                    key={PATH.STORE_MENU_PICTURE}
                    icon={<MdNavigateNext className='custom-icon-position' />}
                    onClick={() => {
                      setDefaultActiveMenu(PATH.STORE_MENU_PICTURE);
                      history.push(PATH.STORE_DETAIL(`${storeDetail.storeNotMark}.${storeDetail.id}`, PATH.STORE_MENU_PICTURE));
                    }}
                  >
                    Hình ảnh
                  </Menu.Item>
                </Menu>
              </Affix>
            </Col>
            <Col lg={20} md={20} sm={24} xs={24} style={{ minHeight: '300px' }}>
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
              <Affix offsetTop={88.375}>
                <StoreDetailStyle.StoreToolbar>
                  <ul>
                    <li>
                      <a href={`tel:${storeDetail.phoneContact}`}><FaPhoneAlt /> Gọi điện thoại</a>
                    </li>
                    <li>
                      <a onClick={() => {
                        if (checkLogin()) {
                          setIsShowAction({ status: true, isComment: true });
                        }
                      }}
                      >
                        <FaCommentDots /> Bình luận
                      </a>
                    </li>
                    <li>
                      <a onClick={() => {
                        if (checkLogin()) {
                          setIsShowAction({ status: true, isComment: false });
                        }
                      }}
                      >
                        <BsFillBookmarkFill /> Lưu bộ sưu tập
                      </a>
                    </li>
                    <li>
                      <a><FaShareAlt /> Chia sẻ</a>
                    </li>
                  </ul>
                </StoreDetailStyle.StoreToolbar>
              </Affix>
              <Switch>
                <Route exact path={DYNAMIC(PATH.STORE, ['slug'])}>
                  <StoreDetailFood
                    showFoodDetail={showFoodDetail}
                    setShowLogin={setShowLogin}
                    setShowFoodDetail={setShowFoodDetail}
                    slug={match.params.slug}

                  />
                </Route>
                <Route exact path={DYNAMIC(PATH.STORE, ['slug'], PATH.STORE_MENU_COMMENT)}>
                  <StoreDetailComment
                    slug={match.params.slug}
                    checkLogin={checkLogin}
                    setShowLogin={setShowLogin}
                    setShowComment={setIsShowAction}
                  />
                </Route>
                <Route exact path={DYNAMIC(PATH.STORE, ['slug'], PATH.STORE_MENU_PROMOTION)}>
                  <StoreDetailFood
                    showFoodDetail={showFoodDetail}
                    setShowFoodDetail={setShowFoodDetail}
                    setShowLogin={setShowLogin}
                    slug={match.params.slug}
                  />
                </Route>
                <Route exact path={DYNAMIC(PATH.STORE, ['slug'], PATH.STORE_MENU_PICTURE)}>
                  <StoreDetailPicture slug={match.params.slug} />
                </Route>
                <Route
                  render={() => {
                    return <Redirect to={PATH.STORE} />;
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
