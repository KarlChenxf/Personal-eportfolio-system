import React from 'react';
import Container from '@material-ui/core/Container';
import {Link as RouteLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { API_END_POINT } from '../Config.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionIcon from '@material-ui/icons/Description';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const styles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    display: 'flex',
},
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tableroot: {
    width: '100%',
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  tabpaper: {
    width: '100%',
    marginBottom: theme.spacing(0),

  },
  table: {
    minWidth: 550,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  row:{
    align:'center',
  },

toolbar: {
    //paddingRight: 24,
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
});


const headCells = [
  { id: "id", label: "ID" },
  { id: "url", label: "Title" },
  //{ id: "date", label: "Date" }
];

class EnhancedTableHead extends React.Component{
  constructor(props){
    super(props);
    this.state={
      
    };
  }

  render(){
  const { classes, order, orderBy, onRequestSort } = this.props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  //console.log("headcess: ",headCells)

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox' align='center'>
          
        </TableCell>

          <TableCell
            key={headCells[0].id}
            align={"left"}
            padding={"checkbox"}
            sortDirection={orderBy === headCells[0].id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCells[0].id}
              direction={orderBy === headCells[0].id ? order : "asc"}
              onClick={createSortHandler(headCells[0].id)}
            >
              {headCells[0].label}
              {orderBy === headCells[0].id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>

          <TableCell
            key={headCells[1].id}
            align={"left"}
            padding={"default"}
            sortDirection={orderBy === headCells[1].id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCells[1].id}
              direction={orderBy === headCells[1].id ? order : "asc"}
              onClick={createSortHandler(headCells[1].id)}
            >
              {headCells[1].label}
              {orderBy === headCells[1].id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
          
          <TableCell padding={"checkbox"} align={"center"}>Edit</TableCell>
        <TableCell padding={"checkbox"} align={"center"}>Delete</TableCell>
      </TableRow>
    </TableHead>
  );
 }
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      profileList: [],
      pname: "",
      order: 'asc',
      orderBy: 'filename',
      open: false,
      deleteid: null,
    };
    console.log("profileprops: ",props);
  }

  componentDidMount() {
    this.getProfiles();
  };

  getProfiles() {
    const auth_token = localStorage.LoginToken;
    //console.log(auth_token);

    const content = {
      userid: localStorage.user_id,
    };

    // Check authentication with the server
    fetch(API_END_POINT + "/profile/get", {
      body: JSON.stringify(content), // must match 'Content-Type' header
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // including cookie //include, same-origin, *omit
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        token: auth_token,
      },
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // *client, no-referrer
    })
      .then((response) => {
        //console.log("response: ",response);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            this.setState({
              profileList: data.profile,
              //rows: data.profile.map((row)=> [row.id,row.url]),
            });
            console.log("Profile: ", this.state.profileList) ;
            //console.log("ProfileRows: ", rows) ;
          });
        } else {
          //alert("Unable to Login.");
          response
            .json()
            .then((error) => {
              console.log(error);
            })
            .catch((error) => {
              console.error(error);
              //alert("Network Error.");
            });
        }
      })
      .catch((error) => {
        console.error(error);
        //alert("Network Error.");
      });
  };

  newProfile = () => {
    const auth_token = localStorage.LoginToken;
    //console.log(auth_token);

    const content = {
      userid: localStorage.user_id,
      html: "{}",
      url: null, //this.state.pname,
    };

    // Check authentication with the server
    fetch(API_END_POINT + "/profile/add", {
      body: JSON.stringify(content), // must match 'Content-Type' header
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // including cookie //include, same-origin, *omit
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        token: auth_token,
      },
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // *client, no-referrer
    })
      .then((response) => {
        //console.log("response: ",response);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            if (data.status === "success") {
              this.props.history.push(`/edit/${data.profile.id}`); //Jump to editor page
            } else {
              alert(data.message);
            }
          });
        } else {
          //alert("Unable to Login.");
          response
            .json()
            .then((error) => {
              console.log(error);
            })
            .catch((error) => {
              console.error(error);
              //alert("Network Error.");
            });
        }
      })
      .catch((error) => {
        console.error(error);
        //alert("Network Error.");
      });
  };

  deleteProfile() {
    const auth_token = localStorage.LoginToken;
    //console.log(auth_token);
    console.log("deletting! ", this.state.deleteid);

    const content = {
      id: this.state.deleteid,

    };

    // Check authentication with the server
    fetch(API_END_POINT + "/profile/delete", {
      body: JSON.stringify(content), // must match 'Content-Type' header
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // including cookie //include, same-origin, *omit
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        token: auth_token,
      },
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // *client, no-referrer
    })
      .then((response) => {
        //console.log("response: ",response);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            if (data.status === "success") {
              //alert("delete success!");
              this.setState({deleteid: null});

            } else {alert(data.message);}
          });
        } else {
          //alert("Unable to Login.");
          response
            .json()
            .then((error) => {
              console.log(error);
            })
            .catch((error) => {
              console.error(error);
              //alert("Network Error.");
            });
        }
      })
      .catch((error) => {
        console.error(error);
        //alert("Network Error.");
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value, // update the changed value
    });
  };

  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  };

  stableSort(array, comparator) {
    console.log("array: ",array);
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  handleRequestSort = (event, property) => {
      const isAsc = this.state.orderBy === property && this.state.order === 'asc';
      this.setState({order: (isAsc?'desc' : 'asc'), orderBy: property });
    };


  handleClick = (event, id) => {
    if(id!=null){this.props.history.push(`/edit/${id}`);};
    
  };

  handleDeleteClickOpen = (event,profileid) => {
    this.setState({open:true,deleteid:profileid})
  };

  handleDeleteClose = () => {
    this.setState({open:false})
  };

  handleDelete = ()=>{
    let deleteid = this.state.deleteid;
    this.setState({
      profileList: this.state.profileList.filter(function(profile){return profile.id!==deleteid}),
      open: false
    });
    this.deleteProfile();

  }


  render() {
    const { classes } = this.props;

    console.log("rows: ",this.state.profileList);
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
                <DescriptionIcon
                  fontSize="large"
                  color="primary"
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                />
                <Typography
                  variant="h6"
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                >
                  My Profiles
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  startIcon={
                    <AddIcon aria-controls="fade-menu" aria-haspopup="true" />
                  }
                  disableElevation
                  onClick={this.newProfile}
                  aria-label="menu"
                  style={{ marginLeft: "100px" }}
                >
                  empty profile
                </Button>
                <Button
                  variant="outlined"
                  className={classes.margin}
                  startIcon={<LibraryAddIcon />}
                  disableElevation
                  onClick={this.showPageEditor}
                >
                  template profile
                </Button>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                >
                  {localStorage.email}
                </Typography>

                <Tooltip title="Logout">
                  <IconButton component={RouteLink} to={"/"} edge="end">
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* Content */}
        <main className={classes.content} ref="content">
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" fixed className={classes.container}>
            <div className={classes.tableroot}>
              <Paper className={classes.tabpaper}>
                <TableContainer>
                  <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                  >
                    <EnhancedTableHead
                      classes={classes}
                      order={this.state.order}
                      orderBy={this.state.orderBy}
                      onRequestSort={this.handleRequestSort}
                      rowCount={
                        this.state.profileList === null ? 0 : this.state.profileList.length
                      }
                    />
                    <TableBody>
                      {this.stableSort(
                        this.state.profileList,
                        this.getComparator(this.state.order, this.state.orderBy)
                      ).map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow hover role="fileicon" tabIndex={-1}>
                            <TableCell padding="checkbox" align="center">
                              <DescriptionIcon color="primary"></DescriptionIcon>
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="checkbox"
                            >
                              {row.id}
                            </TableCell>
                            <TableCell align="left">{row.url}</TableCell>
                            <TableCell padding="checkbox" align="right">
                              <Tooltip title="Edit" textAlign="center">
                                <IconButton
                                  key={row.id}
                                  onClick={(event) =>this.handleClick(event, row.id)}
                                  edge="false"
                                >
                                  <CreateIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="Delete">
                                <IconButton
                                  key={row.id}
                                  onClick={(event) =>this.handleDeleteClickOpen(event, row.id)}
                                  edge="false"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <Dialog
                open={this.state.open}
                onClose={this.handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete Profile?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This profile will be permanently deleted.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDeleteClose} color="inherit">
                    Cancle
                  </Button>
                  <Button onClick={this.handleDelete}color="secondary"autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
