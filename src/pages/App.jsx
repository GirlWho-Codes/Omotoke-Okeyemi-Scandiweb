import { graphql } from "@apollo/client/react/hoc";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/CommonComponents";
import Loader from "../components/Loader";
import { GET_CATEGORIES } from "../utils/queries";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";
import ProductDisplayPage from "./ProductDisplayPage";
import ProductListPage from "./ProductListPage";

class App extends Component {
  constructor() {
    super();
    this.state = { activeCategory: "" };
    
  }


  componentDidUpdate(prevProps) {
    if (prevProps.data.loading) {
      this.setState({ activeCategory: this.props.data?.categories[0].name });
    }
  }


  handleActiveCategory = (category) => {
    this.setState({ activeCategory: category });
  }

  render() {
    const { data } = this.props;
    const categories = data.categories?.map((category) => category.name);
    return (
      <BrowserRouter>
        {data.loading ? (
          <Loader />
        ) : (
          <Layout
            categories={categories}
            active={this.state.activeCategory}
          >
            <div className="main">
              <Routes>
                {this.props.data?.categories.map((category, i) => (
                  <Route
                    key={i}
                    exact
                    path={i === 0 ? "/" : `/${category.name}`}
                    element={
                      <ProductListPage
                        categoryName={category.name}
                        handleActiveCategory={this.handleActiveCategory}
                      />
                    }
                  />
                ))}
                {categories?.map((category) => (
                  <Route
                    exact
                    key={category}
                    path={`/${category}/:id`}
                    element={<ProductDisplayPage />}
                  />
                ))}

                <Route exact path="/cart" element={<Cart />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </Layout>
        )}
      </BrowserRouter>
    );
  }
}

export default graphql(GET_CATEGORIES)(App);
