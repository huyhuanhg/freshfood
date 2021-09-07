import { Button, Col, Menu, Select, Spin } from 'antd';
import { useSelector } from 'react-redux';
import * as S from '../../style';
import { MdRemoveShoppingCart } from 'react-icons/all';
import { FoodItemHome } from '../../../../../components/clients/FoodItem';
import Row from 'antd/es/descriptions/Row';

const FoodPage = () => {
  const { Option } = Select;
  const { foodList } = useSelector((state) => state.foodReducer);
  const { tagList } = useSelector((state) => state.tagReducer);

  const renderTagList = () => {
    return tagList.data.map((tag) => {
      if (tag.tagActive === 1) {
        return <Option value={tag.id}>{tag.tagName}</Option>;
      }
    });
  };
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
    <div>
      <S.AffixIndex offsetTop={52.7}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#ddd',
            zIndex: 10,
          }}
        >
          <Menu
            mode='horizontal'
            defaultSelectedKeys={['mail']}
            style={{
              flexBasis: '50%',
            }}
          >
            <Menu.Item key='mail'>Mới nhất </Menu.Item>
            <Menu.Item key='abc'>Bán chạy</Menu.Item>
            <Menu.Item key='app'>Đã thích</Menu.Item>
          </Menu>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
              paddingRight: '20px',
              margin: 0,
            }}
          >
            <li>
              <Select
                defaultValue={''}
                style={{ width: 160, margin: '0 5px' }}
                getPopupContainer={(trigger) => trigger.parentNode}
              >
                <Option value=''>-Danh mục-</Option>
                {renderTagList()}
              </Select>
            </li>
            <li>
              <Select
                defaultValue={''}
                style={{ width: 120, margin: '0 5px' }}
                getPopupContainer={(trigger) => trigger.parentNode}
              >
                <Option value='' selected hidden disabled>
                  Giá
                </Option>
                <Option value='0'>Giá tăng dần</Option>
                <Option value='1'>Giá giảm dần</Option>
              </Select>
            </li>
          </ul>
        </div>
      </S.AffixIndex>
      <div style={{ paddingTop: 20, position: 'relative' }}>
        {foodList.total === 0
          ?
          <div
            style={{
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '150%',
              fontWeight: 'bold',
            }}
          >
            <div>
              <MdRemoveShoppingCart
                style={{
                  color: 'red',
                  fontSize: '200%',
                }}
              /><br />
              Không có món ăn nào!
            </div>
          </div>
          :
          renderFoodList(6)
        }
        {
          foodList.load &&
          <Spin
            size='large'
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -200%)',
            }}
          />
        }
        {foodList.currentPage < foodList.lastPage &&
        <div
          style={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Button
            // onClick={() => setRequest({
            //   ...request,
            //   page: request.page + 1,
            // })}
          >
            Xem thêm
          </Button>
        </div>
        }
      </div>
    </div>
  );
};
export default FoodPage;
