import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { Grid, TextField, Button, Select} from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import Swal from "sweetalert2";
import { postDataImage, getData, postData } from "../FetchNodeServices";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
// import DisplayAllProducts from './DisplayAllProducts';

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    subdiv: {
        background: "#7ed6df",
        padding: 20,
        width: 700,
        marginTop: 50,
    },
});
const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "1.5px solid #FFF",
            borderRadius: 0,
        },
        "&:hover fieldset": {
            borderColor: "#FFF",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#FFF",
        },
    },
});

export default function ProductImages() {
    const classes = useStyles();
    const [Files, setFiles] = useState([])
    const [categoryId, setCategoryId] = React.useState("");
    const [subcategoryId, setSubcategoryId] = React.useState("");
    const [brandId, setBrandId] = React.useState("");
    const [productId, setProductId] = useState("");
    // const [image, setImage] = useState({ bytes: "", filename: "/image.png" });
    const [list, setList] = useState([]);
    const [subCategoryList, setSubcategoryList] = useState([]);
    const [brandlist, setBrandList] = useState([]);
    const [productlist, setproductList] = useState([]);


    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
        fetchSubcategories(event.target.value);
    };

    const fetchCategories = async () => {
        var result = await getData("categories/displayallcategories");
        setList(result.result);
    };
    useEffect(function () {
        fetchCategories();
    }, []);

    const fillCategory = () => {
        return list.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
        });
    };

    const handleSubCategoryChange = (event) => {
        setSubcategoryId(event.target.value);
        fetchBrands(event.target.value);
    };

    const fetchSubcategories = async (cid) => {
        var result = await postData("subcategories/displaysubcategory", { categoryid: cid });
        setSubcategoryList(result.result);
    };

    const fillSubcategory = () => {
        return subCategoryList.map((item) => {
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>;
        });
    };


    // const clearValues = () => {
    //     setCategoryId("")
    // }
    const handleBrandChange = (event) => {
        setBrandId(event.target.value);
        fetchAllProducts(event.target.value)
    };

    const fetchAllProducts = async (bid) => {
        var result = await postData('products/displayproductsbybrandandsubcategory', { brandid: bid, subcategoryid: subcategoryId })
        setproductList(result.result)

    }
    const fillProducts = () => {
        return productlist.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
        });
    };

    const handleProductChange = (event) => {
        setProductId(event.target.value);

    };


    const fetchBrands = async (scid) => {
        var result = await postData("brands/displaybrands", { subcategoryid: scid });
        setBrandList(result.result);
    };
    useEffect(function () {
        fetchBrands();
    }, []);

    const fillBrands = () => {
        return brandlist.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
        });
    };

    // const handleImageChange = (event) => {
    //     setImage({
    //         bytes: event.target.files[0],
    //         filename: URL.createObjectURL(event.target.files[0]),
    //     });
    // };

    const Input = styled("input")({
        display: "none",
    });

    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append("categoryid", categoryId);
        formData.append("subcategoryid", subcategoryId);
        formData.append("brandid", brandId);
        formData.append("productid", productId);
        Files.map((file, index) => {
            formData.append("images" + index, file)
        })
        var result = await postDataImage("productimages/saveproductimages", formData);
        if (result.result) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Product has been saved",
                showConfirmButton: false,
                timer: 3000,
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "fail",
                title: "Fail to Save Product",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };




    const handleimage= (files) => {
        setFiles(files)
    }


    return (
<>
        <div className={classes.root}>
             <style jsx>
                {`
          fieldset.MuiOutlinedInput-notchedOutline {
            border-color: white !important;
          }

          svg.MuiSvgIcon-root {
            color: white !important;
          }

          div.MuiOutlinedInput-input.MuiSelect-select {
            color: #fff !important;
          }
        `}
            </style> 
            <div className={classes.subdiv} >
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>
                        Products
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Category"
                                onChange={(event) => handleCategoryChange(event)}
                            >
                                {fillCategory()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                                Sub Category
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subcategoryId}
                                label="Sub Category"
                                onChange={(event) => handleSubCategoryChange(event)}
                            >
                                {fillSubcategory()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                                Brands
                            </InputLabel>
                            <Select labelId="demo-simple-select-label" 
                            id="demo-simple-select" 
                            value={brandId} 
                            label="Brands" 
                            onChange={(event) => handleBrandChange(event)}>
                                {fillBrands()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                                Products
                            </InputLabel>
                            <Select labelId="demo-simple-select-label"
                             id="demo-simple-select" 
                             value={productId} 
                             label="Products" 
                             onChange={(event) => handleProductChange(event)}>
                                {fillProducts()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <DropzoneArea
                            acceptedFiles={['image/jpeg', 'image/png']}
                            onChange={handleimage}
                            filesLimit={6}
                            maxFileSize={2000000}
                        />                        
                    </Grid>
                           
                    <Grid item xs={6}>
                        <Button
                            onClick={() => handleSubmit()}
                            style={{
                                background: "#FFF",
                                color: "#7ed6df",
                                fontWeight: "bold",
                            }}
                            variant="contained"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            style={{
                                background: "#FFF",
                                color: "#7ed6df",
                                fontWeight: "bold",
                            }}
                            variant="contained"
                            fullWidth
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
        </>
    )
}

