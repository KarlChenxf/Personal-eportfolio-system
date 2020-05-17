import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import BackgroundControl from './BackgroundControl.js'
import LayoutControl from './LayoutControl.js'
import TinyMCEWapper from './TinyMCEWapper.js'

const styles = (theme => ({

}));

class TextAreaEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submit: false,
            progress: 0,
            err: false,
        };

        this.textarea = props.textarea || '';
        this.layout = props.layout || null;
        this.background = props.background || null;
        this.linkList = props.profileList ?
            props.profileList.map(v => { return { title: v.title + ' (ID:' + v.id + ')', value: String(v.id) } }) : [];

        console.log("TextAreaEditor constructor()")
    }

    /**
     * Handle changes that will not affect render
     */
    handlePureChange = event => {
        this[event.target.name] = event.target.value;
    }

    handleEditorChange = (content, editor) => {
        this.textarea = content
    }

    getProps() {
        return {
            textarea: this.textarea,
            layout: this.layout,
            background: this.background,
        };
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
        console.log("TextAreaEditor render()");

        const { props, state, textarea, linkList, handleEditorChange, handlePureChange } = this;
        const { open, onClose, profileList, layout, background } = props;
        const { progress, err } = state;

        return (
            // disableEnforceFocus: otherwise user could not edit "link" (select text - right click - link )
            <Dialog open={open} fullWidth maxWidth={"lg"} onClose={this.state.submit ? null : onClose} disableEnforceFocus disableScrollLock>
                <MuiDialogContent>
                    <TinyMCEWapper defaultValue={textarea} height={450} onEditorChange={handleEditorChange} profileList={linkList}/>    
                    <Typography variant="body1" color="textSecondary">"SHIFT + ENTER" to break line; "ENTER" to start a new paragraph.</Typography>
                    {profileList ? null : "Failed to load existing profile list, function 'Link to internal page' may not work properly. 'Link to external site' will still work."}
                    <div style={{ height: 8 }} />
                    <LayoutControl {...layout} name='layout' onChange={handlePureChange} />
                    <BackgroundControl {...background} inputid="text-background-input" submit={this.state.submit} onProgress={this.onProgress} onSubmit={this.onSubmit} />
                </MuiDialogContent>
                <MuiDialogActions>
                    {err? <Typography color="error">Upload failed. Click 'SAVE' to try again.</Typography> : null}
                    <Button autoFocus onClick={onClose}  disabled={this.state.submit}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={this.save} color="primary" disabled={this.state.submit}>
                        Save
                    </Button>
                </MuiDialogActions>
                {progress>0 ? <LinearProgress/> : null}
            </Dialog>
        )
    }
}

export default withStyles(styles)(TextAreaEditor);