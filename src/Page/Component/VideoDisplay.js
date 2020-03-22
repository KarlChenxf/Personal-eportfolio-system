import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player'

const styles = (theme => ({

}));

class VideoDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {

        const {classes} = this.props;

        return (
            <Grid container justify="left" spacing={2}>
                <Grid key={0} item > 
                    <ReactPlayer
                                className='react-player'
                                url= {this.props.name}
                                width='100%'
                                height='100%'
                                controls = {true}
                /></Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(VideoDisplay);
