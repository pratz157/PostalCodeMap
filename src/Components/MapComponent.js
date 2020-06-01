import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

class MapComponent extends Component {
    constructor() {
        super();
        this.state = {
            zoomLevel: 6,
            position: {
                lat: 0,
                lng: 0
            },
            isOpen: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(!nextProps.target){
           return {
                zoomLevel: 6,
                position:{lat:19.075983, lng:72.877655 },
                isOpen:false
            }
        }
        if (nextProps.target && (prevState.position.lat !== nextProps.target.latitude || prevState.position.lng !== nextProps.target.longitude)) {
            return  {
                zoomLevel:12,
                position:{
                    lat:nextProps.target.latitude, lng:nextProps.target.longitude
                },
                isOpen:true
            }
        }
    
        // Return null to indicate no change to state.
        return null;
      }

    toggleInfo = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                isOpen: !prevState.isOpen
            }
        })
    }

    updateMarker = (e) => {
        this.setState({
            zoomLevel: 10,
            position: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            },
            isOpen: true
        })
    }

    render() {
        const { position, isOpen } = this.state;
        return (
            <GoogleMap
                defaultZoom={6}
                defaultCenter={{ lat: 19.075983, lng: 72.877655 }}
                center={{ ...this.state.position }}
                zoom={this.state.zoomLevel}
                onClick={this.updateMarker}
            >
                {this.props.isMarkerShown && <Marker position={{ ...position }} >
                    {isOpen && <InfoWindow onCloseClick={this.toggleInfo}>
                        <> <b>Cordinates :</b> <span>{` ${position.lat} , ${position.lng}`}</span></>
                    </InfoWindow>}
                </Marker>}
            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap((MapComponent)));