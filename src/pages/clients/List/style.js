import styled, { css } from 'styled-components';
import { Affix, Menu } from 'antd';

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

export const ListMenu = styled(Menu)`
  background: #fff;
  height: auto;

  & .mobile-icon {
    display: none;
  }

  @media screen and (max-width: 767px) {
    position: fixed;
    top: 183px;
    width: 50px;
    left: 30px;
    z-index: 95;
    height: 50px;
    border: 1px solid ${({ mobileActive }) => mobileActive && '#29d197'};
    border-radius: 50%;
    ${
            ({ mobileActive }) => {
              const menu = document.getElementById('menu_list_page');
              let menuItem = null;
              if (menu) {
                menuItem = menu.querySelectorAll('li:not([class*=ant-menu-item-selected])');
              }
              if (mobileActive) {
                if (menuItem) {
                  for (let i = 0; i < menuItem.length; i++) {
                    menuItem[i].classList.add(`show-${i + 1}`);
                  }
                }
              } else {
                if (menuItem) {
                  for (let i = 0; i < menuItem.length; i++) {
                    menuItem[i].classList.remove(`show-${i + 1}`);
                  }
                }
              }
            }
    }
    & > li {
      position: absolute !important;
      top: 0;
      left: 0;
      width: ${({ mobileActive }) => mobileActive ? '120px!important' : '100%!important'};
      height: 100% !important;
      border-radius: ${({ mobileActive }) => mobileActive ? '30px 0 0 30px !important' : '50% !important'};
      background: #e7fcf3;
      z-index: 96;
      transition: .3s !important;
      overflow: ${({ mobileActive }) => mobileActive && 'unset !important'};

      &.ant-menu-item.ant-menu-item-selected {
        z-index: 97;

        & > span.ant-menu-title-content > span.menu-title {
          color: #29d197;
        }
      }

      & > span.ant-menu-title-content {
        flex: unset !important;
        overflow: ${({ mobileActive }) => mobileActive && 'unset !important'};

        & .mobile-icon {
          position: absolute;
          top: 25px;
          left: 25px;
          transform: translate(-50%, -50%);
          display: block;
          font-size: 20px;
          color: #444;
          z-index: 95;
        }

        & > span.menu-title {
          color: #10239e;
          position: relative;
          z-index: 94;
          display: flex;
          align-items: center;
          border: 1px solid #d3d3ff;
          border-left: 0;
          border-radius: 0 30px 30px 0;
          width: 0;
          opacity: 0;
          transition: .3s;
          ${({ mobileActive }) => mobileActive && css`
            width: 120px;
            background: #e7fcf3;
            height: 50px;
            margin-left: 15px;
            padding-left: 20px;
            opacity: 1;
          `}
        }
      }

      & > svg.custom-icon-position.ant-menu-item-icon {
        display: none;
      }

      &:after {
        display: none !important;
      }
    }

    & > .mobile-override {
      position: relative;
      z-index: 98;
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    & > li.show-1 {
      top: 52px;

      & span.menu-title {
        transition-delay: .1s !important;
      }
    }

    & > li.show-2 {
      top: ${52 * 2}px;

      & span.menu-title {
        transition-delay: .2s !important;
      }
    }

    & > li.show-3 {
      top: ${52 * 3}px;

      & span.menu-title {
        transition-delay: .3s !important;
      }
    }

    & > li.show-4 {
      top: ${52 * 4}px;

      & span.menu-title {
        transition-delay: .4s !important;
      }
    }
  }

`;
