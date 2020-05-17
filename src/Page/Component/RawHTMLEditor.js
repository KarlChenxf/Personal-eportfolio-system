import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import BackgroundControl from "./BackgroundControl.js";
import LayoutControl from './LayoutControl.js'
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

class RawHTMLEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            html : props.html || '',
            submit: false,
            progress: 0,
            err: false,
        };

        this.layout = props.layout || null;
        this.background = props.background || null;
    }

    getProps() {
        return {
            layout: this.layout,
            background: this.background,
            html: this.state.html,
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    handlePureChange = (event) => {
        this[event.target.name] = event.target.value;
      }

    save = () => {
        this.setState({
            err: false,
            submit: true,
            progress: 1,
        })
    }

    onProgress = (e) => {
        if(e.err)
            this.setState({
                err: true,
                submit: false,
                progress: 0,
            })
    }

    onSubmit = (background) => {
        this.background = background;
        this.props.onSave(this.getProps())
    }

    render() {
        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"} onClose={this.props.onClose}>
                <MuiDialogContent>
                    <TextField
                        fullWidth
                        id="html"
                        placeholder="Put raw html here and click Save."
                        multiline={true}
                        rows={10}
                        variant="outlined"
                        name="html"
                        value={this.state.html}
                        onChange={this.handleChange}
                    />
                    <LayoutControl {...this.props.layout} name='layout' onChange={this.handlePureChange} />
                    <BackgroundControl {...this.props.background} inputid="video-background-input" submit={this.state.submit} onProgress={this.onProgress} onSubmit={this.onSubmit} />
                </MuiDialogContent>

                <MuiDialogActions>
                    <Button autoFocus onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={this.save} color="primary" disabled={this.state.submit}>
                        Save
                    </Button>
                </MuiDialogActions>
            </Dialog>
        )
    }
}

export default (RawHTMLEditor);