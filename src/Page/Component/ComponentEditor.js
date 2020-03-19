import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import RawHTMLEditor from './RawHTMLEditor.js'

class ComponentEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        // Return different editor based on HTML
        // Return RawHTMLEditor if given HTML fails to match all available patterns
        return <RawHTMLEditor html={this.props.html} editComponent={this.props.editComponent}/>;
    }
}

export default (ComponentEditor);