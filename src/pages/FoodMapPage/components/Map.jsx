import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = ()=>{
    return(
        <LoadScript
            googleMapsApiKey="AIzaSyDMP0WUTPIwj9oi3SbbROwXL0STHfmKQuQ"
        >
            <GoogleMap
                mapContainerStyle={{
                    width: '100%',
                    height: '100%',
                }}
                center={{ lat: 25.033, lng: 121.565 }}
                zoom={13}
            >
                {/* Add your map elements here */}
            </GoogleMap>
        </LoadScript>
    )
}

export default Map;
