import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
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
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

const styles = (() => ({
    formControl: {
        minWidth: 150,
    },
    gridItem: {
        cursor: 'pointer',
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
    },
    input: {
        display: 'none',
    }
}));

class LinkEditor extends React.PureComponent {

    constructor(props) {
        super(props);

        let isInternal = props.profileList && props.profileList.find(v => v.id === props.value);

        this.state = {
            page: isInternal ? props.value : null,
            url: isInternal ? "" : props.value,
            type: isInternal ? "0" : '1',
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
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value, // update the changed value
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
    }

    getProps = () => {
        if (this.state.type === '0') {
            return this.state.page;
        } else if (this.state.type === '1') {
            return this.state.url;
        } else return null;
    }

    render() {
        console.log("PageEditor render()");

        const { classes, open, onClose, onSave, linkList } = this.props;
        const { type } = this.state;
        const { handleChange } = this;

        return (
            <Dialog open={open} fullWidth={true} maxWidth={"lg"} onClose={onClose} disableScrollLock>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2">
                                Link to
                            </Typography>
                        </Grid>
                        <Grid item component="label" xs={12} alignItems="center" className={classes.gridItem}>
                            <Radio
                                checked={type === "0"}
                                onChange={handleChange}
                                value="0"
                                name="type"
                            />
                            {<Typography variant="body1" component="span">Internal page</Typography>}
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl} disabled={type !== "0"}>
                                <InputLabel id="spacing-label">Page</InputLabel>
                                <Select
                                    labelId="spacing-label"
                                    value={this.state.page}
                                    onChange={this.handleChange}
                                    label="Page"
                                    name="page"
                                >
                                    {linkList ? linkList.map((v, i) => {
                                        return <MenuItem key={v.id} value={v.id}>{v.title}</MenuItem>
                                    }) : null}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item component="label" xs={12} alignItems="center" className={classes.gridItem}>
                            <Radio
                                checked={type === "1"}
                                onChange={handleChange}
                                value="1"
                                name="type"
                            />
                            <Typography variant="body1" component="span">Extrenal site</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="url"
                                label="URL"
                                value={this.state.url}
                                onChange={this.handleChange}
                                disabled={type !== "1"} />
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

export default withStyles(styles)(LinkEditor);
