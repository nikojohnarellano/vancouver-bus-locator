import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import ReactLoading from 'react-loading';
import './App.css';

class App extends Component {

  state = {
    loading : true,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: null,
      longitude: null,
      zoom: 13
    }
  };

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      this.setState({ 
        viewport: {
          ...this.state.viewport,
          latitude,
          longitude
        }
      });
    });
  }

  componentDidMount() {
    this.getCurrentPosition();
  }

  render() {
    return (
        <div>
          <ReactMapGL
            {...this.state.viewport}
            mapStyle={'mapbox://styles/nikoootine/cjklykkie1j7h2royf7304dqa'}
            mapboxApiAccessToken={"pk.eyJ1Ijoibmlrb29vdGluZSIsImEiOiJjamtsdnlpZXUyNXBiM3BvM243dWM0ZWRpIn0.MKmDh_tL-VSwb9qGBdJtlQ"}
            onViewportChange={(viewport) => this.setState({viewport})}
          />
          <div style={{ position : 'absolute', left : 20, top : 20 }}>
            <span>HEYHEYHEY</span>
          </div>
        </div>
    );
  }
}

export default App;
