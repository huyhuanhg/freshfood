import { Menu, Select } from 'antd';
import * as S from '../../style';
import { useSelector } from 'react-redux';

const FoodFilter = () => {
  const { Option } = Select;

  const { tagList } = useSelector((state) => state.tagReducer);

  const renderTagList = () => {
    return tagList.data.map((tag) => {
      if (tag.tagActive === 1) {
        return <Option value={tag.id}>{tag.tagName}</Option>;
      }
    });
  };
  return (
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
          mode="horizontal"
          defaultSelectedKeys={['mail']}
          style={{
            flexBasis: '50%',
          }}
        >
          <Menu.Item key="mail">Mới nhất </Menu.Item>
          <Menu.Item key="abc">Bán chạy</Menu.Item>
          <Menu.Item key="app">Đã lưu</Menu.Item>
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
              <Option value="">-Danh mục-</Option>
              {renderTagList()}
            </Select>
          </li>
          <li>
            <Select
              defaultValue={''}
              style={{ width: 120, margin: '0 5px' }}
              getPopupContainer={(trigger) => trigger.parentNode}
            >
              <Option value="" selected hidden disabled>
                Giá
              </Option>
              <Option value="0">Giá tăng dần</Option>
              <Option value="1">Giá giảm dần</Option>
            </Select>
          </li>
        </ul>
      </div>
    </S.AffixIndex>
  );
};
export default FoodFilter;
