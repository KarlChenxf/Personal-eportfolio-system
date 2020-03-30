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
import * as Type from './Component/Type.js'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import '../css/react-grid-layout.css'
import '../css/react-resizable.css';
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);




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
        minHeight: '64px',
        // Fill height
        height: '100%',
    },
    actions: {
        position: "absolute",
        top: '10px',
        right: '10px',
    }
}));

class Component {

    static count = 0;

    constructor(html, props) {
        this.key = Component.count;
        //this.html = html;
        this.type = html;
        this.props = props || {};
        Component.count++;
    }
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            layouts: { lg: [] },
            components: [],
            anchorEl: null,
            edit: -1,
        };
    }

    componentDidMount() {
        //this.newComponent("");
    }

    newComponent = (type) => {
        let layout = {
            i: Component.count.toString(),
            x: 0, //(this.state.content.length * 2) % (this.state.cols || 12),
            y: Infinity, // puts it at the bottom
            w: Infinity,
            h: 2,
            //minH: 2,
        }
        let component = new Component(type);

        const { components, layouts } = this.state;

        let newComponents = components.slice();
        newComponents.push(component);

        // IMPORTANT: Deep Clone is essential!
        let newLayouts = {
            ...layouts,
            lg: [
                ...layouts.lg,
                layout
            ]
        };

        this.setState({ components: newComponents, edit: newComponents.length - 1, layouts: newLayouts });
    }

    saveComponent = (index) => (props) => {
        var newComponents = this.state.components.slice();
        //newContent[index].html = html;
        newComponents[index].props = props;
        //newContent[index].lastUpdate = new Date().getTime();
        this.setState({ components: newComponents, edit: -1 });
    }

    editComponent = (index) => {
        this.setState({ edit: index });
    }

    removeComponent = (index) => {
        var newContent = this.state.components.slice();
        newContent.splice(index, 1);
        this.setState({ components: newContent });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = event => {
        this.setState({ anchorEl: null });
    }

    onBreakpointChange = (breakpoint, cols) => {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange = (layout, layouts) => {
        this.setState({ layouts: layouts });
    }

    render() {
        const { classes } = this.props;
        //const { data } = this.props.location;
        //const {data} = this.state.name;
        //console.log("props: ",this.props);
        //console.log("data: ",data);
        //console.log("classes: ",classes);

        return (
            <div className={classes.root}>
                <CssBaseline />
                {/* Appbar */}
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <IconButton edge="start" className={classes.menuButton} onClick={this.handleClick} color="inherit" aria-label="menu">
                                <MenuIcon aria-controls="fade-menu" aria-haspopup="true" />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Welcome, {localStorage.getItem("UserName")}
                        </Typography>
                            <Button href="./" color="inherit" horizontal='right'>Log out</Button>
                        </Grid>
                        <Menu
                            id="fade-menu"
                            keepMounted
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                            TransitionComponent={Fade}
                        >
                            {/* Add Raw HTML */}
                            <MenuItem title="Add Raw HTML" onClick={() => { this.newComponent(Type.HTML); this.handleClose() }}>HTML</MenuItem>
                            {/* Add Personal Info */}
                            <MenuItem onClick={() => { this.newComponent(Type.PERSONAL_INFO); this.handleClose() }}>Personal Information</MenuItem>
                            {/* Add TextArea */}
                            <MenuItem onClick={() => { this.newComponent(Type.TEXTAREA); this.handleClose() }}>Text Area</MenuItem>
                            {/* Add Photos */}
                            <MenuItem onClick={() => { this.newComponent(Type.PICDISPLAY); this.handleClose() }}>Pictures</MenuItem>
                            {/* Add Videos */}
                            <MenuItem onClick={() => { this.newComponent(Type.VIDEODISPLAY); this.handleClose() }}>Videos</MenuItem>
                            {/* Add Audios */}
                            <MenuItem onClick={this.handleClose}>Audios</MenuItem>
                            {/* Add Files */}
                            <MenuItem onClick={this.handleClose}>Files</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                {/* Content */}
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <ResponsiveReactGridLayout
                            className="layout"
                            cols={{ lg: 24, md: 24, sm: 24, xs: 4, xxs: 2 }}
                            //rowHeight={'auto'}
                            width={300}
                            margin={[0, 0]}
                            containerPadding={[0, 0]}
                            onLayoutChange={this.onLayoutChange}
                            onBreakpointChange={this.onBreakpointChange}
                            layouts={this.state.layouts}>
                            {/* Components */}
                            {this.state.components.map((component, index) =>
                                <div key={component.key}>
                                    {parse(component)}
                                    {/* Actions: Edit/Remove */}
                                    <div className={classes.actions}>
                                        <IconButton size="medium" onClick={() => this.removeComponent(index)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="medium" color="primary" onClick={() => this.editComponent(index)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                </div>
                            )}
                        </ResponsiveReactGridLayout>
                    </Container>
                </main>
                {/* Component Editor */}
                <ComponentEditor key={this.state.edit} open={this.state.edit >= 0} component={this.state.components[this.state.edit]} saveComponent={this.saveComponent(this.state.edit)} />
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);