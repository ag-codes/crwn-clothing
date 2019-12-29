import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckOutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_4kW977k7WdzpzexBIPw1C6PG00wj09ijeC';
    
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful');
        }).catch(error => {
            console.log('Payment error: ' + JSON.parse(error));
            alert('Payment unsuccessful. Please make sure you use the provided credit card.');
        });
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckOutButton;