import * as HomeS from "../../styles";
import {Anchor, Button} from "antd";
import {useSelector} from "react-redux";

const SectionPromotion = ({render, anchor: AnchorLink}) => {
    const {foodPromotions} = useSelector(state => state.foodReducer);
    return (
        <HomeS.Section>
            <HomeS.SectionTitle>Khuyến mãi</HomeS.SectionTitle>
            <HomeS.SectionContainer>
                {render(foodPromotions.data)}
                <div style={{
                    display: 'flex',
                    alignItem: 'center',
                    justifyContent: 'center',
                    marginTop: '3rem'
                }}>
                    <Anchor affix={false}>
                        <AnchorLink href='#test' title={(<Button>Xem tất cả</Button>)}/>
                    </Anchor>
                </div>
            </HomeS.SectionContainer>
        </HomeS.Section>
    );
}
export default SectionPromotion;
