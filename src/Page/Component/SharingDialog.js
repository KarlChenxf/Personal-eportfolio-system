import React, { Fragment, useRef } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ShareIcon from '@material-ui/icons/Share';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import { API_END_POINT } from '../../Config.js';

const SharingDialog = React.memo(function SharingDialog(props) {
    let shardUrlInput = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [sharedgUrl, setSharedUrl] = React.useState("");
    const [toolTip, setToolTip] = React.useState(false);

    const getSharingLink = () => {

        const auth_token = localStorage.LoginToken;
        const content = {
            profileid: props.profileId,
        }


        // Check authentication with the server
        fetch(API_END_POINT + "/share/getlink", {
            body: JSON.stringify(content), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // including cookie //include, same-origin, *omit
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'token': auth_token,
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // API shows as 'GET'
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(
                (response) => {
                    //console.log("response: ",response);
                    if (response.ok) {
                        response.json().then(data => {
                            const sharedUrl = window.location.origin + '/view/' + data.sharetoken + '/' + props.profileId;
                            setSharedUrl(sharedUrl);
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

    const handleClickOpen = () => {
        if (!sharedgUrl) {
            getSharingLink();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCopy = () => {
        shardUrlInput.current.select();
        shardUrlInput.current.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
        setToolTip(true);
    };

    const handleTooltipClose = () => {
        setToolTip(false);
    }

    return (
        <Fragment>
            <Button
                variant="contained"
                color="primary"
                startIcon={<ShareIcon />}
                disableElevation
                onClick={handleClickOpen}
                className={props.className}
            >
                Share
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='sm' fullWidth>
                <DialogTitle id="form-dialog-title">Share with others</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="url">
                            Link sharing on
                        </InputLabel>
                        <OutlinedInput
                            id="url"
                            name="url"
                            type="url"
                            autoFocus
                            margin="dense"
                            labelWidth={110}
                            fullWidth
                            value={sharedgUrl}
                            inputRef={shardUrlInput}
                            endAdornment={<Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={toolTip}
                                disableFocusListener
                                //disableHoverListener
                                disableTouchListener
                                title="Copied"
                                placement="bottom"
                            >
                                <InputAdornment position="end">

                                    <Button color="primary" onClick={handleCopy}>Copy link</Button>

                                </InputAdornment>
                            </Tooltip>
                            }
                        />
                    </FormControl>
                    <DialogContentText>
                        Anyone with the link can view.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
});

export default SharingDialog;