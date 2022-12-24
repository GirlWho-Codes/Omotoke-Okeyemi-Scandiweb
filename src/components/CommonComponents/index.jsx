import React, { Component } from "react";
import Navbar from './Navbar'
import { AppContainer, MainContent } from "../../utils/styledComponents";
import { graphql } from "@apollo/client/react/hoc";
import { GET_CURRENCIES } from "../../utils/queries";

class Layout extends Component {
  render() {
    const { categories, children, active, data } = this.props;
    const currencies =
    data.currencies &&
    data.currencies.map((currency) => ({
      symbol: currency.symbol,
      label: currency.label,
    }));
    
    return (
      <AppContainer>
        <Navbar categories={categories} currencies={currencies} active={active} />
        <MainContent>{children}</MainContent>
      </AppContainer>
    );
  }
}


export default graphql(GET_CURRENCIES)(Layout);
