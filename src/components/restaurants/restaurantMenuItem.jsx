import React, { Component } from 'react';

//TODO Make Responsive
class MenuItem extends Component {
    componentDidUpdate(){

    }

    renderVariations(){
        let sizeSelect = document.getElementById(`${this.props.Id}_size`);
        if(sizeSelect){
            sizeSelect.innerHTML = "<option>Select Size</option>";
            return _.map(this.props.variations, variant => {
                sizeSelect.innerHTML += "<option value="+ variant.price +" id="+ variant._id + ">"+ variant.size +"</option>";
            });
        }
    }

    sizeChanged(e){
        let price = e.target.options[e.target.selectedIndex].value;
        let priceLabel = document.getElementById(`${this.props.Id}_price`);
        let qty = document.getElementById(`${this.props.Id}_qty`);
        
        priceLabel.innerHTML= `$${price}`;
        qty.value = 1;
    }

    quantityChanged(){
        let qty = document.getElementById(`${this.props.Id}_qty`).value;
        let sizes = document.getElementById(`${this.props.Id}_size`);
        let cost = sizes.options[sizes.selectedIndex].value;

        if(parseInt(qty) < 0) {
            document.getElementById(`${this.props.Id}_qty`).value = 0;
        }

        if(cost !== "Select Size" && parseInt(qty) > 0){
            document.getElementById(`${this.props.Id}_price`).innerHTML = `$${cost * qty}`;
        }
    }
    
    render(){
        return (
            <div className="MenuItemContainer" id={ this.props.Id } >
                <div className="DisplayImageContainer">
                    <img className="menu-profile-picture" src="/src/static/images/noImage.jpg" alt="menu profile picture"/>
                </div>

                <div className="Menu-Information">
                    <p>Item: { this.props.name }</p>
                    <p>Description: { this.props.description }</p>
                    <label>Meal sizes:</label>
                    <select onChange={ (e) => this.sizeChanged(e) } id={ `${this.props.Id}_size` } className="form-control"></select>
                    { this.renderVariations() }
                </div>

                <div className="menu-price-info">
                    <span><input placeholder="QTY" onChange={ this.quantityChanged.bind(this) } type="number" className="qty-input" id={ `${this.props.Id}_qty` } name="quantity" /></span>
                    <h3 className="right-clear price" id={ `${this.props.Id}_price` }>--N/A--</h3>
                    <button className="btn btn-success btn-sm right-clear">Add to Cart</button>
                </div>
            </div>
        );
    }
}

export default MenuItem;