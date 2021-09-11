import PropTypes from 'prop-types';
import * as S from './style';
import { Row, Col } from 'antd';
import loadAvatarStore from '../../../../../assets/images/loadStore.png';
import { ROOT_PATH } from '../../../../../contants';
import { AiFillStar } from 'react-icons/all';

const ModalStoreDetail = (
  {
    isShow,
    setShow,
    isComment,
    avatar,
    address,
    avgRate,
    storeName,
  },
) => {
  console.log(
    avatar,
    address,
    avgRate,
  );
  return (
    <S.ModalCustom
      title={isComment ? 'Viết bình luận' : 'Lưu vào Bookmarks'}
      visible={isShow}
      // onOk={() => setVisible(false)}
      onCancel={() => setShow({ isComment, status: false })}
      width={1000}
      footer={false}
    >
      <Row gutter={8}>
        <Col span={8}>
          <div>
            <img
              src={
                avatar
                  ? `${ROOT_PATH}${avatar}`
                  : loadAvatarStore
              }
              alt={storeName}
              width='100%'
              height={'auto'}
            />
            <div>
              <div>
                {avgRate} <AiFillStar />
              </div>
              <div>
                <p>{storeName}</p>
                <p>{address}</p>
              </div>
            </div>
          </div>
        </Col>
        <Col span={16}>
          123123
        </Col>
      </Row>
    </S.ModalCustom>
  );
};
export default ModalStoreDetail;

ModalStoreDetail.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  isComment: PropTypes.bool,
  avatar: PropTypes.string,
  address: PropTypes.string,
  avgRate: PropTypes.number,
  storeName: PropTypes.string,
};
