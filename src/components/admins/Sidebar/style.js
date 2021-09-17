import styled from 'styled-components';
import { Layout, Menu as AtndMenu } from 'antd';

const { Sider } = Layout;
export const Wrap = styled(Sider)``;

export const Menu = styled(AtndMenu)`
  border-top: 1px solid #e9ecef;
  height: calc(100% - 65px);
`;
export const LogoImg = styled.img`
  height: 32px;
  vertical-align: middle;
  margin-right: 4px;
`;

export const LogoText = styled.span`
  font-size: 24px;
  vertical-align: middle;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 70px;
`;

export const Logo = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 70px;
`;
