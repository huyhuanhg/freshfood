import { useEffect, useState } from 'react';
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
  const { pictures: { currentPage, data, lastPage, load } } = useSelector(({ storeReducer }) => storeReducer);
  const [loadMore, setLoadMore] = useState(false);

  const loadMorePicture = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 300 >= document.documentElement.scrollHeight) {
      if (!loadMore) {
        setLoadMore(true);
      }
    }
  };
  useEffect(() => {
    dispatch(getStorePicturesAction({ storeId }));
    window.addEventListener('scroll', loadMorePicture);

    return () => {
      window.removeEventListener('scroll', loadMorePicture);
    };
  }, []);
  useEffect(() => {
    if (currentPage === lastPage && loadMore) {
      window.removeEventListener('scroll', loadMorePicture);
    } else {
      setLoadMore(false);
    }
  }, [currentPage]);
  useEffect(() => {
    if (loadMore && currentPage < lastPage) {
      dispatch(getStorePicturesAction({
        storeId,
        params: {
          page: currentPage + 1,
        },
      }));
    }
    if (loadMore && currentPage === lastPage) {
      window.removeEventListener('scroll', loadMorePicture);
    }
  }, [loadMore]);

  const rederPictures = () => {
    return (
      <Row gutter={[15, 10]}>
        <Image.PreviewGroup>
          {data.map(({ picturePath }) => {
            return (
              <Col key={picturePath} span={6}>
                <StoreDetailStyle.PictureWrap>
                  <StoreDetailStyle.PictureItem
                    src={`${ROOT_PATH}${picturePath}`}
                    alt={picturePath}
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
      <div className='pt-2r' id='list'>
        {rederPictures()}
        {load && (
          <div className='d-flex horizontal-center vertical-center mt-3r' style={{ width: '100%' }}>
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
