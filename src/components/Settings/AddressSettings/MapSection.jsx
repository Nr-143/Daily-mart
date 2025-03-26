import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { FiCrosshair } from 'react-icons/fi';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
});

// Modern tile layer options
const tileLayers = {
    streets: {
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    dark: {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
};

const LocationMarker = ({ position, setPosition, setSelectedCoords }) => {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            const newPosition = [lat, lng];
            setPosition(newPosition);
            setSelectedCoords({ latitude: lat, longitude: lng });
            map.flyTo(newPosition, map.getZoom(), {
                duration: 1,
                easeLinearity: 0.25
            });
        }
    });

    return position === null ? null : (
        <Marker position={position} icon={customIcon}>
            <Popup className="modern-popup">
                <div className="text-sm font-medium text-gray-800">
                    Selected Location
                    <div className="text-xs text-gray-500 mt-1">
                        {position[0].toFixed(6)}, {position[1].toFixed(6)}
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

export const MapSection = ({
    position,
    setPosition,
    setSelectedCoords,
    onUseLocation,
    isLocating,
    mapRef
}) => {
    const [currentTile, setCurrentTile] = React.useState('streets');

    const handleUseLocation = async () => {
        try {
            await onUseLocation();
            // Scroll to map if needed
            const mapElement = document.querySelector('.map-container');
            if (mapElement) {
                mapElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } catch (error) {
            console.error("Error handling location:", error);
        }
    };

    return (
        <div className="flex-1 relative min-h-[300px] rounded-lg overflow-hidden border border-gray-200 shadow-sm map-container">
            <MapContainer
                center={position}
                zoom={15}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
                whenCreated={mapInstance => { mapRef.current = mapInstance }}
                zoomControl={false}
            >
                <TileLayer
                    url={tileLayers[currentTile].url}
                    attribution={tileLayers[currentTile].attribution}
                />
                <LocationMarker
                    position={position}
                    setPosition={setPosition}
                    setSelectedCoords={setSelectedCoords}
                />
            </MapContainer>

            {/* Custom controls */}
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                <div className="bg-white rounded-md shadow-md overflow-hidden">
                    {Object.keys(tileLayers).map((layer) => (
                        <button
                            key={layer}
                            onClick={() => setCurrentTile(layer)}
                            className={`px-3 py-2 text-sm capitalize ${currentTile === layer ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-50'}`}
                        >
                            {layer}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleUseLocation}
                disabled={isLocating}
                className="absolute bottom-4 left-4 z-[1000] bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-all flex items-center justify-center"
                title="Find my location"
            >
                {isLocating ? (
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                    <FiCrosshair className="text-blue-500 text-lg" />
                )}
            </button>

            <style jsx global>{`
                .modern-popup .leaflet-popup-content-wrapper {
                    border-radius: 8px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .leaflet-control-attribution {
                    background: rgba(255,255,255,0.8) !important;
                    font-size: 11px !important;
                }
            `}</style>
        </div>
    );
};