import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import 'rc-color-picker/assets/index.css';
import { Panel as ColorPickerPanel } from 'rc-color-picker';


const styles = (theme => ({
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

class PageEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            spacing: props.spacing || 0,
            color: props.color || '#FAFAFA',
            position: props.position || 'left top',
            repeat: props.repeat || 'no-repeat',
            size: props.size || '100%',
            fixed: props.fixed || false,
            image: props.image || "",
            openColorPanel: false,
        };

        console.log("PageEditor constructor()")
    }

    handleClose = () => {
        this.setState({
            openColorPanel: !this.state.openColorPanel,
        })
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.type == 'checkbox' ? event.target.checked : event.target.value, // update the changed value
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
    }

    handleColor = (colorObj) => {
        const { color } = colorObj;
        this.setState({
            color: color,
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
    }

    getProps = () => {
        return {
            spacing: this.state.spacing,
            color: this.state.color,
            position: this.state.position,
            repeat: this.state.repeat,
            size: this.state.size,
            fixed: this.state.fixed,
            image: this.state.image,
        };
    }

    render() {
        console.log("PageEditor render()");

        const { classes, open, onClose, onSave } = this.props;

        return (
            <Dialog open={open} fullWidth={true} maxWidth={"lg"} onClose={onClose}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2">
                                Page
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h3">
                                Layout
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="spacing-label">Spacing</InputLabel>
                                <Select
                                    labelId="spacing-label"
                                    value={this.state.spacing}
                                    onChange={this.handleChange}
                                    label="Spacing"
                                    name="spacing" 
                                >
                                    {[0,8,16,32,64,128].map((e, i) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h3">
                                Background
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Color">
                                <Button variant="contained"
                                    disableElevation
                                    className={classes.roundButton}
                                    style={{
                                        backgroundColor: this.state.color,
                                    }}
                                    onClick={this.handleClose}> {/* Space here to prevent warning */}</Button>
                            </Tooltip>
                        </Grid>
                        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.openColorPanel}>
                            <ColorPickerPanel color={this.state.color} enableAlpha={false} onChange={this.handleColor} mode="RGB" />
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
                                <InputLabel id="position-label">Position</InputLabel>
                                <Select
                                    disabled={!this.state.image}
                                    labelId="position-label"
                                    value={this.state.position}
                                    onChange={this.handleChange}
                                    label="Position"
                                    name="position"
                                >
                                    {['left top','left center','left bottom','right top','right center','right bottom','center top','center center','center bottom'].map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="repeat-label">Repeat</InputLabel>
                                <Select
                                    disabled={!this.state.image}
                                    labelId="repeat-label"
                                    value={this.state.repeat}
                                    onChange={this.handleChange}
                                    label="Repeat"
                                    name="repeat"
                                >
                                    {['no-repeat','repeat','repeat-x','repeat-y','space','round'].map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="size-label">Size</InputLabel>
                                <Select
                                    disabled={!this.state.image}
                                    labelId="size-label"
                                    value={this.state.size}
                                    onChange={this.handleChange}
                                    label="Size"
                                    name="size"
                                >
                                    {['100%','cover','contain','auto'].map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item className={classes.gridItem}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        disabled={!this.state.image}
                                        checked={this.state.fixed}
                                        onChange={this.handleChange}
                                        name="fixed"
                                        color="primary"
                                    />
                                }
                                label="Fixed"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={() => { onSave(this.getProps()) }} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(PageEditor);
