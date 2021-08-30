import {TITLE} from "../../../contants";
import * as ClientStyle from '../styles/';
const CartPage = () => {
    document.title = TITLE.CART;
    return (
        <ClientStyle.Section>
            <ClientStyle.Container>
                <h1>Lịch sử đơn hàng</h1>
            </ClientStyle.Container>
        </ClientStyle.Section>
    );
}
export default CartPage;