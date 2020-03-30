import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = (theme => ({
    root: {
        maxWidth: 345,
        width: 300,
      },
      media: {
        height: '100%',
        width: '100%',
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

class PicDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const {classes} = this.props;

        return (
          <Paper container justify="left" className={classes.paper}>
          <img src={this.props.picurl} alt="pic" className={classes.media}/>
          </Paper>
          
        
        )
    }
}

export default withStyles(styles)(PicDisplay);
