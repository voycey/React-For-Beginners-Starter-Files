import base from '../base';
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';


class App extends React.Component {

    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);

        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    //remove if changes store
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }


    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    addFish(fish) {
        //create a copy of the state
        const fishes = {...this.state.fishes};
        //add in new fish
        const timestamp = Date.now();

        fishes[`fish-${timestamp}`] = fish; //assigns by reference

        //set state
        this.setState({fishes});
    }

    addToOrder(key) {
        //create a copy of the state
        const order = {...this.state.order};

        order[key] = order[key] + 1 || 1; //add one if exists or just set to 1
        //update state

        this.setState({order});
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
            </div>
        )
    }
}

export default App;