import styled from 'styled-components';
import { Button } from 'antd';

export const CartTitle = styled.div`
  display: flex;
  justify-content: space-between;

  & > a {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #288ad6;
    line-height: 16px;
    padding: 10px;
  }

  & > span {
    padding: 9px 10px;
    font-size: 18px;
    font-weight: 600;
    color: #464646;
  }
`;
export const CartWrap = styled.div`
  min-height: calc(100vh - 480px);
`;
export const CartEmpty = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;

  & > div {
    align-self: center;
    padding: 10px;
    font-size: 16px;

    & > svg {
      color: red;
      font-size: 400%;
    }
  }

  & > button {
    background: unset;
    outline: none;
    border: 1px solid #288ad6;
    color: #288ad6;
    cursor: pointer;
    font-weight: 600;
    width: 60%;
    margin: 0 20%;
    padding: 0.5rem;
    font-size: 16px;
    border-radius: 4px;
    margin-top: 1.5rem;
  }
`;
export const CartContent = styled.div`
  background: #fff;
  box-shadow: 0 0 18px rgb(0 0 0 / 12%);
  border-radius: 2px;
`;
export const CartList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;

  & > li:first-child {
    border-top: none;
  }

  & > li {
    display: block;
    padding: 10px 30px;
    flex-basis: 100%;
    box-sizing: border-box;
    border-top: 1px solid #e1e1e1;

    & > div.img {
      float: left;
      width: 16%;

      & > a {
        display: block;
        overflow: hidden;

        & > img {
          display: block;
          width: 75px;
          height: 75px;
          margin: auto;
          border-radius: 3px;
          overflow: hidden;
        }
      }

      & > button {
        display: block;
        overflow: hidden;
        margin: 15px auto 0;
        border: 0;
        background: #fff;
        color: #999;
        font-size: 12px;
        cursor: pointer;
        outline: none;
        transition: .3s;

        &:hover {
          color: rgba(220, 9, 54, .8);

          & > span {
            background: rgba(220, 9, 54, .8);
          }
        }

        & > span {
          float: left;
          background: #ccc;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          position: relative;
          margin: 2px 3px 0 0;
          transition: .3s;

          &:before,
          &:after {
            content: "";
            width: 2px;
            height: 8px;
            background: #fff;
            position: absolute;
            transform: rotate(45deg);
            top: 2px;
            left: 5px;
          }

          &:after {
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
`;
export const CartInfo = styled.div`
  display: flex;
  width: 84%;

  & > div.food-info {
    flex-basis: 80%;
    overflow: hidden;
    margin-top: 0.5rem;

    & > div.food-name {
      width: 100%;
      font-size: 18px;
      font-weight: 700;
      display: -webkit-box;

      & > a {
        color: #333;
      }
    }

    & > div.store-name {
      width: 100%;
      font-size: 14px;
      font-weight: 400;

      & > a {
        color: #aaa;

        &:hover {
          color: rgb(51, 128, 216);
        }
      }
    }

    & a {
      display: block;
      padding: 0.25rem 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  & > div.price-info {
    flex-basis: 20%;
    text-align: right;
    margin-top: 0.5rem;

    & > div.choose-quantity {
      display: flex;
      overflow: hidden;
      position: relative;
      width: 100px;
      border: 1px solid #dfdfdf;
      background: #fff;
      margin-top: 1rem;
      margin-left: calc(100% - 100px);
      border-radius: 3px;
      line-height: 30px;
      font-size: 14px;
      color: #333;

      & > div {
        background: #fff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      & > div.minus {
        border-right: 1px solid #dfdfdf;
        width: 32%;
        height: 30px;
        cursor: pointer;
        font-size: 20px;

        &:hover > svg {
          color: #777;
          transform: scale(1.2);
        }

        & > svg {
          color: #ccc;
          transition: .3s;
        }
      }

      & > div.quantity {
        font-size: 14px;
        color: #333;
        width: 33%;
        height: 30px;
        text-align: center;
      }

      & > div.plus {
        border-left: 1px solid #dfdfdf;
        width: 32%;
        height: 30px;
        cursor: pointer;
        font-size: 20px;

        &:hover > svg {
          color: #777;
          transform: scale(1.2);
        }

        & > svg {
          color: #ccc;
          transition: .3s;
        }
      }
    }

    & > span {
      color: #f30c28;
      font-size: 14px;
      text-align: right;
      margin-bottom: 2px;

      & > strike {
        display: block;
        min-height: 22px;
        font-weight: 300;
        margin-top: 10px;
        overflow: hidden;
        color: #666;
      }
    }
  }
`;
export const TotalProvisional = styled.div`
  display: block;
  overflow: hidden;
  padding: 10px 30px;

  & > span {
    font-size: 14px;
    line-height: 18px;
    color: #333;
  }

  & > span:first-child {
    float: left;
  }

  & > span:last-child {
    float: right;
  }
`;
export const CartOrder = styled.div`
  background: #fff;
  box-shadow: 0 0 18px rgb(0 0 0 / 12%);
  border-radius: 2px;
  padding: 10px 30px;

  & > h4 {
    font-size: 14px;
    text-transform: uppercase;
    color: #333;
    margin-bottom: 1rem;
  }
`;
export const OrderTotal = styled.div`
  overflow: hidden;
  background: #f6f6f6;
  padding: 10px 10px;
  border: 1px solid #e1e1e1;

  & > span {
    font-size: 14px;
    line-height: 18px;
    color: #333;
  }

  & > span:first-child {
    float: left;

    & > b {
      color: blue;
    }
  }

  & > span:last-child {
    float: right;
    color: #f30c28;
    font-weight: bold;
  }
`;
export const OrderButton = styled(Button)`
  width: 50%;
  background: #f30c28;
  color: #fff;
  border: 1px solid #f30c28;

  &:hover {
    background: #d0051d;
    color: #fff;
    border: 1px solid #d0051d;
  }
`;
export const DeleteAllBtn = styled(Button)`
  width: 100%;
  border-left: 0;
  border-bottom: 0;
  border-right: 0;
  border-color: rgba(143, 12, 40, 0.2);
  color: #f30c28;
  font-size: 14px;
  border-radius: 0;
  background: rgba(143, 12, 40, 0.2);

  &:hover {
    background: rgba(143, 12, 40, 0.1);
    border-color: rgba(143, 12, 40, 0.1);
    color: #f30c28;
  }
`;
