import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

class PersonalInfoEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            avatar: props.avatar || "",
            name: props.name || "",
            //background: props.background,
        };

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

    getProps() {
        return {
            avatar: this.state.avatar,
            name: this.textarea,
            layout: this.layout,
            background: this.background,
        };
    }

    render() {

        console.log("PersonalInfoEditor render()")

        const { handleEditorChange } = this;

        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"} onClose={this.props.onClose} disableScrollLock>
                <MuiDialogContent>  
                    <Grid container direction="row" spacing={2}>
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
                    <BackgroundControl {...this.props.background} name='background' onChange={this.handlePureChange} />
                </MuiDialogContent>
                <MuiDialogActions>
                    <Button autoFocus onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={() => { this.props.saveComponent(this.getProps()) }} color="primary">
                        Save
                    </Button>
                </MuiDialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(PersonalInfoEditor);