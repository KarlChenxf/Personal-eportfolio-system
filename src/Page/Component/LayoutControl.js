import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = (() => ({
    formControl: {
        minWidth: 150,
    },
    marginTop: {
        marginTop: 8,
    }
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
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value, // update the changed value
        }, () => {
            if (this.props.onChange)
                this.props.onChange(this.getProps());
        });
    }

    getProps = () => {
        return {
            target: {
                name: this.props.name,
                value: { padding: this.state.padding, }
            }
        };
    }

    render() {
        console.log("LayoutControl render()");

        const { classes } = this.props;

        return (
            <Grid container direction="row" spacing={2} className={classes.marginTop}>
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
                            {[...Array(17).keys()].map((e) => <MenuItem key={e} value={e * 8}>{e * 8}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(LayoutControl);
