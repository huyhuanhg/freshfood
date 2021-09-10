import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import StoreItem from '../../../../../components/clients/StoreItem';
import * as HomeS from '../../styles';
import { useEffect } from 'react';
import { getStoresAction } from '../../../../../redux/actions';

const SectionStore = () => {
  const dispatch = useDispatch();
  const { storeList } = useSelector((state) => state.storeReducer);

  useEffect(() => {
    dispatch(getStoresAction());
  }, []);
  const renderStore = (span = 4) => {
    return (
      <Row gutter={[16, 16]}>
        {storeList.data.map((store) => {
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
        <div
          style={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Link to='/stores'>
            <Button>Xem tất cả</Button>
          </Link>
        </div>
      </HomeS.SectionContainer>
    </HomeS.Section>
  );
};
export default SectionStore;
