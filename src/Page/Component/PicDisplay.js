import React from 'react';
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
        padding: theme.spacing(0.6),
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

      const { classes, background } = this.props;
      console.log("background: ", background);

        const content = (
          
            <img src={this.props.picurl} alt="pic" className={classes.media} />
          
        );

        return background ? (
          <Paper
            className={classes.paper}
            style={{
              backgroundImage: `url(${background.image})`,
              backgroundColor: background.color,
              border: background.border,
            }}
            elevation={background.elevation}
            square={!background.rounded}
          >
            {content}
          </Paper>
        ) : (
          content
        );
    }
  }
    


export default withStyles(styles)(PicDisplay);
