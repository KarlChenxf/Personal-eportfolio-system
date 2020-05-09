import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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
    displayFlex: {
        display: 'flex',
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
        const { classes, avatar, avatar_size, avatar_text, color, name, layout, background } = this.props;

        const avatarSizing = {
            backgroundColor: color,
            width: avatar_size || 160,
            height: avatar_size || 160,
        }
    
        let content =
            (<Grid container justify="flex-start" spacing={0}>
                <Grid key={0} item alignItems="center" className={classes.displayFlex}>
                    <Avatar style={avatarSizing} src={avatar}>{avatar_text ? HTMLReactParser(avatar_text) : null}</Avatar>
                </Grid>
                {name ? <Grid key={1} item className={classes.marginLeft} xs>
                    {HTMLReactParser(name)}
                </Grid> : null}
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
