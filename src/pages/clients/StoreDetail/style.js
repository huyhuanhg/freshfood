import styled, { css } from 'styled-components';
import { Modal, Image } from 'antd';

export const MicroHeader = styled.div`
  position: relative;
  clear: both;
  overflow: hidden;
  background: #fff;
`;
export const MainImg = styled.div`
  position: relative;
  float: left;
`;
export const ImageWrap = styled.div`
  position: relative;
  height: 275px;
  overflow: hidden;
`;
export const StoreImg = styled.img`
  width: 488px;
  height: unset;
`;
export const MainInformation = styled.div`
  float: left;
  margin-left: 25px;
  width: 635px;
`;
export const ResCommon = styled.div`
  position: relative;
  float: left;
  height: 275px;
  width: 100%;
  margin-top: 0;
  overflow: hidden;
  font-size: 14px;
`;
export const MainInfoTitle = styled.div`
  float: left;
  padding: 10px 0;
  width: 100%;
  overflow: hidden;
`;
export const StoreName = styled.h1`
  float: left;
  width: 600px;
  padding: 5px 0 2px;
  margin: 0;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.2em;
  text-shadow: 0 1px 1px #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const StoreCategory = styled.div`
  padding: 2px 0;
  overflow: hidden;
  clear: both;

  & > small {
    color: #888;
    font-size: 12px;
  }
`;
const InfoRow = css`
  display: flex;
  align-items: center;
  width: 100%;
  max-height: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
  clear: both;

  & > svg {
    float: left;
    margin-right: 6px;
    padding-top: 1px;
    font-size: 13px;
  }

  & > span {
    font-size: 14px;
  }

  & > span.itsopen {
    color: ${(props) => props.theme.rootColor};
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
  margin-top: 5px;
  overflow: hidden;
  clear: both;
`;
export const MicroPoints = styled.div`
  float: left;
  margin-bottom: 10px;
  padding: 10px 0 6px;
  width: 100px;
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.rootColor};
  text-shadow: 0 1px 1px #fff;
`;
export const MicroReviewCount = styled.div`
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
  width: 100%;
  text-align: center;

  & > svg {
    color: ${(props) => props.theme.star};
  }
`;
export const MicroReviewText = styled.div`
  float: left;
  margin-top: 7px;
  width: 100%;
  font-size: 12px;
  color: #777;
  text-align: center;
`;
export const YourRate = styled.div`
  float: right;
  margin: -16px 25px 0 0;
  padding: 10px 0 6px;
  width: 150px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  text-shadow: 0 1px 1px #fff;
`;
export const YourRateCount = styled.div`
  float: left;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.rootColor};
  text-align: center;

  & > svg {
    color: ${(props) => props.theme.star};
  }
`;
export const YourRateText = styled.div`
  float: left;
  width: 100%;
  font-size: 12px;
  color: #777;
  text-align: center;
`;
export const MicroMainMenu = styled.div`
  margin-top: 20px;

  & .ant-affix {
    z-index: 5;
  }
`;
export const StoreToolbar = styled.div`
  margin-bottom: 15px;
  height: 48px;
  width: 100%;
  box-sizing: border-box;

  & > ul {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 0;
    border: 1px solid #ddd;
    list-style: none;
    background: #fff;

    & > li {
      display: flex;
      flex-basis: 25%;
      justify-content: center;
      align-items: center;
      padding: 15px 0;
      border-right: #f0f0f0 1px solid;
      border-bottom: none;
      font-size: 14px;
      text-align: center;
      font-weight: 700;
      color: ${(props) => props.theme.priceBlue};

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
  margin-bottom: 15px;
  padding-top: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
  background: #fff;
  overflow: hidden;
`;
export const StoreFilterTitle = styled.div`
  margin-left: 5px;
  padding: 10px 15px 5px 10px;
  border-bottom: 1px solid #eee;
  font-size: 1.25rem;
  font-weight: 600;
  overflow: hidden;
  color: #333;
`;
export const ViewOther = styled.div`
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 2px;
  text-align: center;
  overflow: hidden;
  font-size: 14px;
  color: #fff;
  background-color: ${(props) => props.theme.btnDanger};
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
      display: inline-block;
      width: 50%;
      padding: 4px 10px;
      border: 1px solid ${(props) => props.theme.btnDanger};
      border-radius: 3px;
      font-size: 16px;
      cursor: pointer;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      -webkit-appearance: button;
      font-weight: 400;
      user-select: none;
      line-height: 1.5;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      overflow: visible;
      background-color: ${(props) => props.theme.btnDanger};
      text-transform: none;
    }
  }
`;
export const PictureWrap = styled.div`
  width: 225px;
  height: 225px;
  overflow: hidden;
  border: 1px solid #f6f6f6;
  border-radius: 4px;
`;

export const PictureItem = styled(Image)`
  width: 225px;
  height: 225px;
  object-fit: cover;
  vertical-align: middle;
`;
