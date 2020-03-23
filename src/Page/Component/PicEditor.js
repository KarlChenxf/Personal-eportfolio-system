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
            name: "",
        };

        HTMLReactParser(this.props.html, {
            replace: ({ attribs, name }) => {
              console.log({ attribs, name });
              attribs = attribs || {};
              if (name && name.toLowerCase() === 'picurl') {
                this.state = attribs;
                console.log("pic_attribs: ", attribs);
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
        return `<PicDisplay name='${this.state.pname||''}'/>`
    }

    render() {

        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"}>
                <MuiDialogContent>
                    <TextField fullWidth
                        id="outlined-basic"
                        placeholder="PicDisplay"
                        variant="outlined"
                        name="pname"
                        value={this.state.pname}
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

export default withStyles(styles)(PicEditor);