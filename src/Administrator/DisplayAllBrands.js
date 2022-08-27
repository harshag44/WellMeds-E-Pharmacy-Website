import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
import { makeStyles } from '@mui/styles';
import { postDataImage, postData, getData, ServerURL } from "../FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import { Grid, TextField, Button, Avatar } from '@mui/material'
import Swal from 'sweetalert2'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';


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


const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subdiv: {
        background: '#7ed6df',
        padding: 20,
        width: 900,
        margin: 20,
    },
    broot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bsubdiv: {
        background: '#7ed6df',
        padding: 20,
        width: 900,
        // margin: 10,
    },
});

export default function DisplayAllBrands(props) {
    const classes = useStyles();
    const [list, setList] = useState([])
    const [slist, setsList] = useState([]);
    const [blist, setbList] = useState([]);
    const [Open, setOpen] = useState(false)    
    const [showButton, setshowButton] = useState(false)
    const [BrandId, setBrandId] = useState('')
    const [BrandName, setBrandName] = useState('')
    const [BrandStatus, setBrandStatus] = useState('')        
    const [categoryId, setCategoryId] = useState('')
    const [SubCategoryId, setSubCategoryId] = useState('')
    const [BrandIcon, setBrandIcon] = useState({ bytes: '', filename: '/image.png' })
    const [tempIcon, settempIcon] = useState('')
    const [btnStatus, setbtnStatus] = useState(true)

    const handleIconChange = (event) => {
        setshowButton(true)
        setbtnStatus(false)
        setBrandIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

    }

    const handleIconsave = async () => {
        var formData = new FormData()
        formData.append('brandid', BrandId)
        formData.append('brandicon', BrandIcon.bytes)
        var result = await postDataImage('brands/editicon', formData)
        if (result.result) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your Icon has been Edited',
                timer: 3000
            })
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Fail to Edit Icon',
                timer: 3000
            })
        }
        setshowButton(false)
        setbtnStatus(true)
    }


    const handleEdit = async () => {
        // var formData = new FormData();
        // formData.append("categoryid", categoryId);
        // formData.append("subcategoryname", SubCategory);
        // formData.append("description", Description);
        // formData.append("icon", icon.bytes);
        var result = await postData("brands/editdata", { categoryid: categoryId, subcategoryid: SubCategoryId, brandname: BrandName, status: BrandStatus, brandid: BrandId });
        if (result.result) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your Brands has been Edited',
                timer: 3000,
            })
            setOpen(false)
            fetchSubCategories()
            setbtnStatus(true)
            setshowButton(false)

        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Fail to Edit Brands',
                timer: 3000
            })
        }
    }

    const handledelete = (rowData) => {
        setBrandId(rowData.brandid)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able ro revert it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                var dresult = await postData('brands/deletedata', { brandid: BrandId })
                if (dresult.result) {
                    Swal.fire(
                        'Deleted!',
                        'Your Category has been deleted',
                        'success',
                        // setOpen(false),
                        fetchBrands()
                    )
                }
            }
        })
    }


    const handleOpen = (rowData) => {
        setBrandId(rowData.brandid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setBrandName(rowData.brandname)
        setBrandStatus(rowData.status)
        setBrandIcon({ bytes: '', filename: `${ServerURL}/images/${rowData.brandicon}` })
        settempIcon(rowData.brandicon)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetchBrands()
        setbtnStatus(true)
        setshowButton(false)

    };

    const handlecancel = () => {
        setshowButton(false)
        setbtnStatus(true)
        setBrandIcon({ bytes: '', filename: `${ServerURL}/images/${tempIcon}` })
    }

    const handlechangecat = async(event) => {
        setCategoryId(event.target.value)
        var result = await postData('subcategories/displaysubcategory', { categoryid: event.target.value })
        setsList(result.result)
    };

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
        var result = await postData("subcategories/displaysubcategory",{categoryid:categoryId})
        setsList(result.result)
    }
    useEffect(
        function () {
            fetchCategories()
        }, [])

    const fetchBrands = async () => {
        var result = await getData("brands/displayallbrands")
        setbList(result.result)
    }
    useEffect(
        function () {
            fetchBrands()
        }, [])

    const handlechangesub = (event) => {
        setSubCategoryId(event.target.value);
    };

    const fillsubcategory = () => {
        return slist.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    /************Dialog ***************/
    const showDialog = () => {

        return (
            <div>
                <Dialog
                    open={Open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>

                        <div className={classes.broot}>

                            <div className={classes.bsubdiv}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                                        Update Brands
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth >
                                            <InputLabel style={{ color: '#FFF' }} id="demo-simple-select-label">Category
                                            </InputLabel>
                                            <Select
                                                // style= {{ color: '#FFF' }}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={categoryId}
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

                                    {/*************sub category text*/}

                                    <Grid item xs={12}>
                                        <CssTextField variant="outlined" value={BrandName} InputLabelProps={{
                                            style: { color: '#FFF' },
                                        }} inputProps={{ style: { color: "#FFF" } }} label="Brand Name" onChange={(event) => setBrandName(event.target.value)} fullWidth />

                                    </Grid>
                                    {/*************description text*/}


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


                                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {btnStatus ? <>
                                            <label htmlFor="contained-button-file">
                                                <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                                                <Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>
                                                    Upload
                                                </Button>
                                            </label>  </> : <></>}
                                        {showButton ? <div>
                                            <Button onClick={handleIconsave} style={{ color: '#FFF', fontWeight: 'bold' }}>
                                                Save
                                            </Button>
                                            <Button onClick={handlecancel} style={{ color: '#FFF', fontWeight: 'bold' }}>
                                                Cancel
                                            </Button>
                                        </div> : <></>}
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
                                        <Button onClick={() => handleEdit()} style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Edit</Button>

                                    </Grid>                                    
                                </Grid>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    /*********** CLOSE DIALOG *********/


    function display() {
        return (
            <MaterialTable
                title="List Brands"
                columns={[
                    { title: "Category Name", field: "categoryid" },
                    { title: "Sub-Category Name", field: "subcategoryid" },
                    { title: "Brand Name", field: "brandname" },
                    { title: "Status", field: "status" },
                    {
                        title: 'Icon', field: 'brandicon',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.brandicon}`} style={{ width: 70, height: 40, borderRadius: '25%' }} alt="" />
                    },

                ]}

                data={blist}

                actions={[
                    {
                        icon: "edit",
                        tooltip: "Edit User",
                        onClick: (event, rowData) => { handleOpen(rowData) },
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => { handledelete(rowData) },
                    }
                ]}
            />
        )
    }

    return (<div>

        <div className={classes.root}>

            <div className={classes.subdiv}>

                {display()}
                {showDialog()}
            </div>
        </div>
    </div>)
}