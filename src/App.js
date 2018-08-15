import React, { Component } from 'react';
import { fetchBusLocations, fetchRouteNo, fetchStopNo, resetErrorMessage, setErrorMessage, loadingBuses } from './actions';
import { connect } from 'react-redux';
import { Card, Icon, Button, Segment, TransitionablePortal, Dropdown, Divider, Modal, Header } from 'semantic-ui-react';
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
`;

const LoaderContainer = styled.div`
  display : flex;
  flex : 1;
  justify-content : center;
  align-items: center;
  height : 100%;
`;

const BusInfo = ({ busInfo, onPopupClose }) => (
  <Card>
    <Card.Content>
      <StyledCardHeader>
        <StyledBusInfoDiv>
          <span>Route No: {busInfo.RouteNo}</span>
          <Icon bordered onClick={onPopupClose} name="close" size="small" />
        </StyledBusInfoDiv>
      </StyledCardHeader>
      <Card.Meta>Destination: {busInfo.Destination}</Card.Meta>
      <Card.Description>Direction: {busInfo.Direction}</Card.Description>
    </Card.Content>
  </Card>
)

class App extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      showModal: nextProps.error ? true : false,
    }
  }

  state = {
    loadingPosition: true,
    popupInfo: null,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: 49.2827,
      longitude: 123.1207,
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
          longitude,
          loadingPosition : false
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
    return (
      this.state.popupInfo &&
      <Popup tipSize={5}
        anchor="bottom"
        offsetTop={-20}
        closeButton={false}
        longitude={this.state.popupInfo.Longitude}
        latitude={this.state.popupInfo.Latitude}>
        <BusInfo busInfo={this.state.popupInfo} onPopupClose={() => this.setState({ popupInfo: false })} />
      </Popup>
    );
  }

  maybeRenderErrorMessage = () => {
    return (
      <Modal
        open={this.state.showModal}
        basic
        size='small'
      >
        <Header icon='browser' content='An error has occurred' />
        <Modal.Content>
          <h3>{this.props.error}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => this.props.resetErrorMessage()} inverted>
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  componentDidMount() {
    this.props.loadingBuses();
    this.getCurrentPosition();

    this.interval = setInterval(() => {
      this.props.fetchBusLocations();
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {
          this.props.busesLoading ?
            <LoaderContainer>
              <ReactLoading type='spinningBubbles' color={'lightblue'} height={667} width={375} />
            </LoaderContainer> :
            <ReactMapGL
              {...this.state.viewport}
              mapStyle={'mapbox://styles/nikoootine/cjklykkie1j7h2royf7304dqa'}
              mapboxApiAccessToken={"pk.eyJ1Ijoibmlrb29vdGluZSIsImEiOiJjamtsdnlpZXUyNXBiM3BvM243dWM0ZWRpIn0.MKmDh_tL-VSwb9qGBdJtlQ"}
              onViewportChange={(viewport) => this.setState({ viewport })}>
              {this.renderMarkers()}
              {this.maybeRenderPopupInfo()}
              <NavControlContainer>
                <NavigationControl onViewportChange={viewport => this.setState({ viewport })} />
              </NavControlContainer>
              <TransitionablePortal
                closeOnTriggerClick
                openOnTriggerClick
                trigger={<ButtonContainer><Button color="green" icon="filter" size="large" />
                </ButtonContainer>}>
                <Segment style={{ right: '20px', position: 'absolute', top: '50px', zIndex: 1000 }}>
                  <Header as='h3' content='Filter' />
                  <Dropdown onOpen={() => this.props.fetchRouteNo()} placeholder='Select Route Number' fluid search selection options={[]} />
                  <Dropdown style={{ marginTop: 20 }} onOpen={() => this.props.fetchStopNo()} placeholder='Select Stop Number' fluid search selection options={[]} />
                </Segment>
              </TransitionablePortal>
              {this.maybeRenderErrorMessage()}
            </ReactMapGL>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buses: state.translink.get('buses') || [],
    error: state.error.get('error') || '',
    busesLoading: state.translink.get('busesLoading')
  }
};

const mapDispatchToProps = ({ fetchBusLocations, fetchRouteNo, fetchStopNo, resetErrorMessage, setErrorMessage, loadingBuses });

export default connect(mapStateToProps, mapDispatchToProps)(App);
