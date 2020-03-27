import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

class RawHTMLEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            html: this.props.html || "",
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    getProps() {
        return {
            html: this.state.html,
        };
    }

    render() {
        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"}>
                <MuiDialogContent>
                    <TextField fullWidth
                        id="html"
                        placeholder="Put raw html here and click ADD."
                        variant="outlined"
                        name="html"
                        value={this.state.html}
                        onChange={this.handleChange} />
                </MuiDialogContent>
                <MuiDialogActions>
                    <Button autoFocus onClick={() => this.props.saveComponent(this.getProps())} color="primary">
                        Save
                    </Button>
                </MuiDialogActions>
            </Dialog>
        )
    }
}

export default (RawHTMLEditor);