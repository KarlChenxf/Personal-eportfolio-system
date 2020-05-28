import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import BackgroundControl from "./BackgroundControl.js";
import LayoutControl from './LayoutControl.js'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import FileUploadControl from './FileUploadControl.js';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const styles = (() => ({
  box:{
    //borderColor:"text.primary",
    borderColor:"secondary.main",
    borderRadius:16,
    component:"div",
    display:"flex",
    flexWrap:"wrap",
    alignContent:"flex-start",
  },
}));

class FileEditor extends React.Component {
  constructor(props) {
    super(props);
    let service = axios.create({
      headers: { csrf: "token" },
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;

    this.state = {
      selectedFile: null,
      //fileName: props.fileName || "",
      //fileurl: props.fileurl || "",
      uploadStatus: false,
      buttonStyle: 'outlined',
      buttonText:'Upload',
      submitFile: false,
      submitBackground: false,
      progressFile: 0,
      progressBackground: 0,
      err: false,
    };
    this.layout = props.layout || null;
    this.background = props.background || null;
    this.fileurl = props.fileurl;
    this.i=0;
    //console.log("fileName: ",props.fileName)
  }

  getProps() {
    return {
      selectedFile: this.state.selectedFile,
      fileName: this.fileurl ? this.fileurl.substring(this.fileurl.lastIndexOf('/')+1) : '',
      fileurl: this.fileurl,
      layout: this.layout,
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
        submitFile: true,
        submitBackground: true,
        progressFile: 1,
        progressBackground: 1,
    });
  }

  onProgressBackground = (e) => {
    if(e.err)
        this.setState({
            err: true,
            submitBackground: false,
            progressBackground: 0,
        })
    //console.log("onProgress: ",this.state.submitBackground)
}

onProgressFile = (e) => {
  if(e.err)
      this.setState({
          err: true,
          submitFile: false,
          progressFile: 0,
      })
  //console.log("onProgress: ",this.state.submitFile)
}

onSubmitBackground = (background) => {
  this.background = background;
  this.i++;
  if(this.i>=2)this.props.onSave(this.getProps());
  //console.log("background: ",background)
}
onSubmitFile = (fileUrl) => {
  this.fileurl = fileUrl;
  this.i++;
  if(this.i>=2)this.props.onSave(this.getProps());
}


  render() {
    console.log("fileEditor render: ")

    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={(this.state.submitBackground||this.state.submitFile) ? null : this.props.onClose} disableEnforceFocus disableScrollLock
      >
        <MuiDialogContent>
            <FileUploadControl fullWidth id = "file-upload" inputid="file-input" label="File" accept="file/*" value={this.props.fileurl} submit={this.state.submitFile} onProgress={this.onProgressFile} onSubmit={this.onSubmitFile}/>
            <LayoutControl {...this.props.layout} name='layout' onChange={this.handlePureChange} />
            <BackgroundControl {...this.props.background} inputid="background-input" submit={this.state.submitBackground} onProgress={this.onProgressBackground} onSubmit={this.onSubmitBackground} />
        </MuiDialogContent>
        <MuiDialogActions>
                    {this.state.err? <Typography color="error">Upload failed. Click 'SAVE' to try again.</Typography> : null}
                    <Button autoFocus onClick={this.props.onClose}  disabled={this.state.submitBackground||this.state.submitFile}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={this.save} color="primary" disabled={this.state.submitBackground||this.state.submitFile}>
                        Save
                    </Button>
                </MuiDialogActions>
                {(this.state.progressBackground + this.state.progressFile)>0 ? <LinearProgress/> : null}
      </Dialog>
    );
  }
}

export default withStyles(styles)(FileEditor);