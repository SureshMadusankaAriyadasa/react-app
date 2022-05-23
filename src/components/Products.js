import React, { Component } from 'react'
import Product from './Product';

class Products extends Component {
  state = {
    products:[
      { 
        id: 1,
        productName: 'product1',
        price: 150
      },
      {
        id: 2,
        productName: 'product2',
        price: 200
      }
    ]
  };

  deleteProduct = (id) => {
    const {products} = this.state;

    const newProducts = products.filter(product => product.id !== id);

    this.setState({
      products: newProducts
    })
  }

  addProduct = (newProduct) => {
    const {products} = this.state;
    
    newProduct.id = (products[products.length-1].id) +1;
    // console.log(id,newP)
    // let newProduct = {...newP, ...id};
    const newProducts = [...products, {...newProduct}] ;
debugger
    this.setState({
      products: newProducts
    })
  }

  updateProduct = (editProduct) => {
    const {products} = this.state;
    debugger
    const newProducts = [...products.filter(product => product.id !== editProduct.id), {...editProduct}];
    this.setState({
      products: newProducts
    })
  }

  render() {
    const {products} = this.state;
    return (
      <React.Fragment>
        {/* {products.map(product => ( */}
          <Product
            // key = {product.id}
            products = {products} deleteClickHandler = {this.deleteProduct.bind(this)} 
            addClickHandler= {this.addProduct.bind(this)} updateClickHandler = {this.updateProduct.bind(this)}
          />
        {/* ))} */}
      </React.Fragment>
    );
  }
}


export default Products;
