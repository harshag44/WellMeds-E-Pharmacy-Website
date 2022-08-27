import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Grid, TextField, Button, Avatar } from '@mui/material'
import { getData, postData,postDataImage } from '../FetchNodeServices';
import Swal from 'sweetalert2'
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DisplayAllBrands from './DisplayAllBrands';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subdiv: {
        background: '#7ed6df',
        padding: 20,
        width: 700,
        marginTop: 50,

    },
});
const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '1.5px solid #FFF',
            borderRadius: 0
        },
        '&:hover fieldset': {
            borderColor: '#FFF',

        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFF',

        },

    },
});

const Input = styled('input')({
    display: 'none',
});

function Brands(props) {
    const classes = useStyles();
    // const [BrandId, setBrandId] = useState('')
    const [BrandName, setBrandName] = useState('')
    const [BrandStatus, setBrandStatus] = useState('')
    const [BrandIcon, setBrandIcon] = useState({ bytes: '', filename: '/image.png' })
    const [CategoryId, setCategoryId] = useState('')
    const [SubCategoryId, setSubCategoryId] = useState('')
    const [list, setList] = useState([])
    const [slist, setsList] = useState([])

    const handlechangecat =async (event) => {
        setCategoryId(event.target.value)
        var result = await postData('subcategories/displaysubcategory',{categoryid:event.target.value})
        setsList(result.result)
    }

    const handlechangesub = (event) => {
        setSubCategoryId(event.target.value)
    }
    const handleIconChange = (event) => {
        setBrandIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', CategoryId)
        formData.append('subcategoryid', SubCategoryId)
        formData.append('brandname',BrandName)        
        formData.append('status',BrandStatus)        
        formData.append('brandicon', BrandIcon.bytes)
        var result = await postDataImage('brands/savebrands', formData)
        if (result.result) {
            Swal.fire({
                icon: 'success',
                title: 'Your Category has been saved',
                timer: 1500
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Fail to submit Category',
                timer: 1500
            })
        }
    }


    const fetchCategories = async () => {
        var result = await getData("categories/displayallcategories")
        setList(result.result)

    }    

    const fillcategory = () => {
        return list.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fetchSubCategories = async () => {
        var result = await getData("subcategories/displaysubcategory")
        setsList(result.result)

    }
    useEffect(
        function () {
            fetchCategories()
        }, [])



    const fillsubcategory = () => {
        return slist.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }


    const handledisplaybrands = () => {
        props.setViewContainer(<DisplayAllBrands />)
    }
    return (            
        <div className={classes.root}>
            <style jsx>
                {`
        fieldset.MuiOutlinedInput-notchedOutline {
          border-color: white !important;
        }
        svg.MuiSvgIcon-root {
          color: white !important;
        }
        
        div.MuiOutlinedInput-input.MuiSelect-select{
          color:#FFF !important
        }
        
      `}
        </style>    

            <div className={classes.subdiv}>
                <Grid container spacing={2} >
                    <Grid item xs={6} style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                        Brands Interface
                    </Grid>
                    <Grid item xs={6} style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                        <Button onClick={() => handledisplaybrands()} style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Display Brands</Button>

                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <InputLabel style={{ color: '#FFF' }} id="demo-simple-select-label">Category
                            </InputLabel>
                            <Select
                                // style= {{ color: '#FFF' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={CategoryId}
                                label="Category"
                                onChange={handlechangecat}
                            >
                                {fillcategory()}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <InputLabel style={{ color: '#FFF' }} id="demo-simple-select-label">Sub Category
                            </InputLabel>
                            <Select
                                // style= {{ color: '#FFF' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={SubCategoryId}
                                label="Sub Category"
                                onChange={handlechangesub}
                            >
                                {fillsubcategory()}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                        <CssTextField variant="outlined" InputLabelProps={{
                            style: { color: '#FFF' },
                        }} inputProps={{ style: { color: "#FFF" } }} label="Brand Name" onChange={(event) => setBrandName(event.target.value)} fullWidth />

                    </Grid>

                    <Grid item xs={12}>
                     
                        <FormControl fullWidth>
                            <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label" >Brand Status </InputLabel>
                            
                        <Select 
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={BrandStatus}
                                label="Brand Status"
                            onChange={(event) => setBrandStatus(event.target.value)}
                        >
                                    <MenuItem value="Top Brands">Top Brands</MenuItem>                       
                                    <MenuItem value="Trending">Trending</MenuItem>                       
                                    <MenuItem value="Popular">Popular</MenuItem>                       
                            </Select>                            
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <label htmlFor="contained-button-file">
                            <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>
                                Upload
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                            alt="Remy Sharp"
                            src={BrandIcon.filename}
                            variant="rounded"
                            sx={{ width: 70, height: 70 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={() => handleSubmit()} style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Submit</Button>

                    </Grid>
                    <Grid item xs={6}>
                        <Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='reset' fullWidth>Reset</Button>
                    </Grid>

                </Grid>

            </div>

        </div>
    );
}

export default Brands;
