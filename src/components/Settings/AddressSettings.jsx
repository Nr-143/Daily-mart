import React, { useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import { FiEdit2, FiTrash2, FiStar, FiMapPin, FiSearch, FiPlus, FiX, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const LocationMarker = ({ position, setPosition, setSelectedCoords }) => {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            setSelectedCoords({ latitude: lat, longitude: lng });
        },
        locationfound(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            setSelectedCoords({ latitude: lat, longitude: lng });
            map.flyTo([lat, lng], map.getZoom());
        },
    });

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

const AddressSettings = () => {
    const [addresses, setAddresses] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [defaultAddressIndex, setDefaultAddressIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mapPosition, setMapPosition] = useState([51.505, -0.09]); // Default position (London)
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [loadingGeo, setLoadingGeo] = useState(false);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [reverseGeocoding, setReverseGeocoding] = useState(null);
    const [isReverseLoading, setIsReverseLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLocating, setIsLocating] = useState(false);

    // Load saved addresses and default address from Local Storage on page load
    useEffect(() => {
        try {
            const storedAddresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
            const storedDefaultIndex = parseInt(localStorage.getItem("defaultAddressIndex")) || null;
            setAddresses(storedAddresses);
            setDefaultAddressIndex(storedDefaultIndex);
        } catch (err) {
            console.error("Failed to load addresses from storage:", err);
            setError("Failed to load saved addresses");
        }
    }, []);

    // Filter addresses based on search term
    const filteredAddresses = addresses.filter(addr =>
        Object.values(addr).some(
            val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ));

    // Get current location
    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setMapPosition([latitude, longitude]);
                setSelectedCoords({ latitude, longitude });
                setIsMapVisible(true);
                reverseGeocode(latitude, longitude);
                setIsLocating(false);
            },
            (err) => {
                console.error("Geolocation error:", err);
                setError("Unable to retrieve your location");
                setIsLocating(false);
            }
        );
    };

    // Geocode address to get coordinates
    const geocodeAddress = async (address) => {
        try {
            setLoadingGeo(true);
            setError(null);
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
                {
                    headers: {
                        'Accept-Language': 'en',
                    }
                }
            );

            if (response.data && response.data.length > 0) {
                const { lat, lon, display_name } = response.data[0];
                const coords = [parseFloat(lat), parseFloat(lon)];
                setMapPosition(coords);
                setSelectedCoords({ latitude: coords[0], longitude: coords[1] });
                setIsMapVisible(true);

                // Parse the display name for basic address info
                const addressParts = display_name.split(', ');
                const basicAddress = {
                    road: addressParts[0] || '',
                    city: addressParts[addressParts.length - 3] || '',
                    country: addressParts[addressParts.length - 1] || ''
                };
                setReverseGeocoding(basicAddress);
            } else {
                setError("Address not found. Please try a more specific location.");
            }
        } catch (error) {
            console.error("Geocoding error:", error);
            setError("Failed to geocode address. Please try again.");
        } finally {
            setLoadingGeo(false);
        }
    };

    // Reverse geocode coordinates to get address
    const reverseGeocode = async (lat, lng) => {
        try {
            setIsReverseLoading(true);
            setError(null);
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
                {
                    headers: {
                        'Accept-Language': 'en',
                    }
                }
            );

            if (response.data) {
                setReverseGeocoding(response.data.address);
            }
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            setError("Failed to get address details for this location");
        } finally {
            setIsReverseLoading(false);
        }
    };

    // Save new address with coordinates
    const handleAddAddress = (newAddress) => {
        try {
            let updatedAddresses;
            const addressWithCoords = {
                ...newAddress,
                coordinates: selectedCoords,
                reverseGeocoding: reverseGeocoding,
                timestamp: new Date().toISOString()
            };

            if (editingIndex !== null) {
                // Update existing address
                updatedAddresses = [...addresses];
                updatedAddresses[editingIndex] = addressWithCoords;
                setEditingIndex(null);
                setSuccessMessage("Address updated successfully");
            } else {
                // Add new address
                updatedAddresses = [...addresses, addressWithCoords];
                setSuccessMessage("Address added successfully");
            }

            setAddresses(updatedAddresses);
            localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
            setIsFormOpen(false);
            setSelectedCoords(null);
            setReverseGeocoding(null);

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            console.error("Failed to save address:", err);
            setError("Failed to save address. Please try again.");
        }
    };

    const handleViewOnMap = (address) => {
        console.log("Test-1")
        if (address.coordinates) {
            console.log("Test-2", address.coordinates.latitude, address.coordinates.longitude, address.coordinates, address.reverseGeocoding)

            setMapPosition([address.coordinates.latitude, address.coordinates.longitude]);
            setSelectedCoords(address.coordinates);
            setReverseGeocoding(address.reverseGeocoding || null);
            setIsMapVisible(true);
        } else {
            console.log("Test-3")

            const addressString = `${address.street}, ${address.city}, ${address.country}`;
            geocodeAddress(addressString);
        }
    };

    const handleDeleteAddress = (index) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            try {
                const updatedAddresses = addresses.filter((_, i) => i !== index);
                setAddresses(updatedAddresses);
                localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
                setSuccessMessage("Address deleted successfully");

                if (defaultAddressIndex === index) {
                    setDefaultAddressIndex(null);
                    localStorage.removeItem("defaultAddressIndex");
                } else if (defaultAddressIndex > index) {
                    setDefaultAddressIndex(defaultAddressIndex - 1);
                    localStorage.setItem("defaultAddressIndex", defaultAddressIndex - 1);
                }

                setTimeout(() => setSuccessMessage(null), 3000);
            } catch (err) {
                console.error("Failed to delete address:", err);
                setError("Failed to delete address");
            }
        }
    };

    const handleSetDefaultAddress = (index) => {
        try {
            setDefaultAddressIndex(index);
            localStorage.setItem("defaultAddressIndex", index);
            setSuccessMessage("Default address updated successfully");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            console.error("Failed to set default address:", err);
            setError("Failed to set default address");
        }
    };

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        if (isFormOpen) {
            setEditingIndex(null);
            setIsMapVisible(false);
            setSelectedCoords(null);
            setReverseGeocoding(null);
            setError(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FiMapPin className="text-blue-500" />
                                My Addresses
                            </h2>
                            <p className="text-gray-600 mt-1">Manage your delivery addresses</p>
                        </div>
                        <button
                            onClick={toggleForm}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            {isFormOpen ? (
                                <>
                                    <FiX size={18} /> Cancel
                                </>
                            ) : (
                                <>
                                    <FiPlus size={18} /> Add Address
                                </>
                            )}
                        </button>
                    </div>

                    {/* Status messages */}
                    {error && (
                        <div className="mt-3 p-3 bg-red-100 text-red-700 rounded-lg flex items-start gap-2">
                            <FiX className="mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">Error</p>
                                <p className="text-sm">{error}</p>
                            </div>
                            <button
                                onClick={() => setError(null)}
                                className="ml-auto text-red-700 hover:text-red-800"
                            >
                                <FiX size={18} />
                            </button>
                        </div>
                    )}

                    {successMessage && (
                        <div className="mt-3 p-3 bg-green-100 text-green-700 rounded-lg flex items-start gap-2">
                            <FiCheck className="mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">Success</p>
                                <p className="text-sm">{successMessage}</p>
                            </div>
                            <button
                                onClick={() => setSuccessMessage(null)}
                                className="ml-auto text-green-700 hover:text-green-800"
                            >
                                <FiX size={18} />
                            </button>
                        </div>
                    )}

                    {defaultAddressIndex !== null && (
                        <div className="mt-3 bg-blue-50 p-3 rounded-lg flex items-center">
                            <FiStar className="text-yellow-500 mr-2" />
                            <span className="text-sm text-blue-800">
                                Default: {addresses[defaultAddressIndex]?.street}, {addresses[defaultAddressIndex]?.city}
                            </span>
                        </div>
                    )}

                    <div className="mt-4 relative">
                        <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search addresses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="p-6 overflow-y-auto max-h-[calc(100vh-250px)] w-full md:w-1/2 custom-scrollbar">
                        <AnimatePresence>
                            {isFormOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-6"
                                >
                                    <AddressForm
                                        onAddAddress={handleAddAddress}
                                        addressToEdit={editingIndex !== null ? addresses[editingIndex] : null}
                                        onCancelEdit={() => {
                                            setEditingIndex(null);
                                            setIsFormOpen(false);
                                            setSelectedCoords(null);
                                            setError(null);
                                        }}
                                        selectedCoords={selectedCoords}
                                        reverseGeocoding={reverseGeocoding}
                                        onGeocode={geocodeAddress}
                                        loadingGeo={loadingGeo}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {filteredAddresses.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {filteredAddresses.map((addr, index) => (
                                    <motion.div
                                        key={addr.timestamp || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        className={`border rounded-xl p-4 hover:shadow-md transition-all ${defaultAddressIndex === index ? "border-2 border-blue-500 bg-blue-50" : "border-gray-200"}`}
                                    >
                                        {defaultAddressIndex === index && (
                                            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full inline-flex items-center mb-2">
                                                <FiStar className="mr-1" />
                                                Default
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <div className="flex">
                                                <span className="font-medium w-24 text-gray-600">Name:</span>
                                                <span className="font-medium">{addr.name || 'Not specified'}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="font-medium w-24 text-gray-600">Country:</span>
                                                <span className="font-medium">{addr.country}</span>
                                            </div>
                                            {addr.state && (
                                                <div className="flex">
                                                    <span className="font-medium w-24 text-gray-600">State:</span>
                                                    <span>{addr.state}</span>
                                                </div>
                                            )}
                                            {addr.city && (
                                                <div className="flex">
                                                    <span className="font-medium w-24 text-gray-600">City:</span>
                                                    <span>{addr.city}</span>
                                                </div>
                                            )}
                                            {addr.street && (
                                                <div className="flex">
                                                    <span className="font-medium w-24 text-gray-600">Street:</span>
                                                    <span>{addr.street}</span>
                                                </div>
                                            )}
                                            {addr.postalCode && (
                                                <div className="flex">
                                                    <span className="font-medium w-24 text-gray-600">Postal Code:</span>
                                                    <span>{addr.postalCode}</span>
                                                </div>
                                            )}
                                            {addr.coordinates && (
                                                <div className="flex">
                                                    <span className="font-medium w-24 text-gray-600">Location:</span>
                                                    <span className="text-xs">
                                                        {addr.coordinates.latitude.toFixed(4)}, {addr.coordinates.longitude.toFixed(4)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <button
                                                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm flex items-center gap-1"
                                                onClick={() => {
                                                    setEditingIndex(index);
                                                    setIsFormOpen(true);
                                                    if (addr.coordinates) {
                                                        setMapPosition([addr.coordinates.latitude, addr.coordinates.longitude]);
                                                        setSelectedCoords(addr.coordinates);
                                                        setReverseGeocoding(addr.reverseGeocoding || null);
                                                        setIsMapVisible(true);
                                                    }
                                                }}
                                            >
                                                <FiEdit2 size={14} /> Edit
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center gap-1"
                                                onClick={() => handleDeleteAddress(index)}
                                            >
                                                <FiTrash2 size={14} /> Delete
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors text-sm flex items-center gap-1"
                                                onClick={() => handleViewOnMap(addr)}
                                                disabled={loadingGeo}
                                            >
                                                {loadingGeo ? "Loading..." : (
                                                    <>
                                                        <FiMapPin size={14} /> View on Map
                                                    </>
                                                )}
                                            </button>
                                            {defaultAddressIndex !== index && (
                                                <button
                                                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"
                                                    onClick={() => handleSetDefaultAddress(index)}
                                                >
                                                    <FiStar size={14} /> Set Default
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-6 p-6 bg-gray-50 rounded-lg text-center"
                            >
                                {searchTerm ? (
                                    <p className="text-gray-600">No addresses match your search.</p>
                                ) : (
                                    <>
                                        <FiMapPin className="mx-auto text-3xl text-gray-400 mb-3" />
                                        <p className="text-gray-600">No saved addresses yet.</p>
                                        <button
                                            onClick={toggleForm}
                                            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
                                        >
                                            <FiPlus /> Add Your First Address
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* Map Section */}
                    <div className={`w-full md:w-1/2 ${isMapVisible ? 'block' : 'hidden'} md:block p-4 border-l border-gray-200`}>
                        <div className="h-full rounded-lg overflow-hidden flex flex-col">
                            {mapPosition ? (
                                <>
                                    <div className="flex-1 relative">
                                        <MapContainer
                                            center={mapPosition}
                                            zoom={15}
                                            style={{ height: "100%", width: "100%" }}
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <LocationMarker
                                                position={mapPosition}
                                                setPosition={setMapPosition}
                                                setSelectedCoords={setSelectedCoords}
                                            />
                                        </MapContainer>
                                        <button
                                            onClick={handleGetCurrentLocation}
                                            disabled={isLocating}
                                            className="absolute bottom-4 left-4 z-[1000] bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                                            title="Find my location"
                                        >
                                            {isLocating ? (
                                                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <FiMapPin className="text-blue-500" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="bg-white p-3 border-t">
                                        <h3 className="font-medium text-gray-800 mb-2">Selected Location</h3>
                                        {selectedCoords && (
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <span className="text-gray-600">Latitude:</span>
                                                    <span className="font-medium ml-2">{selectedCoords.latitude.toFixed(6)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-600">Longitude:</span>
                                                    <span className="font-medium ml-2">{selectedCoords.longitude.toFixed(6)}</span>
                                                </div>
                                                {isReverseLoading ? (
                                                    <div className="col-span-2 text-center py-2">
                                                        <div className="inline-flex items-center gap-2 text-gray-500">
                                                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                            Loading address details...
                                                        </div>
                                                    </div>
                                                ) : reverseGeocoding && (
                                                    <>
                                                        <div className="col-span-2">
                                                            <span className="text-gray-600">Address:</span>
                                                            <p className="font-medium">
                                                                {reverseGeocoding.road && `${reverseGeocoding.road}, `}
                                                                {reverseGeocoding.city || reverseGeocoding.town || reverseGeocoding.village}
                                                                {reverseGeocoding.country && `, ${reverseGeocoding.country}`}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                        <button
                                            onClick={() => {
                                                if (selectedCoords) {
                                                    setIsFormOpen(true);
                                                }
                                            }}
                                            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            disabled={!selectedCoords}
                                        >
                                            <FiPlus /> Use This Location
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex items-center justify-center bg-gray-100">
                                    <div className="text-center p-6">
                                        <FiMapPin className="mx-auto text-4xl text-gray-400 mb-4" />
                                        <p className="text-gray-600 mb-4">
                                            {isMapVisible
                                                ? "Click on the map to select a location"
                                                : "Click 'View on Map' to see an address location"}
                                        </p>
                                        <button
                                            onClick={handleGetCurrentLocation}
                                            disabled={isLocating}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
                                        >
                                            {isLocating ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Locating...
                                                </>
                                            ) : (
                                                <>
                                                    <FiMapPin /> Use My Current Location
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressSettings;