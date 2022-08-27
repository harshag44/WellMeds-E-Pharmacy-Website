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
  croot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  csubdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 900,
    // margin: 10,
  },
});

export default function DisplayAllSubCategories(props) {
  const classes = useStyles();
  const [list, setList] = useState([])
  const [slist, setsList] = useState([]);
  const [Open, setOpen] = useState(false)
  const [showButton, setshowButton] = useState(false)
  const [SubCategory, setSubCategory] = useState('')
  const [Description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subcategoryId, setSubCategoryId] = useState('')
  const [icon, setIcon] = useState({ bytes: '', filename: '/image.png' })
  const [tempIcon, settempIcon] = useState('')
  const [btnStatus, setbtnStatus] = useState(true)

  const handleIconChange = (event) => {
    setshowButton(true)
    setbtnStatus(false)
    setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

  }

  const handleIconsave = async () => {
    var formData = new FormData()
    formData.append('subcategoryid', subcategoryId)
    formData.append('icon', icon.bytes)
    var result = await postDataImage('subcategories/editicon', formData)
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
    var result = await postData("subcategories/editdata", { categoryid:categoryId, subcategoryname:SubCategory, description:Description, subcategoryid:subcategoryId });
    if (result.result) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your Category has been Edited',
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
        title: 'Fail to Edit Category',
        timer: 3000
      })
    }    
  }

  const handledelete = (rowData) => {
    setSubCategoryId(rowData.subcategoryid)
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
        var dresult = await postData('subcategories/deletedata', { subcategoryid: subcategoryId })
        if (dresult.result) {
          Swal.fire(
            'Deleted!',
            'Your Category has been deleted',
            'success',
            setOpen(false),
            fetchSubCategories()
          )
        }
      }
    })    
  }


  const handleOpen = (rowData) => {
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setSubCategory(rowData.subcategoryname)
    setDescription(rowData.description)
    setIcon({ bytes: '', filename: `${ServerURL}/images/${rowData.icon}` })
    settempIcon(rowData.icon)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchSubCategories()
    setbtnStatus(true)
    setshowButton(false)

  };

  const handlecancel = () => {
    setshowButton(false)
    setbtnStatus(true)
    setIcon({ bytes: '', filename: `${ServerURL}/images/${tempIcon}` })
  }

  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };

  const fillcategory = () => {
    return list.map((item) => {
      return (
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
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

            <div className={classes.croot}>

              <div className={classes.csubdiv}>
                <Grid container spacing={2} >
                  <Grid item xs={12} style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                    Update Sub Categories
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
                        onChange={handleChange}
                      >
                        {fillcategory()}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/*************sub category text*/}

                  <Grid item xs={12}>
                    <CssTextField variant="outlined" InputLabelProps={{
                      style: { color: '#FFF' },
                    }} inputProps={{ style: { color: "#FFF" } }} label="Sub Category Name" onChange={(event) => setSubCategory(event.target.value)}
                      value={SubCategory} fullWidth />

                  </Grid>
                  {/*************description text*/}

                  <Grid item xs={12}>
                    <CssTextField variant="outlined" value={Description} InputLabelProps={{
                      style: { color: '#FFF' },
                    }} inputProps={{ style: { color: "#FFF" } }} label="Description" onChange={(event) => setDescription(event.target.value)} fullWidth />

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
                      src={icon.filename}
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


  const fetchCategories = async () => {
    var result = await getData("categories/displayallcategories")
    setList(result.result)

  }
  useEffect(
    function () {
      fetchCategories()
    }, [])
  const fetchSubCategories = async () => {
    var result = await getData("subcategories/displayallsubcategories")
    setsList(result.result)

  }
  useEffect(
    function () {
      fetchSubCategories()
    }, [])


  function display() {
    return (
      <MaterialTable
        title="List Sub Categories"
        columns={[
          { title: "Category ID", field: "categoryid" },
          { title: "Sub-Category ID", field: "subcategoryid" },
          { title: "Sub-Category Name", field: "subcategoryname" },
          { title: "Description", field: "description" },
          {
            title: 'Icon', field: 'icon',
            render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 70, height: 40, borderRadius: '25%' }} alt="" />
          },

        ]}

        data={slist}

        actions={[
          {
            icon: "edit",
            tooltip: "Edit User",
            onClick: (event, rowData) => {handleOpen(rowData)},
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => {handledelete(rowData)},
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