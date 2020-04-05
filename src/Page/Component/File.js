import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = (theme => ({
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
class File extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            

        };
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <Grid container >                
                    <p >
                        {this.props.fileName || " "}
                    </p>
                </Grid>
            </Paper>
            
        )
    }
}

export default withStyles(styles)(File);
