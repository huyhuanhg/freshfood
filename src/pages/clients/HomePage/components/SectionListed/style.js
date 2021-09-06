import styled from 'styled-components';
import bgIntroduce from '../../../../../assets/images/bg4.jpg';
import { Link } from 'react-router-dom';

export const Introduce = styled.section`
  padding: 0;
  background-size: 1900px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(26, 38, 92, 0.6), rgba(26, 38, 92, 0.6)), url(${bgIntroduce});
  margin-bottom: 80px;

  & > div {
    position: relative;
    max-width: 1430px;
    margin: 0 auto;
    padding: 50px 0 80px;
    color: white;
    font-size: 16px;

    & h2 {
      color: white;
      font-size: 200%;

      & > span {
        color: #29d197;
      }
    }

    & ul {
      list-style: none;

      & > li {
        padding: 0.5rem 0;

        & > svg {
          color: #29d197;
          margin-right: 5px;
        }
      }
    }

    & > div.list {
      position: absolute;
      left: 50%;
      min-width: 800px;
      bottom: 0;
      transform: translate(-50%, 50%);
    }
  }
`;

export const IntroduceLink = styled(Link)`
  & > figure {
    position: relative;
    width: 100%;
    min-width: 200px;
    height: 100%;
    text-align: center;
    padding: 30px 10px 0px 10px;
    background-color: #fcfcfc;
    border-right: 1px solid #f1f1f1;
    border-left: 1px solid #f1f1f1;
    border-bottom: 5px solid ${({ color }) => color};
    margin: 0;
    z-index: 4;

    & > figcaption {
      color: black;

      & > p:first-child {
        font-size: 200%;
        font-weight: bold;
        margin: 0;
        color: #29d197;
      }
    }

    & > svg {
      font-size: 250%;
      color: ${({ color }) => color};
    }

    & + span {
      display: block;
      content: '';
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: ${({ color }) => color};
      position: absolute;
      top: 90%;
      left: 43%;
      z-index: 3;
    }
  }

  &:hover {
    & > figure {
      transition: 0.4s;
      background-color: ${({ color }) => color};
      transform: translateY(20px);
      border-right: 1px solid ${({ color }) => color};
      border-left: 1px solid ${({ color }) => color};

      & > svg {
        color: white;
      }

      & > figcaption {
        color: white;
      }

      & + span {
        transition: 0.4s;
        top: calc(90% + 20px);
      }
    }
  }
`;
