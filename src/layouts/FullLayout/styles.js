import styled, {css} from 'styled-components';

export const BackGround = styled.img`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
    z-index: -1;
`
export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7rem;
    padding: 0 2rem;
`
export const LogoWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
export const LogoImg = styled.img`
    width: 600px;
    height: 700px;
    transform: translateX(-150px);
`
export const FormWrap = styled.div`    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
`