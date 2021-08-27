import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

import * as LayoutStyle from "./style";

import bgLogin from "../../assets/images/bg-login.png";
import foodLogo from "../../assets/images/food_logo.png";
import {Spin} from "antd";

function FullLayout({exact, path, component: Component}) {
    const {userInfo} = useSelector(state => state.userReducer);
    if (userInfo.data.id) {
        return <Redirect to='/'/>
    } else {
        if (userInfo.load) {
            return <Spin size={"large"} style={{
                position: "fixed",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}/>
        } else {
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
    }
}

export default FullLayout;
