import { motion } from 'framer-motion';
import AddressForm from './AddressForm';

export const AddressFormWrapper = ({
    isFormOpen,
    onAddAddress,
    addressToEdit,
    onCancelEdit,
    selectedCoords,
    reverseGeocoding,
    onGeocode,
    loadingGeo
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-4 "
        >
            <AddressForm
                onAddAddress={onAddAddress}
                addressToEdit={addressToEdit}
                onCancelEdit={onCancelEdit}
                selectedCoords={selectedCoords}
                reverseGeocoding={reverseGeocoding}
                onGeocode={onGeocode}
                loadingGeo={loadingGeo}
            />
        </motion.div>
    );
};