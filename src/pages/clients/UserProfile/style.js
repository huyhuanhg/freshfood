import styled from 'styled-components';

export const ProfileWrap = styled.div`
  min-height: calc(100vh - 475px);
`;
export const ProfileSidebar = styled.div`
  background: rgb(255, 255, 255);
  border: 1px solid #ddd;
  padding: 20px 0 10px 0;
  margin-top: -20px;

  & li {
    border-top: 1px solid #e7ecef;
  }
`;
export const ProfileAvatarWrap = styled.div`
  position: relative;

  & img {
    float: none;
    margin: 0 auto;
    width: 126px;
    height: 126px;
    border-radius: 50% !important;
    display: block;
    max-width: 100%;
    cursor: pointer;
  }

  & img:hover + svg {
    opacity: 1;
  }

  & svg {
    position: absolute;
    font-size: 250%;
    opacity: 0;
    transition: 0.4s;
    bottom: 0;
    color: #888;
    right: calc(50% - 126px / 2);
  }
`;
export const ProfileFullName = styled.div`
  text-align: center;
  margin-top: 10px;

  & > div {
    color: #5a7391;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 7px;
  }
`;
export const ProfileContent = styled.div`
  background: rgb(255, 255, 255);
  margin-top: -20px;
  min-height: 378.031px;
`;
export const ProfileEmpty = styled.div`
  padding-top: 5rem;
  display: flex;
  flex-direction: column;

  & > div {
    align-self: center;
    padding: 10px;
    font-size: 16px;

    & > svg {
      color: #aaa;
      font-size: 400%;
    }
  }
`;
