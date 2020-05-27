import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouteLink } from "react-router-dom";
import { API_END_POINT } from '../Config.js';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" component={RouteLink} to="/about">
                Team 12
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = (theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?cs=srgb&dl=pexels-694740.jpg&fm=jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: theme.spacing(1),
        color: '#FFF',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            email: "",
            password: "",
            remember: false,
        };
    }

    login(event) {

        this.setState({
            loading: true,
        })

        let credentials = {
            email: this.state.email,
            password: this.state.password
        }

        // Check authentication with the server
        fetch(API_END_POINT + "/user/login", {
            body: JSON.stringify(credentials), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // including cookie //include, same-origin, *omit
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
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
                            if (data.status === "success") {
                                const storage = this.state.remember ? localStorage : sessionStorage;
                                storage.setItem('LoginToken', data.token)// store user token
                                storage.setItem('email', data.user.email)// store user email
                                storage.setItem('user_id', data.user ? data.user.id : null)// store user name
                                storage.setItem('UserName', data.user ? data.user.firstName + ' ' + data.user.lastName : "")
                                this.props.history.push("/profile") //Jump to profile list
                            } else {
                                alert(data.message);
                                this.setState({
                                    loading: false,
                                })
                            }
                        })
                    }
                    else {
                        alert("Failed to login. (" + response.status + ")");
                        response.json().then(error => {
                            console.error(error);
                        }).catch(error => {
                            console.error(error);
                        });
                        this.setState({
                            loading: false,
                        })
                    }
                }
            )
            .catch(error => {
                console.error(error);
                alert("Failed to login. (Network Error)");
                this.setState({
                    loading: false,
                })
            });

        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value, // update the changed value
        });
    }

    render() {
        const { classes } = this.props;

        return <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image}>
                <Typography component="h1" variant="h2">
                    Personal ePortfolio System
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox name="remember" value="remember" color="primary" onChange={this.handleChange} />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e) => this.login(e)}
                            disabled={this.state.loading}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/*<Link href="#" variant="body2">
                                    Forgot password?
                                </Link>*/}
                            </Grid>
                            <Grid item>
                                <Link variant="body2" component={RouteLink} to="/register">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    }
}

export default withStyles(styles)(Login);