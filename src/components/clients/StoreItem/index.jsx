import {Avatar, Skeleton} from "antd";
import {AiTwotoneStar, FaComment, GrFormNextLink, IoIosPizza} from "react-icons/all";

import history from "../../../utils/history";

import * as S from './style';

import storeLoading from '../../../assets/images/loadStore.png';

const StoreItem = ({
                       id,
                       avatar,
                       store_name,
                       store_address,
                       total_comment,
                       total_food,
                       rate,
                       last_comment,
                       loading
                   }) => {
    return (
        <S.CardItem
            hoverable
            cover={
                <S.StoreImage avatar={loading ? storeLoading : avatar}/>
            }
            onClick={() => {
                if (!loading) {
                    history.push(`/stores/${store_name}.${id}`);
                }
            }}
        >
            <Skeleton avatar loading={loading} active>
                <S.StoreInfo>
                    <S.StoreNameInfo>{store_name}</S.StoreNameInfo>
                    <S.StoreAddress>{store_address}</S.StoreAddress>
                </S.StoreInfo>
                <S.StoreCommentWrap
                    avatar={<Avatar src={last_comment.avatar}/>}
                    title={(
                        <S.StoreComment>
                            <S.StoreCommentName>{last_comment.user_name} </S.StoreCommentName>
                            <S.StoreCommentDoc> {last_comment.comment}</S.StoreCommentDoc>
                        </S.StoreComment>
                    )}
                />
                <S.StoreStatistical>
                    <div>
                        <div><FaComment/><span>{total_comment}</span></div>
                        <div><IoIosPizza/><span>{total_food}</span></div>
                        <div><AiTwotoneStar/><span>{rate}</span></div>
                        <span><GrFormNextLink/></span>
                    </div>
                </S.StoreStatistical>
            </Skeleton>
        </S.CardItem>
    );
}
export default StoreItem;
