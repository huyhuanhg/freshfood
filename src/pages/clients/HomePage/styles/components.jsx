import {
    TilteDiv,
    TitleWrap,
    TitleFirstSpan,
    TitleLastSpan,
    Title
} from "./style";


export const SectionTitle = ({children}) => {
    return (
        <TitleWrap>
            <Title>{children}</Title>
            <TilteDiv><TitleFirstSpan></TitleFirstSpan><TitleLastSpan></TitleLastSpan></TilteDiv>
        </TitleWrap>
    );
}
