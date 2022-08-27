import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Categories from './Categories';
import SubCategories from './SubCategories';
import Brands from './Brands';
import Products from './Products';
import Banner from './Banner';
import ProductImages from './ProductImages'

export default function AdminListItems(props) {

    const handleclick=(v)=>{
        props.setViewContainer(v)
    }



    return (
        <React.Fragment>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={()=>handleclick(<Categories setViewContainer={props.setViewContainer}/>)}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Category" />
            </ListItemButton>
            <ListItemButton onClick={() => handleclick(<SubCategories setViewContainer={props.setViewContainer} />)}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="SubCategory" />
            </ListItemButton>
            <ListItemButton onClick={() => handleclick(<Brands setViewContainer={props.setViewContainer} />)}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Brands" />
            </ListItemButton>
            <ListItemButton onClick={() => handleclick(<Products setViewContainer={props.setViewContainer} />)}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </ListItemButton>


            {/* <ListSubheader component="div" inset>
                Saved reports
            </ListSubheader> */}
            <ListItemButton onClick={() => handleclick(<Banner setViewContainer={props.setViewContainer} />)}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Banner" />
            </ListItemButton>
            <ListItemButton onClick={() => handleclick(<ProductImages setViewContainer={props.setViewContainer} />)}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Add Product Images" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Year-end sale" />
            </ListItemButton>
        </React.Fragment>
    )
}