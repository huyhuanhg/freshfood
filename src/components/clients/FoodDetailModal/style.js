import styled from 'styled-components';
import { Modal } from 'antd';

export const FoodItem = styled.div`
  position: relative;
  min-height: 500px;
  background: #d4d5da !important;

  & > div {
    & > img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      max-width: 100%;
      height: 500px;
      width: 100%;
      max-height: 500px;
      vertical-align: middle;
      border-style: none;
    }

    & > div.info {
      position: absolute;
      color: #fff;
      top: auto;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.8);
      padding: 10px;

      & div.imgbox-food-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 3px;
      }

      & div.imgbox-desc {
        font-weight: 300;
      }

      & div.imgbox-total {
        font-size: 11px;
        color: #ccc;

        & > span.txt-bold {
          font-weight: 700 !important;
        }
      }

      & div.imgbox-current-price {
        text-align: right;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  & > span.rate {
    display: flex;
    align-items: center;
    position: relative;
    top: 10px;
    left: 10px;
    color: #999;
    font-size: 200%;

    & > svg {
      color: #f09724;
    }
  }
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
