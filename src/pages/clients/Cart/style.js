import styled from 'styled-components';
import { Button } from 'antd';

export const CartTitle = styled.div`
  display: flex;
  justify-content: space-between;

  & > a {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 14px;
    color: ${(props) => props.theme.btnPrimary};
    line-height: 16px;
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

  & .ant-affix {
    z-index: 5;
  }
`;
export const CartEmpty = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;

  & > div {
    align-self: center;
    padding: 10px;
    font-size: 16px;

    & > svg {
      color: ${(props) => props.theme.btnDanger};
      font-size: 400%;
    }
  }

  & > button {
    margin: 1.5rem 20% 0;
    padding: 0.5rem;
    width: 60%;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.btnPrimary};
    background: unset;
    outline: none;
    color: ${(props) => props.theme.btnPrimary};
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
  }
`;
export const CartContent = styled.div`
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 0 18px rgb(0 0 0 / 12%);
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
    flex-basis: 100%;
    padding: 10px 30px;
    border-top: 1px solid #e1e1e1;
    box-sizing: border-box;

    & > div.img {
      float: left;
      width: 16%;

      & > a {
        display: block;
        overflow: hidden;

        & > img {
          display: block;
          margin: auto;
          width: 75px;
          height: 75px;
          border-radius: 3px;
          overflow: hidden;
        }
      }

      & > button {
        display: block;
        margin: 15px auto 0;
        border: 0;
        overflow: hidden;
        background: #fff;
        color: #999;
        font-size: 12px;
        cursor: pointer;
        outline: none;
        transition: .3s;

        &:hover {
          color: ${(props) => props.theme.btnDanger};

          & > span {
            background: ${(props) => props.theme.btnDanger};
          }
        }

        & > span {
          position: relative;
          float: left;
          margin: 2px 3px 0 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ccc;
          transition: .3s;

          &:before,
          &:after {
            position: absolute;
            top: 2px;
            left: 5px;
            height: 8px;
            width: 2px;
            content: "";
            background: #fff;
            transform: rotate(45deg);
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
    margin-top: 0.5rem;
    overflow: hidden;

    & > div.food-name {
      display: -webkit-box;
      width: 100%;
      font-size: 18px;
      font-weight: 700;

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
          color: ${(props) => props.theme.btnPrimary};
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
    margin-top: 0.5rem;
    text-align: right;

    & > div.choose-quantity {
      position: relative;
      display: flex;
      margin-top: 1rem;
      margin-left: calc(100% - 100px);
      width: 100px;
      border-radius: 3px;
      border: 1px solid #dfdfdf;
      overflow: hidden;
      background: #fff;
      line-height: 30px;
      font-size: 14px;
      color: #333;

      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        text-align: center;
      }

      & > div.minus {
        height: 30px;
        width: 32%;
        border-right: 1px solid #dfdfdf;
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
        width: 33%;
        height: 30px;
        font-size: 14px;
        color: #333;
        text-align: center;
      }

      & > div.plus {
        width: 32%;
        height: 30px;
        border-left: 1px solid #dfdfdf;
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
      margin-bottom: 2px;
      color: ${(props) => props.theme.price};
      font-size: 14px;
      text-align: right;

      & > strike {
        display: block;
        margin-top: 10px;
        min-height: 22px;
        font-weight: 300;
        overflow: hidden;
        color: #666;
      }
    }
  }
`;
export const TotalProvisional = styled.div`
  display: block;
  padding: 10px 30px;
  overflow: hidden;

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
  padding: 10px 30px;
  background: #fff;
  box-shadow: 0 0 18px rgb(0 0 0 / 12%);
  border-radius: 2px;

  & > h4 {
    margin-bottom: 1rem;
    font-size: 14px;
    text-transform: uppercase;
    color: #333;
  }
`;
export const OrderTotal = styled.div`
  padding: 10px 10px;
  border: 1px solid #e1e1e1;
  overflow: hidden;
  background: #f6f6f6;

  & > span {
    font-size: 14px;
    line-height: 18px;
    color: #333;
  }

  & > span:first-child {
    float: left;

    & > b {
      color: ${(props) => props.theme.btnPrimary};
    }
  }

  & > span:last-child {
    float: right;
    color: ${(props) => props.theme.price};
    font-weight: bold;
  }
`;
export const OrderButton = styled(Button)`
  width: 50%;
  border: 1px solid ${(props) => props.theme.btnDanger};
  background: ${(props) => props.theme.btnDanger};
  color: #fff;

  &:hover {
    background: #ee3612;
    color: #fff;
    border: 1px solid #ee3612;
  }
`;
export const DeleteAllBtn = styled(Button)`
  width: 100%;
  border-left: 0;
  border-bottom: 0;
  border-right: 0;
  border-radius: 0;
  border-color: #fff1f0;
  color: ${(props) => props.theme.btnDanger};
  font-size: 14px;
  background: #fff1f0;

  &:hover {
    background: rgba(255, 204, 199, 0.5);
    border-color: rgba(255, 204, 199, 0.5);
    color: ${(props) => props.theme.btnDanger};
  }
`;
export const CartHeader = styled.div`
  margin-top: -50px;
  margin-bottom: 2rem;
  background-image: linear-gradient(30deg, #b7eb8f, #69c0ff);

  & .header-cart {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    font-size: 300%;
    font-weight: 400;
    color: #fff;

    & span.back {
      position: absolute;
      right: 40px;
      top: 30px;
      display: flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
      transition: .3s;
      color: ${(props) => props.theme.btnPrimary};

      &:hover {
        color: #1d64ad;
      }
    }
  }
`;
