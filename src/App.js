import React, { Component } from 'react';
import { fetchBusLocations } from './actions';
import { connect } from 'react-redux';
import { Card, Icon, Button, Segment, TransitionablePortal, Dropdown } from 'semantic-ui-react';
import ReactMapGL, { Marker, Popup, NavigationControl, FlyToInterpolator, LinearInterpolator } from 'react-map-gl';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import './App.css';

const StyledBusInfoDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const StyledCardHeader = styled(Card.Header)`
  display: flex;
`;

const StyledMarkerImage = styled.img`
  height : 45px;
  width: 30px;
`;

const NavControlContainer = styled.div`
  position : absolute;
  top : 20px;
  left: 20px;
`;

const ButtonContainer = styled.div`
  position : absolute;
  top : 20px;
  right: 20px;
`;

const FilterContainer = styled(Segment)`
  position: absolute;
  right: 20px;
  top: 50px;
  z-index: 1000;
`

const BusInfo = ({ busInfo, onPopupClose }) => (
  <Card>
    <Card.Content>
      <StyledCardHeader>
        <StyledBusInfoDiv>
          <span>Route No: {busInfo.RouteNo}</span>
          <Icon bordered onClick={onPopupClose} name="close" size="small"/>
        </StyledBusInfoDiv>
      </StyledCardHeader>
      <Card.Meta>Destination: {busInfo.Destination}</Card.Meta>
      <Card.Description>Direction: {busInfo.Direction}</Card.Description>
    </Card.Content>
  </Card>
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

  getCurrentPosition = () => {
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

  renderMarkers = () => {
    return this.props.buses.map((location, index) => {
      return (
        <Marker
          key={index}
          latitude={location.Latitude}
          longitude={location.Longitude}
          offsetLeft={-15}
          offsetTop={-10}>
          <StyledMarkerImage onClick={() => this.setState({ popupInfo: location })} src={require('assets/bus-marker.png')} />
        </Marker>
      )
    })
  }

  maybeRenderPopupInfo = () => {
    return  (
      this.state.popupInfo &&
      <Popup tipSize={5}
        anchor="bottom"
        offsetTop={-20}
        closeButton={false}
        longitude={this.state.popupInfo.Longitude}
        latitude={this.state.popupInfo.Latitude}>
        <BusInfo busInfo={this.state.popupInfo} onPopupClose={() => this.setState({ popupInfo : false })}/>
      </Popup>
    );
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
          //mapStyle={'mapbox://styles/mapbox/dark-v9'}
          mapStyle={'mapbox://styles/nikoootine/cjklykkie1j7h2royf7304dqa'}
          mapboxApiAccessToken={"pk.eyJ1Ijoibmlrb29vdGluZSIsImEiOiJjamtsdnlpZXUyNXBiM3BvM243dWM0ZWRpIn0.MKmDh_tL-VSwb9qGBdJtlQ"}
          onViewportChange={(viewport) => this.setState({ viewport })}>
          { this.renderMarkers() }
          { this.maybeRenderPopupInfo() }
          <NavControlContainer>
            <NavigationControl onViewportChange={viewport => this.setState({ viewport })} />
          </NavControlContainer>
          <TransitionablePortal
              closeOnTriggerClick
              openOnTriggerClick
              trigger={<ButtonContainer><Button color="green" icon="filter" size="large"/>
              </ButtonContainer>}>
              {/* <FilterContainer>
                <Dropdown placeholder='Select Route Number' fluid search selection options={[]} />
                <Dropdown placeholder='Select Stop Number' fluid search selection options={[]} />
              </FilterContainer> */}
              <Segment style={{ right: '20px', position: 'absolute', top: '50px', zIndex: 1000 }}>
                <Dropdown placeholder='Select Route Number' fluid search selection options={[]} />
                <Dropdown placeholder='Select Stop Number' fluid search selection options={[]} />
              </Segment>
            </TransitionablePortal>
          
            {/* <Button color='grey' icon='refresh' size="large"/> */}
        </ReactMapGL>
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
