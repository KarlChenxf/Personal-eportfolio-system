import React from 'react';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Link as RouteLink } from "react-router-dom";
import { withRouter } from 'react-router';
import { WidthProvider, Responsive } from "react-grid-layout";
import { ParsedComponent } from '../Util/JsonToReact.js'
import ComponentEditor from './Component/ComponentEditor.js'
import * as Type from './Component/Type.js'
import { API_END_POINT } from '../Config.js';
import PageEditor from './Component/PageEditor';
import SharingDialog from './Component/SharingDialog';
import LinkEditor from './Component/LinkEditor';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Snackbar from '@material-ui/core/Snackbar';

//import 'react-grid-layout/css/styles.css';
import '../css/react-grid-layout.css';
import 'react-resizable/css/styles.css';
import 'rc-color-picker/assets/index.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = (theme => ({
    '@global': {
        '.react-player': {
            pointerEvents: 'none',
        },
        // Used to disable draging inner content when edit
        '.disablePointerEvent': {
            pointerEvents:'none',
        }
    },
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
        overflow: 'hidden',
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
            loading: true,

            title: "",
            layouts: null,//{ lg: [] },
            components: [],
            page: {},

            anchorEl: null,
            edit: -1,
            componentEditorVer: 0,
            openEditor: false,
            openPageEditor: false,
            // Update the ver number to force reconstruce the PageEditor
            pageEditorVer: 0,
            openSharing: false,
            profileList: null,
            linkEditorVer: 0,
            linkAnchorEl: null,
            openPreview: false,
            openSnackbar: false,
        };


        this.profileId = this.props.match.params.id;
        this.shareToken = null;
        this.changedSinceLastSave = false;
        this.toPreview = false;
        this.mainRef = React.createRef();
        this.rowHeight = 16;
    }

    getProfiles() {

        const auth_token = localStorage.LoginToken || sessionStorage.LoginToken;
        //console.log(auth_token);

        const content = {
            userid: localStorage.user_id || sessionStorage.user_id,
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

        const auth_token = localStorage.LoginToken || sessionStorage.LoginToken;
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
                                loading: false,
                                title: data.profile.url,
                                layouts: data.profile.html.layouts,
                                components: components,
                                page: data.profile.html.page || {},
                                pageEditorVer: this.state.pageEditorVer + 1,
                            });

                            this.changedSinceLastSave = false;
                        })
                    }
                    else {
                        alert("Failed to load profile. (" + response.status + ")");
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
                alert("Failed to load profile. (Network Error)");
            });

        //event.preventDefault();
    }

    updateProfile = () => {

        this.setState({
            openSnackbar: "Saving ...",
        })

        const auth_token = localStorage.LoginToken || sessionStorage.LoginToken;
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
                            this.changedSinceLastSave = false;
                            this.setState({
                                openSnackbar: "Saved successfully.",
                            })
                            if(this.toPreview){
                                this.toPreview = false;
                                window.open(`/preview/${this.profileId}`, `_blank`);
                            }
                        })
                    }
                    else {
                        alert("Failed to save profile. (" + response.status + ")");
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
                alert("Failed to save profile. (Network Error)");
            });

        //event.preventDefault();
    }

    componentDidMount() {
        //this.newComponent("");
        console.log("editorcomponentMount");
        this.getProfile();
        this.getProfiles();

        this.changedSinceLastSave = false;
        //console.log("this.changedSinceLastSave="+this.changedSinceLastSave)
        //window.addEventListener("beforeunload", this.nofityUnsavedChanges);
    }

    /*componentWillUnmount() {
        window.removeEventListener('beforeunload', this.nofityUnsavedChanges);
    }

    nofityUnsavedChanges = (event) => {
        if (this.changedSinceLastSave) {
            event.preventDefault();
            return event.returnValue = 'Unasved changes';
        }
    }*/

    /**
     * Component related functions
     **/

    newComponent = (type) => {

        let component = new Component(type);

        let layout = {
            i: component.key,
            x: 0, //(this.state.content.length * 2) % (this.state.cols || 12),
            y: Math.round(this.mainRef.current.scrollTop / this.rowHeight), // try tp put it at current position
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

        this.setState({ components: newComponents, edit: newComponents.length - 1, layouts: newLayouts, openEditor: true, componentEditorVer: this.state.componentEditorVer + 1 });

        this.changedSinceLastSave = true;
    }

    saveComponent = (props) => {
        var newComponents = this.state.components.slice();
        newComponents[this.state.edit].props = props;
        this.setState({ components: newComponents, openEditor: false });

        this.changedSinceLastSave = true;
    }

    editComponent = (index) => {
        this.setState({ edit: index, openEditor: true, componentEditorVer: this.state.componentEditorVer + 1 }, () => {
            console.log(this.state.componentEditorVer)
        });
    }

    closeEditor = (index) => {
        this.setState({ openEditor: false });
    }

    removeComponent = () => {
        const index = this.state.edit;
        console.log(index);
        var newContent = this.state.components.slice();
        newContent.splice(index, 1);
        this.setState({ components: newContent, edit: -1 });
        this.handleComponentMenuClose();

        this.changedSinceLastSave = true;
    }

    editLink = (event, index) => {
        console.log(event + ',' + index)
        this.setState({ edit: index, linkAnchorEl: event.currentTarget, linkEditorVer: this.state.linkEditorVer + 1 });
    }

    saveLink = (props) => {
        var newComponents = this.state.components.slice();
        newComponents[this.state.edit].link = props;
        this.setState({ components: newComponents, linkAnchorEl: null });

        this.changedSinceLastSave = true;
    }

    handleLinkMenuClose = () => {
        this.setState({ linkAnchorEl: null });
    }

    duplicateComponent = () => {

        let component = this.state.components[this.state.edit];

        let layout = this.state.layouts.lg.find(v => { return v.i === component.key });

        let newComponent = JSON.parse(JSON.stringify(component));
        let newLayout = JSON.parse(JSON.stringify(layout));

        const key = new Date().getTime().toString(36);
        newComponent.key = key;
        newLayout.i = key;

        const { components, layouts } = this.state;

        let newComponents = components.slice();
        newComponents.push(newComponent);

        // IMPORTANT: Deep Clone is essential!
        let newLayouts = layouts ? {
            ...layouts,
            lg: layouts.lg ? [
                ...layouts.lg,
                newLayout
            ] : [newLayout]
        } : { lg: [newLayout] };

        this.handleComponentMenuClose();

        this.setState({ components: newComponents, edit: newComponents.length - 1, layouts: newLayouts, });

        this.changedSinceLastSave = true;
    }

    handleComponentMenuOpen = (event, index) => {
        this.setState({ componentMenuCloseAnchorEl: event.currentTarget, edit: index, });
    }

    handleComponentMenuClose = () => {
        this.setState({ componentMenuCloseAnchorEl: null, });
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
        }, () => window.dispatchEvent(new Event('resize')));
        // Manually trigger onWindowResize event after setting spacing
        // to force react-grid-layout remeasure the width, cause we don't own the code

        this.changedSinceLastSave = true;
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
        this.changedSinceLastSave = true;
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
        this.changedSinceLastSave = true;
    }

    parseLink = link => {
        let i = this.state.profileList.find(v => v.id === link);
        return i ? i.title : "URL";
    }

    handlePreview = () => {
        if(this.changedSinceLastSave){
            this.setState({
                openPreview: true,
            })
        }
        else {
            window.open(`/preview/${this.profileId}`, `_blank`);
        }
    }

    handlePreviewClose = () => {
        this.setState({
            openPreview: false,
        })
    }

    saveNPreview = () => {
        this.handlePreviewClose();
        this.updateProfile();
        this.toPreview = true;
    }

    previewWithoutSave = () => {
        this.handlePreviewClose();
        window.open(`/preview/${this.profileId}`, `_blank`);
    }

    handleSnackbarClose = () => {
        this.setState({
            openSnackbar: false,
        })
    }

    logout = (event) => {
        localStorage.clear();
        sessionStorage.clear();
    }

    render() {
        const { handleComponentMenuClose, removeComponent, duplicateComponent } = this;
        const { classes } = this.props;
        const { loading, title, page, pageEditorVer, componentMenuCloseAnchorEl } = this.state;
        //const { data } = this.props.location;
        //const {data} = this.state.name;
        //console.log("props: ",this.props);
        //console.log("data: ",data);
        //console.log("classes: ",classes);

        const pageBackground = {
            backgroundImage: page.image ? `url(${page.image})` : null,
            // background-position: add 64px offset for AppBar
            backgroundPosition: page.position ? page.position.replace('top', '64px') : null,
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
                                        disabled={loading}
                                    />
                                </Tooltip>
                                <Tooltip title="Save">
                                    <IconButton onClick={this.save} color="primary" disabled={loading || this.state.openSnackbar === "Saving ..."}>
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Preview">
                                    <IconButton onClick={this.handlePreview} disabled={loading || this.state.openSnackbar === "Saving ..."}>
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
                                    disabled={loading}
                                >
                                    Component
                                </Button>
                                <Button
                                    variant="outlined"
                                    className={classes.margin}
                                    startIcon={<LayersIcon />}
                                    disableElevation
                                    onClick={this.showPageEditor}
                                    disabled={loading}
                                >
                                    Layout/Background
                                </Button>
                            </Grid>
                            <Grid item>
                                <SharingDialog profileId={this.profileId} className={classes.margin} />
                                <Typography variant="body1" style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                                    {localStorage.email || sessionStorage.email}
                                </Typography>
                                <Tooltip title="Logout">
                                    <IconButton onClick={this.logout} component={RouteLink} to={"/"} edge="end">
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
                            PaperProps={{
                                style: {
                                    minWidth: '146px',
                                },
                            }}
                        >
                            {/* Add TextArea */}
                            <MenuItem onClick={() => { this.newComponent(Type.TEXTAREA); this.handleClose() }}>Text</MenuItem>
                            {/* Add Photos */}
                            <MenuItem onClick={() => { this.newComponent(Type.PICDISPLAY); this.handleClose() }}>Picture</MenuItem>
                            {/* Add Videos */}
                            <MenuItem onClick={() => { this.newComponent(Type.VIDEODISPLAY); this.handleClose() }}>Video</MenuItem>
                            {/* Add Audios */}
                            {/*<MenuItem onClick={this.handleClose} disabled>Audio</MenuItem>*/}
                            {/* Add Files */}
                            <MenuItem onClick={() => { this.newComponent(Type.FILE); this.handleClose() }}>File</MenuItem>
                            {/* Add Raw HTML */}
                            <MenuItem title="Add HTML code" onClick={() => { this.newComponent(Type.HTML); this.handleClose() }}>HTML</MenuItem>
                            <Divider />
                            {/* Add Personal Info */}
                            <MenuItem onClick={() => { this.newComponent(Type.PERSONAL_INFO); this.handleClose() }}>Avatar & Text</MenuItem>
                            {/* Add SNS information */}
                            <MenuItem onClick={() => { this.newComponent(Type.SNSDISPLAY); this.handleClose() }}>SNS</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                {/* Content */}
                <main className={classes.content} style={pageBackground} ref={this.mainRef}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" fixed className={classes.container}>
                        {loading ? <CircularProgress style={{ position: 'absolute', left: 'calc(50% - 20px)', top: 'calc(50% - 20px)', }} /> : null}
                        <div style={spacingLayout} spacing={page.spacing}>
                            <ResponsiveReactGridLayout
                                //key={page.spacing}
                                // Eliminate resizing animation on component mount.
                                measureBeforeMount={true}
                                //TODO: Do we need to support different resolution?
                                breakpoints={{ lg: 0 }}
                                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                                rowHeight={this.rowHeight}
                                margin={[0, 0]}
                                containerPadding={[0, 0]}
                                onLayoutChange={this.onLayoutChange}
                                onBreakpointChange={this.onBreakpointChange}
                                layouts={this.state.layouts || {}}>
                                {/* Components */}
                                {(this.state.components || []).map((component, index) =>
                                    <div key={component.key} style={spacingItem}>
                                        <ParsedComponent {...component} />
                                        {/* Actions: Edit//Remove */}
                                        <div className={classes.actions} style={spacingAction}>
                                            <Tooltip title="Edit">
                                                <IconButton size="medium" color="primary" onClick={() => this.editComponent(index)}>
                                                    <EditIcon fontSize="small" />
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
                                            <Tooltip title="More">
                                                <IconButton size="medium" onClick={(event) => this.handleComponentMenuOpen(event, index)}>
                                                    <MoreVertIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                )}
                            </ResponsiveReactGridLayout>
                        </div>
                    </Container>
                </main>
                <Menu
                    //anchorEl={componentMenuCloseAnchorEl}
                    //keepMounted
                    open={Boolean(componentMenuCloseAnchorEl)}
                    onClose={handleComponentMenuClose}
                    disableScrollLock
                    transformOrigin={{ vertical: 26, horizontal: 0 }}
                    anchorReference='anchorPosition'
                    anchorPosition={componentMenuCloseAnchorEl ? { left: componentMenuCloseAnchorEl.getBoundingClientRect().x, top: componentMenuCloseAnchorEl.getBoundingClientRect().y + 18 } : null}
                >
                    <MenuItem key={0} onClick={duplicateComponent}>
                        <ListItemIcon>
                            <FileCopyIcon fontSize="small" />
                        </ListItemIcon>
                        Copy
                    </MenuItem>
                    <MenuItem key={1} onClick={removeComponent}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        Remove
                    </MenuItem>
                </Menu>
                {/* Component Editor */}
                <ComponentEditor key={"ce" + this.state.componentEditorVer} open={this.state.openEditor} component={this.state.components[this.state.edit]} saveComponent={this.saveComponent} onClose={this.closeEditor} profileList={this.state.profileList} />
                <PageEditor key={"p" + pageEditorVer} open={this.state.openPageEditor} onClose={this.closePageEditor} onSave={this.savePageProps} {...page} />
                {this.state.edit >= 0 ?
                    <LinkEditor key={'l' + this.state.linkEditorVer} open={Boolean(this.state.linkAnchorEl)}
                        onClose={this.handleLinkMenuClose}
                        onSave={this.saveLink}
                        linkList={this.state.profileList}
                        value={this.state.components[this.state.edit].link}
                    /> : null}
                {/* Dialog: Save before preview */}
                <Dialog
                    open={this.state.openPreview}
                    onClose={this.handlePreviewClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth="xs"
                    disableScrollLock
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Save before preview?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.previewWithoutSave}>
                            Preview without saving
                        </Button>
                        <Button onClick={this.saveNPreview} color="primary" autoFocus>
                            Save and preview
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* Snackbar: Saved */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={Boolean(this.state.openSnackbar)}
                    autoHideDuration={3000}
                    onClose={this.handleSnackbarClose}
                    message={this.state.openSnackbar}
                />
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Editor));