import styled from 'styled-components';

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

  @media screen and (max-width: 479px) {
    padding: 0;
    flex-basis: 25%;
  }
`;
