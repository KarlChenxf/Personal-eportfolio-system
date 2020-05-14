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
            domain = url;
        }
        let host = domain.split('.');
        return host[host.length-2];
    }

    render() {

        const {classes, background} = this.props;
        console.log("SNSbackground: ", background);
        
        let host = this.props.urlA ? this.getHostName(this.props.urlA):"";
        console.log(host);
        
		var content;
		
        if (host === "findanexpert"){
        let buttoncreated = (
          <IconButton
           aria-label="Findanexpert"
           onClick={() => {window.open('https://'+this.props.urlA)}}>
          <FindanexpertIcon />
          </IconButton>
        );
		content = buttoncreated;
		} else if (host === "linkedin"){
            let buttoncreated = (
                <IconButton
                 aria-label="Linkedin"
				 onClick={() => {window.open('https://'+this.props.urlA)}}>
                <LinkedinIcon />
                </IconButton>
              )
		content = buttoncreated;
        } else if (host === "facebook"){
            let buttoncreated = (
                <IconButton
                 aria-label="facebook"
                 onClick={() => {window.open('https://'+this.props.urlA)}}>
                <FacebookIcon />
                </IconButton>
              )
		content = buttoncreated;
        } else if (host === "twitter"){
            let buttoncreated = (
                <IconButton
                 aria-label="twitter"
                 onClick={() => {window.open('https://'+this.props.urlA)}}>
                <TwitterIcon />
                </IconButton>
              )
		content = buttoncreated;
        } else if (host === "github"){
            let buttoncreated = (
                <IconButton
                 aria-label="github"
                 onClick={() => {window.open('https://'+this.props.urlA)}}>
                <GitHubIcon />
                </IconButton>
              )
		content = buttoncreated;
        } else {
            let buttoncreated = (
                <IconButton
                 aria-label={this.host}
                 onClick={() => {window.open('https://'+this.props.urlA)}}>
                <OtherIcon />
                </IconButton>
              )
		content = buttoncreated;
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
