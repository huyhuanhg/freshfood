import styled, { css } from 'styled-components';
import { Button, Menu } from 'antd';
import { VscThreeBars } from 'react-icons/all';

export const Logo = styled.div`
  height: 80px;
  width: 80px;
  margin: auto;
  background: url(https://forcky.com/assets/images/store-logo4.png) no-repeat;
`;

export const Icon = styled(Button)`
  height: 36px;
  width: 36px;
  line-height: 34px;
  padding: 0;
  ${(props) => props.type && css`  margin: 2px;`}
  border-radius: 30px;
  font-size: 15px;
  letter-spacing: 0.5px;
  transition: all 0.3s;
  outline: none;
  ${
          (props) => {
            if (props.type === 'edit') {
              return css`
                background-color: rgba(83, 199, 151, 0.1) !important;
                border: 1px solid rgba(83, 199, 151, 0.1) !important;
                color: #53c797 !important;
                box-shadow: 0 3px 5px 0 rgb(83 199 151 / 30%) !important;

                &:hover {
                  color: #fff !important;
                  background-color: #53c797 !important;
                }
              `;
            } else if (props.type === 'destroy') {
              return css`
                background-color: rgba(240, 115, 90, 0.1) !important;
                border: 1px solid rgba(240, 115, 90, 0.1) !important;
                color: #f0735a !important;
                box-shadow: 0 3px 5px 0 rgb(240, 115, 90 / 30%) !important;

                &:hover {
                  color: #fff !important;
                  background-color: #f0735a !important;
                }
              `;
            } else {
              return css`
                background-color: rgba(57, 108, 240, 0.1) !important;
                border: 1px solid rgba(57, 108, 240, 0.1) !important;
                color: #396cf0 !important;
                box-shadow: 0 3px 5px 0 rgb(57 108 240 / 30%) !important;

                &:hover {
                  color: #fff !important;
                  background-color: #396cf0 !important;
                }
              `;
            }
          }}
  cursor: pointer;
  text-align: center;
  display: inline-block;
  font-weight: 400;
  user-select: none;
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
export const PrefixFilter = styled(Menu)`
`;

export const SuffixFilter = styled.ul`
  margin: 0;

  & > li > div {
    min-width: 122px;
  }

  & .mobile-filter {
    display: none;
  }

  @media screen and (max-width: 767px) {
    height: ${({ active }) => active ? 'auto' : 0};
    overflow: ${({ active }) => active ? 'unset' : 'hidden'};
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #ececec;
    padding: ${({ active }) => active ? '4px 11px' : 0};
    transition: .3s;
    & .mobile-filter {
      display: block;
    }

    & > li > div {
      min-width: unset;
      width: 100%;

      & .ant-select-selector {
        max-height: 32px;
        overflow: hidden;
      }
    }

    & > li:first-child {
      flex-basis: 70%;
    }

    & > li:last-child {
      flex-basis: 30%;
    }
  }
`;
export const MoreFilterIcon = styled(VscThreeBars)`
  position: absolute;
  top: 11.5px;
  right: 15px;
  font-size: 24px;
  color: #ccc;
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;