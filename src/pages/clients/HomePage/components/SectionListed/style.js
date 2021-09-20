import styled from 'styled-components';
import { Link } from 'react-router-dom';

import bgIntroduce from '../../../../../assets/images/bg4.jpg';

export const Introduce = styled.section`
  margin-bottom: 80px;
  padding: 0;
  background-size: 1900px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(26, 38, 92, 0.6), rgba(26, 38, 92, 0.6)), url(${bgIntroduce});

  & > div {
    position: relative;
    margin: 0 auto;
    padding: 50px 0 80px;
    max-width: 1430px;
    color: #fff;
    font-size: 16px;

    & h2 {
      color: #fff;
      font-size: 200%;

      & > span {
        color: ${(props) => props.theme.rootColor};
      }
    }

    & ul {
      list-style: none;

      & > li {
        padding: 0.5rem 0;

        & > svg {
          color: ${(props) => props.theme.rootColor};
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
    z-index: 4;
    padding: 30px 10px 0 10px;
    margin: 0;
    width: 100%;
    min-width: 200px;
    height: 100%;
    border-right: 1px solid #f1f1f1;
    border-left: 1px solid #f1f1f1;
    border-bottom: 5px solid ${({ color }) => color};
    text-align: center;
    background-color: #fcfcfc;

    & > figcaption {
      color: black;

      & > p:first-child {
        font-size: 200%;
        font-weight: bold;
        margin: 0;
        color: ${(props) => props.theme.rootColor};
      }
    }

    & > svg {
      font-size: 250%;
      color: ${({ color }) => color};
    }

    & + span {
      position: absolute;
      top: 90%;
      left: 43%;
      z-index: 3;
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      content: "";
      background-color: ${({ color }) => color};
    }
  }

  &:hover {
    & > figure {
      border-right: 1px solid ${({ color }) => color};
      border-left: 1px solid ${({ color }) => color};
      transition: 0.4s;
      background-color: ${({ color }) => color};
      transform: translateY(20px);

      & > svg {
        color: #fff;
      }

      & > figcaption {
        color: #fff;
      }

      & + span {
        transition: 0.4s;
        top: calc(90% + 20px);
      }
    }
  }
`;
