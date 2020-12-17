import React, { Component } from 'react';

export default class Menu extends Component{
    constructor () {
        super();
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch("http://localhost:8001/menu")
            .then(res => res.json())
            .then( json => this.setState({data: json }));
    }
    render()
    {
        const items = [];
        const menuItems = this.state.data;
        //console.log(menuItems[0]);

        for(var key in menuItems) {
            if (menuItems.hasOwnProperty(key)) {
                console.log(menuItems[key].Key);
                let temp = `https://cafe-restaurant-data.s3.amazonaws.com/${menuItems[key].Key}`;

                items.push(
                    <div className="menuItem">
                        <h3>{menuItems[key].Key}</h3>
                        <img className="menuItemPic" src={temp} alt="cafe-food--pic"/>
                    </div>
                )
            }
        }
        return(
            <div>
                <h2>Items</h2>
                {items}
            </div>
        )
    }
} 


