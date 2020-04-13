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
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import 'rc-color-picker/assets/index.css';
import { Panel as ColorPickerPanel } from 'rc-color-picker';


const styles = (() => ({
    formControl: {
        minWidth: 150, 
    },
    gridItem: {
        display: 'inline-flex',
    },
    labelPlacementStart: {
        marginLeft: 0,
    },
    roundButton: {
        borderRadius: '50%',
        height: 44,
        width: 44,
        minWidth: 0,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        marginTop: 6,
    },
    textField: {
        minWidth: 210,
    }
}));

class BackgroundControl extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            background: Boolean(props.color || props.elevation || props.rounded),
            alpha: props.color ? Math.round(parseInt(props.color.substr(7, 2), 16) / 2.55) : 100,
            color: props.color ? props.color.substr(0, 7) : '#FFFFFF',
            colorHex: props.color ? props.color : '#FFFFFFFF',
            elevation: props.elevation || 0,
            rounded: props.rounded || false,
            image: props.image || "",
            openColorPanel: false,
        };

        console.log("BackgroundControl constructor()")
    }

    handleClose = () => {
        this.setState({
            openColorPanel: !this.state.openColorPanel,
        })
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value, // update the changed value
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
    }

    handleColor = (colorObj) => {
        const { color, alpha } = colorObj;
        this.setState({
            alpha: alpha,
            color: color,
            colorHex: color + Math.round(255 * alpha / 100).toString(16).padStart(2, '0'),
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
    }

    getProps = () => {
        const value =  this.state.background ? {
            color: this.state.colorHex,
            elevation: this.state.elevation,
            rounded: this.state.rounded,
            image: this.state.image,
        } : null;
        return {
            target:{
                name: this.props.name,
                value: value,
            }
        }
    }

    render() {
        console.log("BackgroundContrdol render()");

        const { classes } = this.props;

        return (
            <Fragment>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            classes={{ labelPlacementStart: classes.labelPlacementStart }}
                            control={<Switch
                                checked={this.state.background}
                                onChange={this.handleChange}
                                color="primary"
                                name="background"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />}
                            label={<Typography variant="h6" component="h3">Background</Typography>}
                            labelPlacement="start"
                        />
                    </Grid>
                    {this.state.background ? <Fragment>
                        <Grid item>
                            <Tooltip title="Color">
                                <Button variant="contained"
                                    disableElevation
                                    className={classes.roundButton}
                                    style={{
                                        backgroundColor: this.state.colorHex,
                                    }}
                                    onClick={this.handleClose}> {/* Space here to prevent warning */}</Button>
                            </Tooltip>
                        </Grid>
                        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.openColorPanel}>
                            <ColorPickerPanel color={this.state.color} alpha={this.state.alpha} onChange={this.handleColor} mode="RGB" />
                        </Dialog>
                        <Grid item>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="standard-adornment-upload">Image</InputLabel>
                                <OutlinedInput
                                    id="standard-adornment-upload"
                                    //type={values.showPassword ? 'text' : 'password'}
                                    name="image"
                                    value={this.state.image}
                                    onChange={this.handleChange}
                                    labelWidth={44}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                //onClick={handleClickShowPassword}
                                                //onMouseDown={handleMouseDownPassword}
                                            >
                                            <PublishIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="elevation-label">Elevation</InputLabel>
                                <Select
                                    labelId="elevation-label"
                                    value={this.state.elevation}
                                    onChange={this.handleChange}
                                    label="Elevation"
                                    name="elevation"
                                >
                                    <MenuItem key={0} value={0}>
                                        None
                                </MenuItem>
                                    {[...Array(24)].map((e, i) => <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item className={classes.gridItem}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.rounded}
                                        onChange={this.handleChange}
                                        name="rounded"
                                        color="primary"
                                    />
                                }
                                label="Rounded corners"
                            />
                        </Grid>
                    </Fragment> : null}
                </Grid>
            </Fragment>
        )
    }
}

export default withStyles(styles)(BackgroundControl);
