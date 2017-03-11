const React = require('react');
const ReactDOM = require('react-dom');

// router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const History = ReactRouter.History;

const createBrowserHistory = require('history/lib/createBrowserHistory');

const h = require('./helpers');
/* 
    App
    <app/>
*/

var App = React.createClass({
    getInitialState: function() {
        return {
            fishes: {},
            order: {}
        }
    },
    addFish: function(fish) {
        const timestamp = (new Date()).getTime();
        //update state object
        this.state.fishes[`fish-${timestamp}`] = fish;
        //set the state
        this.setState({ fishes: this.state.fishes });
    },

    render: function() {
        return (
             <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order/>
                <Inventory addFish={this.addFish}/>
            </div>
        )
    }
});

/* 
    Add fish Form
    <AddFishForm/>
*/

var AddFishForm = React.createClass({

    createFish: function(event){
        //stop the form from submitting
        event.preventDefault();

        //Take the data from the form
        const fish = {
            name: this.refs.name.value,
            price: this.refs.price.value,
            status: this.refs.status.value,
            desc: this.refs.desc.value,
            image: this.refs.image.value

        }
        
        //Add the fish to the app state
        this.props.addFish(fish);
        this.refs.fishForm.reset();
    },

    render: function() {
        return (
            <form ref="fishForm" className="fish-edit" onSubmit={this.createFish.bind(this)}>
                <input type="text" ref="name" placeholder="Fish Name"/>
                <input type="text" ref="price" placeholder="Fish price"/>

                <select ref="status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea type="text" ref="desc" placeholder="Desc"></textarea>
                <input type="text" ref="image" placeholder="URL to image"/>
                <button type="submit">+ Add Item</button>

            </form>
        )
    }
});

/* 
    Header
    <Header/>
*/

var Header = React.createClass({

    render: function() {
        return (
            <header className="top">
                <h1>Catch 
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the</span>
                    </span>
                    day</h1>
                <h3 className="tagline"><span>{this.props.tagline}</span></h3>
            </header>
        )
    }
});


/* 
    Inventory
    <Inventory/>
*/

var Inventory = React.createClass({

    render: function() {
        return (
            <div>
                <h2>Inventory</h2>
                <AddFishForm {...this.props}/>
            </div>
        )
    }
});

/* 
    Order
    <Order/>
*/

var Order = React.createClass({

    render: function() {
        return (
             <p>Order</p>
        )
    }
});

/* 
    Not found
    <Not found/>
*/

var NotFound = React.createClass({

    render: function() {
        return (
             <p>Not found</p>
        )
    }
});



/* 
    StorePicker 
    This will let us make <StorePicker/>
*/

var StorePicker = React.createClass({
    mixins: [History],
    goToStore: function(event) {
        event.preventDefault();
        //get the data from the input
        var storeId = this.refs.storeId.value;
        //Transition to App component
        this.history.pushState(null, `/store/${storeId}`);
    },

    render: function() {
        var name = "malin";
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                {/* this is a comment */}
                <h2>Please enter a store {name}</h2>
                <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
                <input type="Submit" />
            </form>
        )
    }
});

/* 
    Routes
*/

var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route path="*" component={NotFound} />
    </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));