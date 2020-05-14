import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import "rc-color-picker/assets/index.css";
import BackgroundControl from "./BackgroundControl.js";
import LayoutControl from './LayoutControl.js'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = (theme) => ({});

class VideoEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videourl: props.videourl || "",
      submit: false,
      progress: 0,
      err: false,
    };
    
    this.layout = props.layout || null;
    this.background = props.background || null;
  }

  getProps() {
    return {
      layout: this.layout,
      videourl: this.state.videourl,
      background: this.background,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value, // update the changed value
    });
  }

  handlePureChange = (event) => {
    this[event.target.name] = event.target.value;
  }

  save = () => {
    this.setState({
        err: false,
        submit: true,
        progress: 1,
    });
    console.log("save: ",this.state.submit)
  }

  onProgress = (e) => {
    if(e.err)
        this.setState({
            err: true,
            submit: false,
            progress: 0,
        })
    console.log("onProgress: ",this.state.submit)
}

onSubmit = (background) => {
  this.background = background;
  this.props.onSave(this.getProps());
}

  render() {
    console.log("VideoEditor render: ",this.state.submit)
    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={this.state.submit ? null : this.props.onClose} disableEnforceFocus disableScrollLock
      >
        <MuiDialogContent>
          <TextField
            fullWidth
            id="videourl"
            variant="outlined"
            name="videourl"
            label="VideoURL"
            value={this.state.videourl}
            onChange={this.handleChange}
          />
          <LayoutControl {...this.props.layout} name='layout' onChange={this.handlePureChange} />
          <BackgroundControl {...this.props.background} inputid="video-background-input" submit={this.state.submit} onProgress={this.onProgress} onSubmit={this.onSubmit} />
        </MuiDialogContent>
        <MuiDialogActions>
                    {this.state.err? <Typography color="error">Upload failed. Click 'SAVE' to try again.</Typography> : null}
                    <Button autoFocus onClick={this.props.onClose}  disabled={this.state.submit}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={this.save} color="primary" disabled={this.state.submit}>
                        Save
                    </Button>
                </MuiDialogActions>
                {this.state.progress>0 ? <LinearProgress/> : null}
      </Dialog>
    );
  }
}

export default withStyles(styles)(VideoEditor);
