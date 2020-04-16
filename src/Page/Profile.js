import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route, Link as RouteLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { API_END_POINT } from '../Config.js';

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileList: null,
            pname: "",
        };
    }

    componentDidMount() {
        this.getProfiles();
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
                            console.log(data);
                            this.setState({
                                profileList: data.profile,
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

    newProfile = () => {

        const auth_token = localStorage.LoginToken;
        //console.log(auth_token);

        const content = {
            userid: localStorage.user_id,
            html: "{}",
            url: this.state.pname,
        }

        // Check authentication with the server
        fetch(API_END_POINT + "/profile/add", {
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
                            console.log(data);
                            if (data.status === "success") {
                                this.props.history.push(`/edit/${data.profile.id}`)//Jump to editor page
                            } else {
                                alert(data.message);
                            }
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

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value, // update the changed value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {this.state.profileList ? this.state.profileList.map((v, i) => {
                        return <RouteLink to={`/edit/${v.id}`}>
                            <p key={v.id}>{v.id + ". Title: " + v.url}</p>
                        </RouteLink>
                    }) : "Loading..."}

                    <TextField
                        variant="outlined"
                        required
                        name="pname"
                        label="Name"
                        type="text"
                        id="pname"
                        value={this.state.pname}
                        onChange={this.handleChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={this.newProfile}
                    >
                        Create new page
                    </Button>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(Profile);