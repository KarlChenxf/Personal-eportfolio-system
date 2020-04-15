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
        position: "relative",
        height: '100% ',
        width:'100%',
        margin: 'auto',
        class: 'center',
        verticalalign: 'middle',
        textalign: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
      },
      padding: {
        padding: theme.spacing(2),
      }
}));

class PicDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

      const { classes, background, layout} = this.props;
      console.log("background: ", background);

        let content = (
          
            <img src={this.props.picurl} alt="pic" className={classes.media} />
          
        );

        content =
          layout && layout.padding ? (
            <div className={classes.padding}>{content}</div>
          ) : (
            content
          );

        return (
          background ? <Paper className={classes.paper} style={{
              backgroundImage: background.image ? `url(${background.image})` : null,
              backgroundColor: background.color,
              border: background.border,
          }} elevation={background.elevation} square={!background.rounded}>
              {content}
          </Paper> : <Paper className={classes.paper}> {content} </Paper>
      )
    }
  }
    


export default withStyles(styles)(PicDisplay);
