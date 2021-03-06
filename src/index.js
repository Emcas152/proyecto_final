import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
} from "react-router-dom";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
const theme = createMuiTheme({
    palette: {
        backgroundColor: '#242424',
        type: 'dark'
    },
});
ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
