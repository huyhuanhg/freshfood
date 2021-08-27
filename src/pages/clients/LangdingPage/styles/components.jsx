import {
    TilteDiv,
    TitleWrap,
    TitleFirstSpan,
    TitleLastSpan,
    Title,
    CardImage,
    CardItem,
    AfterPrice,
    Price,
    AddCard,
    StoreName,
    StoreImage,
    StoreComment,
    StoreCommentName,
    StoreCommentDoc,
    StoreInfo,
    StoreNameInfo,
    StoreAddress, StoreCommentWrap, StoreStatistical
} from "./style";
import {Link} from "react-router-dom";
import {Button, Card, Space} from "antd";
import NumberFormat from "react-number-format";
import {ShoppingCartOutlined} from "@ant-design/icons";
import Avatar from "antd/es/avatar/avatar";
import {AiTwotoneStar, FaComment, GrFormNextLink, IoIosPizza} from "react-icons/all";

const {Meta} = Card;
export const SectionTitle = ({children}) => {
    return (
        <TitleWrap>
            <Title>{children}</Title>
            <TilteDiv><TitleFirstSpan></TitleFirstSpan><TitleLastSpan></TitleLastSpan></TilteDiv>
        </TitleWrap>
    );
}
const MetaTitle = ({name, store}) => {
    return (
        <>
            <h3 style={{marginBottom: 0}}>{name}</h3>
            <Link to='/store/1'>
                <StoreName>{store}</StoreName>
            </Link>
        </>
    );
}
const MetaDescription = ({price, priceAfter}) => {
    return (
        <Space>
            <p>
                <AfterPrice>
                    <NumberFormat value={priceAfter} displayType={'text'}
                                  thousandSeparator suffix={'đ'}/>
                </AfterPrice>
                <sup>đ</sup>
            </p>
            <p style={{paddingLeft: 10}}>
                <Price>
                    <NumberFormat value={price} displayType={'text'}
                                  thousandSeparator suffix={'đ'}/>
                </Price>
            </p>
        </Space>
    );
}
export const Item = ({id, avatar, name, store, price, priceAfter}) => {
    return (
        <Link to={`/${id}`}>
            <CardItem
                hoverable
                cover={
                    <CardImage avatar={avatar}/>
                }
            >
                <Meta
                    title={<MetaTitle name={name} store={store}/>}
                    description={<MetaDescription price={price} priceAfter={priceAfter}/>}
                    avatar={
                        <AddCard>
                            <ShoppingCartOutlined/>
                        </AddCard>}
                />
            </CardItem>
        </Link>
    );
}
export const StoreItem = ({
                              id,
                              avatar,
                              store_name,
                              store_address,
                              total_comment,
                              total_food,
                              rate,
                              last_comment
                          }) => {
    return (
        <Link to={`/${id}`}>
            <CardItem
                hoverable
                cover={
                    <StoreImage avatar={avatar}/>
                }
            >
                <StoreInfo>
                    <StoreNameInfo>{store_name}</StoreNameInfo>
                    <StoreAddress>{store_address}</StoreAddress>
                </StoreInfo>
                <StoreCommentWrap
                    avatar={<Avatar src={last_comment.avatar}/>}
                    title={(
                        <StoreComment>
                            <StoreCommentName>{last_comment.user_name} </StoreCommentName>
                            <StoreCommentDoc> {last_comment.comment}</StoreCommentDoc>
                        </StoreComment>
                    )}
                />
                <StoreStatistical>
                    <div>
                        <div><FaComment/><span>{total_comment}</span></div>
                        <div><IoIosPizza/><span>{total_food}</span></div>
                        <div><AiTwotoneStar/><span>{rate}</span></div>
                        <span><GrFormNextLink/></span>
                    </div>
                </StoreStatistical>
            </CardItem>
        </Link>
    );
}