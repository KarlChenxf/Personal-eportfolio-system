import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const styles = (theme => ({

}));

class TextDraftEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            textDraft: props.textDraft || "",
        };

    }

    getProps() {
        return {
            textDraft: this.state.textDraft,
            
        };
    }

    onChange = ( event, editor )=> {
        const data = editor.getData();
        console.log( { event, editor, data } );
         
         this.setState({
             textDraft: editor.getData(),       
         })
         
       }



    render() {
        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"}>
                <MuiDialogContent>
                    <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        this.setState({
                            textDraft: editor.getData(),
                        })
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                    />

                </MuiDialogContent>
                <MuiDialogActions>
                    <Button autoFocus onClick={() => {this.props.saveComponent(this.getProps())}}  color="primary">
                        Save
                    </Button>
                </MuiDialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(TextDraftEditor);