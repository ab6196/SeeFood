import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home/Home';
import NearbyRestaurants from './NearbyRestaurants/NearbyRestaurants';
import RecipePage from './RecipePage/RecipePage';

class Main extends Component {
    render() {
        return(
            <div>
                {/* <Route path="/" component={Home}/> */}
                <Route path="/Home" component={Home}/>
                <Route path="/NearbyRestaurants" component={NearbyRestaurants}/>
                <Route path="/RecipePage" component={RecipePage}/>
            </div>
        )
    }
}

export default  Main;