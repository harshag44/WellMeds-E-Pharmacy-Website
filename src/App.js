import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Categories from './Administrator/Categories';
import SubCategories from './Administrator/SubCategories';
import DisplayAllCategories from './Administrator/DisplayAllCategories';
import DisplayAllSubCategories from './Administrator/DisplayAllSubCategories';
import Brands from './Administrator/Brands';
import DisplayAllBrands from './Administrator/DisplayAllBrands';
import Products from './Administrator/Products';
import DisplayAllProducts from './Administrator/DisplayAllProducts';
import AdminLogin from './Administrator/AdminLogin';
import AdminDashboard from './Administrator/AdminDashboard';
import AdminListItems from './Administrator/AdminListItems';
import ProductImages from './Administrator/ProductImages';
import Header from './UserInterface/Header'
import Home from './UserInterface/Home'
import CartButton from './UserInterface/CartButton'
import ProductList from './UserInterface/ProductList'
import ProductView from './UserInterface/ProductView'
import RootReducer from './UserInterface/RootReducer'
import ShowCart from './UserInterface/ShowCart'
import ShowCartReview from './UserInterface/ShowCartReview'
import SignIn from './UserInterface/SignIn'
import SignUp from './UserInterface/SignUp'
import PaymentGateway from './UserInterface/PaymentGateway'


function App(props) {
//   var user={}
//   user['425243244323'] = { Name: 'harsh', city: 'gwalior', country: 'india' }
// console.log(user);
  return (
    <div >
<Router>
<Routes>
<Route history={props.history} element={<Categories/>} path="/categories"/>
<Route history={props.history} element={<SubCategories/>} path="/subcategories"/>
<Route history={props.history} element={<Brands/>} path="/brands"/>
<Route history={props.history} element={<Products/>} path="/products"/>
<Route history={props.history} element={<DisplayAllCategories/>} path="/displayallcategories"/>
<Route history={props.history} element={<DisplayAllSubCategories/>} path="/displayallsubcategories"/>
<Route history={props.history} element={<DisplayAllBrands/>} path="/displayallbrands"/>
<Route history={props.history} element={<DisplayAllProducts/>} path="/displayallproducts"/>
<Route history={props.history} element={<AdminLogin/>} path="/adminlogin"/>
<Route history={props.history} element={<AdminDashboard/>} path="/admindashboard"/>
<Route history={props.history} element={<AdminListItems/>} path="/adminlistitems"/>
<Route history={props.history} element={<ProductImages/>} path="/productimages"/>
<Route history={props.history} element={<Header/>} path="/header"/>
<Route history={props.history} element={<Home/>} path="/home"/>
<Route history={props.history} element={<CartButton/>} path="/cartbutton"/>
<Route history={props.history} element={<ProductList/>} path="/productlist"/>
<Route history={props.history} element={<ProductView/>} path="/productview"/>
<Route history={props.history} element={<RootReducer/>} path="/rootreducer"/>
<Route history={props.history} element={<ShowCart/>} path="/showcart"/>
<Route history={props.history} element={<ShowCartReview/>} path="/showcartreview"/>
<Route history={props.history} element={<SignIn/>} path="/signin"/>
<Route history={props.history} element={<SignUp/>} path="/signup"/>
<Route history={props.history} element={<PaymentGateway/>} path="/paymentgateway"/>
          
     </Routes>
     </Router>

    </div>
  );
}

export default App;
