import { Link, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Spin } from 'antd';
import PropTypes from 'prop-types';

import * as LayoutStyle from './style';

import bgLogin from '../../assets/images/bg-login.png';
import foodLogo from '../../assets/images/food_logo.png';

function FullLayout({ exact, path, component: Component }) {
  const { userInfo } = useSelector(({ userReducer }) => userReducer);
  if (userInfo.data.id) {
    return <Redirect to='/' />;
  } else {
    if (userInfo.load) {
      return (
        <Spin
          size={'large'}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    } else {
      return (
        <Route
          exact={exact}
          path={path}
          render={(routeProps) => {
            return (
              <>
                <LayoutStyle.BackGround src={bgLogin} />
                <LayoutStyle.Container>
                  <LayoutStyle.LogoWrap>
                    <Link to='/'>
                      <LayoutStyle.LogoImg src={foodLogo} />
                      <h1>FoodBooking</h1>
                    </Link>
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

FullLayout.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.object,
};
