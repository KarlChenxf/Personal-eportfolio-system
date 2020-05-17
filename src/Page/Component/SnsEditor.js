import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import LayoutControl from "./LayoutControl.js";
import BackgroundControl from "./BackgroundControl.js";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import BackgroundControl from "./BackgroundControl.js";

const styles = (theme) => ({});

@@ -15,29 +16,55 @@ class SnsEditor extends React.Component {

    this.state = {
      urlA: props.urlA || "",
      submit: false,
      progress: 0,
      err: false,
    };


    this.layout = props.layout || null;
    this.background = props.background || null;
  }

  getProps() {
    return {
      urlA: this.state.urlA,
      layout: this.layout,
      background: this.background,
    };
  }

  handleChange = (event) => {
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value, // update the changed value
        [event.target.name]: event.target.value, // update the changed value
    });
    console.log(this.state)
  }
}

  handlePureChange = (event) => {
    this[event.target.name] = event.target.value;
  }

  save = () => {
    this.setState({
        err: false,
        submit: true,
        progress: 1,
    })
  }

  onProgress = (e) => {
    if(e.err)
        this.setState({
            err: true,
            submit: false,
            progress: 0,
        })
  }

  onSubmit = (background) => {
    this.background = background;
    this.props.onSave(this.getProps())
  }

  render() {
    return (
      <Dialog
@@ -56,21 +83,16 @@ class SnsEditor extends React.Component {
            value={this.state.urlA}
            onChange={this.handleChange}
          />
          <BackgroundControl
            {...this.props.background}
            name="background"
            onChange={this.handlePureChange}
          />
          <LayoutControl {...this.props.layout} name='layout' onChange={this.handlePureChange} />
          <BackgroundControl {...this.props.background} inputid="video-background-input" submit={this.state.submit} onProgress={this.onProgress} onSubmit={this.onSubmit} />
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
            onClick={this.save}
            color="primary"
          >
            Save
