import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleItemQuantity, removeFromCart } from "../redux/feature/cartSlice";
import {
  ActionButtonsContainer,
  CartItemsContainer,
  OverlayContainer,
  Total,
} from "../utils/styledComponents";
import CartItem from "./CartItem";

class CartOverlay extends Component {
  render() {
    const {
      cart,
      currency,
      count,
      handleItemQuantity,
      toggle,
      cartRef,
      removeFromCart,
    } = this.props;
    let total = 0;
    cart?.map(({ qty, prices }) => {
      let price = prices.find((x) => x.currency.symbol === currency);
      return (total = total + price.amount * qty);
    });
    return (
      <OverlayContainer ref={cartRef}>
        <h2>
          My Bag,{" "}
          <span>
            {count} item{count === 1 ? "" : "s"}
          </span>
        </h2>
        <CartItemsContainer overlay={true}>
          {cart.length === 0 && (
            <p className="empty">
              Your Bag is Empty! 
            </p>
          )}
          {cart?.map(
              ({
                id,
                name,
                brand,
                prices,
                qty,
                gallery,
                attributes,
                category,
                product_id
              }) => {
                let price = prices.find((x) => x.currency.symbol === currency);
                return (
                  <CartItem
                    key={id}
                    price={price}
                    id={id}
                    product_id={product_id}
                    currency={currency}
                    handleItemQuantity={handleItemQuantity}
                    name={name}
                    brand={brand}
                    qty={qty}
                    gallery={gallery}
                    attributes={attributes}
                    cart={cart}
                    overlay={true}
                    category={category}
                    removeFromCart={removeFromCart}
                    toggle={toggle}
                  />
                );
              }
            )}
        </CartItemsContainer>
        <Total>
          <p>Total</p>
          <p>
            {currency}
            {total.toFixed(2)}
          </p>
        </Total>
        <ActionButtonsContainer>
          <Link to="/cart">
            <button className="cart" onClick={toggle}>
              view bag
            </button>
          </Link>
          <button
            className="checkout"
            onClick={() => {
              toggle();
              alert("You have reached the end of the project");
            }}
          >
            checkout
          </button>
        </ActionButtonsContainer>
      </OverlayContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency,
    qtyTotal: state.qtyTotal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleItemQuantity: (data) => dispatch(handleItemQuantity(data)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
