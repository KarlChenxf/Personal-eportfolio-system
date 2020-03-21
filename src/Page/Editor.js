import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { parse } from '../Util/HtmlToReact.js'
import ComponentEditor from './Component/ComponentEditor.js'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu';

/*function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}*/

const styles = (theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        //display: 'flex',
        //overflow: 'auto',
        //flexDirection: 'column',
        //flex: '1 1 auto',
        position: "relative",
        minHeight: '60px',
    },
    actions: {
        position: "absolute",
        top: '8px',
        right: '8px',
    }
}));

class Component {

    constructor(html,edit) {
        this.edit = edit;
        this.html = html;
    }
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: [],
            open: Boolean(null),
        };
    }

    newComponent = (html) => {
        let newContent = this.state.content.slice();
        newContent.push(new Component(html,true));
        this.setState({ content: newContent });
    }

    saveComponent = (index) => (html) => {
        var newContent = this.state.content.slice();
        newContent[index].edit = false;
        newContent[index].html = html;
        newContent[index].lastUpdate = new Date().getTime();
        console.log(html);
        this.setState({ content: newContent });
    }

    editComponent = (index) => {
        var newContent = this.state.content.slice();
        newContent[index].edit = true;
        this.setState({ content: newContent });
    }

    removeComponent = (index) => {
        var newContent = this.state.content.slice();
        newContent.splice(index, 1);
        this.setState({ content: newContent });
    }

    handleClick = event =>{
        this.setState({open: event.currentTarget});
    }

    handleClose = event =>{
        this.setState({open: null});
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                {/* Appbar */}
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon aria-controls="fade-menu" aria-haspopup="true" onClick={this.handleClick} />
                    </IconButton>
                    
                    <Menu
                    id="fade-menu"
                    keepMounted
                    anchorEl={this.state.open}
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Fade}
                    >
                    {/* Add Raw HTML */}
                    <MenuItem title="Add Raw HTML" onClick={()=>{this.newComponent("")}}>HTML</MenuItem>
                    {/* Add Personal Info */}
                    <MenuItem onClick={()=>this.newComponent('<PersonalInfo/>')}>Personal Information</MenuItem>
                    <MenuItem onClick={this.handleClose}>Textfield</MenuItem>
                    </Menu>

                        
                    </Toolbar>
                </AppBar>
                {/* Content */}
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Components */}
                            {this.state.content.map((component, index) =>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        {parse(component.html)}
                                        {/* Actions: Edit/Remove */}
                                        <div className={classes.actions}>
                                            <IconButton  size="medium" onClick={() => this.removeComponent(index)}>
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                            <IconButton  size="medium" color="primary" onClick={() => this.editComponent(index)}>
                                                <EditIcon fontSize="small"/>
                                            </IconButton>
                                        </div>
                                        {/* Component Editor */}
                                        <ComponentEditor open={component.edit} html={component.html} saveComponent={this.saveComponent(index)} />
                                    </Paper>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);