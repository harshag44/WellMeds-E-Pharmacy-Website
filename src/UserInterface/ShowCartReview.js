import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Badge, Grid, TextField } from '@mui/material';
import { makeStyles } from "@material-ui/core"
import { postData, getData, ServerURL } from '../FetchNodeServices';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import CartButton from './CartButton';
import Header from "./Header"
import List from '@mui/material/List';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
import Footer from "./Footer"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import axios from 'axios';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Crimson',
        background: '#f6f6f7',
        flexDirection: 'column'

    },
    subdiv: {
        padding: 20,
        width: '80%',
        marginTop: 50,
    },
    one: {
        padding: 20,
        width: '95%',
        marginTop: 10,
        background: '#fff',
        borderRadius: '8px',
    },
    two: {
        padding: 20,
        width: '100%',
        background: '#fff',
        height: 100,
        borderRadius: '20px',
        fontFamily: 'Poppins',
        marginLeft: 20,
    },
    three: {
        borderRadius: '20px',
        padding: 20,
        marginTop: 20,
        width: '95%',
        background: '#fff',
        paddingLeft: 50,
        // height:200,
        fontFamily: 'Poppins',
        marginLeft: 20,
    },
    four: {
        textAlign: 'left',
        paddingLeft: 20,
        fontFamily: 'Poppins',
        marginLeft: 20,
    },
});
var bannersettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
};
const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '1.5px solid #000',
            borderRadius: 0
        },
        '&:hover fieldset': {
            borderColor: '#000',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#000',
        },
    },
});

let searchTimer;
export default function ShowCartReview() {
    const classes = useStyles();
    const u = useSelector(state => state.user)
    var user = Object.values(u)[0]
    var month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
    var date = new Date()
    var newdate = new Date()
    newdate.setDate(date.getDate() + 3)

    var dispatch = useDispatch()
    // const [refresh, setRefresh] = React.useState(false)
    const [banner, setBanner] = React.useState([])
    const [allAddress, setAllAddress] = useState([])
    const [address, setAddress] = React.useState('') 
    const [pincode, setPincode] = useState('')
    const [ustate, setUState] = useState('')
    const [city, setCity] = useState('')
    const [firstname, setFirstName] = useState(user.firstname)
    const [lastname, setLastName] = useState(user.lastname)
    const [emailid, setEmailid] = useState('')
    const [landmark, setLandmark] = useState('')
    const [mobileno, setMobileno] = useState(user.mobileno)
    const [dmobileno, setDMobileno] = useState('')

    var products = useSelector((state) => state.product)
    var keys = Object.keys(products).length
    var listproducts = Object.values(products)
    var navigate = useNavigate()
    var uaddress = useSelector((state) => state.user)
    var listaddress = Object.values(uaddress)[0]
    var totalamount = listproducts.reduce(calculatetotal, 0)
    var offeramount = listproducts.reduce(calculateoffer, 0)


    function calculatetotal(p, n) {
        return (p + (n.price * n.qty))
    }

    function calculateoffer(p, n) {
        return (p + (n.offerprice * n.qty))
    }

    // const handleQtyChange = (value, item) => {
    //     item['qty'] = value
    //     if (value > 0) {
    //         dispatch({ type: 'ADD_PRODUCT', payload: [item.productid, item] })

    //     }
    //     else {
    //         dispatch({ type: 'DEL_PRODUCT', payload: [item.productid] })
    //     }
    //     setRefresh(!refresh)
    // }


    const getCityAndStateFromZipcode = async (zipcode) => {
        const result = await getData('api/' + zipcode)
        if (result.status) {
            setCity(result.data.Region)
            setUState(result.data.State)
        } else {
            setCity('')
            setUState('')
        }
    }

    const debounce = (zipcode) => {
        if (searchTimer) {
            clearTimeout(searchTimer);
        }
        searchTimer = setTimeout(() => {
            getCityAndStateFromZipcode(zipcode || 1);
        }, 2000);
    };


    const handleSubmit = async () => {
        var body = { mobileno: mobileno, pincode: pincode, city: city, state: ustate, firstname: firstname, lastname: lastname, emailid: emailid, address: address, landmark: landmark, dmobileno: dmobileno }
        console.log(body)
        var result = await postData('useraddress/addaddress', body)
        if (result.result) {
            fetchAddress()
        }
    }

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const list = (anchor) => (

        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 20, fontFamily: 'Poppins' }}>
                    Add Address
                </div>

                <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
                    <CssTextField label="Pincode" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} variant="standard" onChange={(event) => {
                        setPincode(event.target.value)
                        debounce(event.target.value)

                    }} fullWidth />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: 10 }}>
                    <CssTextField label="City" InputLabelProps={{ style: { color: '#000' } }} value={city} InputProps={{ readOnly: city.length ? true : false }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setCity(event.target.value)} variant="standard" />
                    <CssTextField label="State" InputLabelProps={{ style: { color: '#000' } }} value={ustate} InputProps={{ readOnly: ustate.length ? true : false }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setUState(event.target.value)} variant="standard" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
                    <CssTextField label="FIRSTNAME" InputLabelProps={{ style: { color: '#000' } }} value={firstname} inputProps={{ style: { color: "#000" } }} onChange={(event) => setFirstName(event.target.value)} variant="standard" fullWidth />
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
                    <CssTextField label="LASTNAME" InputLabelProps={{ style: { color: '#000' } }} value={lastname} inputProps={{ style: { color: "#000" } }} onChange={(event) => setLastName(event.target.value)} variant="standard" fullWidth />
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
                    <CssTextField label="EMAILID" InputLabelProps={{ style: { color: '#000' } }} value={emailid} inputProps={{ style: { color: "#000" } }} onChange={(event) => setEmailid(event.target.value)} variant="standard" fullWidth />
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
                    <CssTextField label="Address" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setAddress(event.target.value)} variant="standard" fullWidth />
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
                    <CssTextField label="Landmark" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setLandmark(event.target.value)} variant="standard" fullWidth />
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
                    <CssTextField label="PHONE NUMBER" InputLabelProps={{ style: { color: '#000' } }} InputProps={{ readOnly: true }} value={mobileno} inputProps={{ style: { color: "#000" } }} onChange={(event) => setMobileno(event.target.value)} type="tel" variant="standard" fullWidth />
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
                    <CssTextField label=" DELIVER PHONE NUMBER" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setDMobileno(event.target.value)} type="tel" variant="standard" fullWidth />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleSubmit} style={{ background: '#000' }} variant='contained' >Save Address</Button>
                </div>
            </List>
        </Box>
    );
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };



    const showCartItems = () => {
        return listproducts.map((item, index) => {
            return (<>
                <div style={{ display: 'flex', justifyContent: 'left', marginTop: 10, padding: 20 }}>
                    <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 50, height: 50 }} alt="" />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right', fontFamily: 'Poppins', marginLeft: 20, marginTop: 15, fontSize: 23 }}>
                        <div>{item.productname}</div>
                       
                    </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 17, color: '#000' }}>&#8377;  {item.offerprice > 0 ? ((item.offerprice)).toFixed(2) : (item.price).toFixed(2)} x {item.qty}</div>

                    <div style={{ fontSize: 23,fontWeight:'bold', color: 'orange' }}>&#8377;  {item.offerprice > 0 ? ((item.offerprice) * item.qty).toFixed(2) : (item.price * item.qty).toFixed(2)}</div>
                </div>
               
                <div style={{ fontSize: 16, fontFamily: 'Poppins', marginTop: 50, display: 'flex', justifyContent: 'space-between' }}>
                    Delivery between {month[date.getMonth()]} {date.getDate()}-{month[newdate.getMonth()]} {newdate.getDate()}
                  
                </div>
            </>)
        })
    }


    const fetchAddress = async () => {
        const body = { mobileno: user.mobileno }
        var result = await postData('useraddress/displayaddress',body)
        if (result.result) {
            setAllAddress(result.data)
        } else {
            setAllAddress([])
        }
    }

    const fetchAllBanners = async () => {
        var result = await getData('banner/displayallbanner')
        setBanner(result.result)

    }

    const showAllBanners = () => {
        return banner.map((item, index) => {
            return (
                <img src={`${ServerURL}/images/${item.bannerpicture}`} alt="" />
            )
        })
    }

    // const handlechange=()=>{
        
    // }

    const showAddress = () => {
        return allAddress.map((item, index) => {
            return (
                // <img src={`${ServerURL}/images/${item.bannerpicture}`} alt="" />
                <div className={classes.one} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>                                        
                    <div style={{fontSize:20,textTransform:'uppercase',color:'orangered'}}>{item.firstname} {item.lastname}</div>
                    <div style={{ textTransform: 'capitalize', fontSize: 17 }}>{item.address}, {item.landmark}</div>                   
                    {/* <div style={{ fontSize: 18 }}>Pincode: {item.pincode}</div> */}
                    <div style={{ fontSize: 20 }}>{item.deliverymobile}</div>                    
                    
                </div>
            )
        })
    }

    useEffect(function () {
        fetchAllBanners()
        fetchAddress()

    }, [])


    const handlePayment = () => {
        listaddress['totalamount'] = totalamount - offeramount

        dispatch({ type: 'ADD_USER', payload: [listaddress.mobileno, listaddress] })
        navigate("/paymentgateway")
    }


    return (
        <>
            <Header style={{ width: '100%' }} />
            <div className={classes.root}>

                <div className={classes.subdiv}>
                    <Grid container spacing={2}>

                        <Grid item xs={7}>
                            <div style={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'Poppins', }}>
                                ORDER REVIEW
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                                <div style={{ width: '100%' }}>
                                    <Slider {...bannersettings}  >
                                        {showAllBanners()}
                                    </Slider>
                                </div>
                            </div>
                            <div>           
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <div style={{ fontWeight: 'bold', fontSize: 25, marginBottom: 20 }}>SHIPPING ADDRESS</div>
                                    <Button variant="text" style={{ color: '#ef4281' }} onClick={toggleDrawer('right', true)}>+ Add new address</Button>
                                </div>                     
                                 {showAddress()}                                 
                            </div>
                            <div className={classes.one} >
                                <div style={{ fontFamily: 'Poppins' }}>
                                    PRODUCTS
                                </div>
                                {showCartItems()}
                            </div>
                        </Grid>

                        <Grid item xs={5} >
                          
                            <div className={classes.three}>
                                <div style={{ fontFamily: 'Poppins', alignItems: 'left', color: 'grey' }}>
                                    PAYMENT DETAILS
                                </div>
                                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
                                    <div>MRP Total</div><div style={{ marginLeft: 'auto', paddingLeft: 60 }}>&#8377; {totalamount}</div>
                                </div>
                                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
                                    <div>Total Amount</div><div style={{ marginLeft: 'auto', paddingLeft: 60 }}>&#8377; {offeramount}</div>
                                </div>

                                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: '#32ff7e', alignItems: 'left' }}>
                                    <div>You Save</div><div style={{ marginLeft: 'auto', paddingLeft: 60 }}>&#8377; {totalamount - offeramount}</div>
                                </div>

                                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
                                    <div>Amount Pay</div><div style={{ marginLeft: 'auto', paddingLeft: 60 }}>&#8377; {offeramount}</div>
                                </div>

                                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}></div>
                                <Button onClick={handlePayment} variant='contained' style={{ background: '#000', color: '#fff' }}> Make Payment</Button>
                            </div>


                            <div className={classes.four} style={{ fontFamily: 'Poppins', fontWeight: 'bold', color: 'grey', alignItems: 'left', fontSize: 10, marginTop: 5 }}>
                                Bestmeds is a technology platform to facilitate transaction of business. The products and services are offered for sale by the sellers. The user authorizes the delivery personnel to be his agent for delivery of the goods. For details read Terms & Conditions
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <Footer />

                <React.Fragment key={'left'}>

                    <SwipeableDrawer
                        anchor={'right'}
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                        onOpen={toggleDrawer('right', true)}
                    >
                        {list('left')}
                    </SwipeableDrawer>
                </React.Fragment>

            </div>
        </>
    )

}