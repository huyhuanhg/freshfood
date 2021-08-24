import * as AppStyle from "../../../styles";

import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {Button, Layout} from "antd";
import history from "../../../utils/history";
import Header from "../../../components/admins/Header";
import {Content} from "antd/es/layout/layout";

function DashboardPage(props) {
    document.title = "Foodbooking | Bảng điều khiển";

    return (<>
            Dashboard
        </>
    );
}

export default DashboardPage;
