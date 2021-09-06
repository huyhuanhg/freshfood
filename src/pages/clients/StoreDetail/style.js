import styled, { css } from 'styled-components';
import { Modal } from 'antd';

export const MicroHeader = styled.div`
  clear: both;
  overflow: hidden;
  position: relative;
  background: #fff;
`;
export const MainImg = styled.div`
  float: left;
  position: relative;
`;
export const ImageWrap = styled.div`
  height: 275px;
  overflow: hidden;
  position: relative;
`;
export const StoreImg = styled.img`
  width: 488px;
  height: unset;
`;
export const MainInformation = styled.div`
  width: 635px;
  float: left;
  margin-left: 25px;
`;
export const ResCommon = styled.div`
  height: 275px;
  position: relative;
  overflow: hidden;
  font-size: 14px;
  width: 100%;
  float: left;
  margin-top: 0;
`;
export const MainInfoTitle = styled.div`
  float: left;
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
`;
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
`;
export const StoreCategory = styled.div`
  overflow: hidden;
  clear: both;
  padding: 2px 0;

  & > small {
    color: #888;
    font-size: 12px;
  }
`;
const InfoRow = css`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 35px;
  clear: both;
  overflow: hidden;

  & > svg {
    float: left;
    margin-right: 6px;
    font-size: 13px;
    padding-top: 1px;
  }

  & > span {
    font-size: 14px;
  }

  & > span.itsopen {
    color: #05cd15;
    font-weight: 700;
  }

  & > span.itsclosed {
    color: #989898;
    font-weight: 700;
  }
`;
export const StoreAddress = styled.div`
  ${InfoRow}
`;
export const StoreTime = styled.div`
  ${InfoRow}
`;
export const ResSummaryPoint = styled.div`
  overflow: hidden;
  margin-top: 5px;
  clear: both;
`;
export const MicroPoints = styled.div`
  float: left;
  font-size: 20px;
  font-weight: 700;
  padding: 10px 0 6px;
  // color: #02AAD4;
  color: #03ae03;
  text-shadow: 0 1px 1px #fff;
  width: 100px;
  margin-bottom: 10px;
`;
export const MicroReviewCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  margin-top: 3px;
  width: 100%;
  text-align: center;
  justify-content: center;

  & > svg {
    color: #fadb14;
  }
`;
export const MicroReviewText = styled.div`
  font-size: 12px;
  color: #777;
  float: left;
  margin-top: 7px;
  width: 100%;
  text-align: center;
`;
export const YourRate = styled.div`
  text-align: center;
  float: right;
  margin: -16px 25px 0 0;
  font-size: 20px;
  font-weight: 700;
  padding: 10px 0 6px;
  text-shadow: 0 1px 1px #fff;
  width: 150px;
`;
export const YourRateCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // color: #02AAD4;
  color: #03ae03;
  float: left;
  width: 100%;
  text-align: center;

  & > svg {
    color: #fadb14;
  }
`;
export const YourRateText = styled.div`
  font-size: 12px;
  color: #777;
  float: left;
  width: 100%;
  text-align: center;
`;
export const MicroMainMenu = styled.div`
  margin-top: 20px;
`;
export const StoreToolbar = styled.div`
  margin-bottom: 15px;
  height: 48px;
  box-sizing: border-box;
  width: 100%;

  & > ul {
    list-style: none;
    display: flex;
    width: 100%;
    align-items: center;
    background: #fff;
    border: 1px solid #ddd;
    padding-left: 0;

    & > li {
      flex-basis: 25%;
      display: flex;
      padding: 15px 0;
      font-size: 14px;
      color: #005d80;
      border-right: #f0f0f0 1px solid;
      border-bottom: none;
      text-align: center;
      font-weight: 700;
      justify-content: center;
      align-items: center;

      & > svg {
        margin-right: 5px;
      }

      &:hover {
        background: #f7f7f7;
        cursor: pointer;
      }
    }
  }
`;
export const StoreContent = styled.div`
  background: #fff;
  overflow: hidden;
  border: 1px solid #eee;
  margin-bottom: 15px;
  border-radius: 2px;
`;
export const StoreContentTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  padding: 10px 15px 5px 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px !important;
  overflow: hidden;
  background: #fff;
  color: #333;
  margin-left: 5px;
  margin-bottom: 5px;
`;
export const ViewOther = styled.div`
  width: 100%;
  text-align: center;
  overflow: hidden;
  background-color: #ee4d2d;
  font-size: 14px;
  padding: 10px;
  overflow: hidden;
  border-radius: 2px;
  color: #fff;
  display: block;
  cursor: pointer;
`;
export const ModalCustom = styled(Modal)`
  & .ant-modal-body {
    padding: 0 !important;
  }

  & .ant-modal-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;

    & > button {
      font-size: 16px;
      width: 50%;
      cursor: pointer;
      background-color: #cf2127;
      color: #fff;
      border-color: #cf2127;
      padding: 4px 10px;
      display: inline-block;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      -webkit-appearance: button;
      display: inline-block;
      font-weight: 400;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      user-select: none;
      border: 1px solid #cf2127;
      line-height: 1.5;
      border-radius: 3px;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      overflow: visible;
      text-transform: none;
    }
  }
`;
