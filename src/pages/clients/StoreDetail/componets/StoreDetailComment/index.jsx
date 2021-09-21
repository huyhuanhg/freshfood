import * as StoreDetailStyle from '../../style';
import * as S from './style';
import { Affix, Avatar, Row, Col, Image, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getCommentsAction } from '../../../../../redux/actions';
import { ROOT_PATH } from '../../../../../contants';
import moment from 'moment';
import { EyeOutlined } from '@ant-design/icons';
import { Filter as FilterStyle } from '../../../../../styles';

const StoreDetailComment = (
  {
    slug,
    checkLogin,
    setShowComment,
  },
) => {
  const dispatch = useDispatch();
  const {
    commentList: {
      currentPage,
      data: commentData,
      lastPage,
      load,
      total,
    },
  } = useSelector(({ commentReducer }) => commentReducer);
  const storeId = slug.slice(slug.lastIndexOf('.') + 1);
  const [loadMore, setLoadMore] = useState(false);
  moment.locale('vi');

  const loadMoreComment = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 300 >= document.documentElement.scrollHeight) {
      if (!loadMore) {
        setLoadMore(true);
      }
    }
  };
  useEffect(() => {
    dispatch(getCommentsAction({ storeId }));
    window.addEventListener('scroll', loadMoreComment);

    return () => {
      window.removeEventListener('scroll', loadMoreComment);
    };
  }, []);

  useEffect(() => {
    if (currentPage === lastPage && loadMore) {
      window.removeEventListener('scroll', loadMoreComment);
    } else {
      setLoadMore(false);
    }
  }, [currentPage]);
  useEffect(() => {
    if (loadMore && currentPage < lastPage) {
      dispatch(getCommentsAction({
        storeId,
        page: currentPage + 1,
      }));
    }
    if (loadMore && currentPage === lastPage) {
      window.removeEventListener('scroll', loadMoreComment);
    }
  }, [loadMore]);

  const renderComment = () => {
    return commentData.map((commentItem) => {
      return (
        <S.CommentWrap key={commentItem.id}>
          <S.CommentHeader>
            <S.AvatarWrap>
              <Avatar
                size='large'
                src={commentItem.userAvatar && `${ROOT_PATH}${commentItem.userAvatar}`}
              >
                {!commentItem.userAvatar && (
                  <span style={{ fontSize: '2rem' }}>
                    {commentItem.lastName[0].toUpperCase()}
                  </span>
                )}
              </Avatar>
              <h5>{`${commentItem.firstName} ${commentItem.lastName}`}</h5>
            </S.AvatarWrap>
            <small>{moment(commentItem.createdAt).fromNow()}</small>
          </S.CommentHeader>
          <S.CommentContent>
            <p style={{ marginBottom: 10 }}>{commentItem.content}</p>
            {commentItem.pictures.length > 0 &&
            <Row gutter={10}>
              <Image.PreviewGroup>
                {commentItem.pictures.map((picture) => {
                  return (
                    <Col key={picture} span={6}>
                      <StoreDetailStyle.PictureWrap>
                        <StoreDetailStyle.PictureItem
                          src={`${ROOT_PATH}${picture}`}
                          alt={picture}
                          preview={{
                            mask: <div><EyeOutlined /> Xem ảnh</div>,
                          }}
                        />
                      </StoreDetailStyle.PictureWrap>
                    </Col>
                  );
                })}
              </Image.PreviewGroup>
            </Row>
            }
          </S.CommentContent>
        </S.CommentWrap>
      );
    });
  };
  return (
    <div>
      {total > 0
        ?
        <div>
          <Affix offsetTop={59.188 + 54}>
            <FilterStyle>
              <StoreDetailStyle.StoreFilterTitle>
                Bình luận cửa hàng
              </StoreDetailStyle.StoreFilterTitle>
              <Button
                style={{
                  color: '#fff',
                  background: '#3380d8',
                  marginRight: 10,
                }}
                onClick={() => {
                  if (checkLogin()) {
                    setShowComment({ status: true, isComment: true });
                  }
                }}
              >
                Viết Bình luận
              </Button>
            </FilterStyle>
          </Affix>
          <div>
            {renderComment()}
          </div>
        </div>
        :
        <div className='d-flex vertical-center horizontal-center t-center' style={{ minHeight: 200, fontSize: 16 }}>
          <div>
            <p>Chưa có bình luận nào!</p>
            <p>Hãy là người đầu tiên bình luận về cửa hàng</p>
            <Button
              style={{
                width: '80%',
                color: '#fff',
                background: '#3380d8',
              }}
              onClick={() => {
                if (checkLogin()) {
                  setShowComment({ status: true, isComment: true });
                }
              }}
            >
              Viết Bình luận
            </Button>
          </div>
        </div>
      }
      {load && (
        <div className='d-flex horizontal-center vertical-center' style={{ width: '100%' }}>
          <Spin />
        </div>
      )}
    </div>
  );
};
export default StoreDetailComment;

StoreDetailComment.propTypes = {
  slug: PropTypes.string,
  checkLogin: PropTypes.func,
  setShowComment: PropTypes.func,
};
