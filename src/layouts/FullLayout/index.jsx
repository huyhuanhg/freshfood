import { Route } from "react-router-dom";

function FullLayout({ exact, path, component: Component }) {
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

export default FullLayout;
