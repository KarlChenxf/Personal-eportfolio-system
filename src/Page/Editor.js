import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import LayersIcon from '@material-ui/icons/Layers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

import { BrowserRouter as Router, Route, Link as RouteLink } from "react-router-dom";
import { withRouter } from 'react-router';

import { WidthProvider, Responsive } from "react-grid-layout";
import '../css/react-grid-layout.css'
import '../css/react-resizable.css';

import { ParsedComponent } from '../Util/JsonToReact.js'
import ComponentEditor from './Component/ComponentEditor.js'
import * as Type from './Component/Type.js'
import { API_END_POINT } from '../Config.js';
import PageEditor from './Component/PageEditor';
import SharingDialog from './Component/SharingDialog';
import LinkEditor from './Component/LinkEditor';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = (theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: '#FFF',
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
    actions: {
        position: "absolute",
        top: '10px',
        right: '10px',
    },
    margin: {
        margin: theme.spacing(1),
    },
    actionLinkRoot: {
        padding: '12px 8px',
        minWidth: '44px',
        borderRadius: '22px'
    },
    actionLinkIcon: {
        margin: 0,
    },
    actionLinkText: {
        marginLeft: theme.spacing(1),
        lineHeight: 0,
    },
}));

class Component {

    constructor(html, props) {
        // We assume that user will not create over 1000 components per second
        this.key = new Date().getTime().toString(36);
        this.type = html;
        this.props = props || {};
        this.link = null;
    }
}

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            layouts: { lg: [] },
            components: [],
            page: {},

            anchorEl: null,
            edit: -1,
            openEditor: false,
            openPageEditor: false,
            // Update the ver number to force reconstruce the PageEditor
            pageEditorVer: 0,
            openSharing: false,
            profileList: null,
            linkAnchorEl: null,
        };


        this.profileId = this.props.match.params.id;
        this.shareToken = null;
    }

    getProfiles() {

        const auth_token = localStorage.LoginToken;
        //console.log(auth_token);

        const content = {
            userid: localStorage.user_id,
        }

        // Check authentication with the server
        fetch(API_END_POINT + "/profile/get", {
            body: JSON.stringify(content), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // including cookie //include, same-origin, *omit
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'token': auth_token,
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(
                (response) => {
                    //console.log("response: ",response);
                    if (response.ok) {
                        response.json().then(data => {
                            //console.log(data);
                            this.setState({
                                profileList: data.profile.map((v) => { return { id: v.id, title: v.url || "(Untitled)" } }),
                            })
                        })
                    }
                    else {
                        //alert("Unable to Login.");
                        response.json().then(error => {
                            console.log(error);
                        }).catch(error => {
                            console.error(error);
                            //alert("Network Error.");
                        });
                    }
                }
            )
            .catch(error => {
                console.error(error);
                //alert("Network Error.");
            });
    }

    getProfile = () => {

        const auth_token = localStorage.LoginToken;
        //console.log(auth_token);

        const content = {
            profileid: this.profileId,
        }

        // Check authentication with the server
        fetch(API_END_POINT + "/profile/get", {
            body: JSON.stringify(content), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // including cookie //include, same-origin, *omit
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'token': auth_token,
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(
                (response) => {
                    //console.log("response: ",response);
                    if (response.ok) {
                        response.json().then(data => {
                            //console.log(data);
                            let components = data.profile.html.components || [];
                            // Test if components is an array
                            if (!components.map) components = [];
                            this.setState({
                                title: data.profile.url,
                                layouts: data.profile.html.layouts,
                                components: components,
                                page: data.profile.html.page || {},
                                pageEditorVer: this.state.pageEditorVer + 1,
                            });
                        })
                    }
                    else {
                        //alert("Unable to Login.");
                        response.json().then(error => {
                            console.log(error);
                        }).catch(error => {
                            console.error(error);
                            //alert("Network Error.");
                        });
                    }
                }
            )
            .catch(error => {
                console.error(error);
                //alert("Network Error.");
            });

        //event.preventDefault();
    }

    updateProfile = () => {

        const auth_token = localStorage.LoginToken;
        //console.log(auth_token);

        const content = {
            id: this.profileId,
            html: {
                components: this.state.components,
                layouts: this.state.layouts,
                page: this.state.page,
            },
            url: this.state.title,
        }

        // Check authentication with the server
        fetch(API_END_POINT + "/profile/update", {
            body: JSON.stringify(content), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // including cookie //include, same-origin, *omit
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'token': auth_token,
            },
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(
                (response) => {
                    //console.log("response: ",response);
                    if (response.ok) {
                        response.json().then(data => {
                            console.log(data);
                        })
                    }
                    else {
                        //alert("Unable to Login.");
                        response.json().then(error => {
                            console.log(error);
                        }).catch(error => {
                            console.error(error);
                            //alert("Network Error.");
                        });
                    }
                }
            )
            .catch(error => {
                console.error(error);
                //alert("Network Error.");
            });

        //event.preventDefault();
    }

    

    componentDidMount() {
        //this.newComponent("");
        this.getProfile();
        this.getProfiles();
    }

    /**
     * Component related functions
     **/

    newComponent = (type) => {

        let component = new Component(type);

        let layout = {
            i: component.key,
            x: 0, //(this.state.content.length * 2) % (this.state.cols || 12),
            y: Infinity, // puts it at the bottom
            w: Infinity,
            h: 12,
            //minH: 2,
        }

        const { components, layouts } = this.state;

        let newComponents = components.slice();
        newComponents.push(component);

        // IMPORTANT: Deep Clone is essential!
        let newLayouts = layouts ? {
            ...layouts,
            lg: layouts.lg ? [
                ...layouts.lg,
                layout
            ] : [layout]
        } : { lg: [layout] };

        this.setState({ components: newComponents, edit: newComponents.length - 1, layouts: newLayouts, openEditor: true, },()=>{
            // FIXME: scroll to bottom
            this.refs.content.scrollTo(0,99999);
        });
    }

    saveComponent = (props) => {
        var newComponents = this.state.components.slice();
        newComponents[this.state.edit].props = props;
        this.setState({ components: newComponents, openEditor: false });
    }

    editComponent = (index) => {
        this.setState({ edit: index, openEditor: true, });
    }

    closeEditor = (index) => {
        this.setState({ openEditor: false });
    }

    removeComponent = (index) => {
        console.log(index);
        var newContent = this.state.components.slice();
        newContent.splice(index, 1);
        this.setState({ components: newContent });
    }

    editLink = (event, index) => {
        this.setState({ edit: index, linkAnchorEl: event.currentTarget });
    }

    saveLink = (props) => {
        var newComponents = this.state.components.slice();
        newComponents[this.state.edit].link = props;
        this.setState({ components: newComponents, linkAnchorEl: null });
    }

    handleLinkMenuClose = () => {
        this.setState({ linkAnchorEl: null });
    }

    /**
     * Appbar/Component
     **/

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    /**
     * Appbar/Page
     **/

    showPageEditor = () => {
        this.setState({
            openPageEditor: true,
            pageEditorVer: this.state.pageEditorVer + 1,
        });
    }

    closePageEditor = () => {
        this.setState({ openPageEditor: false });
    }

    savePageProps = (props) => {
        this.setState({
            page: props,
            openPageEditor: false,
        });
    }

    /**
     * Appbar/Save
     **/

    save = () => {
        this.updateProfile();
    }

    /**
     * Layout related callbacks
     **/

    onBreakpointChange = (breakpoint, cols) => {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange = (layout, layouts) => {
        this.setState({ layouts: layouts });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    parseLink = link => {
        let i = this.state.profileList.find(v => v.id === link);
        return i ? i.title : "URL";
    }

    render() {
        const { classes } = this.props;
        const { title, page, pageEditorVer } = this.state;
        //const { data } = this.props.location;
        //const {data} = this.state.name;
        //console.log("props: ",this.props);
        //console.log("data: ",data);
        //console.log("classes: ",classes);

        const pageBackground = {
            backgroundImage: page.image ? `url(${page.image})` : null,
            backgroundPosition: page.position,
            backgroundRepeat: page.repeat,
            backgroundSize: page.size,
            backgroundAttachment: page.fixed ? 'fixed' : 'local',
            backgroundColor: page.color,
        }

        const spacing = page.spacing || 0;

        const spacingItem = {
            padding: spacing / 2,
        }

        const spacingLayout = {
            margin: -spacing / 2,
        }

        const spacingAction = {
            top: 10 + spacing / 2,
            right: 10 + spacing / 2,
        }

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
                            <Grid item>
                                <Tooltip title="Back to Home">
                                    <IconButton component={RouteLink} to={"/profile"} color="inherit" edge="start">
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Title shown on top of browser">
                                    <TextField
                                        //classes={{ root: classes.title }}
                                        style={{ verticalAlign: 'middle' }}
                                        variant="outlined"
                                        size="small"
                                        placeholder="Untitled"
                                        value={title}
                                        name="title"
                                        onChange={this.handleChange}
                                    />
                                </Tooltip>
                                <Tooltip title="Save">
                                    <IconButton onClick={this.save} color="primary">
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Preview">
                                    <IconButton component={RouteLink} to={`/preview/${this.profileId}`} target={"_blank"}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.margin}
                                    startIcon={<AddIcon aria-controls="fade-menu" aria-haspopup="true" />}
                                    disableElevation
                                    onClick={this.handleClick}
                                    aria-label="menu"
                                >
                                    Component
                                </Button>
                                <Button
                                    variant="outlined"
                                    className={classes.margin}
                                    startIcon={<LayersIcon />}
                                    disableElevation
                                    onClick={this.showPageEditor}
                                >
                                    Layout/Background
                                </Button>
                            </Grid>
                            <Grid item>
                                <SharingDialog profileId={this.profileId} className={classes.margin}/>
                                <Typography variant="body1" style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                                    {localStorage.email}
                                </Typography>
                                {/**TODO: clear localStorage when logout*/}
                                <Tooltip title="Logout">
                                    <IconButton component={RouteLink} to={"/"} edge="end">
                                        <ExitToAppIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Menu
                            id="fade-menu"
                            keepMounted
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                            TransitionComponent={Fade}
                        >
                            {/* Add TextArea */}
                            <MenuItem onClick={() => { this.newComponent(Type.TEXTAREA); this.handleClose() }}>Text</MenuItem>
                            {/* Add Photos */}
                            <MenuItem onClick={() => { this.newComponent(Type.PICDISPLAY); this.handleClose() }}>Picture</MenuItem>
                            {/* Add Videos */}
                            <MenuItem onClick={() => { this.newComponent(Type.VIDEODISPLAY); this.handleClose() }}>Video</MenuItem>
                            {/* Add Audios */}
                            <MenuItem onClick={this.handleClose} disabled>Audio</MenuItem>
                            {/* Add Files */}
                            <MenuItem onClick={() => { this.newComponent(Type.FILE); this.handleClose() }}>File</MenuItem>
                            {/* Add Raw HTML */}
                            <MenuItem title="Add Raw HTML" onClick={() => { this.newComponent(Type.HTML); this.handleClose() }}>HTML</MenuItem>
                            <Divider/>
                            {/* Add Personal Info */}
                            <MenuItem onClick={() => { this.newComponent(Type.PERSONAL_INFO); this.handleClose() }}>Personal Information</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                {/* Content */}
                <main className={classes.content} style={pageBackground} ref="content">
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" fixed className={classes.container}>
                        <div style={spacingLayout} spacing={page.spacing}>
                            <ResponsiveReactGridLayout
                                key={page.spacing}
                                //TODO: Do we need to support different resolution?
                                breakpoints={{ lg: 0 }}
                                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                                rowHeight={16}
                                margin={[0, 0]}
                                containerPadding={[0, 0]}
                                onLayoutChange={this.onLayoutChange}
                                onBreakpointChange={this.onBreakpointChange}
                                layouts={this.state.layouts || {}}>
                                {/* Components */}
                                {this.state.components.map((component, index) =>
                                    <div key={component.key} style={spacingItem}>
                                        <ParsedComponent {...component} />
                                        {/* Actions: Edit//Remove */}
                                        <div className={classes.actions} style={spacingAction}>
                                            <Tooltip title="Remove">
                                                <IconButton size="medium" onClick={() => this.removeComponent(index)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Link">
                                                <Button
                                                    startIcon={<LinkIcon />}
                                                    onClick={(event) => this.editLink(event, index)}
                                                    classes={{ root: classes.actionLinkRoot, startIcon: classes.actionLinkIcon }}
                                                >
                                                    {component.link && this.state.profileList ? <span className={classes.actionLinkText}>
                                                        {this.parseLink(component.link)}
                                                    </span> : ""}
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <IconButton size="medium" color="primary" onClick={() => this.editComponent(index)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                )}
                            </ResponsiveReactGridLayout>
                        </div>
                    </Container>
                </main>
                {/* Component Editor */}
                <ComponentEditor key={this.state.edit} open={this.state.openEditor} component={this.state.components[this.state.edit]} saveComponent={this.saveComponent} onClose={this.closeEditor} profileList={this.state.profileList}/>
                <PageEditor key={"p" + pageEditorVer} open={this.state.openPageEditor} onClose={this.closePageEditor} onSave={this.savePageProps} {...page} />
                {this.state.profileList && this.state.edit >=0 ? 
                <LinkEditor key={new Date().getTime()} open={Boolean(this.state.linkAnchorEl)}
                    onClose={this.handleLinkMenuClose}
                    onSave={this.saveLink}
                    linkList={this.state.profileList}
                    value={this.state.components[this.state.edit].link}
                    /> : null}
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Editor));