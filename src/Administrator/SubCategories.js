import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Grid, TextField, Button, Avatar } from '@mui/material'
import { getData, postDataImage } from '../FetchNodeServices';
import Swal from 'sweetalert2'
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DisplayAllSubCategories from './DisplayAllSubCategories'


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

// const CssSelect = styled(Select)({
//     '& .MuiOutlinedInput-root': {
//         '& fieldset': {
//             border: '1.5px solid #FFF',
//             borderRadius: 0
//         },
//         '&:hover fieldset': {
//             borderColor: '#FFF',
//         },
//         '&.Mui-focused fieldset': {
//             borderColor: '#FFF',
//         },
//     },
// });
const Input = styled('input')({
    display: 'none',
});

function SubCategories(props) {
    const classes = useStyles();
    const [SubCategory, setSubCategory] = useState('')
    const [Description, setDescription] = useState('')
    const [icon, setIcon] = useState({ bytes: '', filename: '/image.png' })
    const [CategoryId, setCategoryId] = useState('')
    const [list, setList] = useState([])

    const handlechange = (event) => {
        setCategoryId(event.target.value)
    }
    const handleIconChange = (event) => {
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', CategoryId)
        formData.append('subcategoryname', SubCategory)
        formData.append('description', Description)
        formData.append('icon', icon.bytes)
        var result = await postDataImage('subcategories/savesubcategories', formData)
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
    useEffect(
        function () {
            fetchCategories()
        }, [])



    const fillcategory = () => {
        return list.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }


    const handledisplaysubcategories = () => {
        props.setViewContainer(<DisplayAllSubCategories />)
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
                        Sub Category Interface
                    </Grid>
                    <Grid item xs={6} style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                        <Button onClick={() => handledisplaysubcategories()} style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>DisplaySub Categories</Button>
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
                                onChange={handlechange}
                            >
                                {fillcategory()}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/*************sub category text*/}

                    <Grid item xs={12}>
                        <CssTextField variant="outlined" InputLabelProps={{
                            style: { color: '#FFF' },
                        }} inputProps={{ style: { color: "#FFF" } }} label="Sub Category Name" onChange={(event) => setSubCategory(event.target.value)} fullWidth />

                    </Grid>
                    {/*************description text*/}

                    <Grid item xs={12}>
                        <CssTextField variant="outlined" InputLabelProps={{
                            style: { color: '#FFF' },
                        }} inputProps={{ style: { color: "#FFF" } }} label="Description" onChange={(event) => setDescription(event.target.value)} fullWidth />

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
                            src={icon.filename}
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

export default SubCategories;
