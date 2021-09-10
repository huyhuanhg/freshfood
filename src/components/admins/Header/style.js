import styled from 'styled-components';
import Search from 'antd/es/input/Search';

export const Header = styled.header`
  background: #fff;
  height: 71px;
  box-shadow: 0 0 3px rgb(52 58 64 / 15%);
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef !important;
`;
export const Flex = styled.div`
  align-items: center !important;
  display: flex !important;
  justify-content: space-between;
`;
export const SearchForm = styled(Search)`
  width: 400px;
`;
