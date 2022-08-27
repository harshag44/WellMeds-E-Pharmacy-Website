import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core"
import { postData, ServerURL } from "../FetchNodeServices"
// import { Divider } from '@material-ui/core';
// import MenuItem from '@mui/material/MenuItem';
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import Header from "./Header"
import Footer from "./Footer"
import CartButton from './CartButton';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
    root: {

        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    subdiv: {

        padding: 15,
        width: 230,
        marginTop: 50,
        height: 300,
        border: '0.5px solid #95a5a6',
        borderRadius: 2,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
})

// var settings = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 1500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     //autoplay: true,
//     //autoplaySpeed: 2000,
// };
// var bannersettings = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 1500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
// };

export default function ProductList(props) {

    const classes = useStyles();
    var navigate = useNavigate()
    console.log("navigate", navigate)
    var location = useLocation()
    console.log("LOcation", location)

    // var categoriesSlider = createRef()
    // var brandSlider = createRef()
    // const [category, setCategory] = useState([])
    // const [brand, setBrand] = React.useState([])
    // const [banner, setBanner] = React.useState([])
    // const [subcategory, setSubCategory] = React.useState([])
    const [products, setProducts] = React.useState([])
    const [refresh, setRefresh] = React.useState(false)
    var dispatch = useDispatch()


    const fetchAllProducts = async () => {
        var result = await postData('products/displayallproductsbycategoryid', { categoryid: location.state.category.categoryid })
        setProducts(result.result)

    }


    const showProducts = () => {
        return products.map((item, index) => {
            return (
                <div>
                    <div className={classes.subdiv}>

                        <div style={{ padding: 10 }}>
                            <img onClick={() => navigate("/productview", { state: { product: item } })} src={`${ServerURL}/images/${item.picture}`} style={{ width: 150, height: 150 }} alt="" />
                        </div>
                        <div style={{ width: 240, fontFamily: 'Sarabun', fontWeight: 500, display: 'flex', justifyContent: 'left' }}>
                            {item.productname}
                        </div>

                        <div style={{ width: 240, fontFamily: 'Sarabun', fontWeight: 500, display: 'flex', justifyContent: 'left' }}>
                            {(item.price > item.offerprice) ? <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>Price: &#8377; {item.offerprice}  <s style={{ color: '#ff4757' }}>&#8377; {item.price}</s> </div>
                                <div style={{ color: '#2ed573' }}>You Save:&#8377; {item.price - item.offerprice} </div>
                            </div> : <div style={{ color: '#2ed573' }}>Price: &#8377; {item.offerprice}  </div>}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
                            <CartButton onChange={(value) => handleQtyChange(value, item)} />
                        </div>

                    </div>
                </div>

            )

        })

    }


    const handleQtyChange = (value, item) => {
        item['qty'] = value
        if (value > 0) {
            dispatch({ type: 'ADD_PRODUCT', payload: [item.productid, item] })

        }
        else {
            dispatch({ type: 'DEL_PRODUCT', payload: [item.productid] })
        }

        setRefresh(!refresh)
    }


    useEffect(function () {
        fetchAllProducts()
    }, [])

    return (<div>
        <Header style={{ width: '100%' }} />
        {/*/////////Products/////////*/}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'Sarabun', fontSize: 40, fontWeight: 'bold', marginTop: 20 }}>{location.state.category.categoryname}</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {showProducts()}
        </div>

        {/*/////////////////////////////////////*/}
        <Footer />

    </div>)
}
