import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

const styles = (theme => ({
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    paper: {
        padding: theme.spacing(2),
        //display: 'flex',
        //overflow: 'auto',
        //flexDirection: 'column',
        //flex: '1 1 auto',
        position: "relative",
        minHeight: '64px',
        // Fill height
        height: '100%',
    },
}));

class PersonalInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <Grid container justify="flex-start" spacing={2}>
                    <Grid key={0} item>
                        <Avatar className={classes.avatar} src={this.props.avatar}></Avatar>
                    </Grid>
                    <Grid key={1} item>
                        <Typography variant="h5">{this.props.name}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(PersonalInfo);
