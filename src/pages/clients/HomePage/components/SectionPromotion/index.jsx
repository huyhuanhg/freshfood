import { Anchor } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as HomeS from '../../styles';

const SectionPromotion = ({ render, anchor: AnchorLink }) => {
  const { foodPromotions } = useSelector(({ foodReducer }) => foodReducer);
  return (
    <HomeS.Section>
      <HomeS.SectionTitle>Khuyến mãi</HomeS.SectionTitle>
      <HomeS.SectionContainer>
        {render(foodPromotions.data)}
        <div className='d-flex vertical-center horizontal-center mt-3r'>
          <Anchor affix={false} className='d-inline-block w-40'>
            <AnchorLink href='#test' title={
              <HomeS.ButtonCustom>Xem tất cả</HomeS.ButtonCustom>
            } />
          </Anchor>
        </div>
      </HomeS.SectionContainer>
    </HomeS.Section>
  );
};
export default SectionPromotion;

SectionPromotion.propTypes = {
  render: PropTypes.func,
  anchor: PropTypes.object,
};
