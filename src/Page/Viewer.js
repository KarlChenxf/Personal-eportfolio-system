import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import { Link as RouteLink } from "react-router-dom";
import { withRouter } from 'react-router';

import { WidthProvider, Responsive } from "react-grid-layout";
import '../css/react-grid-layout.css'
import '../css/react-resizable.css';

import { ParsedComponent } from '../Util/JsonToReact.js'
import { API_END_POINT } from '../Config.js';

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
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    a: {
        textDecoration: 'none',
    }
}));

class Viewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: null,
            layouts: { lg: [] },
            components: [],
            page: {},
        };
    }

    getProfile = () => {

        this.profileId = this.props.match.params.id;

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
                            this.setState({
                                title: data.profile.url,
                                layouts: data.profile.html.layouts,
                                components: data.profile.html.components || [],
                                page: data.profile.html.page || {},
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

    getSharedProfile = () => {

        this.token = this.props.match.params.token;
        this.profileId = this.props.match.params.id;

        const content = {
            token: this.token,
            profileid: this.profileId,
        }

        // Check authentication with the server
        fetch(API_END_POINT + "/share/getprofile", {
            body: JSON.stringify(content), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // including cookie //include, same-origin, *omit
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
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
                                title: data.profile.url,
                                layouts: data.profile.html.layouts,
                                components: data.profile.html.components || [],
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

    componentDidMount() {
        this.token ? this.getSharedProfile() : this.getProfile();
    }

    /**
     * Refresh page when URL changed
     **/
    componentDidUpdate(prevProps) {
        if (this.props.match.params.token !== prevProps.match.params.token || this.props.match.params.id !== prevProps.match.params.id) {
            this.token ? this.getSharedProfile() : this.getProfile();
        }
      }

    /**
     * Layout related callbacks
     **/
    /*onBreakpointChange = (breakpoint, cols) => {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }*/

    render() {
        const { classes } = this.props;
        const { title, page } = this.state;
        //const { data } = this.props.location;
        //const {data} = this.state.name;
        //console.log("props: ",this.props);
        //console.log("data: ",data);
        //console.log("classes: ",classes);

        if(title) document.title = title;

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

        return (
            <div className={classes.root}>
                <CssBaseline />
                {/* Content */}
                <main className={classes.content} style={pageBackground}>
                    <Container maxWidth="lg" fixed className={classes.container}>
                        <div style={spacingLayout} spacing={page.spacing}>
                            <ResponsiveReactGridLayout
                                key={page.spacing}
                                //TODO: Do we need to support different resolution?
                                breakpoints={{lg: 0}}
                                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                                rowHeight={16}
                                margin={[0, 0]}
                                containerPadding={[0, 0]}
                                //onBreakpointChange={this.onBreakpointChange}
                                layouts={this.state.layouts || {}}
                                isDraggable={false}
                                isResizable={false}>
                                {/* Components */}
                                {this.state.components.map((component) =>
                                    <div key={component.key} style={spacingItem}>
                                        {component.link ? <RouteLink to={`./${component.link}`} className={classes.a}>
                                            <ParsedComponent {...component} />
                                        </RouteLink> : <ParsedComponent {...component} />}
                                    </div>
                                )}
                            </ResponsiveReactGridLayout>
                        </div>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Viewer));