import styled from 'styled-components';

export const BackGround = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: -1;
  height: 100%;
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  width: 100vw;
  height: 100vh;
  padding: 0 2rem;
`;
export const LogoWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > a {
    position: relative;
    display: block;
    transform: translateX(-150px);
  }
`;
export const LogoImg = styled.img`
  width: 600px;
  height: 700px;

  & + h1 {
    position: absolute;
    left: 50%;
    bottom: 20px;
    font-family: "Poppins", sans-serif !important;
    transform: translateX(-50%);
    color: #fff;
    font-size: 500%;
    font-weight: 800;
  }
`;
export const FormWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;
