import React, { Suspense, lazy } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import Viewer from './Page/Viewer';
const PrivateBundle = lazy(() => import('./PrivateBundle'));


/**
 * Following styles are modification of CssBaseline
 * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CssBaseline/CssBaseline.js
 */
export const html = {
    WebkitFontSmoothing: 'antialiased', // Antialiasing.
    MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    // Change from `box-sizing: content-box` so that `width`
    // is not affected by `padding` or `border`.
    boxSizing: 'border-box',
};

export const body = (theme) => ({
    color: theme.palette.text.primary,
    ...theme.typography.body2,
    backgroundColor: theme.palette.background.white,
});

export const styles = (theme) => ({
    '@global': {
        html,
        '*, *::before, *::after': {
            boxSizing: 'inherit',
        },
        'strong, b': {
            fontWeight: theme.typography.fontWeightBold,
        },
        body: {
            margin: 0, // Remove the margin in all browsers.
            ...body(theme),
        },
    },
});

/**
 * Enrty of the app;
 * Viewer is packaged in main bundle so visitor could load page faster;
 * PrivateBundle including pages like Editor will only be loaded when needed.
 */
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/view/:token/:id" exact component={Viewer} />
                <Suspense fallback={null}>
                    <Route component={PrivateBundle} />
                </Suspense>
            </Switch>
        </BrowserRouter>
    );
}

export default withStyles(styles)(App);
