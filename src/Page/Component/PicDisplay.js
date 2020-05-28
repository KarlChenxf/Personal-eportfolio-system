import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const styles = (theme => ({

      paper: {
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
      wapper: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
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
          <div className={classes.wapper}>
            <img src={this.props.picurl} alt="pic"  style={{height:'100%',width:'100%',pointerEvents:'none',objectFit:this.props.fitting}}/>   
          </div>
        );

        content = layout && layout.padding ? <div className={classes.wapper} style={{padding:layout.padding}}>{content}</div> : content;

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
