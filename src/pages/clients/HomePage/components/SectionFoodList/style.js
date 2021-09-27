import styled from 'styled-components';
import { VscThreeBars } from 'react-icons/all';

export const HeaderFilter = styled.h2`
  display: flex;
  align-items: center;
  padding: 15px 10px;
  margin: 0;
  font-size: 20px;
  font-weight: bold;

  & > svg {
    margin-right: 5px;
  }
`;
export const SuffixFilter = styled.ul`
  margin: 0;
  display: flex;
  align-items: center;
  padding-right: 2rem;
  flex-basis: 25%;

  & > li {
    flex-basis: 100%;

    & > div {
      width: 100%;
    }
  }

  & > li:first-child {
    display: none;
  }

  @media screen and (max-width: 479px) {
    padding: 0;
    flex-basis: 25%;
    & > li:first-child {
      display: block;
    }
  }
`;
export const Filter = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 41px;
  background-color: ${(props) => props.theme.bgFilter};
  width: 100%;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
export const MoreFilter = styled(VscThreeBars)`
  position: absolute;
  top: 11.5px;
  right: 15px;
  display: none;
  cursor: pointer;
  font-size: 24px;
  color: #ccc;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
