import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

import paymentImage from '../../assets/payment.jpg'

//  get the stripe publish key from stripe 
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gate_Way)

const PaymentPage = () => {
  return (
    <div className=' my-20 max-w-7xl mx-auto flex gap-10 '>
      <div className=' w-full lg:w-1/2 '>
         <img src={paymentImage} alt="" />
      </div>

      <div className='  w-full lg:w-1/2 flex justify-center items-center '>
        <div className=' w-full'>
        <Elements stripe={stripePromise}>
           <CheckoutForm></CheckoutForm>
        </Elements>
        </div>
      </div>
          </div>
  );
};

export default PaymentPage;