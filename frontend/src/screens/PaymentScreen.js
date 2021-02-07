import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
  console.log('payment page');

  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    history.push(`/shipping`);
  }

  const dispatch = useDispatch();

  // Component level state
  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const submitHandler = (e) => {
    e.preventDefault();

    // dispatch save shipping address
    dispatch(savePaymentMethod(paymentMethod));

    // Redirect to payment page
    history.push(`/placeorder`);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} step3={true} />
      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='Paypal or Credit Card'
              id='Paypal'
              name='paymentMethod'
              value='Paypal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled={true}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='outline-secondary'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
