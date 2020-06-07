import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player'
import Paper from '@material-ui/core/Paper';

const styles = (theme => ({
    paper: {
        position: "relative",
        //minHeight: '64px',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
    },
    wapper: {
        height: '100%',
        width: '100%',
    }
}));

class VideoDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        const {classes, background,layout} = this.props;

        let content = (
            <ReactPlayer
                className='react-player'
                url= {this.props.videourl}
                width='100%'
                height='100%'
                controls = {true}
            />
        )
        content =

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

export default withStyles(styles)(VideoDisplay);
