import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


const CheckoutForm = () => {
  const navigate = useNavigate()
  const [error , setError]=useState("")
  const [clientSecret , setClientSecret]=useState("")
  const [transectionID , setTransectionID]=useState("")
  const stripe =useStripe()
  const elements = useElements()
 const {user}=useAuth()
  const axiosSecure = useAxiosSecure()
const {id}=useParams()
//  console.log(id);
 const { data: course ={}} = useQuery({
   queryKey: ["singleCourseForPayment"],
   queryFn: async () => {
     const res = await axiosSecure.get(`/course/${id}`);
     //console.log(res);
     return res.data;
     
   },
 });
 const totalPrice=course?.Price
//  console.log(course);

const {mutateAsync:mutate}=useMutation({
  mutationFn:async (totalPrice) =>{
   // //console.log(userData);
       const {data}= await axiosSecure.post('/create-payment-intent',{price:totalPrice})
      //  console.log(data);
       if(data?.clientSecret){
        // console.log(data.clientSecret);
          setClientSecret(data.clientSecret);
       }
       
       return data
  },
  onSuccess:()=>{
  }
})

 useEffect(()=>{
  if(totalPrice>0){
    mutate(totalPrice)

  }
 },[mutate,totalPrice])

 
 const {mutateAsync}=useMutation({
  mutationFn:async (payment) =>{
   // //console.log(userData);
       const {data}= await axiosSecure.post(`/paid-course?id=${course._id}`,payment)
      //  console.log(data);
       if(data?.result?.insertedId){
         toast.success('Payment Successfully')
         navigate('/dashboard/myEnrollClass')
       }
       if(data?.insertedId===null){
        setTransectionID(null)
        setError('Already Paid')
      }
       return data
  },
  onSuccess:()=>{
  }
})

   const handleSubmit=async event=>{
     event.preventDefault()
     if(!stripe || !elements ){
       return
     }
     const card = elements.getElement(CardElement)
     if(card == null){
       return
     }

     const {error ,paymentMethod}= await stripe.createPaymentMethod({
      type:'card',
      card
     })
     if(error){
      console.log('payment error', error);
      setError(error.message)
     }else{
      // console.log('payment method',paymentMethod);
      setError('')
     }

    //  confirm payment 
    const {paymentIntent , error:confirmError}= await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card: card,
        billing_details:{
          email: user?.email||'anonymous',
          name: user?.displayName||'anonymous',
        }
      }

    })
    

    if(confirmError){
      // console.log('confirm error');
    }else{
      // console.log('paymentIntent',paymentIntent);
      if(paymentIntent.status==='succeeded'){
        // console.log('transectionID', paymentIntent.id);
        setTransectionID( paymentIntent.id);
        const payment ={ 
          name:user?.displayName,
          email:user?.email,
          transectionID:paymentIntent.id,
          price:totalPrice,
          image:course?.Course_Image,
          date:new Date(),
          courseId:course._id,
          title:course?.Title,
          instructor:course?.Instructor
        }
        // const res= await axiosSecure.post(`/paid-course?id=${course._id}`,payment)
        // console.log(res.data);
        // if(res.data?.result?.insertedId){
        //   navigate('/dashboard/myEnrollClass')
        // }
        // if(res.data.insertedId===null){
        //   setTransectionID(null)
        //   setError('Already Paid')
        // }
        await mutateAsync(payment)

      }
    }
   }
   return (
     <form onSubmit={handleSubmit}>
       <CardElement
           options={{
             style: {
               base: {
                 fontSize: '16px',
                 color: '#424770',
                 '::placeholder': {
                   color: '#aab7c4',
                 },
               },
               invalid: {
                 color: '#9e2146',
               },
             },
           }}
         />
         <button className=" my-5 btn btn-accent" type="submit" disabled={!stripe || !clientSecret}>
           Pay
         </button>
         <h5 className=" text-red-600">{error}</h5>
         {
          transectionID&&
         <h5 className=" text-green-600">Your Transection ID: {transectionID}</h5>
         }
     </form>
   );
};

export default CheckoutForm;