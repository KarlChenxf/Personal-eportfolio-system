import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import 'rc-color-picker/assets/index.css';
import { Panel as ColorPickerPanel } from 'rc-color-picker';
import axios from 'axios';
import message from "@davistran86/notification";
import FileUploadControl from './FileUploadControl.js'
import MuiDialogActions from '@material-ui/core/DialogActions';
import LinearProgress from '@material-ui/core/LinearProgress';

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

class PageEditor extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            spacing: props.spacing || 0,
            color: props.color || '#FAFAFA',
            position: props.position || 'left top',
            repeat: props.repeat || 'no-repeat',
            size: props.size || '100%',
            fixed: props.fixed || false,
            image: props.image || "",
            openColorPanel: false,
            submit: false,
            progress: 0,
            err: false,
        };
        this.fileInput=React.createRef();

        console.log("PageEditor constructor()")
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
    }

    handleColor = (colorObj) => {
        const { color } = colorObj;
        this.setState({
            color: color,
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
    }

    fileOnClick=()=>{
        this.setState({
          selectedFile: null,
        })
        
      }

    imgUploadHandler = () => {
        const fd = new FormData();
        fd.append("file", this.fileInput.current.files[0]);
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
            if (this.state.uploadStatus === "success") {
              //alert("Upload success!");
              message.success("Image upload success!",{duration:3000, position: "bottom-left",});
            }
            this.props.onChange(this.getProps());
          })
          .catch((error)=>{
            console.log(error);
          });
      };

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

    onSubmit= (imgUrl) => {
        this.setState({
            image: imgUrl,
        }) ;
        this.props.onSave(this.getProps());
    }

    getProps = () => {
        return {
            spacing: this.state.spacing,
            color: this.state.color,
            position: this.state.position,
            repeat: this.state.repeat,
            size: this.state.size,
            fixed: this.state.fixed,
            image: this.state.image,
        };
    }

    render() {
        console.log("PageEditor render()");
        const { props, state,  } = this;
        const { classes, open, onClose, onSave, } = props;
        const { progress, err } = state;


        return (
            <Dialog open={open} fullWidth={true} maxWidth={"lg"} onClose={this.state.submit ? null : onClose} disableEnforceFocus disableScrollLock>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2">
                                Page
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h3">
                                Layout
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="spacing-label">Spacing</InputLabel>
                                <Select
                                    labelId="spacing-label"
                                    value={this.state.spacing}
                                    onChange={this.handleChange}
                                    label="Spacing"
                                    name="spacing" 
                                >
                                    {[0,8,16,32,64,128].map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h3">
                                Background
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Color">
                                <Button variant="contained"
                                    disableElevation
                                    className={classes.roundButton}
                                    style={{
                                        backgroundColor: this.state.color,
                                    }}
                                    onClick={this.handleClose}> {/* Space here to prevent warning */}</Button>
                            </Tooltip>
                        </Grid>
                        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.openColorPanel}>
                            <ColorPickerPanel color={this.state.color} enableAlpha={false} onChange={this.handleColor} mode="RGB" />
                        </Dialog>
                        <Grid item>
                            
                            <FileUploadControl label="Image" inputid="page-background-input" accept="image/*" value={this.state.image} submit={this.state.submit} onProgress={this.onProgress} onSubmit={this.onSubmit}/>
                         
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="position-label">Position</InputLabel>
                                <Select
                                    disabled={!this.state.image}
                                    labelId="position-label"
                                    value={this.state.position}
                                    onChange={this.handleChange}
                                    label="Position"
                                    name="position"
                                >
                                    {['left top','left center','left bottom','right top','right center','right bottom','center top','center center','center bottom'].map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="repeat-label">Repeat</InputLabel>
                                <Select
                                    disabled={!this.state.image}
                                    labelId="repeat-label"
                                    value={this.state.repeat}
                                    onChange={this.handleChange}
                                    label="Repeat"
                                    name="repeat"
                                >
                                    {['no-repeat','repeat','repeat-x','repeat-y','space','round'].map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="size-label">Size</InputLabel>
                                <Select
                                    disabled={!this.state.image}
                                    labelId="size-label"
                                    value={this.state.size}
                                    onChange={this.handleChange}
                                    label="Size"
                                    name="size"
                                >
                                    {['100%','cover','contain','auto'].map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item className={classes.gridItem}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        disabled={!this.state.image}
                                        checked={this.state.fixed}
                                        onChange={this.handleChange}
                                        name="fixed"
                                        color="primary"
                                    />
                                }
                                label="Fixed"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <MuiDialogActions>
                    {err? <Typography color="error">Upload failed. Click 'SAVE' to try again.</Typography> : null}
                    <Button autoFocus onClick={onClose}  disabled={this.state.submit}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={this.save} color="primary" disabled={this.state.submit}>
                        Save
                    </Button>
                </MuiDialogActions>
                {progress>0 ? <LinearProgress/> : null}
            </Dialog>
        )
    }
}

export default withStyles(styles)(PageEditor);
