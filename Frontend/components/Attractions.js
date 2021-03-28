import React, { Component } from 'react'

export default class Attractions extends Component {
    render() {
        return (
            <div>
                <ul className="attractions">
                    {this.props.attractions.map(attraction => (
                        <li key={attraction._id}>
                            <div className="attraction">
                                <a href={"#" + attraction._id}>
                                    <img src={attraction.image} alt={attraction.title}></img>
                                    <p>{attraction.title}</p>
                                </a>
                                
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
