import styled from 'styled-components';

export const Section = styled.section`
  background-color: rgb(238, 238, 238);
  padding: 50px 20px;
`;
export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1140px;
  @media screen and (max-width: 767px) {
    & .list-content.ant-col {
      & .filter-food .ant-affix , .store-list .ant-affix {
        top: 116.781px!important;
        z-index: 100;
      }
    }
  }
`;
