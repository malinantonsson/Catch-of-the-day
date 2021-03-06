
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

const Catalyst = require('react-catalyst');

const Rebase = require('re-base');
var base = Rebase.createClass({
        apiKey: "AIzaSyA7gOdQsDVKzVi9ufqyEgmCBAdcNzSuX_Q",
        authDomain: "catch-of-the-day-b3ddc.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-b3ddc.firebaseio.com",
        storageBucket: "catch-of-the-day-b3ddc.appspot.com",
        messagingSenderId: "299066285905"
    }, 'catchOfTheDay');
/* 
    App
    <app/>
*/

var App = React.createClass({
    mixins: [Catalyst.LinkedStateMixin],
    getInitialState: function() {
        return {
            fishes: {},
            order: {}
        }
    },

    componentDidMount: function() {
        //what path are we syncing? param 1 
        base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        var localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        if(localStorageRef) {
            this.setState({
                'order': JSON.parse(localStorageRef)
            });
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
    },

    addFish: function(fish) {
        const timestamp = (new Date()).getTime();
        //update state object
        this.state.fishes[`fish-${timestamp}`] = fish;
        //set the state
        this.setState({ fishes: this.state.fishes });
    },

    addToOrder: function(key) {
        this.state.order[key] = this.state.order[key] + 1 || 1;
        this.setState({'order' : this.state.order });
    },

    loadSamples: function() {
        this.setState({
            fishes: require('./sample-fishes')
        });
    },

    renderFish: function(key) {
        return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
    },

    render: function() {
        return (
             <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(this.renderFish)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState} />
            </div>
        )
    }
});

/* 
    Render fish 
    <Fish />
*/

var Fish = React.createClass({
    onButtonClick: function() {
        this.props.addToOrder(this.props.index);
    },

    render: function() {
        const details = this.props.details;
        let isAvailable = (details.status === 'available' ? true : false);
        let buttonText = (isAvailable ? 'Add to Order' : 'Sold out!');

        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{h.formatPrice(details.price)}</span>
                </h3>

                <p>{details.desc}</p>
                <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
            </li>
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

var EditFishForm = React.createClass({

    render: function() {
        var key = this.props.valueKey;
        var linkState = this.props.linkState;
        return (
            <div className="fish-edit">
                <input type="text" valueLink={linkState(`fishes.${key}.name`)} />
                <input type="text" valueLink={linkState(`fishes.${key}.price`)} />

                <select valueLink={linkState(`fishes.${key}.status`)} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea type="text" valueLink={linkState(`fishes.${key}.desc`)} ></textarea>
                <input type="text" valueLink={linkState(`fishes.${key}.image`)} />
                <button>Remove Fish</button>
            </div>
        )
    }
});

/* 
    Inventory
    <Inventory/>
    <div className="fish-edit" key={key}>
                <input type="text" valueLink={linkState(`fishes.${key}.name`)} />
            </div>
*/

var Inventory = React.createClass({
    renderInventory: function(key) {
        var linkState = this.props.linkState;
        return (
            <EditFishForm key={key} linkState={linkState} valueKey={key} fishes={this.props.fishes} />  
        )
    },

    render: function() {
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm {...this.props}/>

                <button onClick={this.props.loadSamples}>Load sample fishes</button>
            </div>
        )
    }
});

/* 
    Order
    <Order/>
*/

var Order = React.createClass({
    renderOrder: function(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];

        if(!fish) {
            return <li key={key}>Sorry, fish no longer available!</li>
        }
        return (
            <li key={key}>
                <span>{count}</span>lbs 
                {fish.name}
                <span className="price">{h.formatPrice(count * fish.price)}</span>
            </li>
        )
    },

    render: function() {
        //store orderids
        var orderIds = Object.keys(this.props.order);
        let total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';

            if(isAvailable) {
                return prevTotal + (count * parseInt(fish.price) || 0);
            }

            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2 className="order-title">
                    Your title
                </h2>

                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total: </strong>
                        {h.formatPrice(total)}
                    </li>
                </ul>
            </div>
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
