import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HTMLReactParser from 'html-react-parser';

const styles = (() => ({
    paper: {
        height: '100%',
        position: "relative",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
    },
}));

class HTMLDisplay extends React.Component {

    constructor(props) { 
        super(props);

        this.state = {

        };
    }

    render() {
        const { classes, html, layout, background } = this.props;

        let content = HTMLReactParser(html || "");

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

export default withStyles(styles)(HTMLDisplay);
