import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import 'rc-color-picker/assets/index.css';
import { Panel as ColorPickerPanel } from 'rc-color-picker';


const styles = (theme => ({
    marginTop: {
        marginTop: theme.spacing(3),
    },
}));

class LayoutControl extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            padding: props.padding || false,
        };

        console.log("LayoutControl constructor()")
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.type == 'checkbox' ? event.target.checked : event.target.value, // update the changed value
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
    }

    getProps = () => {
        return {
            padding: this.state.padding,
        };
    }

    render() {
        console.log("LayoutControl render()");

        const { classes } = this.props;

        return (
            <Fragment>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.padding}
                            onChange={this.handleChange}
                            name="padding"
                            color="primary"
                        />
                    }
                    label="Padding"
                />
            </Fragment>
        )
    }
}

export default withStyles(styles)(LayoutControl);
