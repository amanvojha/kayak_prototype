import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './filters.css'
import CarFilters from './carFilters/carFilters';
import HotelFilters from './hotelFilters/hotelFilters';

class Filters extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            category : this.props.match.params.category
        }
    }

    render() {
        return (
      		<div className="filters-content">
              <div className="title-section">
      				<span className="title">Filters</span>
      			</div>
                {
                    this.state.category === "cars" ? (
                        <CarFilters applyFilters={this.props.applyFilters}/>
                    ) : this.state.category === "flights" ? (
                        <div></div>
                    ) : (
                        <HotelFilters applyFilters={this.props.applyFilters}></HotelFilters>
                    )
                }
      		</div>
		);
  	}
}

export default withRouter(props => <Filters {...props}/>);
