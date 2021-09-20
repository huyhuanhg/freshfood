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
      max-width: 100%;
      height: 500px;
      width: 100%;
      max-height: 500px;
      border-style: none;
      vertical-align: middle;
      transform: translateY(-50%);
    }

    & > div.info {
      position: absolute;
      top: auto;
      bottom: 0;
      left: 0;
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;

      & div.imgbox-food-name {
        margin-bottom: 3px;
        font-size: 16px;
        font-weight: bold;
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
      padding: 4px 10px;
      width: 50%;
      border: 1px solid ${(props)=>props.theme.price};
      border-radius: 3px;
      white-space: nowrap;
      font-size: 16px;
      font-weight: 400;
      text-align: center;
      text-transform: none;
      line-height: 1.5;
      color: #fff;
      background-color: ${(props)=>props.theme.price};
      cursor: pointer;
      vertical-align: middle;
      -webkit-appearance: button;
      user-select: none;
      overflow: visible;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
  }
`;
