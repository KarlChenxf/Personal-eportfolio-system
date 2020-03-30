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

class PicEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            picurl: props.picurl||"",
        };
    }

    getProps() {
        return {
            picurl: this.state.picurl,
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
                        id="picurl"
                        placeholder="PicDisplay"
                        variant="outlined"
                        name="picurl"
                        value={this.state.picurl}
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

export default withStyles(styles)(PicEditor);