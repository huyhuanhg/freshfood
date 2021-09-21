import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import * as HomeS from '../../styles';
import StoreItem from '../../../../../components/clients/StoreItem';
import { getStoresAction } from '../../../../../redux/actions';
import { PATH } from '../../../../../contants';

const SectionStore = () => {
  const dispatch = useDispatch();
  const { storeList: { data: storData } } = useSelector(({ storeReducer }) => storeReducer);

  useEffect(() => {
    dispatch(getStoresAction({ limit: 12 }));
  }, []);
  const renderStore = (span = 4) => {
    return (
      <Row gutter={[16, 16]}>
        {storData.map((store) => {
          return (
            <Col span={span} key={store.id}>
              <StoreItem {...store} />
            </Col>
          );
        })}
      </Row>
    );
  };
  return (
    <HomeS.Section>
      <HomeS.SectionTitle>Cửa hàng</HomeS.SectionTitle>
      <HomeS.SectionContainer>
        {renderStore()}
        <div className='d-flex vertical-center horizontal-center mt-3r'>
          <Link to={PATH.STORE} className='d-inline-block w-40'>
            <HomeS.ButtonCustom>Xem tất cả</HomeS.ButtonCustom>
          </Link>
        </div>
      </HomeS.SectionContainer>
    </HomeS.Section>
  );
};
export default SectionStore;
