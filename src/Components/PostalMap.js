import React from 'react';
import MapComponent from './MapComponent';

const GMapKey = "AIzaSyAAjaxgIB7Gk9VMPoS0otQe43R93uRrvME";

const PostalMap = (props) => {

    return (

        <MapComponent
            isMarkerShown={true}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GMapKey}`}
            loadingElement={<div style={{ height: `100%` }} ><h1>Loading..</h1></div>}
            containerElement={<div className="mapContainer" />}
            mapElement={<div style={{ height: `100%` }} />}
            target={props.target}
        />

    )
}
export default PostalMap;
