import styled, {css} from "styled-components";

export const MicroHeader = styled.div`
    clear: both;
    overflow: hidden;
    position: relative;
    background: #fff;
`
export const MainImg = styled.div`
    float: left;
    position: relative;
`
export const ImageWrap = styled.div`
    height: 275px;
    position: relative;
`
export const StoreImg = styled.img`
    width: 488px;
    height: unset;
`
export const MainInformation = styled.div`
    width: 635px;
    float: left;
    margin-left: 25px;
`
export const ResCommon = styled.div`    
    position: relative;
    overflow: hidden;
    font-size: 14px;
    width: 100%;
    float: left;
    margin-top: 0;
`
export const MainInfoTitle = styled.div`
    float: left;
    width: 100%;
    overflow: hidden;
    padding: 10px 0;
`
export const StoreName = styled.h1`
    width: 600px;
    font-weight: 700;
    float: left;
    padding: 5px 0 2px;
    margin: 0;
    font-size: 20px;
    line-height: 1.2em;
    text-shadow: 0 1px 1px #fff;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`
export const StoreCategory = styled.div`
    overflow: hidden;
    clear: both;
    padding: 2px 0;
    &>small{
        color: #888;
        font-size: 12px;
    }
`
const InfoRow = css`display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 35px;
    clear: both;
    overflow: hidden;
    &>svg{
        float: left;
        margin-right: 6px;
        font-size: 13px;
        padding-top: 1px;
    }
    &>span{
        font-size: 14px;
    }
    &>span.itsopen{
        color: #05CD15;
        font-weight: 700;
    }
    &>span.itsclosed{
        color: #989898;
        font-weight: 700;
    }
`
export const StoreAddress = styled.div`
    ${InfoRow}
`
export const StoreTime = styled.div`
    ${InfoRow}
`
export const ResSummaryPoint = styled.div`
    overflow: hidden;
    margin-top: 5px;
    clear: both;
`
export const MicroPoints = styled.div`
    float: left;
    font-size: 20px;
    font-weight: 700;
    padding: 10px 0 6px;
    color: #02AAD4;
    text-shadow: 0 1px 1px #fff;
    width: 100px;
    margin-bottom: 10px;
`
export const MicroReviewCount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    margin-top: 3px;
    width: 100%;
    text-align: center;
    justify-content: center;
    &>svg{
        color: #fadb14;
    }
`
export const MicroReviewText = styled.div`
    font-size: 12px;
    color: #777;
    float: left;
    margin-top: 7px;
    width: 100%;
    text-align: center;
`
export const YourRate = styled.div`
    text-align:center;
    float: right;
    margin: -16px 25px 0 0;
    font-size: 20px;
    font-weight: 700;
    padding: 10px 0 6px;
    text-shadow: 0 1px 1px #fff;
    width: 150px;
    
`
export const YourRateCount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #02AAD4;
    float: left;
    width: 100%;
    text-align: center;
    &>svg{
        color: #fadb14;
    }
`
export const YourRateText = styled.div`
    font-size: 12px;
    color: #777;
    float: left;
    width: 100%;
    text-align: center;
`
export const MicroMainMenu = styled.div`
    margin-top: 20px;
`