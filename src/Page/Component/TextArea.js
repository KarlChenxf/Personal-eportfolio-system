import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HTMLReactParser from 'html-react-parser';

const styles = (theme => ({
    paper: {
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
    },
}));

class TextArea extends React.Component {

    constructor(props) { 
        super(props);

        this.state = {

        };
    }

    render() {
        const { classes, textarea, layout, background } = this.props;

        let content = HTMLReactParser(textarea || "");

        content = layout && layout.padding ? <div style={{padding:layout.padding}}>{content}</div> : content;

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

export default withStyles(styles)(TextArea);