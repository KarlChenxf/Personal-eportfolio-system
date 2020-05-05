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

const styles = (theme) => ({
  formControl: {
    minWidth: 150,
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
      selectedFile: null,
      fileName: props.fileUpload || "",
      fitting: props.fitting || "fill",
      uploadStatus: false,
    };
    this.layout = props.layout || null;
    this.background = props.background || null;
    this.fileInput=React.createRef();
  }

  getProps() {
    return {
      picurl: this.state.picurl,
      selectedFile: this.state.selectedFile,
      fileName: this.state.fileName,
      layout: this.layout,
      background: this.background,
      fitting: this.state.fitting,
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
    //console.log("fitting: ",this.state.fitting);
  };

  handlePureChange = (event) => {
    this[event.target.name] = event.target.value;
  };


  fileOnClick=()=>{
    this.setState({
      selectedFile: null,
    })
    
  }


  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("file", this.fileInput.current.files[0]);
    //console.log("fileUpload: ", this.state.selectedFile);
    axios
      .post("http://3.135.244.103:9090/file/upload", fd,{headers:{'token':localStorage.LoginToken}},{
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
          );
        },
      })
      .then((res) => {
                       //console.log("uploadrespnse: ",res.data.awsresponse);
                       this.setState({
                         picurl: res.data.awsresponse,
                         uploadStatus: res.data.status,
                       });
                       if (this.state.uploadStatus === "success") {
                         //alert("Upload success!");
                         message.success("Image upload success!",{duration:3000, position: "bottom-left",});
                       } 
                     })
      .catch((error)=>{
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={this.props.onClose}
      >
        <MuiDialogContent>
          <FormControl
            variant="outlined"
            style={{ height: "100%", width: "100%" }}
          >
            <InputLabel htmlFor="input-upload">PictureURL</InputLabel>
            <OutlinedInput
              id="input-upload"
              name="picurl"
              value={this.state.picurl}
              onChange={this.handleChange}
              label="PictureURL"
              endAdornment={
                <InputAdornment position="end">
                  <input
                    //accept="image/*"
                    className={classes.input}
                    id="input-file"
                    type="file"
                    ref={this.fileInput}
                    onChange={this.fileUploadHandler}
                  />
                  <label htmlFor="input-file">
                    <IconButton
                      color='primary'
                      aria-label="upload picture"
                      component="span"
                      onClick={this.fileOnClick}
                    >
                      <PublishIcon />
                    </IconButton>
                  </label>
                </InputAdornment>
              }
            />
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
                      minWidth = {150}
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

export default withStyles(styles)(PicEditor);