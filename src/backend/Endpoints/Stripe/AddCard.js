import React, {Fragment, useEffect, useState} from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {localUrl} from "../../../utils/constants";
export default function AddCard(props) {
    const stripe = useStripe();
    const elements = useElements();

    const [message,setMessage]=useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCardAdded, setIsCardAdded] = useState({msg: "", status: false});

    useEffect(() => {
        setIsLoading(true)
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "setup_intent_client_secret"
        );
        if (!clientSecret) {
            return;
        }

        stripe.retrieveSetupIntent(clientSecret).then(({setupIntent}) => {
            console.log("setupIntent111 = ",setupIntent)
            if(props.setSetupIntent) props.setSetupIntent(setupIntent.payment_method)
            switch (setupIntent.status) {
                case "succeeded":
                    setIsCardAdded({status: true, msg: "Success! Your payment method has been saved!"});
                    if(props.setIsPricing) props.setIsPricing(true)
                    props.createSubscription(setupIntent.payment_method);
                    setIsLoading(false)
                    localStorage.setItem("status",setupIntent.status)
                    break;
                case "processing":
                    setIsCardAdded({
                        status: false,
                        msg: "Processing payment details. We'll update you when processing is complete!",
                    });
                    setIsLoading(false)
                    break;
                case 'requires_payment_method':
                    setIsCardAdded({
                        status: false,
                        msg: "Failed to process payment details. Please try another payment method!"
                    })
                    setIsLoading(false)
                    break;
                default:
                    setIsCardAdded({status: false, msg: "Something went wrong!"})
                    setIsLoading(false)
                    break;
            }
        });
    }, [stripe]);


    useEffect(()=>{
        if(isCardAdded.status){
        }
    },[isCardAdded])

    const handleSubmit = async (e) => {

        setIsLoading(true);
        props.setLoading(true)
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            props.setLoading(false)
            return;
        }


        const {error} = await stripe.confirmSetup({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: localUrl,
            },
        });
        props.setLoading(false)

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setMessage(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }

    };

    console.log("message = ", !stripe,"   elements = ",!elements,isLoading)
    return (
        <Fragment>

            {!isCardAdded.status && isLoading ?
                <div id="payment-form" onClick={handleSubmit}>
                    <PaymentElement id="payment-element"/>
                    <button disabled={ !stripe || !elements} id="submit">
                            <span id="button-text">
                            Add Card
                            </span>
                    </button>
                    {/* Show any error or success messages */}
                    {message && <div id="payment-message">{message}</div>}
                </div>
                :
                <p style={{color:isCardAdded.status?"#20c997":'red'}} >{isCardAdded.msg}</p> }
        </Fragment>
    );
}

