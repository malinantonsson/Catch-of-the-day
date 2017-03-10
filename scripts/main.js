import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

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


render((
  <Router history={createBrowserHistory()}>
    <Route path="/store" component={App}>
        <Route path="/:storeid" component={App} />
    </Route>
    <Route path="/" component={StorePicker}>
      <Route path="store/" component={App}>
        <Route path=":storeid" component={App} />
      </Route>
    </Route>
  </Router>
), document.querySelector('#main'))