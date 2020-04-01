import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import 'rc-color-picker/assets/index.css';

import BackgroundControl from './BackgroundControl.js'

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
            //background: props.background,
        };

        this.background = props.background || null;

        console.log("PersonalInfoEditor constructor()")
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
            background: this.background,
        };
    }

    render() {

        console.log("PersonalInfoEditor render()")

        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"} onClose={this.props.onClose}>
                <MuiDialogContent>

                    <TextField fullWidth
                        id="avatar"
                        placeholder="Avatar"
                        variant="outlined"
                        name="avatar"
                        label="Avatar"
                        value={this.state.avatar}
                        onChange={this.handleChange} />

                    <TextField fullWidth
                        id="name"
                        placeholder="Name"
                        variant="outlined"
                        name="name"
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange} />

                    <BackgroundControl key={0} {...this.props.background} onChange={(props) => this.background = props}/>
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

export default withStyles(styles)(PersonalInfoEditor);