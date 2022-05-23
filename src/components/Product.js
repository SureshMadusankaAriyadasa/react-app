import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faTrash } from '@fortawesome/free-solid-svg-icons';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      price: "",
      productNameError: false,
      priceError: false,
      newProduct:{id: "", productName: "", price: ""},
      editStatus: false
    };
  }
  
  handleChangeProductName = event => {
    this.setState({
      productNameError: event.target.value? false: true,
      productName: event.target.value
    })
  }

  handleChangePrice = event => {
    this.setState({
      priceError: event.target.value? false: true,
      price: event.target.value
    })
  }

  productAdd = () => {
    const {newProduct} = this.state;
    this.setState({
      productNameError: this.state.productName? false : true,
      priceError: this.state.price? false : true,
    });
 
      if(!this.state.priceError && !this.state.productNameError && this.state.price>0){
        newProduct.productName = this.state.productName;
        newProduct.price = this.state.price;
        this.setState({
          newProduct  
        });

        this.props.addClickHandler(this.state.newProduct);
        this.setState({
          productName: "",
          price: ""
        })
      }
  }

  onDeleteClick = (id) =>{
    this.props.deleteClickHandler(id);
    console.log(id);
  }

  onEditClick = (prod) =>{
    const {products} = this.props;
    const editProduct = products.filter(product => product.id === prod.id);
    this.setState({
      productName: editProduct[0].productName,
      price: editProduct[0].price,
      editStatus: true,
      newProduct: prod
    })
  }

  onUpdate = () => {
    const {newProduct} = this.state;
    this.setState({
      productNameError: this.state.productName? false : true,
      priceError: this.state.price? false : true,
    });
 
      if(!this.state.priceError && !this.state.productNameError && this.state.price>0){
        newProduct.productName = this.state.productName;
        newProduct.price = this.state.price;
        this.setState({
          newProduct  
        });
        this.props.updateClickHandler(this.state.newProduct)
        this.setState({
          productName: "",
          price: "",
          editStatus: false,
        })
      }
  }

  render() {
    const {products} = this.props;
    const {productName, price} = this.state
    let total = 0;

    products.forEach(element => {
      total+=parseInt(element.price);
    });
    
    return (
      <React.Fragment>
        <h4>Total Praice = {total}</h4>
        <div className="form-group">
          <form>
            <div className="row">
              <div className="col-md-3">
                <input type="text" value={productName} className="form-control" placeholder="Add Product" onChange={this.handleChangeProductName} required />
                {this.state.productNameError? (<span style={{ color: "red",  paddingLeft: '-12px', fontSize: 'small' }}>* Required</span>) : null}
              </div>
              <div className="col-md-3">
                <input type="text" value={price} className="form-control" placeholder="Add Price" onChange={this.handleChangePrice} required />
                {this.state.priceError? <span style={{ color: "red",  paddingLeft: '-12px', fontSize: 'small' }}>* Required</span> : null}
              </div>
              <div className="col-md-1">
              {!this.state.editStatus? <button type="button" className="btn btn-primary" onClick={this.productAdd}>ADD</button> : null}
              </div>
              <div className="col-md-1">
                {this.state.editStatus? <button type="button" className="btn btn-danger" 
                onClick={() => {this.setState({editStatus: false, productName: "", price: ""})}}>Cancel</button> : null
                }
              </div>
              <div className="col-md-1">
                {this.state.editStatus? <button type="button" className="btn btn-primary" onClick={this.onUpdate}>UPDATE</button> : null}
              </div>
            </div>
          </form>
        </div>

        <div style={{paddingTop: '40px'}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{borderColor: 'inherit'}}>
              {/* <tr>
                <td>{productName}</td>
                <td>{price}</td>
                <td></td>
              </tr> */}
            {products.map(product => (
              <tr key = {product.id}>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>
                  <div className="row"  style={{textAlign: 'center'}}>
                    <div className="col-sm-6">
                      <FontAwesomeIcon icon={faPen} style={{cursor:'pointer', color:'blue'}} onClick={this.onEditClick.bind(this,product)} />
                    </div>
                    <div className="col-sm-6">
                      <FontAwesomeIcon icon={faTrash} style={{cursor:'pointer', color:'orange'}} onClick={this.onDeleteClick.bind(this,product.id)} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

      </React.Fragment>
    );
  }
}

Product.propTypes = {
  products : PropTypes.array.isRequired,
  deleteClickHandler: PropTypes.func.isRequired,
  addClickHandler: PropTypes.func.isRequired,
  updateClickHandler: PropTypes.func.isRequired
};

export default Product;
