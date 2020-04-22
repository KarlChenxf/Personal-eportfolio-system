import React, { Fragment }from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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

const styles = (theme) => ({
  formControl: {
    minWidth: 150,
  },
  root: {
    flexGrow: 1,
  },
});

class PicEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picurl: props.picurl || "",
      selectedFile: null,
      fileName: props.fileUploadHandler || "",
      fitting: props.fitting || "fill"
    };
    this.layout = props.layout || null;
    this.background = props.background || null;
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
        value: { padding: this.state.padding,},
      },
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value, // update the changed value
    });
    console.log("fitting: ",this.state.fitting);
  };

  handlePureChange = (event) => {
    this[event.target.name] = event.target.value;
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      fileName: event.target.files[0].name,
    });
    console.log(event.target.files[0].name);
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("file", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post("http://3.135.244.103:9090/profile/add", fd, {
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
          );
        },
      })
      .then((res) => {
        console.log(res);
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
          <TextField
            fullWidth
            id="picurl"
            placeholder="PicDisplay"
            variant="outlined"
            name="picurl"
            value={this.state.picurl}
            onChange={this.handleChange}
          />
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container flex-content="flex-start" display="flex">
                <Grid item>
                  <LayoutControl
                    {...this.props.layout}
                    name="layout"
                    onChange={this.handlePureChange}
                  />
                </Grid>
                <Grid item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6" component="h3">
                        Fit
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <FormControl
                        variant="outlined"
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
                          {[
                            "fill",
                            "contain",
                            "cover",
                            "none",
                            "scale down",
                          ].map((e) => (
                            <MenuItem key={e} value={e}>
                              {e}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
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
        <MuiDialogContent>
          <input autoFocus type="file" onChange={this.fileSelectedHandler} />
          <button autoFocus onClick={this.fileUploadHandler}>
            Upload
          </button>
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