import './App.css';
import {Router, Switch} from "react-router-dom";

import history from './utils/history';

import FullLayout from "./layouts/FullLayout";
import NotFoundPage from "./pages/NotFound";
import ClientLayout from "./layouts/ClientLayout";

import LoginPage from "./pages/Login";
import AdminLoginPage from "./pages/AdminLogin";

import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admins/Dashboard";
import LangdingPage from "./pages/clients/LangdingPage";
import CategoryPage from "./pages/admins/Category";

import 'antd/dist/antd.css';

function App() {
    //gọi userInfo và adminInfo tại đây
    return (
        <Router history={history}>
            <Switch>
                <ClientLayout exact path="/" component={LangdingPage} />

                <AdminLayout exact path="/manager" component={DashboardPage} />
                <AdminLayout exact path="/manager/categories" component={CategoryPage} />

                <FullLayout exact path="/login" component={LoginPage}/>
                <FullLayout exact path="/manager/login" component={AdminLoginPage}/>

                <FullLayout component={NotFoundPage}/>
            </Switch>
        </Router>
    );
}

export default App;
