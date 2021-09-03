import {Avatar, Skeleton} from "antd";
import {AiTwotoneStar, FaComment, GrFormNextLink, IoIosPizza} from "react-icons/all";

import history from "../../../utils/history";

import * as S from './style';

import storeLoading from '../../../assets/images/loadStore.png';
import {ROOT_PATH} from "../../../contants";

const StoreItem = ({
                       id,
                       store_avatar,
                       store_name,
                       store_address,
                       store_not_mark,
                       total_food,
                       total_comment,
                       avg_rate,
                       last_comment,
                       loading
                   }) => {
    return (
        <S.CardItem
            hoverable
            cover={
                <S.StoreImage avatar={loading ? storeLoading : `${ROOT_PATH}${store_avatar}`}/>
            }
            onClick={() => {
                if (!loading) {
                    history.push(`/stores/${store_not_mark}.${id}`);
                }
            }}
        >
            <Skeleton avatar loading={loading} active>
                <S.StoreInfo>
                    <S.StoreNameInfo>{store_name}</S.StoreNameInfo>
                    <S.StoreAddress>{store_address}</S.StoreAddress>
                </S.StoreInfo>
                {
                    last_comment?.first_name ?
                        <S.StoreCommentWrap
                            avatar={<Avatar src={`${ROOT_PATH}${last_comment?.avatar}`}/>}
                            title={(
                                <S.StoreComment>
                                    <S.StoreCommentName>{`${last_comment?.first_name} ${last_comment?.last_name}`} </S.StoreCommentName>
                                    <S.StoreCommentDoc> {last_comment?.content}</S.StoreCommentDoc>
                                </S.StoreComment>
                            )}
                        /> :
                        <div style={{minHeight: 44}}></div>
                }

                <S.StoreStatistical>
                    <div>
                        <div><FaComment/><span>{total_comment}</span></div>
                        <div><IoIosPizza/><span>{total_food}</span></div>
                        {avg_rate > 0 && <div><AiTwotoneStar/><span>{avg_rate}</span></div>}
                        <span><GrFormNextLink/></span>
                    </div>
                </S.StoreStatistical>
            </Skeleton>
        </S.CardItem>
    );
}
export default StoreItem;
