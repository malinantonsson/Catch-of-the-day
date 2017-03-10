const React = require('react');
const ReactDOM = require('react-dom');

// router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
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
    StorePicker 
    This will let us make <StorePicker/>
*/

var StorePicker = React.createClass({

    render: function() {
        var name = "malin";
        return (
            <form className="store-selector">
                {/* this is a comment */}
                <h2>Please enter a store {name}</h2>
                <input type="text" ref="storeId" required />
                <input type="Submit" />
            </form>
        )
    }
});

/* 
    Routes
*/
/*
var routes = (
    <Router>
        <Router path="/" component={StorePicker} />
        <Router path="/store/:storeId" component={App} />
    </Router>
)

ReactDOM.render(<routes/>, document.querySelector('#main'));*/

render((
  <Router>
    <Route path="/" component={StorePicker}>
      <Router path="/store/:storeId" component={App} />
    </Route>
  </Router>
), document.querySelector('#main'))