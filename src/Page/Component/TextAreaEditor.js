import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
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
//import 'tinymce/plugins/hr';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';

import BackgroundControl from './BackgroundControl.js'
import LayoutControl from './LayoutControl.js'

const styles = (theme => ({

}));

class TextAreaEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submit: false,
            progress: 0,
            err: false,
        };

        this.textarea = props.textarea || '';
        this.layout = props.layout || null;
        this.background = props.background || null;
        this.linkList = props.profileList ?
            props.profileList.map(v => { return { title: v.title + ' (ID:' + v.id + ')', value: String(v.id) } }) : [];

        console.log("TextAreaEditor constructor()")

        tinymce.PluginManager.add('hrcustom', function (editor, url) {
            // create button
            editor.ui.registry.addButton('hrcustom', {
                icon: 'horizontal-rule',
                tooltip: 'Horizontal line',
                onAction: function() {
                    // open window
                    editor.windowManager.open({
                        title: 'Insert horizontal line',
                        body: {
                            type: 'panel',
                            items:[
                            { 
                                type: 'selectbox', 
                                name: 'align', 
                                label: 'Alignment', 
                                items: [
                                    { value: 'left', text: 'Left' },
                                    { value: 'center', text: 'Center' },
                                    { value: 'right', text: 'Right' }
                                ] 
                            },
                            {
                                type: 'colorinput',
                                name: 'color',
                                label: 'Color',
                                placeholder: '#CED4D9'
                            },
                            {
                                type: 'input',
                                name: 'width',
                                label: 'Width',
                                maxLength: 5,
                                placeholder: '100%'
                            }, 
                            {
                                type: 'input',
                                name: 'height',
                                label: 'Thickness',
                                maxLength: 5,
                                placeholder: '1px'
                            }
                        ]},
                        buttons: [
                            {
                              type: 'cancel',
                              text: 'Close'
                            },
                            {
                              type: 'submit',
                              text: 'Save',
                              primary: true
                            }
                          ],
                        // generate and insert HTML upon submitting dialog 
                        onSubmit: function (api) {
                            var data = api.getData();
                            var hr = document.createElement('hr');
        
                            // set alignment
                            switch (data.align) {
                                case 'center':
                                    hr.style.marginLeft = 'auto';
                                    hr.style.marginRight = 'auto';
                                    break;
                                case 'right':
                                    hr.style.textAlign = 'right';
                                    hr.style.marginRight = 0;
                                    break;
                                default:
                                    hr.style.textAlign = 'left';
                                    hr.style.marginLeft = 0;
                                    break;
                            }
        
                            // set color
                            hr.style.backgroundColor = data.color || '#CED4D9';
        
                            let unitRegex = /^\d+(px|%)?$/;
                            // set width
                            hr.style.width = unitRegex.test(data.width) ? data.width : '100%';
                            // set height (thickness)
                            hr.style.height = unitRegex.test(data.height) ? data.height : '1px';
        
                            // set other styles
                            hr.style.border = 0;
                            hr.style.marginBlockStart = '0em';
                            hr.style.marginBlockEnd = '0em';
                            hr.style.overflow = 'hidden';
        
                            // insert content when the window form is submitted
                            editor.insertContent(hr.outerHTML);
                            api.close();
                        }
                    });
                }
            });
        
            // note: colorpicker plugin MUST be included for this to work
        
            // taken from core plugins
            function createColorPickerAction() {
                var callback = tinymce.activeEditor.settings.color_picker_callback;
                if (callback) {
                    return function () {
                        var self = this;
                        callback.call(
                            editor,
                            function (value) {
                                self.value(value).fire('change');
                            },
                            self.value()
                        );
                    }
                }
            }
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
            textarea: this.textarea,
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
        this.props.onSave(this.getProps())
    }

    render() {
        console.log("TextAreaEditor render()");

        const { props, state, textarea, linkList, handleEditorChange, handlePureChange } = this;
        const { classes, open, onClose, onSave, profileList, layout, background } = props;
        const { progress, err } = state;

        return (
            // disableEnforceFocus: otherwise user could not edit "link" (select text - right click - link )
            <Dialog open={open} fullWidth maxWidth={"lg"} onClose={this.state.submit ? null : onClose} disableEnforceFocus disableScrollLock>
                <MuiDialogContent>
                    <TinyMCE
                        initialValue={textarea}
                        init={{
                            height: 450,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image preview',
                                'searchreplace code fullscreen',
                                'table paste code wordcount hrcustom'
                            ],
                            toolbar:
                                'undo redo | styleselect | fontsizeselect | bold italic underline forecolor backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | hrcustom table link | removeformat | code',
                            // WORKAROUND: base_url is required to enable TinyMCE to load css stylesheet correctly
                            base_url: process.env.PUBLIC_URL + '/tinymce',
                            link_list: linkList,
                            style_formats: [
                                { title: 'Space before paragraph' },
                                { title: 'Remove before', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockStart: '0em' } },
                                { title: '1em before', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockStart: '1em' } },
                                { title: '2em before', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockStart: '2em' } },
                                { title: '3em before', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockStart: '3em' } },
                                { title: 'Space after paragraph' },
                                { title: 'Remove after', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockEnd: '0em' } },
                                { title: '1em after', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockEnd: '1em' } },
                                { title: '2em after', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockEnd: '2em' } },
                                { title: '3em after', selector: 'p,div,h1,h2,h3,h4,h5,h6,hr', styles: { marginBlockEnd: '3em' } },
                            ]
                        }}
                        onEditorChange={handleEditorChange}
                    />
                    <Typography variant="body1" color="textSecondary">"SHIFT + ENTER" to break line; "ENTER" to start a new paragraph.</Typography>
                    {profileList ? null : "Failed to load existing profile list, function 'Link to internal page' may not work properly. 'Link to external site' will still work."}
                    <div style={{ height: 8 }} />
                    <LayoutControl {...layout} name='layout' onChange={handlePureChange} />
                    <BackgroundControl {...background} inputid="text-background-input" submit={this.state.submit} onProgress={this.onProgress} onSubmit={this.onSubmit} />
                </MuiDialogContent>
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

export default withStyles(styles)(TextAreaEditor);