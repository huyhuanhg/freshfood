import {Route} from "react-router-dom";

import * as LayoutStyle from "./styles";

import bgLogin from "../../assets/images/bg-login.png";
import foodLogo from "../../assets/images/food_logo.png";

function FullLayout({exact, path, component: Component}) {
    return (
        <Route
            exact={exact}
            path={path}
            render={(routeProps) => {
                return (
                    <>
                        <LayoutStyle.BackGround src={bgLogin}/>
                        <LayoutStyle.Container>
                            <LayoutStyle.LogoWrap>
                                <LayoutStyle.LogoImg src={foodLogo}/>
                            </LayoutStyle.LogoWrap>
                            <LayoutStyle.FormWrap>
                                <Component {...routeProps} />
                            </LayoutStyle.FormWrap>
                        </LayoutStyle.Container>
                    </>
                );
            }}
        />
    );
}

export default FullLayout;
