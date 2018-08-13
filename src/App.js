import React, { Component } from 'react';
import { fetchBusLocations } from './actions';
import { connect } from 'react-redux';
import ReactMapGL, { Marker, Popup, FlyToInterpolator, LinearInterpolator } from 'react-map-gl';
import ReactLoading from 'react-loading';
import './App.css';

const BusInfo = ({ busInfo }) => (
  <div>
    <div>
      {`Vehicle No: ${busInfo.VehicleNo}\n
        Destination: ${busInfo.Destination}
      `}
    </div>
  </div>
)

class App extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    console.log(prevState);
    return null;
  }

  state = {
    loading: true,
    popupInfo: null,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: 37.7577,
      longitude: -122.4376,
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
    this.props.fetchBusLocations();
  }

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          //transitionDuration={1000}
          //transitionInterpolator={new LinearInterpolator()}
          mapStyle={'mapbox://styles/nikoootine/cjklykkie1j7h2royf7304dqa'}
          mapboxApiAccessToken={"pk.eyJ1Ijoibmlrb29vdGluZSIsImEiOiJjamtsdnlpZXUyNXBiM3BvM243dWM0ZWRpIn0.MKmDh_tL-VSwb9qGBdJtlQ"}
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          {
            this.props.buses.map((location, index) => {
              return (
                <div key={index} style={{ display: 'flex', justifyContent: 'flex-start' }} >
                  <Marker
                    latitude={location.Latitude}
                    longitude={location.Longitude}
                    offsetLeft={-15}
                    offsetTop={-10}>
                    <img onClick={() => this.setState({ popupInfo: location })} style={{ height: 45, width: 30 }} src={require('assets/bus-marker.png')} />
                  </Marker>
                </div>
              )
            })
          }
          {
            this.state.popupInfo &&
            <Popup tipSize={5}
              anchor="top"
              longitude={this.state.popupInfo.Longitude}
              latitude={this.state.popupInfo.Latitude}
              onClose={() => this.setState({ popupInfo: null })} >
              <BusInfo busInfo={this.state.popupInfo}/>
            </Popup>
          }
        </ReactMapGL>
        <div style={{ position: 'absolute', left: 20, top: 20 }}>
          <span>HEYHEYHEY</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buses: state.translink.get('buses') || []
  }
};

const mapDispatchToProps = ({ fetchBusLocations });

export default connect(mapStateToProps, mapDispatchToProps)(App);
