import React, { useState, useEffect, useRef } from "react";
import { MapSection } from "./MapSection";
import { AddressList } from "./AddressList";
import { StatusMessages } from "./StatusMessages";
import { AddressFormWrapper } from "./AddressFormWrapper";
import { FiSearch, FiPlus, FiX, FiMapPin } from "react-icons/fi";
import axios from 'axios';

const AddressSettings = () => {
    // State declarations
    const [addresses, setAddresses] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [defaultAddressIndex, setDefaultAddressIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
    const [loadingGeo, setLoadingGeo] = useState(false);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [reverseGeocoding, setReverseGeocoding] = useState(null);
    const [isReverseLoading, setIsReverseLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLocating, setIsLocating] = useState(false);
    const mapRef = useRef();

    // Load saved addresses from localStorage
    useEffect(() => {
        try {
            const storedAddresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
            const storedDefaultIndex = parseInt(localStorage.getItem("defaultAddressIndex")) || null;
            setAddresses(storedAddresses);
            setDefaultAddressIndex(storedDefaultIndex);
        } catch (err) {
            console.error("Failed to load addresses:", err);
            setError("Failed to load saved addresses");
        }
    }, []);

    // Filter addresses based on search term
    const filteredAddresses = addresses.filter(addr =>
        Object.values(addr).some(
            val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ));

    // Handle getting current location
    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newPosition = [latitude, longitude];
                setMapPosition(newPosition);
                setSelectedCoords({ latitude, longitude });

                // Fly to the new position
                if (mapRef.current) {
                    mapRef.current.flyTo(newPosition, 15, {
                        duration: 1,
                        easeLinearity: 0.25
                    });
                }

                reverseGeocode(latitude, longitude);
                setIsLocating(false);
            },
            (err) => {
                console.error("Geolocation error:", err);
                setError("Unable to retrieve location");
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    // Geocode address to coordinates
    const geocodeAddress = async (address) => {
        try {
            setLoadingGeo(true);
            setError(null);
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
                { headers: { 'Accept-Language': 'en' } }
            );

            if (response.data?.length > 0) {
                const { lat, lon, display_name } = response.data[0];
                const coords = [parseFloat(lat), parseFloat(lon)];
                setMapPosition(coords);
                setSelectedCoords({ latitude: coords[0], longitude: coords[1] });

                // Fly to the new position
                if (mapRef.current) {
                    mapRef.current.flyTo(coords, 15, {
                        duration: 1,
                        easeLinearity: 0.25
                    });
                }

                const addressParts = display_name.split(', ');
                setReverseGeocoding({
                    road: addressParts[0] || '',
                    city: addressParts[addressParts.length - 3] || '',
                    country: addressParts[addressParts.length - 1] || ''
                });
            } else {
                setError("Address not found. Try a more specific location.");
            }
        } catch (error) {
            console.error("Geocoding error:", error);
            setError("Failed to geocode address");
        } finally {
            setLoadingGeo(false);
        }
    };

    // Reverse geocode coordinates to address
    const reverseGeocode = async (lat, lng) => {
        try {
            setIsReverseLoading(true);
            setError(null);
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
                { headers: { 'Accept-Language': 'en' } }
            );

            if (response.data) {
                setReverseGeocoding(response.data.address);
            }
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            setError("Failed to get address details");
        } finally {
            setIsReverseLoading(false);
        }
    };

    // Save address
    const handleAddAddress = (newAddress) => {
        try {
            const addressWithCoords = {
                ...newAddress,
                coordinates: selectedCoords,
                reverseGeocoding,
                timestamp: new Date().toISOString()
            };

            let updatedAddresses;
            if (editingIndex !== null) {
                updatedAddresses = [...addresses];
                updatedAddresses[editingIndex] = addressWithCoords;
                setSuccessMessage("Address updated");
            } else {
                updatedAddresses = [...addresses, addressWithCoords];
                setSuccessMessage("Address added");
            }

            setAddresses(updatedAddresses);
            localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));

            if (editingIndex === null && addresses.length === 0) {
                setDefaultAddressIndex(0);
                localStorage.setItem("defaultAddressIndex", 0);
            }

            setIsFormOpen(false);
            setSelectedCoords(null);
            setReverseGeocoding(null);
            setEditingIndex(null);
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            console.error("Failed to save address:", err);
            setError("Failed to save address");
        }
    };

    const handleViewOnMap = (address) => {
        if (address.coordinates) {
            const newPosition = [address.coordinates.latitude, address.coordinates.longitude];
            setMapPosition(newPosition);
            setSelectedCoords(address.coordinates);
            setReverseGeocoding(address.reverseGeocoding || null);

            // Fly to the new position
            if (mapRef.current) {
                mapRef.current.flyTo(newPosition, 15, {
                    duration: 1,
                    easeLinearity: 0.25
                });
            }
        } else {
            geocodeAddress(`${address.street}, ${address.city}, ${address.country}`);
        }
    };

    const handleDeleteAddress = (index) => {
        if (window.confirm("Delete this address?")) {
            try {
                const updatedAddresses = addresses.filter((_, i) => i !== index);
                setAddresses(updatedAddresses);
                localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
                setSuccessMessage("Address deleted");

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
            setSuccessMessage("Default address updated");
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
            setSelectedCoords(null);
            setReverseGeocoding(null);
            setError(null);
        }
    };

    const handleMapClick = async (coords) => {
        setSelectedCoords(coords);
        await reverseGeocode(coords.latitude, coords.longitude);
        setIsFormOpen(true);
    };

    return (
        <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] mx-auto p-[0.5rem] sm:p-[1rem] h-[calc(100dvh-4rem)] overflow-hidden relative">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full border border-gray-100">
                {/* Map Section - Always visible at top */}
                <div className="md-h-[30dvh] md:min-h-[200px] border-b border-gray-200">
                    <MapSection
                        position={mapPosition}
                        setPosition={setMapPosition}
                        setSelectedCoords={handleMapClick}
                        onUseLocation={handleGetCurrentLocation}
                        isLocating={isLocating}
                        mapRef={mapRef}
                    />
                </div>

                {/* Address List - Scrollable area below map */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-1 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <FiMapPin className="text-blue-500" />
                                Saved Addresses ({addresses.length})
                            </h2>
                            <button
                                onClick={toggleForm}
                                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
                            >
                                {isFormOpen ? <FiX size={16} /> : <FiPlus size={16} />}
                                {isFormOpen ? 'Cancel' : 'Add New'}
                            </button>
                        </div>

                        {/* Search and Status */}
                        <div className="mt-3">
                            <StatusMessages
                                error={error}
                                successMessage={successMessage}
                                defaultAddressIndex={defaultAddressIndex}
                                addresses={addresses}
                                onClearError={() => setError(null)}
                                onClearSuccess={() => setSuccessMessage(null)}
                            />
                        </div>
                    </div>

                    <AddressList
                        filteredAddresses={filteredAddresses}
                        defaultAddressIndex={defaultAddressIndex}
                        isFormOpen={isFormOpen}
                        searchTerm={searchTerm}
                        onEdit={(index) => {
                            setEditingIndex(index);
                            setIsFormOpen(true);
                            if (addresses[index].coordinates) {
                                handleViewOnMap(addresses[index]);
                            }
                        }}
                        onViewOnMap={handleViewOnMap}
                        onDelete={handleDeleteAddress}
                        onSetDefault={handleSetDefaultAddress}
                        toggleForm={toggleForm}
                        AddressFormWrapper={() => (
                            <AddressFormWrapper
                                onAddAddress={handleAddAddress}
                                addressToEdit={editingIndex !== null ? addresses[editingIndex] : null}
                                onCancelEdit={toggleForm}
                                selectedCoords={selectedCoords}
                                reverseGeocoding={reverseGeocoding}
                                onGeocode={geocodeAddress}
                                loadingGeo={loadingGeo}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddressSettings;