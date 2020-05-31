import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
 import Pagination from "./pagination";
 import { paginate } from "../../utils/paginate";

class Home extends Component {
    //call the constructor method
    constructor(props) {
        // Call the constructor of Super class i.e The Component
        super(props);

        // maintain the state required for this component
        this.state = {
            foodName: '',
            restaurantList: [],
            currentPage: 1,
            pageSize: 2,
            latitude: 0,
            longitude: 0
        };
        // Bind the handlers to this class
    }
    handlePageChange = page => {
        this.setState({ currentPage : page });
    }

    async componentDidMount () {
        // https://developers.zomato.com/api/v2.1/categories
        let data = {

        }
// https://developers.zomato.com/api/v2.1/search?entity_id=10883&entity_type=city&count=10&radius=2&cuisines=Indian&sort=rating&order=desc
// https://developers.zomato.com/api/v2.1/search?entity_id=10883&entity_type=city&q=burger&count=5
        let q = "";
        // q = "burger";
        // if (this.state.food)
        // if (this.state.foodName)
        let foodName = localStorage.getItem('foodName');
        let latitude = localStorage.getItem('latitude');
        let longitude = localStorage.getItem('longitude');
        // Using Zomato

        // await axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=10883&entity_type=city&q='+foodName+'&count=10&order=desc&sort=rating', {
        // headers: {
        //     'X-Zomato-API-Key': '325c24f9017a3f8559d862d2a75105c0'
        // },
        //     dataType: 'json',
        //      processData: true,
        // }
        //     ) 
        // .then(async (response) => {
        //     // access results...
        //    console.log(response);
        //    this.setState({
        //     restaurantList : response.data.restaurants
        //    })
        //   })
        //   .catch ( err => {
        //       window.location.reload();
        //   })
        //   console.log(this.state.restaurantList);

        // Using Google Maps

        await axios.get('/maps/api/place/nearbysearch/json?location='+latitude+','+longitude+'&radius=1500&type=restaurant&keyword='+ foodName + '&key=AIzaSyAM7dvZGlXpwjgmI2IApZC_ULEqSeS7Gv0', {
            dataType: 'json',
            processData: true,
        })
            .then(async (response)=> {
                console.log(response);
                if(response.data.status == 'ZERO_RESULTS'){
                    this.setState({
                        restaurantList: response.data.results,
                        foodName: 'NOT A FOOD',
                    }) 
                }
                else {
                    this.setState({
                        restaurantList: response.data.results,
                        foodName: foodName,
                        latitude: latitude,
                        longitude: longitude
                    })
                }
                
            })
            .catch( err => {
                console.log(err);
            })
            console.log(this.state.restaurantList);
            console.log(this.state.foodName);

    }

   

   

    render = () => {
        const {length : count} = this.state.restaurantList
        const { pageSize, currentPage } = this.state;
        let restaurantPhoto = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=';
        let key = 'AIzaSyAM7dvZGlXpwjgmI2IApZC_ULEqSeS7Gv0';
        let restaurantList = this.state.restaurantList
        console.log(restaurantList);
        const paginatedItems = paginate(restaurantList, currentPage, pageSize)
        console.log(restaurantList.name);
        let listOfRestaurants = paginatedItems.map(restaurantList => {
            return (
            // <div class="col-xs-10 individualPropertyDesc">
            //     <div>
            //     <img src = {restaurantList.restaurant.thumb} width="650" height="200" class="col-lg-4"/>
            //     {/* <img src = {properties.imageFiles} width="650" height="200" class="col-lg-4"/> */}
            //     <div class="col-lg-6">
            //     <span>
            //         <h2>{restaurantList.restaurant.name}</h2>
            //         <h4>Overall Rating: {restaurantList.restaurant.user_rating.aggregate_rating}</h4>
            //         <h2>{restaurantList.restaurant.phone_numbers}</h2>
            //         <h4><a href = {restaurantList.restaurant.events_url}>View restaurant</a></h4>
            //         {/* phone_numbers */}
            //         <h3>Estimated wait time: {Math.round((((Math.random() * 120) + 30)/10))  *10} minutes</h3>
            //     </span>
            //     <br/>
            //     </div>
            //     <br/></div>
            // </div>


            <div class="col-xs-10 individualPropertyDesc">
                <div>
                    {
                        restaurantList.photos ?
                        <img src={restaurantPhoto + restaurantList.photos[0].photo_reference + '&key=' + key} width="400" height="200" class="col-lg-4" />
                        : null
                    }
                    
                {/* <img src = {properties.imageFiles} width="650" height="200" class="col-lg-4"/> */}
                <div class="col-lg-6">
                <span>
                    <h2>{restaurantList.name}</h2>
                    <h4>Overall Rating: {restaurantList.rating}</h4>
                    <h4>(Total {restaurantList.user_ratings_total} User Ratings)</h4>
                    {/* <h2>{restaurantList.restaurant.}</h2> */}
                    {/* <h4><a href = {restaurantList.restaurant.}>View restaurant</a></h4> */}
                    {/* phone_numbers */}
                    <h3>Address: {restaurantList.vicinity}</h3>
                    {/* <h3>Estimated wait time: {Math.round((((Math.random() * 120) + 30)/10))  *10} minutes</h3> */}
                    {
                        restaurantList.geometry.location.lat && restaurantList.geometry.location.lng?
                        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${restaurantList.geometry.location.lat},${restaurantList.geometry.location.lng}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${restaurantList.geometry.location.lat},${restaurantList.geometry.location.lng}&key=${key}`} alt=''></img>
                        :
                        null
                    }
                    <br/>
                    <a type="submit" class="btn btn-primary mt-2" target="_blank" href={`https://www.google.com/maps/dir/?api=1&origin=${this.state.latitude},${this.state.longitude}&destination=${restaurantList.geometry.location.lat},${restaurantList.geometry.location.lng}`}>Get Directions!</a>

                </span>
                <br/>
                </div>
                <br/></div>
            </div>
            
            )
        })

       
        
        return (
            <div>
                <div className="navbar navbar-dark bg-primary mb-0 container navbar-fixed-top">

                    <div class="navbar-header">
                        <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a href="#" class="navbar-brand" id="navText">SeeFood</a>
                    </div>
                    <div id="navbarCollapse" class="collapse navbar-collapse">
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="/Home" id="navText">Home</a></li>
                            {/* <li><a href="#">Profile</a></li>
                            <li class="dropdown">
                                <a data-toggle="dropdown" class="dropdown-toggle" href="#">Messages <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Inbox</a></li>
                                    <li><a href="#">Drafts</a></li>
                                    <li><a href="#">Sent Items</a></li>
                                    <li class="divider"></li>
                                    <li><a href="#">Trash</a></li>
                                </ul>
                            </li> */}
                        </ul>
                        {/* <form class="navbar-form navbar-left">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
                                </span>
                            </div>
                        </form> */}
                    </div>
                </div>
                <br />
                <br />
                <h2>Nearby restaurants</h2>
                <div>
                    {listOfRestaurants}
                </div>
                <br />
                <div className="pagination">
                    <Pagination itemsCount={count} pageSize={pageSize}
                        currentPage={this.state.currentPage}
                        onPageChange={this.handlePageChange} />
                </div>
            </div>

        )   
    }
}

export default Home;