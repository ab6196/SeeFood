import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Pagination from "../NearbyRestaurants/pagination";
import { paginate } from "../../utils/paginate";
// import { Tabs, Tab } from 'react-bootstrap';


class Home extends Component {
    //call the constructor method
    constructor(props) {
        // Call the constructor of Super class i.e The Component
        super(props);

        // maintain the state required for this component
        this.state = {
            foodName: '',
            time: null,
            ingredientsRequired: [],
            stepsList: [],
            nutriList: [],
            description: ''
        };
        // Bind the handlers to this class
    }
    handlePageChange = page => {
        this.setState({ currentPage: page });
    }
    


    async componentDidMount() {
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
        console.log(foodName);
        await axios.get('http://localhost:3001/getRecipe/?dish=' + encodeURIComponent(foodName))
            .then(async (response) => {
                // access results...
                let stepsLen = response.data[0].steps.length;
                let IngredientLen = response.data[0].ingredients.length;
                let forstepsList = response.data[0].steps.slice(1, stepsLen-1).split(',');
                let forIngredientList = response.data[0].ingredients.slice(1, IngredientLen-1).split(',');
                console.log(response.data[0]);
                this.setState({
                    foodName: foodName,
                    stepsList: forstepsList,
                    time: response.data[0].minutes,
                    ingredientsRequired: forIngredientList,
                    nutriList: JSON.parse(response.data[0].nutrition),
                    description: response.data[0].description
                })
            })
            .catch(err => {
                this.setState({
                    foodName: foodName,
                    stepsList: ['SORRY, NO DATA'],
                    time: 'SORRY, NO DATA',
                    ingredientsRequired: ['SORRY, NO DATA'],
                })
            })
        console.log(this.state.stepsList);
        console.log(this.state.ingredientsRequired);
    }


    render = () => {
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
                        {/* <form class="navbar-form navbar-left" action="http://localhost:3001/getRecipe/" method="GET" onSubmit={this.findRecipe}>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search Recipes" name="dish" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
                                </span>
                            </div>
                        </form> */}
                    </div>
                </div>
                <br />
                <br />
                <h2>Cook it Yourself!</h2>
                <footer>Takes about {this.state.time} minutes</footer>
                <hr/>
                <div class="recipeContainer">
                    <div class="ingredientContainer">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Ingredients</h3>
                            </div>
                            <div class="panel-body">
                                <ul>
                                {this.state.ingredientsRequired.map(item => (
                                        <li>{item.replace(/'/g, "")}</li>
                                ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="stepsContainer">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Preparation Steps</h3>
                            </div>
                            <div class="panel-body">
                                <ol type="1">
                                {this.state.stepsList.map(item => (
                                        <li>{item.replace(/'/g, "")}</li>
                                ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="nutritionContainer">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">Nutritional Information</h3>
                            </div>
                            <div class="panel-body nutriClass">
                                <p><b>Calories</b><br/>
                                    {
                                        this.state.nutriList[0]
                                    }
                                </p>
                                <p><b>Total Fat*</b><br /> 
                                    {
                                        this.state.nutriList[1]
                                    }
                                </p>
                                <p><b>Sugar*</b><br /> 
                                    {
                                        this.state.nutriList[2]
                                    }
                                </p>
                                <p><b>Sodium*</b><br /> 
                                    {
                                        this.state.nutriList[3]
                                    }
                                </p>
                                <p><b>Protein*</b><br />   
                                    {
                                        this.state.nutriList[4]
                                    }
                                </p>
                                <p><b>Saturated Fat*</b><br /> 
                                    {
                                        this.state.nutriList[5]
                                    }
                                </p>
                                <p><b>Carbohydrates*</b><br /> 
                                    {
                                        this.state.nutriList[6]
                                    }
                                </p>
                                <footer>* in % Daily Value</footer>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="description">
                    <h3>Things to Know</h3>
                    <p>{this.state.description}</p>
                </div>
                
                {/* <div class="container-fluid recipeContainer">
                    <div class="row">
                        <div class="col">
                            <h3>Ingredients</h3>
                            {this.state.ingredientsRequired.map(item => (
                                <div>
                                    <p>{item.replace(/'/g, "")}</p>
                                </div>
                            ))}
                        </div>
                        <div class="col-6">
                            <h3>Preparation Steps</h3>
                            {this.state.stepsList.map(item => (
                                <div>
                                    <p>{item.replace(/'/g, "")}</p>
                                </div>
                            ))}
                        </div>
                        <div className="col">
                            <h3>Nutrition Information</h3>
                        </div>
                    </div>
                </div> */}
                <br />
            </div>

        )
    }
}

export default Home;