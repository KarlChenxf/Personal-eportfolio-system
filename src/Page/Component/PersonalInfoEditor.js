import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { Panel as ColorPickerPanel } from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

// TinyMCE (*required, please ignore the variable not used warning)
import tinymce from 'tinymce/tinymce';
// TinyMCE/theme (*required)
import 'tinymce/themes/silver';
// TinyMCE/plugins (*required)
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/image';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/plugins/wordcount';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';

import BackgroundControl from './BackgroundControl.js'
import LayoutControl from './LayoutControl.js'

const styles = (theme => ({
    formControl: {
        minWidth: 150,
    },
    roundButton: {
        borderRadius: '50%',
        height: 44,
        width: 44,
        minWidth: 0,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        marginTop: 6,
    },
}));

class PersonalInfoEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            avatar: props.avatar || '',
            avatar_size: props.avatar_size || 160,
            name: props.name || '',

            alpha: props.color ? Math.round(parseInt(props.color.substr(7, 2), 16) / 2.55) : 100,
            color: props.color ? props.color.substr(0, 7) : '#bdbdbd',
            colorHex: props.color ? props.color : '#bdbdbdFF',
            openColorPanel: false,
            //background: props.background,
            submit: false,
            progress: 0,
            err: false,
        };

        this.textarea = this.props.name;
        this.textarea2 = this.props.avatar_text;
        this.layout = props.layout || null;
        this.background = props.background || null;

        console.log("PersonalInfoEditor constructor()")
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    /**
     * Handle changes that will not affect render
     */
    handlePureChange = event => {
        this[event.target.name] = event.target.value;
    }

    handleEditorChange = (content, editor) => {
        this.textarea = content
    }

    handleEditorChange2 = (content, editor) => {
        this.textarea2 = content
    }

    handleClose = () => {
        this.setState({
            openColorPanel: !this.state.openColorPanel,
        })
    };

    handleColor = (colorObj) => {
        const { color, alpha } = colorObj;
        this.setState({
            alpha: alpha,
            color: color,
            colorHex: color + Math.round(255 * alpha / 100).toString(16).padStart(2, '0'),
        });
    }

    getProps() {
        //console.log(this.state.colorHex)
        return {
            avatar: this.state.avatar,
            avatar_size: this.state.avatar_size,
            avatar_text: this.textarea2,
            color: this.state.colorHex,
            name: this.textarea,
            layout: this.layout,
            background: this.background,
        };
    }

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

    onSubmit = (background) => {
        this.background = background;
        this.props.saveComponent(this.getProps())
    }

    render() {

        console.log("PersonalInfoEditor render()")

        const { props, state, handleEditorChange, handleEditorChange2 } = this;
        const { classes } = props;
        const { progress, err } = state;

        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"} onClose={this.state.submit ? null : this.props.onClose} disableScrollLock>
                <MuiDialogContent>
                    <Grid container direction="row" spacing={2}>
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
                        <Grid item xs>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="size-label">Size</InputLabel>
                                <Select
                                    labelId="size-label"
                                    value={this.state.avatar_size}
                                    onChange={this.handleChange}
                                    label="Size"
                                    name="avatar_size"
                                >
                                    {[...Array(24).keys()].map((e) => <MenuItem key={e} value={(e + 1) * 8}>{(e + 1) * 8}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                id="avatar"
                                //placeholder="Avatar"
                                variant="outlined"
                                name="avatar"
                                label="Avatar"
                                value={this.state.avatar}
                                onChange={this.handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TinyMCE
                                initialValue={this.props.avatar_text}
                                init={{
                                    height: 180,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image preview',
                                        'searchreplace code fullscreen',
                                        'table paste code wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | fontsizeselect | bold italic underline forecolor backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | table link | removeformat | code',
                                    // WORKAROUND: base_url is required to enable TinyMCE to load css stylesheet correctly
                                    base_url: process.env.PUBLIC_URL + '/tinymce',
                                    //link_list: linkList,
                                }}
                                onEditorChange={handleEditorChange2}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/*<TextField fullWidth
                                id="name"
                                //placeholder="Name"
                                variant="outlined"
                                name="name"
                                label="Name"
                                value={this.state.name}
                                onChange={this.handleChange} />*/}
                            <TinyMCE
                                initialValue={this.props.name}
                                init={{
                                    height: 240,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image preview',
                                        'searchreplace code fullscreen',
                                        'table paste code wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | fontsizeselect | bold italic underline forecolor backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | table link | removeformat | code',
                                    // WORKAROUND: base_url is required to enable TinyMCE to load css stylesheet correctly
                                    base_url: process.env.PUBLIC_URL + '/tinymce',
                                    //link_list: linkList,
                                }}
                                onEditorChange={handleEditorChange}
                            />
                        </Grid>
                    </Grid>
                    <LayoutControl {...this.props.layout} name='layout' onChange={this.handlePureChange} />
                    <BackgroundControl {...this.props.background} inputid="personalifo-background-input" submit={this.state.submit} onProgress={this.onProgress} onSubmit={this.onSubmit}/>
                </MuiDialogContent>
                <MuiDialogActions>
                    {err? <Typography color="error">Upload failed. Click 'SAVE' to try again.</Typography> : null}
                    <Button autoFocus onClick={this.props.onClose} disabled={this.state.submit}>
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

export default withStyles(styles)(PersonalInfoEditor);