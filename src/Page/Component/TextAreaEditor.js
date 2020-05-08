import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
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

}));

class TextAreaEditor extends React.Component {

    constructor(props) {
        super(props);

        this.textarea = props.textarea || '';
        this.layout = props.layout || null;
        this.background = props.background || null;
        this.linkList = props.profileList ? 
        props.profileList.map(v=>{return {title: v.title+' (ID:'+v.id+')', value: String(v.id)}}) : [];

        console.log("TextAreaEditor constructor()")
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
            textarea: this.textarea,
            layout: this.layout,
            background: this.background,
        };
    }

    render() {
        console.log("TextAreaEditor render()");

        const { classes, open, onClose, onSave, profileList, layout, background } = this.props;
        const { textarea, linkList, handleEditorChange, handlePureChange } = this;

        return (
            // disableEnforceFocus: otherwise user could not edit "link" (select text - right click - link )
            <Dialog open={open} fullWidth maxWidth={"lg"} onClose={onClose} disableEnforceFocus disableScrollLock>
                <MuiDialogContent>
                    <TinyMCE
                        initialValue={textarea}
                        init={{
                            height: 450,
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
                            link_list: linkList,
                        }}
                        onEditorChange={handleEditorChange}
                    />
                    <Typography variant="body1" color="textSecondary">"SHIFT + ENTER" to break line; "ENTER" to start a new paragraph.</Typography>
                    {profileList ? null : "Failed to load existing profile list, function 'Link to internal page' may not work properly. 'Link to external site' will still work."}
                    <div style={{ height: 8 }} />
                    <LayoutControl {...layout} name='layout' onChange={handlePureChange} />
                    <BackgroundControl {...background} name='background' onChange={handlePureChange} />
                </MuiDialogContent>
                <MuiDialogActions>
                    <Button autoFocus onClick={onClose}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={() => { onSave(this.getProps()) }} color="primary">
                        Save
                    </Button>
                </MuiDialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(TextAreaEditor);