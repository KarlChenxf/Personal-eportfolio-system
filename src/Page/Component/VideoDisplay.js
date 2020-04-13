import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player'
import Paper from '@material-ui/core/Paper';

const styles = (theme => ({
    paper: {
        padding: theme.spacing(0.6),
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

class VideoDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        const {classes, background} = this.props;
        console.log("videobackground: ", background);

        const content = (
            <Paper key={0} item className={classes.paper}> 
            <ReactPlayer
                className='react-player'
                url= {this.props.videourl}
                width='100%'
                height='100%'
                controls = {true}
            />
        </Paper>
        )

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

export default withStyles(styles)(VideoDisplay);
