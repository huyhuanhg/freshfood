import {Route} from "react-router-dom";
import Header from "../../components/clients/Header";
import Footer from "../../components/clients/Footer";
import {useState} from "react";
import ModalLogin from "../../components/clients/ModalLogin";

function ClientLayout({exact, path, component: Component}) {
    const [showModalLogin, setShowModalLogin] = useState(false);

    return (
        <Route
            exact={exact}
            path={path}
            render={(routeProps) => {
                return (
                    <>
                        <Header showModalLogin={showModalLogin} setShowModalLogin={setShowModalLogin}/>
                        <ModalLogin visible={showModalLogin} setVisible={setShowModalLogin}/>
                        <Component {...routeProps} setShowLogin={setShowModalLogin}/>
                        <Footer/>
                    </>
                );
            }}
        />
    );
}

export default ClientLayout;
