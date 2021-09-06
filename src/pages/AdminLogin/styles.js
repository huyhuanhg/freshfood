import styled from 'styled-components';
import { Button } from 'antd';

export const LoginWrap = styled.div`
  display: block;
  margin: auto;
  padding-top: 7%;
  background: #e4e7ea !important;
  min-height: 100vh;
`;

export const FormWrap = styled.div`
  padding: 15px;
  margin: 0 auto;
  width: 33.333%;
  background: #fafafa;
`;

export const H3 = styled.h3`
  text-transform: capitalize;
  font-size: 18px;
  line-height: 24px;
  margin: 0 0 15px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 400;
  color: #444;
`;
export const ButtonSubmit = styled(Button)`
  background-color: #eee;
  color: #444;
  box-sizing: border-box;
  vertical-align: middle;
  text-align: center;
  line-height: 28px;
  min-height: 30px;
  font-size: 1rem;
  padding: 0 12px;
  background: #f5f5f5;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  text-shadow: 0 1px 0 #fff;
  width: 100%;

  &:hover {
    outline: 0;
    text-decoration: none;
    border-color: rgba(0, 0, 0, 0.16);
    color: #444;
  }
`;
