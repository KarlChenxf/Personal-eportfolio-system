import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import 'rc-color-picker/assets/index.css';
import { Panel as ColorPickerPanel } from 'rc-color-picker';
import axios from 'axios';

const styles = (() => ({
    formControl: {
        minWidth: 150, 
    },
    gridItem: {
        display: 'inline-flex',
    },
    labelPlacementStart: {
        marginLeft: 0,
    },
    roundButton: {
        borderRadius: '50%',
        height: 44,
        width: 44,
        minWidth: 0,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        marginTop: 6,
    },
    textField: {
        minWidth: 210,
    },
    input:{
        display: 'none',
      }
}));

class BackgroundControl extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            background: Boolean(props.color || props.elevation || props.rounded),
            alpha: props.color ? Math.round(parseInt(props.color.substr(7, 2), 16) / 2.55) : 100,
            color: props.color ? props.color.substr(0, 7) : '#FFFFFF',
            colorHex: props.color ? props.color : '#FFFFFFFF',
            elevation: props.elevation || 0,
            rounded: props.rounded || false,
            image: props.image || "",
            openColorPanel: false,
            selectedFile: null,
            fileName: props.fileUploadHandler || "",
            uploadStatus: false,
            buttonStyle: 'outlined',
            buttonText: 'Upload',
        };

        console.log("BackgroundControl constructor()")
    }

    handleClose = () => {
        this.setState({
            openColorPanel: !this.state.openColorPanel,
        })
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value, // update the changed value
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
        console.log("handlechange: ",this.state);
    }

    imgSelectedHandler = (event) => {
        this.setState({
          selectedFile: event.target.files[0],
          fileName: event.target.files[0].name||'',
          image: event.target.files[0].name||'',
          buttonStyle: 'outlined',
          buttonText: 'Upload',
        });
        console.log("imageSelectedHandler ",event.target.files[0].name);
      };
    
    
      imgUploadHandler = () => {
        const fd = new FormData();
        fd.append("file", this.state.selectedFile);
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
            
            this.setState({image: res.data.awsresponse, uploadStatus: res.data.status });
            console.log("uploadrespnse image: ",this.state.image);
            if (this.state.uploadStatus=== 'success'){this.setState({buttonStyle: 'contained',buttonText:'Uploaded'})}
            else{this.setState({buttonStyle: 'outlined',buttonText:'Upload'})};
            //console.log("buttonstyle: ",this.state.buttonStyle);
            this.props.onChange(this.getProps());
          })
          .catch((error)=>{
            console.log(error);
          });
      };

    handleColor = (colorObj) => {
        const { color, alpha } = colorObj;
        this.setState({
            alpha: alpha,
            color: color,
            colorHex: color + Math.round(255 * alpha / 100).toString(16).padStart(2, '0'),
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
    }

    getProps = () => {
      console.log("background getProps： ",this.state.image);
        const value =  this.state.background ? {
            color: this.state.colorHex,
            elevation: this.state.elevation,
            rounded: this.state.rounded,
            image: this.state.image,
            selectedFile: this.state.selectedFile,
            fileName: this.state.fileName,
        } : null;
        return {
            target:{
                name: this.props.name,
                value: value,
            }
        }
    }

    render() {
        console.log("BackgroundContrdol render()");
        console.log("BackgroundContrdol render image: ",this.state.image);

        const { classes } = this.props;

        return (
          <Fragment>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  classes={{ labelPlacementStart: classes.labelPlacementStart }}
                  control={
                    <Switch
                      checked={this.state.background}
                      onChange={this.handleChange}
                      color="primary"
                      name="background"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                  label={
                    <Typography variant="h6" component="h3">
                      Background
                    </Typography>
                  }
                  labelPlacement="start"
                />
              </Grid>
              {this.state.background ? (
                <Fragment>
                  <Grid item>
                    <Tooltip title="Color">
                      <Button
                        variant="contained"
                        disableElevation
                        className={classes.roundButton}
                        style={{
                          backgroundColor: this.state.colorHex,
                        }}
                        onClick={this.handleClose}
                      >
                        {" "}
                        {/* Space here to prevent warning */}
                      </Button>
                    </Tooltip>
                  </Grid>
                  <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.openColorPanel}
                  >
                    <ColorPickerPanel
                      color={this.state.color}
                      alpha={this.state.alpha}
                      onChange={this.handleColor}
                      mode="RGB"
                    />
                  </Dialog>
                  <Grid item>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="standard-adornment-upload">
                        Image
                      </InputLabel>
                      <OutlinedInput
                        id="standard-adornment-upload"
                        //type={values.showPassword ? 'text' : 'password'}
                        name="image"
                        value={this.state.image}
                        onChange={this.handleChange}
                        labelWidth={44}
                        endAdornment={
                          <InputAdornment position="end">
                            <input
                              //accept="image/*"
                              className={classes.input}
                              id="input-image"
                              type="file"
                              onChange={this.imgSelectedHandler}
                            />
                            <label htmlFor="input-image">
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <PublishIcon />
                              </IconButton>
                            </label>
                            <Button
                              variant={this.state.buttonStyle}
                              color="primary"
                              autoFocus
                              onClick={this.imgUploadHandler}
                            >
                              {this.state.buttonText}
                            </Button>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="elevation-label">Elevation</InputLabel>
                      <Select
                        labelId="elevation-label"
                        value={this.state.elevation}
                        onChange={this.handleChange}
                        label="Elevation"
                        name="elevation"
                      >
                        <MenuItem key={0} value={0}>
                          None
                        </MenuItem>
                        {[...Array(24)].map((e, i) => (
                          <MenuItem key={i + 1} value={i + 1}>
                            {i + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.gridItem}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.rounded}
                          onChange={this.handleChange}
                          name="rounded"
                          color="primary"
                        />
                      }
                      label="Rounded corners"
                    />
                  </Grid>
                </Fragment>
              ) : null}
            </Grid>
          </Fragment>
        );
    }
}

export default withStyles(styles)(BackgroundControl);
