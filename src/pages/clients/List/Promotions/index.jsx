import { Button, Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { TITLE } from '../../../../contants';

import { FoodItemHome } from '../../../../components/clients/FoodItem';
import FoodFilter from '../components/FoodFilter';

function Promotions() {
  document.title = TITLE.PROMOTIONS;
  const { foodPromotions } = useSelector((state) => state.foodReducer);
  const renderFoodPromotions = (span = 4) => {
    return (
      <Row gutter={[16, 16]}>
        {foodPromotions.data.map((foodItem) => {
          return (
            <Col span={span} key={foodItem.id}>
              <FoodItemHome {...foodItem} />
            </Col>
          );
        })}
      </Row>
    );
  };
  return (
    <>
      <FoodFilter />
      <div style={{ paddingTop: 20 }}>
        {renderFoodPromotions(6)}
        <div
          style={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Button>Xem thêm</Button>
        </div>
      </div>
    </>
  );
}

export default Promotions;
