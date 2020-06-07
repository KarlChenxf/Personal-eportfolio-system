import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

const styles = (() => ({
    label: {
        cursor: 'pointer',
        display: 'inline-flex',
    },
}));

class LinkEditor extends React.PureComponent {

    constructor(props) {
        super(props);

        let isInternal = props.linkList && props.linkList.find(v => String(v.id) === String(props.value));
        let type = !props.value ? '0' : (isInternal ? '1' : '2');

        this.state = {
            page: type==='1' ? props.value : '',
            url: type==='2' ? props.value : '',
            type: type,
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
    }

    getProps = () => {
        if (this.state.type === '1') {
            return this.state.page;
        } else if (this.state.type === '2') {
            return this.state.url;
        } else return null;
    }

    render() {

        const { classes, open, onClose, onSave, linkList } = this.props;
        const { type, page, url } = this.state;
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
                        <Grid item component="label" xs={12} alignItems="center" className={classes.label}>
                            <Radio
                                checked={type === '0'}
                                onChange={handleChange}
                                value='0'
                                name="type"
                            />
                            {<Typography variant="body1" component="span">None</Typography>}
                        </Grid>
                        <Grid item component="label" xs={12} alignItems="center" className={classes.label}>
                            <Radio
                                checked={type === '1'}
                                onChange={handleChange}
                                value='1'
                                name="type"
                                disabled={!linkList}
                            />
                            {<Typography variant="body1" component="span">Internal page</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" disabled={type !== '1'} fullWidth>
                                <InputLabel id="input-label">Page</InputLabel>
                                <Select
                                    labelId="input-label"
                                    value={page}
                                    onChange={handleChange}
                                    label="Page"
                                    name="page"
                                >
                                    {linkList ? linkList.map((v) => {
                                        return <MenuItem key={v.id} value={v.id}>
                                            {v.title}
                                            <Typography variant="body1" component="span" color="textSecondary" 
                                                style={{ paddingLeft: "0.2em" }}>(ID:{v.id})</Typography>
                                        </MenuItem>
                                    }) : null}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item component="label" xs={12} alignItems="center" className={classes.label}>
                            <Radio
                                checked={type === '2'}
                                onChange={handleChange}
                                value='2'
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
                                value={url}
                                onChange={handleChange}
                                disabled={type !== '2'} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onClose}>
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
