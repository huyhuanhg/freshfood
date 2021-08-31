import {TITLE} from "../../../../contants";
import {Button, Col, Row,} from "antd";
import {useSelector} from "react-redux";
import StoreItem from "../../../../components/clients/StoreItem";
import StoreFilter from "../components/StoreFilter";
function StoreList(props) {
    document.title = TITLE.STORE_LIST;
    const {storeList} = useSelector(state => state.storeReducer);
    const renderStore = (span = 4) => {
        return (
            <Row gutter={[16, 16]}>
                {storeList.data.map((store) => {
                    return (
                        <Col span={span} key={store.id}>
                            <StoreItem {...store}/>
                        </Col>
                    );
                })}
            </Row>
        );
    }
    return (
        <>
            <StoreFilter/>
            <div style={{paddingTop: 20}}>
                {renderStore(6)}
                <div style={{
                    display: 'flex',
                    alignItem: 'center',
                    justifyContent: 'center',
                    marginTop: '3rem'
                }}>
                    <Button>Xem thêm</Button>
                </div>
            </div>
        </>
    );
}

export default StoreList;
