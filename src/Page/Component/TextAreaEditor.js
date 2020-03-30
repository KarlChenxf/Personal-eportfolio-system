import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react'; 

const styles = (theme => ({

}));

class TextAreaEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            textarea: props.textarea || "",
        };

    }

    getProps() {
        return {
            textarea: this.state.textarea,
        };
    }

/*
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }
*/

    handleEditorChange = event => {
       {/* 
        console.log(
          'Content was updated:',
          event.target.getContent()
        );
       */}
        
        this.setState({
            textarea: event.target.getContent(),       
        })
        
      }


    render() {
        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"}>
                <MuiDialogContent>
                    <Editor
                    apiKey="5v6a0gnztcaw5vwqnqr1vtbnp0miawzd87x3kyt4h62bc8tg"
                    initialValue={this.state.textarea}
                    init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image', 
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount',
                        'table'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic | forecolor | backcolor | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help'
                        
                    }}
                    //table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | \
                    onChange={this.handleEditorChange}
                    />

                    {/*
                        // old textarea
                    <TextField fullWidth
                        id="outlined-multiline-basic"
                        placeholder="Put your text here and click save."
                        variant="outlined"
                        multiline
                        rows="8"
                        name="textarea"
                        value={this.state.textarea}
                        onChange={this.handleChange} />

                    */}


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

export default withStyles(styles)(TextAreaEditor);