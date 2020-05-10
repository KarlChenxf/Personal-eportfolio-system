import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import FindanexpertIcon from '@material-ui/icons/Pageview';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import OtherIcon from '@material-ui/icons/ArrowForward';
const styles = (theme => ({
    paper: {
        padding: theme.spacing(0.6),
        position: "relative",
        minHeight: '64px',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
    },
}));

class SnsDisplay extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    getHostName = (url) => {
        let domain = url.split('/');
        if( domain[2] ) {
            domain = domain[2];
        } else {
            domain = '';
        }
        let host = domain.split('.');
        return host[host.length-2];
    }

    render() {

        const {classes, background} = this.props;
        console.log("SNSbackground: ", background);
        
        let host = this.props.urlA ? this.getHostName(this.props.urlA):"";
        console.log(host);
        
        if (host === "findanexpert"){
        var content = (
          <IconButton
           aria-label="Findanexpert"
           href={this.props.urlA}>
          <FindanexpertIcon />
          </IconButton>
        )} else if (host === "linkedin"){
            var content = (
                <IconButton
                 aria-label="Linkedin"
                 href={this.props.urlA}>
                <LinkedinIcon />
                </IconButton>
              )
        } else if (host === "facebook"){
            var content = (
                <IconButton
                 aria-label="facebook"
                 href={this.props.urlA}>
                <FacebookIcon />
                </IconButton>
              )
        } else if (host === "twitter"){
            var content = (
                <IconButton
                 aria-label="twitter"
                 href={this.props.urlA}>
                <TwitterIcon />
                </IconButton>
              )
        } else if (host === "github"){
            var content = (
                <IconButton
                 aria-label="github"
                 href={this.props.urlA}>
                <GitHubIcon />
                </IconButton>
              )
        } else {
            var content = (
                <IconButton
                 aria-label={this.host}
                 href={this.props.urlA}>
                <OtherIcon />
                </IconButton>
              )
        }

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

export default withStyles(styles)(SnsDisplay);
