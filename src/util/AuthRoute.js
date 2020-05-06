import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

// function AuthRoute({ component: Component, authenticated, ...rest }) {
//   console.log(arguments);
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         authenticated === true ? <Redirect to="/" /> : <Component {...props} />
//       }
//     />
//   );
// }

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  user: state.user
});

// const mapStateToProps = state => {
//   console.log(state);

//   return { authenticated: state.user.authenticated };
// };

AuthRoute.propTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(AuthRoute);
