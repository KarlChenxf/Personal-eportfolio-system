import React from 'react';
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
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';

import BackgroundControl from './BackgroundControl.js'
import LayoutControl from './LayoutControl.js'

const styles = (theme => ({

}));

class TextAreaEditor extends React.Component {

    constructor(props) {
        super(props);

        this.textarea = props.textarea || "";
        this.layout = props.layout || null;
        this.background = props.background || null;
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
        return (
            // disableEnforceFocus: otherwise user could not edit "link" (select text - right click - link )
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"} onClose={this.props.onClose} disableEnforceFocus>
                <MuiDialogContent>
                    <TinyMCE
                        initialValue={this.textarea}
                        init={{
                            height: 450,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic forecolor backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help',
                            // WORKAROUND: base_url is required to enable TinyMCE to load css stylesheet correctly
                            base_url: process.env.PUBLIC_URL + '/tinymce',
                            /*link_list: [
                                { title: 'My page 1', value: 'https://www.tiny.cloud' },
                                { title: 'My page 2', value: 'https://about.tiny.cloud' }
                            ]*/
                        }}
                        onEditorChange={this.handleEditorChange}
                    />
                    <div style={{ height: 8 }} />
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

export default withStyles(styles)(TextAreaEditor);