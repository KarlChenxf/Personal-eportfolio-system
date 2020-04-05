import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import HTMLReactParser from 'html-react-parser';

const styles = (theme => ({

}));

class VideoEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            videourl: props.videourl || "",
        };

    }

    getProps() {
        return {
            videourl: this.state.videourl,
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    render() {

        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"}>
                <MuiDialogContent>
                    <TextField fullWidth
                        id="videourl"
                        placeholder="VideoDisplay"
                        variant="outlined"
                        name="videourl"
                        value={this.state.videourl}
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

export default withStyles(styles)(VideoEditor);