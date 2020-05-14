import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import 'rc-color-picker/assets/index.css';
import BackgroundControl from './BackgroundControl.js'
import LayoutControl from './LayoutControl.js'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import '../../css/pic-display.css'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import message from "@davistran86/notification";
import LinearProgress from '@material-ui/core/LinearProgress';
import { API_END_POINT } from '../../Config.js';
import ClearIcon from '@material-ui/icons/Clear';
import FileUploadControl from './FileUploadControl.js'

const styles = (theme) => ({
  formControl: {
    //minWidth: 150,
  },
  root: {
    //flexGrow: 1,
  },
  input:{
    display: 'none',
  }
});

class PicEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picurl: props.picurl || '',
      file: null,
      fileName: "",
      fitting: props.fitting || "fill",
      submitPic: false,
      submitBackground: false,
      progressPic: 0,
      progressBackground: 0,
      err: false,

    };
    this.layout = props.layout || null;
    this.background = props.background || null;
    this.fileInput=React.createRef();
  }

  getProps() {
    return {
      picurl: this.state.picurl,
      pic: this.state.pic,
      picName: this.state.picName,
      layout: this.layout,
      background: this.background,
      fitting: this.state.fitting,
      image: this.state.image,
      target: {
        name: this.props.name,
        value: { padding: this.state.padding },
      },
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value, // update the changed value
    });
  };

  handlePureChange = (event) => {
    this[event.target.name] = event.target.value;
  };

  save = () => {
    this.setState({
        err: false,
        submitPic: true,
        submitBackground:true,
        progressPic: 1,
        progressBackground: 1,
    });
    console.log("save: ",this.state.submitBackground,this.state.submitPic)
  }

  onProgressPic = (e) => {
      if(e.err)
          this.setState({
              err: true,
              submitPic: false,
              progressPic: 0,
          })
      console.log("onProgresspic: ",this.state.submitPic)
  }

  onProgressBackground = (e) => {
    if(e.err)
        this.setState({
            err: true,
            submitBackground: false,
            progressBackground: 0,
        })
    console.log("onProgressback: ",this.state.submitBackground)
}

  onSubmitBackground = (background) => {
      this.background = background;
      this.props.onSave(this.getProps());
      console.log("onSubmitback: ",this.state.submitBackground)
  }

  onSubmitPic= (imgUrl) => {
    this.setState({
        picurl: imgUrl,
        submitPic:false,
    });
    //console.log("onImgSubmit picurl: ",this.state.picurl);
    console.log("onImgSubmitpic: ",this.state.submitPic)
    this.props.onSave(this.getProps());
}

  render() {
    const { props, state, handlePureChange } = this;
    const { classes, open, onClose, onSave, layout, background } = props;
    const { progress, err } = state;
    console.log(" picEditor render: ",this.state.submitBackground||this.state.submitPic)
    console.log(" picEditor render: ",this.state.submitBackground,this.state.submitPic)
    //console.log(" picEditor render: ",this.state.progressBackground,this.state.progressPic)

    return (
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={(this.state.submitBackground||this.state.submitPic) ? null : onClose} disableEnforceFocus disableScrollLock
      >
        <MuiDialogContent>
          <FormControl
            variant="outlined"
            style={{ height: "100%", width: "100%" }}
          >
            <FileUploadControl id = "front-pic-upload" inputid="image-input" label="Image" accept="image/*" value={this.state.picurl} submit={this.state.submitPic} onProgress={this.onProgressPic} onSubmit={this.onSubmitPic}/>
          </FormControl>


            <Grid
              container
              //className={classes.root}
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item="auto">
                <LayoutControl
                  {...this.props.layout}
                  name="layout"
                  onChange={this.handlePureChange}
                />
              </Grid>
              <Grid item= "auto">
                <Grid container display="flex" direction="row" spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h3">
                      Fit
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <FormControl
                      variant="outlined"
                      //minWidth = {150}
                      className={classes.formControl}
                    >
                      <InputLabel id="fitting-label">Fitting</InputLabel>
                      <Select
                        labelId="fitting-label"
                        value={this.state.fitting}
                        onChange={this.handleChange}
                        label="Fitting"
                        name="fitting"
                      >
                        {["fill", "contain", "cover", "none", "scale down"].map(
                          (e) => (
                            <MenuItem key={e} value={e}>
                              {e}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <BackgroundControl {...background} inputid="background-input"submit={this.state.submitBackground} onProgress={this.onProgressBackground} onSubmit={this.onSubmitBackground} />
        </MuiDialogContent>
        <MuiDialogActions>
                    {err? <Typography color="error">Upload failed. Click 'SAVE' to try again.</Typography> : null}
                    <Button autoFocus onClick={onClose}  disabled={this.state.submitBackground||this.state.submitFile}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={this.save} color="primary" disabled={this.state.submitBackground||this.state.submitFile}>
                        Save
                    </Button>
                </MuiDialogActions>
                {(this.state.progressBackground + this.state.progressPic)>0 ? <LinearProgress/> : null}
      </Dialog>
    );
  }
}

export default withStyles(styles)(PicEditor);