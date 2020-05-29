import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import * as geolib from 'geolib';

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: null,
    };
  }

  componentDidMount = () => {
      var dist = geolib.getDistance({
        latitude: this.props.restaurant.geometry.location.lat,
        longitude: this.props.restaurant.geometry.location.lng,
      },
      {
        latitude: this.props.lat,
        longitude: this.props.lng,
      })*0.000621371;

      dist = Math.round((dist + Number.EPSILON) * 100) / 100;
      this.setState({ distance: dist })

      const entry = {
        name: this.props.restaurant.name,
        geometry: this.props.restaurant.geometry,
        opening_hours: this.props.restaurant.opening_hours,
        photos: this.props.restaurant.photos,
        price_level: this.props.restaurant.price_level,
        rating: this.props.restaurant.rating,
        types: this.props.restaurant.types,
        user_ratings_total: this.props.restaurant.user_ratings_total,
        distance: dist
      }

      // const entry = this.props.restaurant.concat([{ distance: dist }])
      // console.log(entry)
      this.props.setDistance(entry);
  }

  render() {
    return (
      <div>
        <div className="Entry">
          {/* <p>Name: {this.props.restaurant.name} </p>
          <p>Rating: {this.props.restaurant.rating}</p>
          {(this.props.restaurant.price_level === 1) ?
            <p>Price: $</p>
            :
            ((this.props.restaurant.price_level === 2) ?
              <p>Price: $$</p>
              :
              <p>Price: $$$</p>
            )
          } */}

          <Card>
            <Card.Body>
              <Card.Text>
                <em>Name: {this.props.restaurant.name} </em>
                <em>Rating: {this.props.restaurant.rating}</em>
                <em>Number of ratings: {this.props.restaurant.user_ratings_total}</em>
                {(this.props.restaurant.price_level === 1) ?
                  <em>Price: $</em>
                  :
                  ((this.props.restaurant.price_level === 2) ?
                    <em>Price: $$</em>
                    :
                    ((this.props.restaurant.price_level === 3) ?
                      <em>Price: $$$</em>
                      :
                      <em>Price: N/A</em>
                    )
                  )
                }
                <em>Distance: {this.state.distance} miles away</em>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
