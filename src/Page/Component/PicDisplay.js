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
        //maxHeight: '100%',
        //maxWidth: '100%',
        position:'absolute',
        width: 'auto',
        height: 'auto',
        verticalalign: 'middle',
        //minWidth: '10%',
        //class: 'center',
        //overflow:'hidden',
        //display: 'block',
        //marginleft: 'auto',
        //marginright: 'auto',

      },
      paper: {
        padding: theme.spacing(0),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //overflow: 'auto',
        //flexDirection: 'column',
        //flex: '1 1 auto',
        position: "relative",
        // Fill height
        height: '100% ',
        width:'100%',
        //display: 'block',
        //minHeight:'64px',
        //minWidth: '100px',
        //marginleft: 'auto',
        margin: 'auto',
        class: 'center',
        overflow:'hidden',
        verticalalign: 'middle',
        textalign: 'center',
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
          <Paper container className={classes.paper}>
            <img src={this.props.picurl} alt="pic"className={classes.media}/>     
          </Paper>
        )
    }
}

export default withStyles(styles)(PicDisplay);
