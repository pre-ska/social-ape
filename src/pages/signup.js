import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles"; // wrapa export sa HIGH-ORDER KOMPONENTOM iz MUI-a, tako primjeni stil i temu na export
import PropTypes from "prop-types"; // kontrola propsa...dali je obj, func, string....
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";

// MUI stuff
import Grid from "@material-ui/core/Grid"; // css grid...koristim 3 kolone
import Typography from "@material-ui/core/Typography"; // MUI preporuča bilo koji text da se wrapa u ovo
import TextField from "@material-ui/core/TextField"; // input i sl.
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress"; // spinner za button kada se logira

// redux stuff
import { connect } from "react-redux";
import { signupUser } from "../redux/actions//userActions";

// const styles = theme => ({ //OVO JE BUGGIRANO U MUI!!!!!!
//   ...theme
// });

// custom stil za temu
const styles = {
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px 0"
  },
  pageTitle: {
    margin: "10px auto 10px 0"
  },
  textField: {
    margin: "10px auto 10px 0"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8 rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
};

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    nextProps.UI.errors && this.setState({ errors: nextProps.UI.errors });
  }
  // šaljem signup podatke na FireBase
  handleSubmit = e => {
    // kada korisnik klikne button za logiranje, spriječim defaultno ponašanje forme
    e.preventDefault();
    // postavim state loading na TRUE (učitava), spinner na buttonu ovisi o ovom stateu
    this.setState({
      loading: true
    });
    // kreiram objekt sa emailom i passwordom iz inputa...
    // a input ima "onChange" koji automatski mjenja value u stateu... pa čitam sve iz statea
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };

    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes, loading } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="logo" className={classes.image} />
          <Typography variant="h3" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              autoComplete="nope"
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email} // postavi helperText iz errors.email, ako ga ima
              error={errors.email ? true : false} // zacrveni cijelo polje ako postoji neki error za email
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              autoComplete="new-password"
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              autoComplete="new-password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              autoComplete="nope"
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <br />
            <small>
              Already have an account ? signup <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
