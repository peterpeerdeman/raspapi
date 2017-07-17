import React, { Component } from 'react';
import logo from './logo.svg';
import { MuiThemeProvider } from 'material-ui/styles';
import Root from './Root';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
            <Root />
            </MuiThemeProvider>
        );
    }
}

export default App;
