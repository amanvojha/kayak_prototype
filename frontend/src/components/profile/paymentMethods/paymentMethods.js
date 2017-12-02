import React, { Component } from 'react';
import {connect} from 'react-redux';
import './paymentMethods.css';
import * as profileApis from '../../../api/profile';
import PaymentMethodComponents from './paymentMethodComponents/paymentMethodComponents'
import { Modal } from 'react-bootstrap';


class PaymentMethods extends Component {

    constructor(props){
        super(props) ;

        this.state = {
            creditCards : [] ,
            showCardModal : false , 
            cardNumber : '',
            nameOnCard : '',
            expiryDate : '',
            cvv : ''

        }

        this.showCardModal = this.showCardModal.bind(this); 
        this.hideCardModal = this.hideCardModal.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.getCreditCardsForUser = this.getCreditCardsForUser.bind(this);
    }

    getCardNumber(e){
        var cardNo = e.target.value ; 
        
        if(e.target.value.length == 4 || e.target.value.length == 11 || e.target.value.length == 18 ){
            e.target.value += " - "
        }



        if(e.target.value.length <= 25){
            this.setState({
                cardNumber : e.target.value
            })
        }
        
    }

    getNameOnCard(e){
        this.setState({
            nameOnCard : e.target.value
        })
    }

    getExpiryDate(e){
       
    if(e.target.value.length == 2 && e.target.value.indexOf("/") == -1){
            e.target.value += "/"
        }

         var mm = ( e.target.value.substring(0 , e.target.value.indexOf("/")));
         var yy = ( e.target.value.substring(e.target.value.indexOf("/") +1, e.target.value.length));

        if(e.target.value.length < 6 && (!isNaN(mm) && !isNaN(yy)    )){
            this.setState({
                expiryDate : e.target.value
            })
        }
    }

    getCvv(e){
        if(!isNaN(e.target.value) && e.target.value.length < 4){
            this.setState({
                cvv : e.target.value
            })
        }
        
        
    }

    showCardModal(){
        this.setState({showCardModal : true  })
    }

    hideCardModal(){
        this.setState({showCardModal : false  })
    }

    saveCard(){
        var _this = this ; 
        console.log(_this.state)
       if(_this.state.cardNumber == "" || _this.state.cvv == "" || _this.state.nameOnCard == ""  || _this.state.expiryDate == ""){
        alert("Invalid Card Details");
        return ;
       }


       var _obj = {
            cardNumber : _this.state.cardNumber ,
            cvv : _this.state.cvv , 
            nameOnCard : _this.state.nameOnCard ,
            expiryDate : _this.state.expiryDate
        }
       
       profileApis.addCreditCard(_obj, function(err , response){
            if(!err){
                response.then(res => {
                    if(res.status == 200){
                        console.log("Successful");

                        _this.setState({ cardNumber : '',
                                        nameOnCard : '',
                                        expiryDate : '',
                                        cvv : '' ,
                                        showCardModal : false
                                      })

                        _this.getCreditCardsForUser() ; 

                    }
                })
            }
       })

    }

    componentDidMount(){
        this.getCreditCardsForUser();
    }


    getCreditCardsForUser(){
        var _this = this ; 
        profileApis.getCreditCards(function(error, response){
            if(error){

            } else {
                response.then((res) => {
                    if(res.status === 200){
                        _this.setState({
                            creditCards:res.data
                        })
                    }else{

                    }
                })
            }
        })
    }

    render() {
            
        var creditCardNo = 0 ;
        var creditCardsList = this.state.creditCards.map((card , key  ) => {
            creditCardNo += 1 ; 
            return   <PaymentMethodComponents  getCreditCardsForUser={this.getCreditCardsForUser}  card={card} key={key} number={creditCardNo}/> 
        })

        return (
            <div className="profile-panel payments-page-wrapper">
            	<div className="profile-panel-body">
            		<div className="col-xs-offset-10 add-card-button-div">
                        <button onClick={this.showCardModal} className="btn btn-primary btn-kayak">
                                <i className="fa fa-plus add-card-button" aria-hidden="true"> New card</i>
                        </button>
                    </div>


                    



                    <Modal show={this.state.showCardModal}   id="carModal" className="booking-detail-modal">
                        <Modal.Body>
                               <div className="row modal-main-div">
                                    
                                         <div className="add-new-card-div col-cs-6">
                                                    <div className="form-group row">
                                                        <div className="col-xs-12">
                                                            <input value={this.state.cardNumber} type="text" className="form-control" placeholder="Card number (XXXX XXXX XXXX XXXX)"
                                                                onChange={this.getCardNumber.bind(this)}  />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-xs-12">
                                                            <input value={this.state.nameOnCard} onChange={this.getNameOnCard.bind(this)} type="text" className="form-control" placeholder="Name on card"
                                                                  />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-xs-6">
                                                            <input value={this.state.expiryDate} onChange={this.getExpiryDate.bind(this)} type="text" className="form-control" placeholder="Expiry date (MM/YY)"
                                                                   />
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <input type="text" value={this.state.cvv} onChange={this.getCvv.bind(this)} className="form-control" placeholder="CVV"
                                                                   />
                                                        </div>
                                                    </div>
                                                    

                                         </div>
                                         <div className="add-card-confirm-button-div col-cs-6">
                                            <button onClick={this.saveCard} className="btn btn-primary btn-kayak button-add">Add card</button>
                                         </div>

                                          <div className="add-card-confirm-button-div col-cs-6">
                                            <button onClick={this.hideCardModal} className="btn btn-default button-add">Cancel</button>
                                         </div>
                                </div>

                        </Modal.Body>
                    </Modal>


                    
                    <div >
                        {creditCardsList}
                    </div>

                    
                  
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(PaymentMethods);