import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import HTMLReactParser from 'html-react-parser';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import { Panel as ColorPickerPanel } from 'rc-color-picker';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme => ({
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    formControl: {
        minWidth: 90,
    },
    gridItem: {
        display: 'inline-flex',
    },
    gridContainer: {
        marginTop: theme.spacing(1),
    },
    labelPlacementStart: {
        marginLeft: 0,
        marginTop: theme.spacing(1),
        //marginRight: '-11px',
        //flexDirection: 'row-reverse',
    }
}));

class PersonalInfoEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            avatar: props.avatar || "",
            name: props.name || "",
            background: props.background,
            openColorPanel: false,
        };
    }

    handleClose = () => {
        this.setState({
            openColorPanel: !this.state.openColorPanel,
        })
    };

    handleChange = event => {
        if (event.target.name == 'background') {
            this.setState({
                background: this.state.background ? null : { color: '#FFFFFFFF', elevation: 0, }, // update the changed value
            });
            return;
        }

        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    handleChangeWithin = node => event => {
        let newNode = {
            ...this.state[node],
            [event.target.name]: event.target.type == 'checkbox' ? event.target.checked : event.target.value
        };

        this.setState({
            [node]: newNode, // update the changed value
        });
    }

    handleColor = (color) => {
        let newNode = {
            ...this.state.background,
            color: color.color + parseInt(2.55 * color.alpha).toString(16).padStart(2, '0'),
        };

        this.setState({
            background: newNode, // update the changed value
        });
    }

    getProps() {
        return {
            avatar: this.state.avatar,
            name: this.state.name,
            background: this.state.background,
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog open={this.props.open} fullWidth={true} maxWidth={"lg"}>
                <MuiDialogContent>
                    <TextField fullWidth
                        id="avatar"
                        placeholder="Avatar URL"
                        variant="outlined"
                        name="avatar"
                        value={this.state.avatar}
                        onChange={this.handleChange} />
                    <TextField fullWidth
                        id="name"
                        placeholder="Name"
                        variant="outlined"
                        name="name"
                        label="name"
                        value={this.state.name}
                        onChange={this.handleChange} />

                    <FormControlLabel
                        classes={{ labelPlacementStart: classes.labelPlacementStart }}
                        control={<Switch
                            checked={Boolean(this.state.background)}
                            onChange={this.handleChange}
                            color="primary"
                            name="background"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Background"
                        labelPlacement="start"
                    />

                    {!this.state.background ? null : <Grid container direction="row" spacing={2} className={classes.gridContainer}>
                        <Grid item>
                            <Tooltip title="Color">
                                <Button variant="contained"
                                    disableElevation
                                    style={{
                                        borderRadius: 32,
                                        height: 44,
                                        width: 44,
                                        minWidth: 0,
                                        backgroundColor: this.state.background.color,
                                        border: '1px solid rgba(0, 0, 0, 0.23)',
                                        marginTop: 6
                                    }}
                                    onClick={this.handleClose} />
                            </Tooltip>
                        </Grid>
                        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.openColorPanel}>
                            <ColorPickerPanel color={this.state.background.color} onChange={this.handleColor} mode="RGB" />
                        </Dialog>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Elevation</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={this.state.background.elevation}
                                    onChange={this.handleChangeWithin('background')}
                                    label="Elevation"
                                    name="elevation"
                                >
                                    <MenuItem value={0}>
                                        None
                                    </MenuItem>
                                    {[...Array(24).keys()].map((e, i) => <MenuItem value={i + 1}>{i + 1}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item className={classes.gridItem}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.background.rounded}
                                        onChange={this.handleChangeWithin('background')}
                                        name="rounded"
                                        color="primary"
                                    />
                                }
                                label="Rounded corners"
                            />
                        </Grid>
                    </Grid>}
                </MuiDialogContent>
                <MuiDialogActions>
                    <Button autoFocus onClick={() => { this.props.saveComponent(this.getProps()) }} color="primary">
                        Save
                    </Button>
                </MuiDialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(PersonalInfoEditor);

/*<TextField fullWidth
                        placeholder="color"
                        variant="outlined"
                        name="color"
                        value={this.state.background.color}
                        onChange={this.handleChangeWithin('background')} />,*/