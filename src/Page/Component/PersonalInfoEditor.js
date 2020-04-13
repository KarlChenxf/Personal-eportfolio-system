import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import 'rc-color-picker/assets/index.css';

import BackgroundControl from './BackgroundControl.js'
import LayoutControl from './LayoutControl.js'

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

        this.layout = props.layout || null;
        this.background = props.background || null;

        console.log("PersonalInfoEditor constructor()")
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    /**
     * Handle changes that will not affect render
     */
    handlePureChange = event => {
        this[event.target.name] = event.target.value;
    }

    getProps() {
        return {
            avatar: this.state.avatar,
            name: this.state.name,
            layout: this.layout,
            background: this.background,
        };
    }

    render() {

        console.log("PersonalInfoEditor render()")

        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"} onClose={this.props.onClose}>
                <MuiDialogContent>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2">Personal Information</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h3">Content</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                id="avatar"
                                //placeholder="Avatar"
                                variant="outlined"
                                name="avatar"
                                label="Avatar"
                                value={this.state.avatar}
                                onChange={this.handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                id="name"
                                //placeholder="Name"
                                variant="outlined"
                                name="name"
                                label="Name"
                                value={this.state.name}
                                onChange={this.handleChange} />
                        </Grid>
                    </Grid>
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

export default withStyles(styles)(PersonalInfoEditor);