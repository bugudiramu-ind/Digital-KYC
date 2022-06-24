import React, { Component } from 'react';

import './payy.css';

import axios from 'axios';

export default class Payy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      payment_amount: 0,
      amount: 25000,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.paymentHandler = this.paymentHandler.bind(this);
    // this.razor_payment = this.razor_payment.bind(this);
    // this.changeAmount = this.changeAmount.bind(this);

    //    this.razor = this.razor.bind(this);
  }

  componentDidMount() {
    this.setState({ resOrderID: this.props.location.state.orderid });
    console.log(this.props.location.state.orderid);
    localStorage.removeItem('shift');
    // {this.razor()}
    const script = document.createElement('script');

    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    document.body.appendChild(script);
  }
  handleChange() {
    this.setState({
      checked: !this.state.checked,
    });
  }

  razor_payment() {
    console.log('Hii');
    // this.setState({redirect: true});
  }

  // changeAmount(e) {
  //     this.setState({amount: e.target.value})
  //   }
  paymentHandler(e) {
    e.preventDefault();
    let options = {
      key: 'rzp_test_lTC2a61xb5plrG',
      order_id: this.props.location.state.orderid,
      amount: '2500000', // 2000 paise = INR 20, amount in paisa
      name: 'Intain',
      description: 'Express',
      currency: 'INR',
      // "callback_url":"http://0.0.0.0:3000/Payy",
      handler: function (response) {
        // alert(response.razorpay_signature);
        console.log('razorpay_order_id' + response.razorpay_order_id);
        console.log('razorpay_payment_id' + response.razorpay_payment_id);
        console.log('razorpay_signature' + response.razorpay_signature);

        const data = {
          custkey: localStorage.getItem('cust_key'),
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        axios(process.env.REACT_APP_FS_API_URL + 'update_payment', {
          method: 'POST',
          data: JSON.stringify(data),
          headers: {
            // 'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          console.log(res.data.message);

          if (res.status === 200) {
            alert('Payment Successful');
            // localStorage.setItem('shift', true);
            console.log('redirect');

            window.location.assign('/Plans_Billing');
            // return <Link to="/Login"></Link>
          } else {
            alert('Payment Unsuccessful');
          }
        });
      },
    };

    let rzp = new window.Razorpay(options);
    rzp.open();
    // this.setState({redirect: redir});
  }

  render() {
    // this.setState({redirect: localStorage.getItem('shift')});
    // if(localStorage.getItem('shift')){
    //     return <Redirect to={{
    //         pathname: "/Login",
    //     }} />
    // }

    return (
      <div className='payMain'>
        <div id='payHead'>
          <div className='container'>
            <h1>IN-D FS</h1>
          </div>
        </div>
        <div id='payBody' className='container row justify-content-center'>
          <div className='row justify-content-center'>
            <div id='payForm'>
              <h5>Checkout</h5>

              <form>
                <label id='name'>Amount</label>
                <input
                  name='amount'
                  value='INR 25,000'
                  className='textInput'
                  type='text'
                  placeholder=''
                  size='30'
                  disabled
                />

                <label id='name'>Validity</label>
                <input
                  name='validity'
                  value='30 days'
                  className='textInput'
                  type='text'
                  placeholder=''
                  size='30'
                  disabled
                />

                <button id='payButton' onClick={this.paymentHandler}>
                  Pay with Razorpay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      // <div>

      //     <div className="bg">
      //         <h1 className="heading">Checkout</h1>

      //                 <div className="payments-form">

      //       <p>
      //         <label htmlFor="pay_amount" className="pay_amount">
      //           Amount to be paid
      //         </label>
      //       </p>
      //       <input type='text' disabled/>
      //       <p>
      //       <button onClick={this.paymentHandler}>Pay Now</button>
      //       </p>

      //     </div></div>
      //     </div>
    );
  }
}
