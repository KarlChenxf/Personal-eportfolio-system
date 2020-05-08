import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import HTMLReactParser from 'html-react-parser';

const styles = (theme => ({
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    paper: {
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
    },
    marginLeft: {
        marginLeft: theme.spacing(2),
    }
}));

class PersonalInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const { classes, avatar, name, layout, background } = this.props;
        
        let text = HTMLReactParser(name || "");

        let content =
            (<Grid container justify="flex-start" spacing={0}>
                <Grid key={0} item>
                    <Avatar className={classes.avatar} src={avatar}></Avatar>
                </Grid>
                <Grid key={1} item className={classes.marginLeft}>
                    {text}
                </Grid>
            </Grid>);

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

export default withStyles(styles)(PersonalInfo);
