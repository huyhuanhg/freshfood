import {Route} from "react-router-dom";
import Header from "../../components/clients/Header";
import Footer from "../../components/clients/Footer";

function ClientLayout({exact, path, component: Component}) {
    return (
        <Route
            exact={exact}
            path={path}
            render={(routeProps) => {
                return (
                    <>
                        <Header/>
                        <Component {...routeProps} />
                        <Footer/>
                    </>
                );
            }}
        />
    );
}

export default ClientLayout;
