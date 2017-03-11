const React = require('react');
const ReactDOM = require('react-dom');

// router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;

var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');
/* 
    App
    <app/>
*/

var App = React.createClass({

    render: function() {
        return (
             <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order/>
                <Inventory/>
            </div>
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
             <p>Inventory</p>
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