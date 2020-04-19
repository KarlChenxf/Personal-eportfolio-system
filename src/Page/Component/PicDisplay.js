import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import '../../css/pic-display.css'


const styles = (theme => ({

      paper: {
        padding: theme.spacing(0.6),
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

        let content = (        
            <img src={this.props.picurl} alt="pic" width = '100%' class={this.props.fitting}/>       
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
