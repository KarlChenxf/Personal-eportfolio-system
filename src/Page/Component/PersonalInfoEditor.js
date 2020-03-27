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
            avatar: props.avatar || "",
            name: props.name || "",
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    getProps() {
        return {
            avatar: this.state.avatar,
            name: this.state.name,
        };
    }

    render() {

        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"}>
                <MuiDialogContent>
                    <TextField fullWidth
                        id="avatar"
                        placeholder="Avatar URL"
                        variant="outlined"
                        name="avatar"
                        value={this.state.avatar}
                        onChange={this.handleChange} />
                    <TextField fullWidth
                        id="name"
                        placeholder="Name"
                        variant="outlined"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                </MuiDialogContent>
                <MuiDialogActions>
                    <Button autoFocus onClick={() => {this.props.saveComponent(this.getProps())}} color="primary">
                        Save
                    </Button>
                </MuiDialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(PersonalInfoEditor);