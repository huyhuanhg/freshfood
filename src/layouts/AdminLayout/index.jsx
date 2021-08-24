import {Route, Redirect} from "react-router-dom";

import Header from "../../components/admins/Header";
import Sidebar from "../../components/admins/Sidebar";
import Footer from "../../components/admins/Footer";

import {useEffect, useState} from "react";

import {useDispatch} from "react-redux";

import {getAdminInfoAction} from "../../redux/actions";

import * as StyleLayout from './style';

function AdminLayout({exact, path, component: Component}) {
    const [collapsed, setCollapsed] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            dispatch(getAdminInfoAction({data: userInfo.access_token}));
        }
    }, []);

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

export default AdminLayout;
