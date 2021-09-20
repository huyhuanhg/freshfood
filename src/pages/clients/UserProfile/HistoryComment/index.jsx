import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsCardImage } from 'react-icons/all';
import { CommentOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Image, Row } from 'antd';

import { getCommentsAction } from '../../../../redux/actions';
import * as S from '../style';
import { ROOT_PATH } from '../../../../contants';

const HistoryComment = () => {
  moment.locale('vi');
  const dispatch = useDispatch();
  const { userInfo } = useSelector(({ userReducer }) => userReducer);
  const { commentList } = useSelector(({ commentReducer }) => commentReducer);
  console.log(commentList);
  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getCommentsAction({
        userId: userInfo.data.id,
      }));
    }
  }, []);
  const renderComments = () => {
    return (
      <Collapse expandIconPosition='right'>
        {
          commentList.data.map((commentItem) => {
            return (
              <Collapse.Panel
                key={commentItem.id}
                header={
                  <Row gutter={20}>
                    <Col span={10}>
                      <S.StoreTitle>
                        <img
                          src={`${ROOT_PATH}${commentItem.storeImage}`}
                          alt={commentItem.storeName}
                        />
                        <Link to={`/stores/${commentItem.storeNotMark}.${commentItem.storeId}`}>
                          {commentItem.storeName}
                        </Link>
                      </S.StoreTitle>
                    </Col>
                    <Col
                      className='d-flex vertical-center'
                      span={10}
                      style={{ justifyContent: 'space-around' }}
                    >
                      <S.CommentTitleContent>{commentItem.content}</S.CommentTitleContent>
                      <div>
                        {
                          commentItem.pictures.length > 0 &&
                          <span>{commentItem.pictures.length}<BsCardImage /></span>
                        }
                      </div>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                      {moment(commentItem.createdAt).fromNow()}
                    </Col>
                  </Row>
                }
              >
                <p style={{ marginBottom: 10 }}>{commentItem.content}</p>
                {commentItem.pictures.length > 0 &&
                <Row gutter={10}>
                  <Image.PreviewGroup>
                    {commentItem.pictures.map((picture) => {
                      return (
                        <Col key={picture} span={6}>
                          <div style={{
                            width: '194px',
                            height: '194px',
                            overflow: 'hidden',
                            border: '1px solid #f6f6f6',
                            borderRadius: 4,
                          }}>
                            <Image
                              style={{
                                width: '194px',
                                height: '194px',
                                objectFit: 'cover',
                                verticalAlign: 'middle',
                              }}
                              src={`${ROOT_PATH}${picture}`}
                              alt={picture}
                              preview={{
                                mask: <div><EyeOutlined /> Xem ảnh</div>,
                              }}
                            />
                          </div>
                        </Col>
                      );
                    })}
                  </Image.PreviewGroup>
                </Row>
                }
              </Collapse.Panel>
            );
          })
        }
      </Collapse>
    );
  };
  return (

    <div>
      {
        commentList.total === 0 ?
          <S.ProfileEmpty>
            <div>
              <CommentOutlined />
            </div>
            <div>Bạn chưa có bình luận nào</div>
          </S.ProfileEmpty>
          :
          <div style={{ paddingBottom: 15 }}>
            <S.TitleContent>
              Bình luận của bạn
            </S.TitleContent>
            {renderComments()}
            {commentList.currentPage < commentList.lastPage &&
            <div className='d-flex vertical-center horizontal-center mt-3r'>
              <Button
                onClick={() =>
                  dispatch(getCommentsAction({
                    userId: userInfo.data.id,
                    page: commentList.currentPage + 1,
                  }))
                }
              >
                Xem thêm
              </Button>
            </div>
            }
          </div>
      }
    </div>
  );
};
export default HistoryComment;
