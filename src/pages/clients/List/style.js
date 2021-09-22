import styled from 'styled-components';
import { Affix } from 'antd';

export const AffixIndex = styled(Affix)`
  & .ant-affix {
    z-index: 1;
  }
`;
export const TitleList = styled.h3`
  flex-basis: 100%;
  height: 46px;
  margin: 0 20px;
  font-size: 16px;
  @media screen and (max-width: 767px) {
    margin-right: 0;
  }
  @media screen and (max-width: 575px) {
    margin-left: 10px;
  }
  @media screen and (max-width: 767px) {
    margin-left: 5px;
    font-size: 14px;
  }
`;
export const PrefixFilter = styled.div`

  @media screen and (max-width: 479px) {
    & .ant-menu-overflow > .ant-menu-overflow-item {
      font-size: 12px;
    }
  }
`;
export const SuffixFilter = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 2rem 0 0;
  flex-basis: 70%;

  & > li.category-filter {
    flex-basis: 80%;

    & > div.ant-select {
      width: 100%;
    }
  }

  & > li.sort-by {
    flex-basis: 20%;

    & > div.ant-select {
      width: 100%;
    }
  }

  @media screen and (max-width: 575px) {
    padding-right: 5px;
  }

  @media screen and (max-width: 479px) {
    & > li.category-filter {
      flex-basis: 60%;

    }

    & > li.sort-by {
      flex-basis: 40%;

      & > div.ant-select {
        max-width: 100px;
      }
    }

    & div.ant-select {
      font-size: 12px;

      & .ant-select-selector {
        padding: 0 6px;

        & .ant-select-selection-item {
          padding-right: 10px;
        }

        & .ant-select-arrow {
          width: 8px;
          height: 8px;
          right: 5px;
          font-size: 8px;
        }
      }
    }
  }
`;
