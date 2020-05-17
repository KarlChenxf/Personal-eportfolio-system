/**
 * This page (Component) is used for both 
 * PREVIEW/id for logged user
 * and VIEW/token/id for visitor accessing through shared link
 * to ensure preview is exactly the same as what a visitor will see;
 * Only the way it fetches data differ
 * based on if a token is presented in URL;
 */

import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import { Link as RouteLink } from "react-router-dom";
import { withRouter } from 'react-router';

import { WidthProvider, Responsive } from "react-grid-layout";

import { ParsedComponent } from '../Util/JsonToReact.js'
import { API_END_POINT } from '../Config.js';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = (theme => ({
    container: {
        overflow: 'hidden',
    },
    a: {
        textDecoration: 'none',
    },
    '@global': {
        '.react-grid-layout': {
            position: 'relative'
        }
    }
}));

/**
 * Automatically warp component with different tag according to the value of 'to'
 * @param {*} to pageId (number), URL (string) or null
 */
function AutoLink(props) {
    const to = props.to;
    return (
        to ? (
            /^https?:\/\//i.test(to) ? // is external url?
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                /> :
                <RouteLink {...props} to={String(to)} />
        ) : props.children
    );
}

class Viewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: null,
            layouts: { lg: [] },
            components: [],
            page: {},
        };

        if (this.props.match.params.token)
            this.getSharedProfile();
        else
            this.getProfile();
    }

    /**
     * Fetch profile for logged in user when preview
     */
    getProfile = () => {

        const auth_token = localStorage.LoginToken;
        //console.log(auth_token);

        const content = {
            profileid: this.props.match.params.id,
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
    }

    /**
     * Fetch profile for visitor when accessed through shared link
     */
    getSharedProfile = () => {

        const content = {
            token: this.props.match.params.token,
            profileid: this.props.match.params.id,
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
    }

    /**
     * Fetch data through different methods based on if token is presented in URL
     */
    componentDidMount() {
        /*if (this.props.match.params.token)
            this.getSharedProfile();
        else
            this.getProfile();*/
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

        if (title) document.title = title;

        const pageBackground = {
            backgroundImage: page.image ? `url(${page.image})` : null,
            backgroundPosition: page.position,
            backgroundRepeat: page.repeat,
            backgroundSize: page.size,
            backgroundAttachment: page.image ? (page.fixed ? 'fixed' : 'local') : null,
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
            <Fragment>
                {/* Content */}
                <main style={pageBackground}>
                    <Container maxWidth="lg" fixed className={classes.container}>
                        <div style={spacingLayout}>
                            <ResponsiveReactGridLayout
                                key={page.spacing}
                                //TODO: Do we need to support different resolution?
                                breakpoints={{ lg: 0 }}
                                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                                rowHeight={16}
                                margin={[0, 0]}
                                containerPadding={[0, 0]}
                                //onBreakpointChange={this.onBreakpointChange}
                                layouts={this.state.layouts || {}}
                                isDraggable={false}
                                isResizable={false}
                                useCSSTransforms={false}>
                                {/* Components */}
                                {this.state.components.map((component) =>
                                    <div key={component.key} style={spacingItem}>
                                        <AutoLink to={component.link} className={classes.a}>
                                            <ParsedComponent {...component} />
                                        </AutoLink>
                                    </div>
                                )}
                            </ResponsiveReactGridLayout>
                        </div>
                    </Container>
                </main>
            </Fragment>
        );
    }
}

export default withRouter(withStyles(styles)(Viewer));