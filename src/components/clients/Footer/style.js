import styled from 'styled-components';
import bg from '../../../assets/images/bgfooter.png';

export const FooterWrap = styled.footer`
  padding: 0;
  background-attachment: fixed;
  background-position: 0 400px;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg});
  color: rgba(255, 255, 255, 0.8);
  font-size: 130%;

  & > div {
    max-width: 1140px;
    padding: 50px 0;
    margin: 0 auto;
  }

  & h4 {
    font-size: 130%;
    font-weight: bold;
    color: #29d197;
    margin-bottom: 16px;
  }
`;
export const AboutFooter = styled.footer`
  & > div {
    display: flex;
    align-items: center;

    & > div {
      width: 37px;
      height: 37px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
      color: white;
      cursor: pointer;

      &:hover > svg {
        transition: 0.4s;
        color: #29d197;
        transform: scale(1.2);
      }
    }
  }
`;
export const Subscribe = styled.div`
  & > form {
    position: relative;

    & > input {
      padding: 15px 20px;
      background-color: unset;
      outline: none;
      border-radius: 30px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      color: white;
      width: 100%;
      transition: 0.4s ease-in-out;

      &:hover,
      &:focus {
        border-color: #29d197;
      }
    }

    & > button {
      display: flex;
      align-items: center;
      outline: none;
      background-color: unset;
      border: none;
      font-size: 20px;
      position: absolute;
      top: 50%;
      right: 8%;
      transform: translate(50%, -50%);
      cursor: pointer;
      color: white;
    }
  }
`;
export const GetInTouch = styled.div`
  & > ul {
    list-style: none;
    color: white;
    margin: 0;
    padding-left: 0;

    & > li {
      margin: 0 30px 10px 0;

      &:hover > svg,
      &:hover > span {
        transition: 0.4s;
        transform: scale(1.2);
      }

      & > svg,
      & > span {
        color: #29d197;
        margin-right: 5px;
      }
    }
  }
`;
export const Copyright = styled.div`
  background-color: #1a265c;
  text-align: center;
  padding: 10px 0;
  position: relative;
  color: white;
  font-size: 14px;

  & > span {
    color: #29d197;
    font-weight: bold;
  }
`;
