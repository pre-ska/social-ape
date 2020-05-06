import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

//redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// icons
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  button: {
    float: "right"
  }
});

class EditDetails extends Component {
  state = {
    bio: "",
    location: "",
    website: "",
    open: false
  };
  // pomoćna funkcij da ne ponavljam stalno zapisivanje u state
  // MORAIĆI PRIJE SVIH POZIVA OVE FUNKCIJE
  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
    this.mapUserDetailsToState(this.props.credentials);
  };

  // kada korisnik klikne na cancel ili save...zatvori dialog koji je ovisan o stateu
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  // kada se komponenta mounta,
  // iz credentials (koji mi stižu preko reduxa, a vadim ih iz propsa)
  // zapišem već postojeće podatke (bio, location, website) u LOKALNI STATE
  // ako neki od podataka ne postoji, zapišem prazan string
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  //na svakoj promjeni u input polju, mjenjam odgovarajući state prop - LOKALNI STATE
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // kada korsinik klikne na "save" da spremi detalje
  handleSubmit = () => {
    //napravim objekt od podataka u stateu
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };

    //pošaljem kao akciju u userActions...tamo je funkcija editUserDetails
    this.props.editUserDetails(userDetails);
    // zatvorim dialog
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit details"
          onClick={this.handleOpen}
          btnClassName={classes.button}>
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <DialogTitle>Edit Your Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                autoFocus
                name="bio"
                type="text"
                label="Bio"
                margin="normal"
                // multiline
                // rows="3"
                placeholder="Short bio about yourself"
                classes={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                autoFocus
                name="website"
                type="text"
                label="Website"
                margin="normal"
                placeholder="Your website"
                classes={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                autoFocus
                name="location"
                type="text"
                label="Location"
                margin="normal"
                placeholder="Where you live"
                classes={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
