import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import axios from 'axios';
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
    },
}));

/**
 * An uncontrol componnt allow user select a local file or input text.
 * @param onProgress only returns errors no progress
 * @param value a DEFAULT value
 * @param onSubmit called after upload succeed (file selected) or immediatelly (text inputed)
 */
class FileUploadControl extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || '',
            file: '',
        };

        this.f = null;

        console.log("FileUploadControl constructor(): ")
    }

    handleChange = event => {
        // Prevent input from changing when if a file has been selected
        // User can only edit the input after clicking 'X' (clear)
        if(this.f) return;
        this.setState({
            value: event.target.value,
            file: '',
        });
        this.f = null;
    }

    onFileSelected = (event) => {
        console.log("onFileSelected: ", event.target.files)
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
            .post(API_END_POINT + "/file/upload", fd, { headers: { 'token': localStorage.LoginToken || sessionStorage.LoginToken } }, null)
            .then((res) => {
                if (res.data.status === "success") {
                    if (onSubmit)
                        onSubmit(res.data.awsresponse)
                }
                else if (onProgress)
                    onProgress({ err: true })
                console.log("uploadAvatarFail")
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

        const { classes, fullWidth } = this.props;

        return (
            <FormControl variant="outlined" fullWidth={fullWidth}>
                <InputLabel htmlFor="standard-adornment-upload">
                    {this.props.label}
                </InputLabel>
                <OutlinedInput
                    id={this.props.id}
                    //type={values.showPassword ? 'text' : 'password'}
                    autoComplete = {this.state.file ? "off" : null}
                    name={this.props.label || "value"}
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
                                    id={this.props.inputid}
                                    type="file"
                                    //ref={this.fileInput}
                                    onChange={this.onFileSelected}
                                />
                                <label htmlFor={this.props.inputid}>
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
        );
    }
}

export default withStyles(styles)(FileUploadControl);
