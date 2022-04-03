import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../index.css";
import Divider from '@mui/material/Divider';
function login(props) {
  return (
    <Box>
    <Grid container direction='column' spacing={10}>
       <Grid item xs={1} md ={1}>
           <Grid container direction="row" justify="center"></Grid>
       </Grid>
       <Grid item xs={12} md ={12}>
           <Paper variant="outlined">
               <Typography variant = 'h5' align="center" sx={{marginTop:2}} > 
                Login To Your Account.
               </Typography>
               <Box textAlign='center' sx={{marginTop:2}}>
               <Typography variant = 'caption'> 
               Please enter your login details.
               </Typography>
               </Box>
               <Box component="form"  >
                   <Grid container direction='row' sx={{mt:2,mb:2}} >
                   
                   <Grid item xs={4} md ={4}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid>
                   <Grid item xs={4} md ={4} sx={{mt:2}} >
                        <TextField type='email' label='Email' variant="outlined" 
                         className="inputRounded" fullWidth />
                   </Grid>
                  
                   <Grid item xs={4} md ={4}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid> 
                   <Grid item xs={4} md ={4}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid>
                   <Grid item xs={4} md ={4} sx={{mt:2}} >
                        <TextField label='Password' type='password' variant="outlined" 
                         className="inputRounded" fullWidth />
                   </Grid>
                  
                   <Grid item xs={4} md ={4}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid>   
                 
                   <Grid item xs={4} md ={4}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid>
                   <Grid item xs={4} md ={4} sx={{mt:2}} >
                   <Box textAlign='center' sx={{marginTop:2}}>
                       <Button variant='contained' size='large' 
                       style={{width:315,height:39,border:'1px solid #0AC2CC',borderRadius:20,background:'#0AC2CC',color:'white'}}
                       onClick={()=>{
                        props.setOpenAddThings(true)
                        props.setOpenLogin(false)
                    }}
                      >
                           Login
                       </Button>
                   </Box>
                   </Grid>
                  
                   <Grid item xs={4} md ={4}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid> 
                   <Grid item xs={4} md ={4}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid>
                   <Grid item xs={4} md ={4} sx={{mt:2}}>
                       <Divider/>
                   </Grid>
                   <Grid item xs={4} md ={4}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid>
                   <Grid item xs={5.5} md ={5.5}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid>
                   <Grid item xs={4} md ={4} sx={{mt:2}}>
                    <Typography variant = 'caption'>
                    Already have an account?
                   </Typography> 
                   </Grid>
                   <Grid item xs={2.5} md ={2.5}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid>
                   <Grid item xs={4} md ={4}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid> <Grid item xs={4} md ={4}>
                      
                   
                   <Box textAlign='center' sx={{marginTop:5,marginBottom:2}}>
                   <Button variant='contained' size='large' 
                   style={{width:315,height:39,border:'1px solid #0AC2CC',borderRadius:20,color:'#0AC2CC',background:'white'}} 
                   onClick={()=>{
                    props.setHomepage(false)
                    props.setOpenRegister(true)
                    props.setOpenLogin(false)
                }}
                   >
                       Register
                   </Button>
                  </Box>
                  </Grid>
                  <Grid item xs={4} md ={4}>
                       <Grid container direction="row" justify="center"></Grid>
                   </Grid>
                </Grid>
               </Box>
           </Paper>
       </Grid>
    </Grid>
</Box>
  )
}

export default login