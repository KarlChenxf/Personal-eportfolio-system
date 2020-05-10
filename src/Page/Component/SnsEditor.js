import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import "rc-color-picker/assets/index.css";
import BackgroundControl from "./BackgroundControl.js";

const styles = (theme) => ({});

class SnsEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urlA: props.urlA || "",
    };
    
    this.background = props.background || null;
  }

  getProps() {
    return {
      urlA: this.state.urlA,
      background: this.background,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value, // update the changed value
    });
    console.log(this.state)
  }

  handlePureChange = (event) => {
    this[event.target.name] = event.target.value;
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={this.props.onClose}
      >
        <MuiDialogContent>
          <TextField
            fullWidth
            id="1"
            name="urlA"
            variant="outlined"
            label="The first URL"
            value={this.state.urlA}
            onChange={this.handleChange}
          />
          <BackgroundControl
            {...this.props.background}
            name="background"
            onChange={this.handlePureChange}
          />
        </MuiDialogContent>
        <MuiDialogActions>
          <Button autoFocus onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={() => {
              this.props.saveComponent(this.getProps());
            }}
            color="primary"
          >
            Save
          </Button>
        </MuiDialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(SnsEditor);
