import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import HTMLReactParser from 'html-react-parser';

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
            avatar: null,
            name: "",
        };

        HTMLReactParser(this.props.html, {
            replace: ({ attribs, name }) => {
              console.log({ attribs, name });
              attribs = attribs || {};
              if (name && name.toLowerCase() === 'personalinfo') {
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
        return `<PersonalInfo avatar='${this.state.avatar||''}' name='${this.state.name||''}'/>`
    }

    render() {

        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"}>
                <MuiDialogContent>
                    <TextField fullWidth
                        id="outlined-basic"
                        placeholder="Avatar URL"
                        variant="outlined"
                        name="avatar"
                        value={this.state.avatar}
                        onChange={this.handleChange} />
                    <TextField fullWidth
                        id="outlined-basic"
                        placeholder="Name"
                        variant="outlined"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                </MuiDialogContent>
                <MuiDialogActions>
                    <Button autoFocus onClick={() => {this.props.saveComponent(this.getHtmlString())}} color="primary">
                        Save
                    </Button>
                </MuiDialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(PersonalInfoEditor);