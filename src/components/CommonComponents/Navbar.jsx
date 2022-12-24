import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import Empty from "../../assets/images/Empty.png";
import { Link } from "react-router-dom";
import {
  Cart,
  ProductList,
  ProductListItem,
  CurrencyCartContainer,
  CurrencyDropdown,
  DropdownArrow,
  LogoContainer,
  NavMenu,
  NavContainer,
} from "../../utils/styledComponents";
import { handleCurrency } from "../../redux/feature/cartSlice";
import { connect } from "react-redux";
import CartOverlay from "../CartOverlay";
import Frame from '../../assets/images/Frame.png'
import Vector from '../../assets/images/Vector.png'

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      iscurrencyDroprdownOpen: false,
      isMenuOpen: false,
      isCartOverlayOpen: false,
    };
    
  }

  toggleDropdown = () => {
    this.setState({
      ...this.state,
      iscurrencyDroprdownOpen: !this.state.iscurrencyDroprdownOpen,
      isCartOverlayOpen: false,
    });
  }

  toggleOverlay = () => {
    this.setState({
      ...this.state,
      isCartOverlayOpen: !this.state.isCartOverlayOpen,
      iscurrencyDroprdownOpen: false,
    });
  }
  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, true);
  }

 
  handleOutsideClick = (event) => {
    if (
      this.node &&
      !this.node.contains(event.target) &&
      !this.state.iscurrencyDroprdownOpen
    ) {
      this.setState({ ...this.state, isCartOverlayOpen: false });
    }
    if (
      this.node &&
      !this.node.contains(event.target) &&
      !this.state.isCartOverlayOpen
    ) {
      this.setState({ ...this.state, iscurrencyDroprdownOpen: false });
    }
  };

  toggleMenu =() => {
    this.setState({
      ...this.state,
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  render() {
    const {
      categories,
      currencies,
      active,
      currency,
      handleCurrency,
      totalCart,
    } = this.props;

    return (
      <NavContainer>
       
        <NavMenu onClick={this.toggleMenu} isMenuOpen={this.state.isMenuOpen}>
          <div></div>
          <div></div>
        </NavMenu>
        <ProductList isMenuOpen={this.state.isMenuOpen}>
          {categories?.map((category, i) => (
            <Link to={`/${i === 0 ? "" : category}`} key={i}>
              <ProductListItem
                onClick={this.toggleMenu}
                active={active === category ? true : false}
              >
                {category}
              </ProductListItem>
            </Link>
          ))}
        </ProductList>
       
        <Link to="/">
          <LogoContainer>
            <img src={logo} alt="logo" />
          </LogoContainer>
        </Link>
  
        <CurrencyCartContainer ref={(node) => (this.node = node)}>
          <div className="content">
            {this.state.iscurrencyDroprdownOpen && (
              <div ref={(node) => (this.node = node)}>
                <CurrencyDropdown>
                  <ul>
                    {currencies.map(({ label, symbol }) => (
                      <li key={symbol} onClick={() => handleCurrency(symbol)}>
                        {symbol} {label}
                      </li>
                    ))}
                  </ul>
                </CurrencyDropdown>
              </div>
            )}
            <p onClick={this.toggleDropdown}>
              {currency}
              <DropdownArrow
                isOpen={this.state.iscurrencyDroprdownOpen}
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
               
                <path
                  d="M1 3.5L4 0.5L7 3.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </DropdownArrow>
            </p>
            <Cart count={totalCart} onClick={this.toggleOverlay}>
              <img src={Empty} alt="" />
            </Cart>
          </div>
         
          {this.state.isCartOverlayOpen && (
            <div ref={(node) => (this.node = node)}>
              <CartOverlay count={totalCart} toggle={this.toggleOverlay} />
            </div>
          )}
        </CurrencyCartContainer>
      </NavContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    totalCart: state.totalCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCurrency: (symbol) => dispatch(handleCurrency(symbol)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
