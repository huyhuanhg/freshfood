import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Affix, Col, Image, Row, Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { Filter as FilterStyle } from '../../../../../styles';
import * as StoreDetailStyle from '../../style';
import { ROOT_PATH } from '../../../../../contants';
import { getStorePicturesAction } from '../../../../../redux/actions';

const StoreDetailPicture = ({ slug }) => {
  const storeId = slug.slice(slug.lastIndexOf('.') + 1);
  const dispatch = useDispatch();
  const { pictures } = useSelector(({ storeReducer }) => storeReducer);

  useEffect(() => {
    dispatch(getStorePicturesAction({ storeId }));
  }, []);

  const rederPictures = () => {
    return (
      <Row gutter={10}>
        <Image.PreviewGroup>
          {pictures.data.map(({ picturePath }) => {
            return (
              <Col key={picturePath} span={6}>
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
                    src={`${ROOT_PATH}${picturePath}`}
                    alt={picturePath}
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
    );
  };
  return (
    <div>
      <Affix offsetTop={20}>
        <FilterStyle>
          <StoreDetailStyle.StoreFilterTitle>
            Hình ảnh cửa hàng
          </StoreDetailStyle.StoreFilterTitle>
        </FilterStyle>
      </Affix>
      <div className='pt-2r'>
        {rederPictures()}
        {pictures.load && (
          <div className='d-flex horizontal-center vertical-center' style={{ width: '100%' }}>
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};
export default StoreDetailPicture;

StoreDetailPicture.propTypes = {
  slug: PropTypes.string,
};
