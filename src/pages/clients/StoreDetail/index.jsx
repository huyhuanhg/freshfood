import { Affix, Col, Menu, Rate, Row, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import {
  AiFillLike,
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
import StoreDetailFood from './StoreDetailFood';
import loadAvatarStore from '../../../assets/images/loadStore.png';
import * as ClientStyle from '../styles';
import * as StoreDetailStyle from './style';
import { ROOT_PATH, TITLE } from '../../../contants';
import StoreDetailPromotion from './StoreDetailPromotion';
import history from '../../../utils/history';
import StoreDetailComment from './StoreDetailComment';
import StoreDetailPicture from './StoreDetailPicture';
import { getStoreDetailAction } from '../../../redux/actions';

const StoreDetail = ({ setShowLogin, match }) => {
  const dispatch = useDispatch();
  const { storeDetail } = useSelector((state) => state.storeReducer);

  const { userInfo } = useSelector((state) => state.userReducer);

  const [showFoodDetail, setShowFoodDetail] = useState(false);
  const [isOpen, setIsOpen] = useState(null);

  const [defaultActiveMenu, setDefaultActiveMenu] = useState('food');

  document.title = storeDetail.data.store_name || TITLE.STORE_DETAIL;

  useEffect(() => {
    const pathArr = history.location.pathname.replace('/stores/', '').split('/');
    const content = pathArr[1];
    if (pathArr.length > 1 && content !== '') {
      setDefaultActiveMenu(content);
    }
  }, []);

  useEffect(() => {
    const userToken = localStorage.userInfo;
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
          })
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

  if (!!storeDetail.error && !storeDetail.load) {
    return <Redirect to="/stores" />;
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
                    alt=""
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
                          {storeDetail.data.avgRate === 0
                            ? '--'
                            : storeDetail.data.avgRate}
                          {storeDetail.data.avgRate !== 0 && <AiFillStar />}
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
                            disabled={!!storeDetail.data.userRate}
                            defaultValue={storeDetail.data.userRate}
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
                          <span className="itsopen" title="">
                            Luôn mở cửa
                          </span>
                        ) : isOpen ? (
                          <span className="itsopen" title="">
                            Đang mở cửa
                          </span>
                        ) : (
                          <span className="itsclosed" title="">
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
              <Affix offsetTop={52.7}>
                <Menu
                  theme="light"
                  style={{
                    background: '#fff',
                    height: 'auto',
                  }}
                  selectedKeys={[defaultActiveMenu]}
                  mode="inline"
                >
                  <Menu.Item
                    key="food"
                    icon={<MdNavigateNext />}
                    onClick={() => {
                      setDefaultActiveMenu('food');
                      history.push(
                        `/stores/${storeDetail.data.storeNotMark}.${storeDetail.data.id}`
                      );
                    }}
                  >
                    Món ăn
                  </Menu.Item>
                  <Menu.Item
                    key="comment"
                    icon={<MdNavigateNext />}
                    onClick={() => {
                      setDefaultActiveMenu('comment');
                      history.push(
                        `/stores/${storeDetail.data.storeNotMark}.${storeDetail.data.id}/comment`
                      );
                    }}
                  >
                    Bình luận
                  </Menu.Item>
                  <Menu.Item
                    key="promotion"
                    icon={<MdNavigateNext />}
                    onClick={() => {
                      setDefaultActiveMenu('promotion');
                      history.push(
                        `/stores/${storeDetail.data.storeNotMark}.${storeDetail.data.id}/promotion`
                      );
                    }}
                  >
                    Khuyến mãi
                  </Menu.Item>
                  <Menu.Item
                    key="picture"
                    icon={<MdNavigateNext />}
                    onClick={() => {
                      setDefaultActiveMenu('picture');
                      history.push(
                        `/stores/${storeDetail.data.storeNotMark}.${storeDetail.data.id}/picture`
                      );
                    }}
                  >
                    Hình ảnh
                  </Menu.Item>
                </Menu>
              </Affix>
            </Col>
            <Col span={20}>
              <Affix offsetTop={52.7}>
                <StoreDetailStyle.StoreToolbar>
                  <ul>
                    <li>
                      <FaPhoneAlt /> Gọi điện thoại
                    </li>
                    <li>
                      <FaCommentDots /> Bình luận
                    </li>
                    <li>
                      <BsFillBookmarkFill /> Lưu bộ sưu tập
                    </li>
                    <li>
                      <AiFillLike /> Like
                    </li>
                    <li>
                      <FaShareAlt /> Chia sẻ
                    </li>
                  </ul>
                </StoreDetailStyle.StoreToolbar>
              </Affix>
              <Switch>
                <Route exact path="/stores/:slug">
                  <StoreDetailFood
                    showFoodDetail={showFoodDetail}
                    setShowLogin={setShowLogin}
                    setShowFoodDetail={setShowFoodDetail}
                  />
                </Route>
                <Route exact path="/stores/:slug/comment">
                  <StoreDetailComment />
                </Route>
                <Route exact path="/stores/:slug/promotion">
                  <StoreDetailPromotion
                    showFoodDetail={showFoodDetail}
                    setShowLogin={setShowLogin}
                    setShowFoodDetail={setShowFoodDetail}
                  />
                </Route>
                <Route exact path="/stores/:slug/picture">
                  <StoreDetailPicture />
                </Route>
                <Route
                  render={() => {
                    return <Redirect to="/stores" />;
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
    params: PropTypes.shape,
  }),
  setShowLogin: PropTypes.func.isRequired,
};
