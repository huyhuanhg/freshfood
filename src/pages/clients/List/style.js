import styled from 'styled-components';
import { Affix } from 'antd';

export const AffixIndex = styled(Affix)`
  & .ant-affix {
    z-index: 1;
  }

  @media screen and (max-width: 767px) {
    & .ant-affix {
      top: 166.781px !important;
    }
  }
  @media screen and (max-width: 479px) {
    & .ant-affix {
      top: 142.781px !important;
    }
  }
`;
export const TitleList = styled.h3`
  line-height: 46px;
  margin: 0 20px;
  font-size: 16px;
  @media screen and (max-width: 767px) {
    margin-right: 0;
  }
  @media screen and (max-width: 575px) {
    margin-left: 10px;
  }
  @media screen and (max-width: 479px) {
    margin-left: 5px;
    font-size: 14px;
  }
`;
export const MenuList = styled(Affix)`
  @media screen and (max-width: 767px) {
    & .ant-affix {
      top: 116.781px !important;
    }

    & ul.ant-menu {
      display: flex;

      & > li.ant-menu-item {
        padding: 0 !important;
        height: 50px;
        line-height: 50px;
        text-align: center;

        & > .ant-menu-item-icon {
          display: none;
        }

        &:after {
          width: 100%;
          bottom: 0;
          border-right: 0;
          border-bottom: 2px solid #29d197;
          right: 0 !important;
          left: 0 !important;
        }
      }
    }
  }
  @media screen and (max-width: 479px) {
    & .ant-affix {
      top: 102.781px !important;
    }

    & ul.ant-menu {
      & > li.ant-menu-item {
        height: 40px;
        line-height: 40px;

        & .ant-menu-title-content {
          font-size: 12px;
        }
      }
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
