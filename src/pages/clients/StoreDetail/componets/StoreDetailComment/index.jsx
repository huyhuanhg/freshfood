import { Avatar, Form, Image, Input, Spin, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getCommentsAction } from '../../../../../redux/actions';
import { ROOT_PATH } from '../../../../../contants';
import moment from 'moment';

import * as StoreDetailStyle from '../../style';
import * as ClientStyle from '../../../styles';
import * as S from './style';
import { AiOutlineCamera } from 'react-icons/all';

const StoreDetailComment = (
  {
    slug,
    checkLogin,
    setShowComment,
    userInfo,
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
  const [showFormComment, setShowFormComment] = useState(false);
  const [isFocusForm, setIsFocusForm] = useState(false);
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
            <Image.PreviewGroup>
              <div className='clearfix'>
                {commentItem.pictures.map((picture, pictureIndex) => {
                  return (
                    <StoreDetailStyle.PictureWrap key={picture} index={pictureIndex}>
                      <StoreDetailStyle.PictureItem>
                        <Image
                          src={`${ROOT_PATH}${picture}`}
                          alt={picture}
                          preview={{
                            mask: <span />,
                          }}
                        />
                      </StoreDetailStyle.PictureItem>
                      {
                        ((pictureIndex === 2 && commentItem.pictures.length > 3) || (pictureIndex === 3 && commentItem.pictures.length > 4)) &&
                        <StoreDetailStyle.MorePicture total={commentItem.pictures.length} index={pictureIndex} />
                      }
                    </StoreDetailStyle.PictureWrap>
                  );
                })}
              </div>
            </Image.PreviewGroup>
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
        <div className='list-of-store-detail'>
          <ClientStyle.AffixFilter offsetTop={88.375 + 54}>
            <StoreDetailStyle.DetailFilter>
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
                    setShowFormComment(!showFormComment);
                  }
                }}
              >
                Viết Bình luận
              </Button>
            </StoreDetailStyle.DetailFilter>
            {userInfo.data.id &&
            <S.FormCommentWrap show={showFormComment} focus={isFocusForm}>
              <Form>
                <Form.Item
                  noStyle
                  onFocus={() => {
                    setIsFocusForm(true);
                  }}
                  onBlur={() => {
                    setIsFocusForm(false);
                  }}
                >
                  <Input.TextArea
                    showCount
                    autoSize
                    maxLength={1000}
                    placeholder='Viết bình luận của bạn...'
                  />
                </Form.Item>
                <Upload className='upload-picture'>
                  <AiOutlineCamera />
                </Upload>
              </Form>
            </S.FormCommentWrap>
            }
          </ClientStyle.AffixFilter>
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
  userInfo: PropTypes.object,
};
