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
import ClearIcon from '@material-ui/icons/Clear';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
//import 'rc-color-picker/assets/index.css';
import { Panel as ColorPickerPanel } from 'rc-color-picker';
import axios from 'axios';
import message from "@davistran86/notification";
import { API_END_POINT } from '../../Config.js';

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
    input: {
        display: 'none',
    }
}));

class FileUploadControl extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || '',
            file: '',
        };

        this.f = null;

        console.log("FileUploadControl constructor()")
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    onFileSelected = (event) => {
        //console.log(event.target.files)
        this.setState({
            value: '',
            file: event.target.files[0].name,
        });
        this.f = event.target.files[0];
    }

    clearValue = () => {
        this.setState({
            value: '',
            file: '',
        });
        this.f = null;
    }

    uploadFile = (file) => {
        const { onProgress, onSubmit } = this.props;

        const fd = new FormData();
        fd.append("file", file);
        // axios onUploadProgress is not working in nodejs
        // https://github.com/axios/axios/issues/1966
        /*var config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              console.log(percentCompleted)
            }
          };*/
        axios
            .post(API_END_POINT + "/file/upload", fd, { headers: { 'token': localStorage.LoginToken } }, null)
            .then((res) => {
                if (res.data.status === "success") {
                    if (onSubmit)
                        onSubmit(res.data.awsresponse)
                }
                else if (onProgress)
                    onProgress({ err: true })
            })
            .catch((error) => {
                if (onProgress)
                    onProgress({ err: true })
            });
    };

    componentDidUpdate(prevProps) {
        const { onSubmit } = this.props;
        if (!prevProps.submit && this.props.submit)
            if (this.f)
                this.uploadFile(this.f);
            else if (onSubmit)
                onSubmit(this.state.value)
    }

    render() {
        console.log("FileUploadControl render()");

        const { classes } = this.props;

        return (
            <Fragment>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="standard-adornment-upload">
                        {this.props.label}
                      </InputLabel>
                    <OutlinedInput
                        id="standard-adornment-upload"
                        //type={values.showPassword ? 'text' : 'password'}
                        name="value"
                        value={this.state.value || this.state.file}
                        onChange={this.handleChange}
                        labelWidth={44}
                        endAdornment={
                            this.state.value || this.state.file ?
                                <InputAdornment position="end">
                                    <IconButton
                                        color="primary"
                                        aria-label="clear"
                                        component="span"
                                        onClick={this.clearValue}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment> :
                                <InputAdornment position="end">
                                    <input
                                        accept={this.props.accept}
                                        className={classes.input}
                                        id="input-image"
                                        type="file"
                                        //ref={this.fileInput}
                                        onChange={this.onFileSelected}
                                    />
                                    <label htmlFor="input-image">
                                        <IconButton
                                            color="primary"
                                            aria-label="upload"
                                            component="span"
                                        >
                                            <PublishIcon />
                                        </IconButton>
                                    </label>
                                </InputAdornment>
                        }
                    />
                </FormControl>
            </Fragment>
        );
    }
}

export default withStyles(styles)(FileUploadControl);