import { AnimatePresence, motion } from 'framer-motion';
import { AddressItem } from './AddressItem';
import { FiMapPin, FiPlus } from 'react-icons/fi';

export const AddressList = ({
    filteredAddresses,
    defaultAddressIndex,
    isFormOpen,
    searchTerm,
    onEdit,
    onViewOnMap,
    onDelete,
    onSetDefault,
    loadingGeo,
    toggleForm,
    AddressFormWrapper
}) => {
    return (
        <div className="w-full  p-2 sm:p-4 overflow-y-auto">
            <AnimatePresence>
                {isFormOpen && <AddressFormWrapper />}
            </AnimatePresence>

            {filteredAddresses.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                    {filteredAddresses.map((addr, index) => (
                        <AddressItem
                            key={addr.timestamp || index}
                            addr={addr}
                            index={index}
                            isDefault={defaultAddressIndex === index}
                            onEdit={onEdit}
                            onViewOnMap={onViewOnMap}
                            onDelete={onDelete}
                            onSetDefault={onSetDefault}
                            loadingGeo={loadingGeo}
                        />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center p-6 bg-gray-50 rounded-lg"
                >
                    <FiMapPin className="text-3xl text-gray-400 mb-3" />
                    <p className="text-gray-600 mb-4">
                        {searchTerm
                            ? "No addresses match your search"
                            : "No saved addresses yet"}
                    </p>
                    <button
                        onClick={toggleForm}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
                    >
                        <FiPlus size={14} /> Add Address
                    </button>
                </motion.div>
            )}
        </div>
    );
};