import './App.css';
//import HomePage from './pages/homepage/homepage.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { SelectCurrentUser } from './redux/user/user.selector';
import {  createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';
 

class  App extends React.Component {
// constructor() {
//   super();

//   this.state = {
//     currentUser:null
//   };
// }

unsubscribeFromAuth = null;

componentDidMount() {
const { setCurrentUser } = this.props;

  this.unsubscribeFromAuth =auth.onAuthStateChanged(async userAuth => {
   if(userAuth) {
     const userRef = await createUserProfileDocument(userAuth);

     userRef.onSnapshot(snapShot => { 
       setCurrentUser ({
             id: snapShot.id,
             ...snapShot.data()
              
           });
         });
        //  console.log(this.state);
      //  });
      
   }
   setCurrentUser(userAuth);
   
   
    // this.setState({ currentUser:user });

    // console.log(user);

    // createUserProfileDocument(user);
  });
    
}

componentWillUnmount() {
   this.unsubscribeFromAuth();
}

  render() {
    return (
      <div>
        <Header />
        <Switch>
           <Route exact  path='/' component={HomePage} />
            <Route  path='/shop' component={ShopPage} />
            <Route exact  path='/checkout' component={CheckoutPage} />
            
            <Route exact path='/signin' 
            render={() => 
            this.props.currentUser ?(<Redirect to='/' />) :(<SignInAndSignUpPage />) } />
        </Switch>
      </div>
    );

  }
  
}
const mapStateToProps = createStructuredSelector({
  currentUser: SelectCurrentUser
});

const mapDispatchToProps = dispatch => ({

  setCurrentUser: user => dispatch(setCurrentUser(user))

});

export default connect(mapStateToProps, mapDispatchToProps)(App);

