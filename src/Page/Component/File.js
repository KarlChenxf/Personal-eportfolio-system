import React from 'react';
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
        console.log("file: ", this.props.fileurl);


        return (
          <Paper className={classes.paper}>
            <a  href={this.props.fileurl} rel="noopener noreferrer" target="_blank">
              {this.props.fileName || " "}
            </a>
          </Paper>
        );
    }
}

export default withStyles(styles)(File);
