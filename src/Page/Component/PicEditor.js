import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import BackgroundControl from './BackgroundControl.js'
import LayoutControl from './LayoutControl.js'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import FileUploadControl from './FileUploadControl.js'

const styles = (theme) => ({
    formControl: {
        minWidth: 150,
    },
    marginTop: {
        marginTop: 8,
    },
    input: {
        display: 'none',
    }
});

class PicEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //picurl: props.picurl || '',
            //file: null,
            //fileName: "",
            fitting: props.fitting || "fill",
            submit: false,
            progress: 0,
            err: false,

        };
        this.picurl = props.picurl || '';
        this.layout = props.layout || null;
        this.background = props.background || null;
        //this.fileInput=React.createRef();
        this.i = 0;
    }

    getProps() {
        return {
            picurl: this.picurl,
            //pic: this.state.pic,
            //picName: this.state.picName,
            layout: this.layout,
            background: this.background,
            fitting: this.state.fitting,
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
            submit: true,
            progress: 1,
        });
    }

    onProgress = (e) => {
        if (e.err)
            this.setState({
                err: true,
                submit: false,
                progress: 0,
            })
    }

    onSubmitBackground = (background) => {
        this.background = background;
        this.i++;
        if (this.i >= 2) this.props.onSave(this.getProps());
    }

    onSubmitPic = (imgUrl) => {
        this.picurl = imgUrl;
        this.i++;
        if (this.i >= 2) this.props.onSave(this.getProps());
    }

    render() {
        const { props, state, } = this;
        const { classes, open, onClose, background } = props;
        const { err } = state;
        console.log(" picEditor render: ")

        return (
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={"lg"}
                onClose={this.state.submit ? null : onClose} disableEnforceFocus disableScrollLock
            >
                <MuiDialogContent>
                    <FileUploadControl
                        fullWidth
                        id="front-pic-upload"
                        inputid="image-input"
                        label="Image"
                        accept="image/*"
                        value={this.props.picurl}
                        submit={this.state.submit}
                        onProgress={this.onProgress}
                        onSubmit={this.onSubmitPic} />

                    <Grid
                        container
                        //className={classes.root}
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item>
                            <LayoutControl
                                {...this.props.layout}
                                name="layout"
                                onChange={this.handlePureChange}
                            />
                        </Grid>
                        <Grid item xs container direction="row" spacing={2} className={classes.marginTop}>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h3">
                                    Fit
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <FormControl
                                    variant="outlined"
                                    minwidth={150}
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
                                        {["fill", "contain", "cover", "none", "scale-down"].map(
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
                    <BackgroundControl {...background} inputid="pic-background-input" submit={this.state.submit} onProgress={this.onProgress} onSubmit={this.onSubmitBackground} />
                </MuiDialogContent>
                <MuiDialogActions>
                    {err ? <Typography color="error">Upload failed. Click 'SAVE' to try again.</Typography> : null}
                    <Button autoFocus onClick={onClose} disabled={this.state.submit}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={this.save} color="primary" disabled={this.state.submit}>
                        Save
                    </Button>
                </MuiDialogActions>
                {this.state.progress > 0 ? <LinearProgress /> : null}
            </Dialog>
        );
    }
}

export default withStyles(styles)(PicEditor);