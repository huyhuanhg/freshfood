import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Select } from 'antd';

export const TopBar = styled.div`
  padding: 7px;

  background-color: ${(props) => props.theme.supColor1};
  font-size: 14px;

  & > div {
    display: flex;
    justify-content: space-between;

    max-width: 1140px;

    margin: 0 auto;

    & > ul {
      display: flex;
      align-items: center;

      margin: 0;

      list-style: none;
      color: ${(props) => props.theme.gray};

      & > li {
        margin-right: 30px;

        &:hover > svg,
        &:hover > span {
          transition: 0.4s;
          transform: scale(1.2);
        }

        & > svg,
        & > span {
          color: ${(props) => props.theme.rootColor};
          margin-right: 5px;
        }
      }
    }

    & > div {
      display: flex;
      align-items: center;

      & > p {
        color: ${(props) => props.theme.gray};
        margin: 0 15px 0 0;
        font-weight: bold;
      }

      & > div {
        display: flex;
        justify-content: center;
        align-items: center;

        margin-right: 5px;

        width: 37px;
        height: 37px;

        border-radius: 50%;

        cursor: pointer;

        &.facebook {
          color: ${(props) => props.theme.facebook};
          background-color: ${(props) => props.theme.facebook1};
        }

        &.google {
          color: ${(props) => props.theme.google};
          background-color: ${(props) => props.theme.google1};
        }

        &.skype {
          color: ${(props) => props.theme.skype};
          background-color: ${(props) => props.theme.skype1};
        }

        &:hover > svg {
          transition: 0.4s;
          transform: scale(1.2);
        }
      }
    }
  }
`;
export const Header = styled.header`
  z-index: 99;

  width: 100%;

  background-color: ${(props) => props.theme.bg};
  box-shadow: 0 2px 8px 0 rgb(99 99 99 / 20%);
`;
export const MenuWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1140px;

  margin: auto;
  padding: 0.75rem 0;
`;
export const Logo = styled(Link)`
  font-family: "Poppins", sans-serif !important;
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 900;
  color: ${(props) => props.theme.rootColor};

  &:hover {
    color: ${(props) => props.theme.rootColor};
  }
`;
export const SearchWrap = styled.div`
  flex-basis: 50%;

  & .ant-input-group-addon {
    width: 22%;
    padding: 0;
  }
`;

export const FormGroup = styled.div`
  position: relative;
`;
export const InputSearch = styled.input`
  padding: 1rem;

  width: 100%;

  border-radius: 5px;
  border: none;

  font-size: 150%;
  outline: none;
  background: #fff;
  box-shadow: 0 0 10px 1px rgb(0 0 0 / 10%);
`;
export const IconSearch = styled(SearchOutlined)`
  position: absolute;
  top: 50%;
  right: 0.75rem;

  font-size: 1.5rem;
  color: #777;
  transform: translateY(-50%);
`;
export const Btn = styled(Button)`
  &[disabled] {
    cursor: default !important;
    color: #777;
    background-color: #ddd;
  }

  &:hover {
    border-color: ${(props) => props.theme.rootColor};
    color: ${(props) => props.theme.rootColor};
  }
`;
export const UserAvatar = styled(Avatar)`
  background-color: rgba(15, 157, 88, 0.1);
  border-color: rgba(15, 157, 88, 0.1);
  box-shadow: 0 0 5px 0 rgb(15 157 88 / 30%);
  color: ${(props) => props.theme.rootColor};
`;

export const SearchType = styled(Select)`
  width: 100%;

  & .ant-select-selection-item {
    color: black !important;
  }
`;
