import { Button, Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { TITLE } from '../../../../contants';
import { FoodItemHome } from '../../../../components/clients/FoodItem';
import FoodFilter from '../components/FoodFilter';

function FavoritesList() {
  document.title = TITLE.FAVORITES_LIST;
  const { foodList } = useSelector((state) => state.foodReducer);
  const renderFoodList = (span = 4) => {
    return (
      <Row gutter={[16, 16]}>
        {foodList.data.map((food) => {
          return (
            <Col span={span} key={food.id}>
              <FoodItemHome {...food} />
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
        {renderFoodList(6)}
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

export default FavoritesList;
