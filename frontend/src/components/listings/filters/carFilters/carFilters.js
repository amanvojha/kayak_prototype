import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './carFilters.css';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {applyCarFilter } from '../../../../actions/car'
import {connect} from 'react-redux';

class CarFilters extends Component {

      constructor(props) {
          super(props);
          this.state = {      
                  occupants: ['2', '4' , '5' , '7' , '8' ] ,
                  luggage : [ 'YES' , 'NO'] ,
                  category : ['Standard','Premium','Full Size','Luxury','Compact SUV','Standard SUV','Intermediate SUV','Full Size SUV'] ,
                  
             };
        }





        occupantsChanged = (newoccupants) => {
          this.setState({
            occupants: newoccupants
          });

         this.props.applyCarFilter() ; 
        }

        luggageChanged = (newLuggage) => {
          this.setState({
            luggage: newLuggage
          });

         this.props.applyCarFilter() ; 
        }

        categoryChanged = (newCategory) => {
          this.setState({
            category: newCategory
          });

          this.props.applyCarFilter() ;
        }


         componentDidUpdate(prevProps, prevState) {
            console.log("XXXXXXXXXXX") ; 

            if(this.props.getUpdatedFileSuccess === false ){
                  console.log("XXXXXXXXXXXXX 2222222222222") ; 
            }
         }
  


  	render() {
           console.log("Cars " , this.state.luggage) ;
        const category = this.props.match.params.category;
		return (
      		<div className="filters-content">
      			<div className="title-section">
      				<span className="title">Filters</span>
      			</div>
      			<div className="groups-content">
      				<div className="groups-section">
                                    <div className="groups-title">
                                          Price Range
                                    </div>
                                    <div className="groups-list">
                                          <ul>
                                                <li>
                                                     
                                                </li>
                                                
                                          </ul>
                                    </div>
                              </div>

                              <div className="groups-section">
      					<div className="groups-title">
      						Luggage
      					</div>
      					<div className="groups-list">
      						<ul>
      							<li>
      								<CheckboxGroup
                                                        name="luggage"
                                                        value={this.state.luggage}
                                                        onChange={this.luggageChanged} className="CheckboxGroup">
                                                 
                                                        <label className="labelCheckBox"><Checkbox value="YES"/> YES </label>
                                                        <label className="labelCheckBox"><Checkbox value="NO"/> NO </label>
                                                      </CheckboxGroup>
                                                </li>
      							
      						</ul>
      					</div>
      				</div>
      				<div className="groups-section">
      					<div className="groups-title">
      						Capacity
      					</div>
      					<div className="groups-list">
      						<ul>
      							<li>
      								<CheckboxGroup
                                                        name="occupants"
                                                        value={this.state.occupants}
                                                        onChange={this.occupantsChanged} className="CheckboxGroup">
                                                 
                                                        <label className="labelCheckBox"><Checkbox value="2"/> 2</label>
                                                        <label className="labelCheckBox"><Checkbox value="4"/> 4</label>
                                                        <label className="labelCheckBox"><Checkbox value="5"/> 5</label>
                                                        <label className="labelCheckBox"><Checkbox value="7"/> 7</label>
                                                        <label className="labelCheckBox"><Checkbox value="8"/> 8</label>
                                                      </CheckboxGroup>
      							</li>
      						</ul>
      					</div>
      				</div>

                              <div className="groups-section">
                                    <div className="groups-title">
                                          Category
                                    </div>
                                    <div className="groups-list">
                                          
                                                      <CheckboxGroup
                                                        name="category"
                                                        value={this.state.category}
                                                        onChange={this.categoryChanged} className="CheckboxGroup">
                                                 
                                                            <ul>
                                                                  <li>
                                                                         <label className="labelCheckBox"><Checkbox value="Standard"/> Standard</label>
                                                                  </li>
                                                                  <li>
                                                                         <label className="labelCheckBox"><Checkbox value="Premium"/> Premium</label>
                                                                  </li>
                                                                  <li>
                                                                         <label className="labelCheckBox"><Checkbox value="Full Size"/> Full Size</label>
                                                                  </li>
                                                                  <li>
                                                                         <label className="labelCheckBox"><Checkbox value="Luxury"/> Luxury</label>
                                                                  </li>
                                                                  <li>
                                                                         <label className="labelCheckBox"><Checkbox value="Compact SUV"/> Compact SUV</label>
                                                                  </li>
                                                                  <li>
                                                                         <label className="labelCheckBox"><Checkbox value="Standard SUV"/> Standard SUV</label>
                                                                  </li>
                                                                  <li>
                                                                         <label className="labelCheckBox"><Checkbox value="Intermediate SUV"/> Intermediate SUC</label>
                                                                  </li>
                                                                  <li>
                                                                         <label className="labelCheckBox"><Checkbox value="Full Size SUV"/> Full Size SUV</label>
                                                                  </li>
                                                            </ul>
                                                      </CheckboxGroup>
                                                
                                    </div>
                              </div>

      			</div>
      		</div>
		);
  	}
}


function mapDispatchToProps(dispatch) {
  return {
      applyCarFilter : (payload) => dispatch(applyCarFilter(payload)) 
  }
}

function mapStateToProps(state) {
    return {
       allCars : state.carsReducer.allCars , 
       getUpdatedFileSuccess : state.carsReducer.getUpdatedFileSuccess
    } 
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(props => <CarFilters {...props}/>));
