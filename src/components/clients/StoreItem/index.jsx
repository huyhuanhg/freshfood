import { Avatar, Skeleton } from 'antd';
import {
  AiTwotoneStar,
  FaComment,
  GrFormNextLink,
  IoIosPizza,
} from 'react-icons/all';

import PropTypes from 'prop-types';
import history from '../../../utils/history';

import * as S from './style';

import storeLoading from '../../../assets/images/loadStore.png';
import { ROOT_PATH } from '../../../contants';

const StoreItem = ({
  id,
  storeAvatar,
  storeName,
  storeAddress,
  storeNotMark,
  totalFood,
  totalComment,
  avgRate,
  lastComment,
  loading,
}) => {
  return (
    <S.CardItem
      hoverable
      cover={
        <S.StoreImage
          avatar={loading ? storeLoading : `${ROOT_PATH}${storeAvatar}`}
        />
      }
      onClick={() => {
        if (!loading) {
          history.push(`/stores/${storeNotMark}.${id}`);
        }
      }}
    >
      <Skeleton avatar loading={loading} active>
        <S.StoreInfo>
          <S.StoreNameInfo>{storeName}</S.StoreNameInfo>
          <S.StoreAddress>{storeAddress}</S.StoreAddress>
        </S.StoreInfo>
        {lastComment?.firstName ? (
          <S.StoreCommentWrap
            avatar={<Avatar src={`${ROOT_PATH}${lastComment?.avatar}`} />}
            title={
              <S.StoreComment>
                <S.StoreCommentName>
                  {`${lastComment?.firstName} ${lastComment?.lastName}`}{' '}
                </S.StoreCommentName>
                <S.StoreCommentDoc> {lastComment?.content}</S.StoreCommentDoc>
              </S.StoreComment>
            }
          />
        ) : (
          <div style={{ minHeight: 44 }}></div>
        )}

        <S.StoreStatistical>
          <div>
            <div>
              <FaComment />
              <span>{totalComment}</span>
            </div>
            <div>
              <IoIosPizza />
              <span>{totalFood}</span>
            </div>
            {avgRate > 0 && (
              <div>
                <AiTwotoneStar />
                <span>{avgRate}</span>
              </div>
            )}
            <span>
              <GrFormNextLink />
            </span>
          </div>
        </S.StoreStatistical>
      </Skeleton>
    </S.CardItem>
  );
};
export default StoreItem;

StoreItem.propTypes = {
  id: PropTypes.number,
  storeAvatar: PropTypes.string,
  storeName: PropTypes.string,
  storeAddress: PropTypes.string,
  storeNotMark: PropTypes.string,
  avgRate: PropTypes.number,
  totalComment: PropTypes.number,
  lastComment: PropTypes.shape({
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    avatar: PropTypes.string,
    content: PropTypes.string,
  }),
  totalFood: PropTypes.number,
  loading: PropTypes.func,
};
