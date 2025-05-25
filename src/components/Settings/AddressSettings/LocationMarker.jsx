import React, { useEffect } from 'react';
import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';

export const LocationMarker = ({ position, setPosition, setSelectedCoords }) => {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            const newPosition = [lat, lng];
            setPosition(newPosition);
            setSelectedCoords({ latitude: lat, longitude: lng });
            map.flyTo(newPosition, map.getZoom());
        },
        locationfound(e) {
            const { lat, lng } = e.latlng;
            const newPosition = [lat, lng];
            setPosition(newPosition);
            setSelectedCoords({ latitude: lat, longitude: lng });
            map.flyTo(newPosition, map.getZoom());
        },
    });

    const mapFly = useMap();
    useEffect(() => {
        if (position) {
            mapFly.flyTo(position, mapFly.getZoom());
        }
    }, [position, mapFly]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>
                <div className="text-center">
                    <p>Selected Location</p>
                    <p className="text-xs">Lat: {position[0].toFixed(6)}</p>
                    <p className="text-xs">Lng: {position[1].toFixed(6)}</p>
                </div>
            </Popup>
        </Marker>
    );
};