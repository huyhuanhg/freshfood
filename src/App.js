import {Router, Switch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import moment from "moment";

import history from './utils/history';

import FullLayout from "./layouts/FullLayout";
import NotFoundPage from "./pages/NotFound";
import ClientLayout from "./layouts/ClientLayout";

import LoginPage from "./pages/authClient/Login";
import AdminLoginPage from "./pages/AdminLogin";

import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admins/Dashboard";
import HomePage from "./pages/clients/HomePage";
import CategoryPage from "./pages/admins/Category";
import RegisterPage from "./pages/authClient/Register";

import 'antd/dist/antd.css';
import './App.css';
import {
    getAdminInfoAction,
    getUserInfoAction,
    refreshAdminTokenUserAction,
    refreshTokenUserAction
} from "./redux/actions";
import StoreList from "./pages/clients/StoreList";
import StoreDetail from "./pages/clients/StoreDetail";

function App() {
    //gọi userInfo và adminInfo tại đây

    const dispatch = useDispatch();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        if (userInfo) {
            let time = userInfo.expires - moment().valueOf() / 1000;
            if (time < 86400) {
                if (time < 0) {
                    localStorage.removeItem('userInfo');
                } else {
                    dispatch(refreshTokenUserAction({
                        data: userInfo.access_token
                    }))
                }
            } else {
                dispatch(getUserInfoAction({data: userInfo.access_token}));
            }
        }
        if (adminInfo) {
            let time = adminInfo.expires - moment().valueOf() / 1000;
            if (time < 86400) {
                if (time < 0) {
                    localStorage.removeItem('adminInfo');
                } else {
                    dispatch(refreshAdminTokenUserAction({
                        data: adminInfo.access_token
                    }))
                }
            } else {
                dispatch(getAdminInfoAction({data: adminInfo.access_token}));
            }
        }
    }, []);

    return (
        <Router history={history}>
            <Switch>
                <ClientLayout exact path="/" component={HomePage}/>
                <ClientLayout exact path="/stores" component={StoreList}/>
                <ClientLayout exact path="/stores/:slug" component={StoreDetail}/>

                <AdminLayout exact path="/manager" component={DashboardPage}/>
                <AdminLayout exact path="/manager/categories" component={CategoryPage}/>

                <FullLayout exact path="/login" component={LoginPage}/>
                <FullLayout exact path="/register" component={RegisterPage}/>
                <FullLayout exact path="/manager/login" component={AdminLoginPage}/>

                <FullLayout component={NotFoundPage}/>
            </Switch>
        </Router>
    );
}

export default App;
