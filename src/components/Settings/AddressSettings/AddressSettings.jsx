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
    const [isMapVisible, setIsMapVisible] = useState(false);
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
                setMapPosition([latitude, longitude]);
                setSelectedCoords({ latitude, longitude });
                setIsMapVisible(true);
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
                setIsMapVisible(true);

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
            setMapPosition([address.coordinates.latitude, address.coordinates.longitude]);
            setSelectedCoords(address.coordinates);
            setReverseGeocoding(address.reverseGeocoding || null);
            setIsMapVisible(true);
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

    const toggleMapVisibility = () => {
        setIsMapVisible(!isMapVisible);
    };

    const handleMapClick = async (coords) => {
        setSelectedCoords(coords);
        await reverseGeocode(coords.latitude, coords.longitude);
        setIsFormOpen(true);
    };

    return (
        <div className="max-w-7xl mx-auto p-2 sm:p-4 h-[calc(100vh-4rem)] md:h-[594px] overflow-hidden relative">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full border border-gray-100">
                {/* Header */}
                <div className="p-2 border-b border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <FiMapPin className="text-blue-500" />
                                My Addresses
                            </h1>
                            <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                                {addresses.length} saved {addresses.length === 1 ? 'address' : 'addresses'}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={toggleMapVisibility}
                                className="md:hidden p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <FiMapPin size={20} />
                            </button>
                            <button
                                onClick={toggleForm}
                                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
                            >
                                {isFormOpen ? <FiX size={16} /> : <FiPlus size={16} />}
                                {isFormOpen ? 'Cancel' : 'Add New'}
                            </button>
                        </div>
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

                {/* Main Content */}
                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Map Section - First in DOM but appears on top in mobile due to flex-col-reverse */}
                    <div className={`${isMapVisible ? 'flex' : 'hidden'} md:flex md:w-1/2 flex-col border-t md:border-t-0 md:border-l border-gray-200`}>
                        <MapSection
                            position={mapPosition}
                            setPosition={setMapPosition}
                            setSelectedCoords={handleMapClick}
                            onUseLocation={handleGetCurrentLocation}
                            isLocating={isLocating}
                            mapRef={mapRef}
                        />
                    </div>

                    {/* Address List */}
                    <div className="flex-1 overflow-y-auto">
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
                            loadingGeo={loadingGeo}
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

                {/* Mobile map toggle */}
                <div className="md:hidden p-3 border-t border-gray-200 mb-[20px]">
                    <button
                        onClick={toggleMapVisibility}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded transition-colors"
                    >
                        <FiMapPin size={16} />
                        {isMapVisible ? 'Hide Map' : 'Show Map'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressSettings;