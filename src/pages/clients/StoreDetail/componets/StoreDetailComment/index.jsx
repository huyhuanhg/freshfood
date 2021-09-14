import * as StoreDetailStyle from '../../style';
import * as S from './style';
import { Affix, Avatar, Row, Col, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getCommentsAction } from '../../../../../redux/actions';
import { ROOT_PATH } from '../../../../../contants';
import moment from 'moment';
import 'moment/locale/vi';
import { EyeOutlined } from '@ant-design/icons';

const StoreDetailComment = (
  {
    slug,
    checkLogin,
    setShowComment,
  },
) => {
  const dispatch = useDispatch();
  const { commentList } = useSelector((state) => state.commentReducer);
  const storeId = slug.slice(slug.lastIndexOf('.') + 1);
  moment.locale('vi');
  useEffect(() => {
    dispatch(getCommentsAction({ storeId }));
  }, []);
  const renderComment = () => {
    return commentList.data.map((commentItem) => {
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
                      <div style={{
                        width: '225px',
                        height: '225px',
                        overflow: 'hidden',
                        border: '1px solid #f6f6f6',
                        borderRadius: 4,
                      }}>
                        <Image
                          style={{
                            width: '225px',
                            height: '225px',
                            objectFit: 'cover',
                            verticalAlign: 'middle',
                          }}
                          src={`${ROOT_PATH}${picture}`}
                          alt={picture}
                          preview={{
                            mask: <div><EyeOutlined /> Xem ảnh</div>
                          }}
                        />
                      </div>
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
      {commentList.data.length > 0
        ?
        <div>
          <Affix offsetTop={59.188 + 54}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#ddd',
              }}
            >
              <StoreDetailStyle.StoreContentTitle>
                Bình luận cửa hàng
              </StoreDetailStyle.StoreContentTitle>
              <Button
                style={{
                  color: '#fff',
                  background: '#2373ff',
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
            </div>
          </Affix>
          <div>
            {renderComment()}
          </div>
        </div>
        :
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: 200,
            fontSize: 16,
          }}>
          <div>
            <p>Chưa có bình luận nào!</p>
            <p>Hãy là người đầu tiên bình luận về cửa hàng</p>
            <Button
              style={{
                width: '80%',
                color: '#fff',
                background: '#2373ff',
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
    </div>
  );
};
export default StoreDetailComment;

StoreDetailComment.propTypes = {
  slug: PropTypes.string,
  checkLogin: PropTypes.func,
  setShowComment: PropTypes.func,
};
