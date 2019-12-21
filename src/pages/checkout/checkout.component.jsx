import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckOutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckOutButton from '../../components/stripe-button/stripe-button.component';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import {
    CheckOutPageContainer,
    CheckOutHeaderContainer,
    HeaderBlockContainer,
    TotalContainer,
    WarningContainer
} from './checkout.styles';

const CheckOutPage = ({ cartItems, total }) => (
    <CheckOutPageContainer>
        <CheckOutHeaderContainer>
            <HeaderBlockContainer>
                <span>Product</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Description</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Quantity</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Price</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Remove</span>
            </HeaderBlockContainer>
        </CheckOutHeaderContainer>
        {
            cartItems.map(cartItem => (
                <CheckOutItem cartItem={cartItem} key={cartItem.id} />
            ))
        }
        <TotalContainer>
            <span>TOTAL: ${total}</span>
        </TotalContainer>
        <WarningContainer>
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - EXP: Any future date - CVV: Any 3 digit number
        </WarningContainer>
        <StripeCheckOutButton price={total} />
    </CheckOutPageContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckOutPage);