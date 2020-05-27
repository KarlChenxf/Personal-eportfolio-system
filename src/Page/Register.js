import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link as RouteLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { API_END_POINT } from '../Config.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
      Team 12
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

class Register extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
      loading: false,
      fname: "",
      lname: "",
			email: "",
			password: "",
		};
  }

  register(event) {

    this.setState({
      loading:true,
    })

    let credentials = {
      firstName: this.state.fname,
      lastName: this.state.lname,
			email: this.state.email,
			password: this.state.password
    }
    
		// Check authentication with the server
		fetch(API_END_POINT + "/user/signup", {
			body: JSON.stringify(credentials), // must match 'Content-Type' header
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'include', // include, same-origin, *omit
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
					if (response.ok) {
						response.json().then(data => {
							//console.log(data);
							if (data.status === "success") {
                  // Send them to the login
                  this.props.history.push("/");
							}
							else {
                  alert(data.message);
                  this.setState({
                    loading:false,
                  })
							}
						})
					}
					else {
            alert("Failed to register. ("+response.status+")");
						response.json().then(error => {
							console.log(error);
						}).catch(error => {
              console.error(error);
            });
            this.setState({
              loading:false,
            })
					}
				}
			)
			.catch(error => {
        console.error(error);
        alert("Failed to register. (Network Error)");
        this.setState({
          loading:false,
        })
      });
      
      event.preventDefault();
  }

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value, // update the changed value
    });
  }

  render(){
    const { classes } = this.props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate autocomplete="on">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                autoFocus
                value={ this.state.fname }
                onChange={ this.handleChange }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="family-name"
                value={ this.state.lname }
                onChange={ this.handleChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={ this.state.email }
                onChange={ this.handleChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={ this.state.password }
                onChange={ this.handleChange }
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => this.register(e)}
            disabled={this.state.loading}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" component={RouteLink} to="/">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );}
}

export default withStyles(styles)(Register);