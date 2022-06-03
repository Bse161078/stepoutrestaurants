import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import '../../App.css'
import {Form, Formik} from "formik";
import AlertMessages from '../../AlertMessages/AlertMessages';
import axios from 'axios'
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import AddCard from '../../backend/Endpoints/Stripe/AddCard';
import {stripe_key} from "../../utils/constants";

const stripePromise = loadStripe(stripe_key);

function Index(props) {
    const {open, message, messageType, setOpen, stripeId, subscribtion} = props
    const [clientSecret, setClientSecret] = useState()


    useEffect(() => {
        axios.post('http://localhost:3000/add-card-intent', {stripe_id: stripeId}).then((response) => {
            //console.log("data = ",response.data.clientSecret);
            setClientSecret(response.data.clientSecret);
        }).catch((err) => {
            console.log("err = ", err.response)
        })
    }, [])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,

    };

    const showLoader=(loader)=>{
        console.log("loader = ",loader);
    }


    return (
        <div>
            {open && <AlertMessages message={message} messageType={messageType} open={open} setOpen={setOpen}/>}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',

                    '& > :not(style)': {
                        m: 1,
                        width: '50%',
                        height: '100vh',
                        padding: '20px',
                        background: 'whitesmoke',
                        position: 'absolute',
                        borderRadius: 10,
                        borderColor: 'white'
                    },
                    marginTop: 10
                }}
            >
                <Paper elevation={3}>
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <AddCard createSubscription={props.creteSubscription} setLoading={showLoader}/>
                        </Elements>
                    )}
                </Paper>
            </Box>
        </div>
    )
}

export default Index;