import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import HTMLReactParser from 'html-react-parser';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: '45ch',
      },
    },
  }));

class TextAreaEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.html,
        };


        HTMLReactParser(this.props.html, {
            replace: ({ attribs, name }) => {
              console.log({ attribs, name });
              attribs = attribs || {};
              if (name && name.toLowerCase() === 'textarea') {
                this.state = attribs;
              }
            },
          });
    }




    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    getHtmlString() {
        return `<TextArea text='${this.state.text||''}'/>`
    }


    render() {
        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"}>
                <MuiDialogContent>
                    <TextField fullWidth
                        id="outlined-multiline-basic"
                        placeholder="Put your text here and click save."
                        variant="outlined"
                        label="TextArea"
                        multiline
                        rows="8"
                        name="text"
                        value={this.state.text}
                        onChange={this.handleChange} />
                </MuiDialogContent>
                <MuiDialogActions>
                    <Button autoFocus onClick={() => this.props.saveComponent(this.state.text)} color="primary">
                        Save
                    </Button>
                </MuiDialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(TextAreaEditor);