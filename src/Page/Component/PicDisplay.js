import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = (theme => ({
    root: {
        maxWidth: 345,
        width: 300,
      },
      media: {
        height: 300,
        width: 300,
      },
}));

class PicDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const {classes} = this.props;

        return (
            <Card className={classes.root}>
            <CardActionArea>
              <CardMedia className={classes.media}
                component="img"
                alt="Contemplative Reptile"
                height="140"
                width="150"
                image={this.props.name}
                title="This is the title."
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This is the text.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )
    }
}

export default withStyles(styles)(PicDisplay);
