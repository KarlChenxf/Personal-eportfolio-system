import React from 'react';
import Container from '@material-ui/core/Container';
import {Link as RouteLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { API_END_POINT } from '../Config.js';
import Dialog from '@material-ui/core/Dialog';

import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';

const styles = (theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
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
});


/*function createData(name, catigory, date) {
  return { name, catigory, date };
}

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0)
];*/

const headCells = [
  { id: "id", toright: false, label: "ID" },
  { id: "url", toright: false, label: "Title" },
  //{ id: "date", toright: false, label: "Date" }
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

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.toright ? "right" : "left"}
            padding={"default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
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

    this.state = {
      profileList: [],
      pname: "",
      open: true,
      order: 'asc',
      orderBy: 'filename',
      page: 0,
      rowsPerPage: 5,
      //rows: []
    };
    console.log("profileprops: ",props);
  }

  componentDidMount() {
    this.getProfiles();
  }

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
  }

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


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value, // update the changed value
    });
  };

  /*handleClickOpen = () => {
          this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };*/

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
  
  this.props.history.push(`/edit/${id}`);
};

handleChangePage = (event, newPage) => {
  this.setState({page: newPage});
};

handleChangeRowsPerPage = (event) => {
this.setState({rowsPerPage: parseInt(event.target.value, 10), page: 0}) ; 
};


  render() {
    const { classes } = this.props;
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, ((this.state.profileList=== null) ? 0:this.state.profileList.length)- this.state.page * this.state.rowsPerPage);
    console.log("rows: ",this.state.profileList);
    return (
      <Container component="main" maxWidth="xs">

        <div>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
          >
            <div className={classes.root}>
              <Paper className={classes.tabpaper}>
                <Toolbar style={{ paddingLeft: 15, paddingRight: 20 }}>
                  <Typography
                    style={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                  >
                    My Files
                  </Typography>
                  <div>
                    <Tooltip title="Logout">
                      <IconButton component={RouteLink} to={"/"} edge="end">
                        <ExitToAppIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Toolbar>

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
                        this.state.profileList === null
                          ? 0
                          : this.state.profileList.length
                      }
                    />
                    <TableBody>
                      {this.stableSort(
                        this.state.profileList,
                        this.getComparator(this.state.order, this.state.orderBy)
                      )
                        .slice(
                          this.state.page * this.state.rowsPerPage,
                          this.state.page * this.state.rowsPerPage +
                            this.state.rowsPerPage
                        )
                        .map((row, index) => {
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) =>
                                this.handleClick(event, row.id)
                              }
                              tabIndex={-1}
                              key={row.name}
                            >
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="default"
                              >
                                {row.id}
                              </TableCell>
                              <TableCell align="left">{row.url}</TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Toolbar style={{ paddingLeft: 15, paddingRight: 20 }}>
                  <div>
                    <Tooltip title="Add file">
                      <IconButton onClick={this.newProfile}>
                        <AddBoxIcon color='action'/>
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div style={{'margin-left':'66px'}}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={
                      this.state.profileList === null
                        ? 0
                        : this.state.profileList.length
                    }
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                  </div>
                </Toolbar>
              </Paper>
            </div>
          </Dialog>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);

