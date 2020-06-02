import React from 'react';
import Container from '@material-ui/core/Container';
import { Link as RouteLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { API_END_POINT } from '../Config.js';
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
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardActionArea from '@material-ui/core/CardActionArea';

import { templates } from '../Template/index.js'


const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    progressroot: {
        display: 'flex',
        justifyContent: 'center',
    },
    tableroot: {
        marginTop: 32,
        width: '100%',
    },
    tabpaper: {
        width: '100%',
        marginTop: theme.spacing(2),
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
    row: {
        align: 'center',
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
    margin: {
        margin: theme.spacing(1),
    },
    templatePreview: {
        width: 144,
        height: 186,
        marginBottom: 8,
        overflow: 'hidden',
    },
});


const headCells = [
    { id: "id", label: "ID" },
    { id: "url", label: "Title" },
    //{ id: "date", label: "Date" }
];

class EnhancedTableHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
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

                    <TableCell padding={"checkbox"} align={"center"} style={{ width: 80 }}>Edit</TableCell>
                    <TableCell padding={"checkbox"} align={"center"} style={{ width: 80 }}>Delete</TableCell>
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
            profileList: null,
            //pname: "",
            order: 'asc',
            orderBy: 'filename',
            open: false,
            //deleteid: null,
            creating: false,
        };
        this.deleteid = -1;
        console.log("profileprops: ", props);
    }

    componentDidMount() {
        this.getProfiles();
    };

    getProfiles() {
        const auth_token = localStorage.LoginToken || sessionStorage.LoginToken;
        //console.log(auth_token);

        const content = {
            userid: localStorage.user_id || sessionStorage.user_id,
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
                        console.log("Profile: ", this.state.profileList);
                        //console.log("ProfileRows: ", rows) ;
                    });
                } else {
                    alert("Failed to load profiles. (" + response.status + ")");
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
                alert("Failed to load profiles. (Network Error)");
            });
    };

    newProfile = (index) => {
        const auth_token = localStorage.LoginToken || sessionStorage.LoginToken;
        //console.log(auth_token);

        const content = {
            userid: localStorage.user_id || sessionStorage.user_id,
            html: templates[index].content,
            url: templates[index].name, //this.state.pname,
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
                    alert("Failed to create profile. (" + response.status + ")");
                    response
                        .json()
                        .then((error) => {
                            console.log(error);
                        })
                        .catch((error) => {
                            console.error(error);
                            //alert("Network Error.");
                        });
                    this.setState({
                        creating: false,
                    })
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to create profiles. (Network Error)");
                this.setState({
                    creating: false,
                })
            });

        this.setState({
            creating: true,
        })
    };

    deleteProfile() {
        const auth_token = localStorage.LoginToken || sessionStorage.LoginToken;
        //console.log(auth_token);
        //console.log("deletting! ", this.deleteid);

        const content = {
            id: this.deleteid,
        };
        this.deleteid = -1;

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
                            // Do NOT reset deleteid here.
                            //this.deleteid = -1;
                            //this.setState({ deleteid: null });
                        } else { alert(data.message); }
                    });
                } else {
                    alert("Failed to delete profile. (" + response.status + ")");
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
                alert("Failed to create profile. (Network Error)");
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
        console.log("array: ", array);
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
        this.setState({ order: (isAsc ? 'desc' : 'asc'), orderBy: property });
    };


    handleClick = (event, id) => {
        if (id != null) { this.props.history.push(`/edit/${id}`); };
    };

    handleDeleteClickOpen = (event, profileid) => {
        console.log("profileid=" + profileid)
        this.deleteid = profileid;
        this.setState({ open: true, })
    };

    handleDeleteClose = () => {
        this.setState({ open: false })
    };

    handleDelete = () => {
        // Assuming item will be deleted successfully for responsiveness
        this.setState({
            profileList: this.state.profileList.filter((profile) => { return profile.id !== this.deleteid }),
            open: false
        });
        this.deleteProfile();
    }

    logout = () => {
        localStorage.clear();
        sessionStorage.clear();
    }

    render() {
        const { classes } = this.props;
        const { creating } = this.state;

        console.log("rows: ", this.state.profileList);
        return (
            <div className={classes.root}>
                {/* Appbar */}
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
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
                                    style={{ display: "inline-flex", verticalAlign: "middle", marginRight: 8 }}
                                />
                                <Typography
                                    variant="h6"
                                    style={{ display: "inline-flex", verticalAlign: "middle" }}
                                >
                                    My Profiles
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    style={{ display: "inline-flex", verticalAlign: "middle" }}
                                >
                                    {localStorage.email || sessionStorage.email}
                                </Typography>

                                <Tooltip title="Logout">
                                    <IconButton onClick={this.logout} component={RouteLink} to={"/"} edge="end">
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
                        {/* Templates */}
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                        >
                            <Grid key={-1} xs={12} item>
                                <Typography variant="subtitle1">
                                    Start a new profile {creating ? <CircularProgress style={{ height: 16, width: 16, verticalAlign: 'text-top', }} /> : null}
                                </Typography>
                            </Grid>
                            {templates.map((item, index) => (
                                <Grid key={item.name} item>
                                    <Paper className={classes.templatePreview} style={{ backgroundImage: item.preview ? `url(${item.preview})` : null, backgroundSize: 'cover' }}>
                                        <CardActionArea disabled={creating} style={{ height: '100%' }} onClick={() => this.newProfile(index)} />
                                    </Paper>
                                    <Typography variant="subtitle2">
                                        {item.name}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                        {/* Existing profiles */}
                        {// Show circular progress when loading
                            this.state.profileList === null ?
                                <div className={classes.progressroot + ' ' + classes.tableroot}>
                                    <CircularProgress />
                                </div> :
                                // Show instructions for empty profile list
                                this.state.profileList.length <= 0 ?
                                    <div className={classes.tableroot}>
                                        <Typography variant="body1" color="textSecondary">
                                            Create a new profile from templates or create an empty one.
                                        </Typography>
                                    </div> :
                                    // Show profile list
                                    <div className={classes.tableroot}>
                                        <Typography variant="subtitle1">
                                            My profiles
                                        </Typography>
                                        <Paper className={classes.tabpaper}>
                                            <TableContainer>
                                                <Table
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
                                                            //const labelId = `enhanced-table-checkbox-${index}`;
                                                            return (
                                                                <TableRow hover role="fileicon" tabIndex={-1} key={row.id}>
                                                                    <TableCell padding="checkbox" align="center">
                                                                        <DescriptionIcon color="primary" />
                                                                    </TableCell>

                                                                    <TableCell align="left">{row.url}</TableCell>
                                                                    <TableCell padding="checkbox" align="center">
                                                                        <Tooltip title="Edit" textalign="center">
                                                                            <IconButton
                                                                                key={row.id}
                                                                                onClick={(event) => this.handleClick(event, row.id)}
                                                                                edge={false}
                                                                            >
                                                                                <CreateIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <Tooltip title="Delete">
                                                                            <IconButton
                                                                                key={row.id}
                                                                                onClick={(event) => this.handleDeleteClickOpen(event, row.id)}
                                                                                edge={false}
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
                                        {/* Dialog: delete profile */}
                                        <Dialog
                                            open={this.state.open}
                                            onClose={this.handleDeleteClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            disableScrollLock
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Delete this profile?"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    This profile will be permanently deleted.
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleDeleteClose} color="inherit" autoFocus>
                                                    Cancle
                                                </Button>
                                                <Button onClick={this.handleDelete} color="secondary">
                                                    Delete
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>}
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Profile);

