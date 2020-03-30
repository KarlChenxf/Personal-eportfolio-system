import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

const styles = (theme => ({

}));

class FileEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            fileName: props.fileUploadHandler || "",
        };

    }

    getProps() {
        return {
            selectedFile: this.state.selectedFile,
            fileName: this.state.fileName,
        };
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0], 
            fileName: event.target.files[0].name,
        });
        console.log(event.target.files[0].name);
    }

    fileUploadHandler =() => {
        const fd = new FormData();
        fd.append('file',this.state.selectedFile,this.state.selectedFile.name);
        axios.post('http://3.135.244.103:9090/profile/add',fd,{
            onUploadProgress: ProgressEvent =>{
              console.log('Upload Progress: ' + Math.round((ProgressEvent.loaded/ProgressEvent.total)*100))  
            }
        })
            .then(res =>{
                console.log(res);
            });

    }



    render() {
        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"}>
                <MuiDialogContent>
                    <input type="file" onChange ={this.fileSelectedHandler}/>
                    <button onClick={this.fileUploadHandler}>Upload</button>

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

export default withStyles(styles)(FileEditor);