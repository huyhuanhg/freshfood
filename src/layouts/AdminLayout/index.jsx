import {Route, Redirect} from "react-router-dom";

import Header from "../../components/admins/Header";
import Sidebar from "../../components/admins/Sidebar";
import Footer from "../../components/admins/Footer";

import {useState} from "react";

import {useSelector} from "react-redux";

import * as StyleLayout from './style';
import {Spin} from "antd";

function AdminLayout({exact, path, component: Component}) {
    const [collapsed, setCollapsed] = useState(true);

    const {adminInfo} = useSelector(state => state.adminReducer);
    if (adminInfo.data.id) {
        return <Redirect to='/'/>
    } else {
        if (adminInfo.load) {
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
                            <StyleLayout.Container>

                                <StyleLayout.Sidebar isShow={collapsed}>
                                    <Sidebar/>
                                </StyleLayout.Sidebar>

                                <StyleLayout.SiteLayout isFull={!collapsed}>

                                    <StyleLayout.Header isFull={!collapsed}>
                                        <Header collapsed={collapsed} toggle={setCollapsed}/>
                                    </StyleLayout.Header>

                                    <StyleLayout.Content>
                                        <Component {...routeProps}/>
                                    </StyleLayout.Content>

                                    <StyleLayout.Footer>
                                        <Footer/>
                                    </StyleLayout.Footer>

                                </StyleLayout.SiteLayout>

                            </StyleLayout.Container>
                        );
                    }}
                />
            );
        }
    }
}

export default AdminLayout;
