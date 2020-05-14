import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';



const styles = (theme => ({
    paper: {
        padding: theme.spacing(2),
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
    },
}));
class File extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { classes,background,layout } = this.props;
        //console.log("file: ", this.props.fileurl);
        //console.log("file: ", this.props.fileName);

        let content = (
          <a  href={this.props.fileurl} rel="noopener noreferrer" target="_blank">
          {this.props.fileName || " "}
        </a>
      )

      content =
      layout && layout.padding ? (
        <div className={classes.padding}>{content}</div>
      ) : (
        content
      );

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

export default withStyles(styles)(File);
