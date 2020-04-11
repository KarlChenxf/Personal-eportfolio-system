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
    formControl: {
        minWidth: 150,
    },
}));

class LayoutControl extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            padding: props.padding || 0,
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
            target: {
                name: this.props.name,
                value: {padding: this.state.padding,}
            }
        };
    }

    render() {
        console.log("LayoutControl render()");

        const { classes } = this.props;

        return (
            <Fragment>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h3">Layout</Typography>
                    </Grid>
                    <Grid item xs>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="padding-label">Padding</InputLabel>
                            <Select
                                labelId="padding-label"
                                value={this.state.padding}
                                onChange={this.handleChange}
                                label="Padding"
                                name="padding"
                            >
                                {[0, 8, 16, 32, 64, 128].map((e, i) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default withStyles(styles)(LayoutControl);
