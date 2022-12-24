import React, { Component } from "react";
import { Link } from "react-router-dom";
import {ErrorPageContainer} from '../utils/styledComponents'

class ErrorPage extends Component {
  render() {
    return (
      <ErrorPageContainer>
        <div>
          <p>404</p>
          <p>Oh No! There has been an Error</p>
          <Link to="/">Back to home</Link>
        </div>
      </ErrorPageContainer>
    );
  }
}

export default ErrorPage;

