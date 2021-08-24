import { Route } from "react-router-dom";

function ClientLayout({ exact, path, component: Component }) {
    console.log(exact)
    return (
        <Route
            exact={exact}
            path={path}
            render={(routeProps) => {
                return <Component {...routeProps} />;
            }}
        />
    );
}

export default ClientLayout;
