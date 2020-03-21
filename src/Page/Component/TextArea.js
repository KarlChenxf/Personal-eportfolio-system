import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


class TextArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container justify="left">
                    <Typography 
                    variant="h5"
                    multiline
                    >{this.props.html}</Typography>
            </Grid>
        )
    }
}

export default (TextArea);
