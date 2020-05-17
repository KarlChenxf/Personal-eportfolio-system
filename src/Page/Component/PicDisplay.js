import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const styles = (theme => ({

      paper: {
        padding: theme.spacing(0),
        display: 'flex',
        justifyContent: 'center',
        height: '100% ',
        width:'100%',
        class: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
      },
      padding: {
        padding: theme.spacing(2),
        height: '100%',
        width: '100%',
      }
}));

class PicDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

      const { classes, background, layout } = this.props;
      console.log("Displayfitting: ",this.props.fitting);
      console.log("Displayimage: ",this.props);

        let content = (  

            <img src={this.props.picurl} alt="pic"  style={{height:'100%',width:'100%',pointerEvents:'none',objectFit:this.props.fitting}}/>   

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
          </Paper> : content
      )
    }
  }
    


export default withStyles(styles)(PicDisplay);
