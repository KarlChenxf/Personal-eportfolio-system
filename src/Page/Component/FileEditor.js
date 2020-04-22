import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
const styles = (() => ({
  box:{
    //borderColor:"text.primary",
    borderColor:"secondary.main",
    borderRadius:16,
    component:"div",
    display:"flex",
    flexWrap:"wrap",
    alignContent:"flex-start",
  },
  input:{
        display: 'none',
      }
}));

class FileEditor extends React.Component {
  constructor(props) {
    super(props);
    let service = axios.create({
      headers: { csrf: "token" },
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;

    this.state = {
      selectedFile: null,
      fileName: props.fileUploadHandler || "",
      fileurl: props.fileurl || "",
      uploadStatus: false,
    };
  }

  getProps() {
    return {
      selectedFile: this.state.selectedFile,
      fileName: this.state.fileName,
      fileurl: this.state.fileurl,
    };
  }

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      fileName: event.target.files[0].name,
    });
    console.log(event.target.files[0].name);
  };
  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("file", this.state.selectedFile);
    axios
      .post("http://3.135.244.103:9090/file/upload", fd,{headers:{'token':localStorage.LoginToken}},{
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
          );
        },
      })
      .then((res) => {
        console.log("uploadrespnse: ",res.data.awsresponse);
        this.setState({fileurl: res.data.awsresponse, uploadStatus: res.data.status });
      })
      .catch((error)=>{
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={this.props.onClose}
      >
        <div style={{ padding: "8px" }}>
          <div>
            <Box className={classes.Box}>
                  <input
                    //accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={this.fileSelectedHandler}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      autoFocus
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Choose file
                    </Button>
                  </label>
                  <TextField
                    id="outlined-read-only-input"
                    //label="File Name"
                    defaultValue="File Name"
                    //style={{ marginLeft: "8px" }}
                    InputProps={{
                      readOnly: true,
                    }}
                    value={this.state.fileName}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginLeft: "8px"}}
                    autoFocus
                    onClick={this.fileUploadHandler}
                  >
                    Upload
                  </Button>
                            
                  
          <Button
              autoFocus
              style={{ marginLeft: "8px",float:'right' }}
              onClick={() => {
                this.props.saveComponent(this.getProps());
              }}
              color="primary"
            >
              Save
            </Button>
            <Button autoFocus onClick={this.props.onClose}style={{float:'right'}}>
              Cancel
            </Button>
            
            </Box>   
          </div>

        </div>
        <FormControl
          variant="outlined"
          style={{ height: "100%", width: "100%" }}
        ></FormControl>
      </Dialog>
    );
  }
}

export default withStyles(styles)(FileEditor);