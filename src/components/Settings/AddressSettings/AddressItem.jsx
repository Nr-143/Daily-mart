import { FiEdit2, FiTrash2, FiStar, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const AddressItem = ({
    addr,
    index,
    isDefault,
    onEdit,
    onViewOnMap,
    onDelete,
    onSetDefault,
    loadingGeo
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`border rounded-lg p-3 hover:shadow-xs transition-all ${isDefault ? "border-2 border-blue-400 bg-blue-50" : "border-gray-200"
                }`}
        >
            {isDefault && (
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full inline-flex items-center mb-2">
                    <FiStar className="mr-1" /> Default
                </div>
            )}

            <div className="space-y-1.5">
                <div className="flex">
                    <span className="text-gray-600 text-sm w-20">Name:</span>
                    <span className="text-sm font-medium">{addr.name || '-'}</span>
                </div>
                <div className="flex">
                    <span className="text-gray-600 text-sm w-20">Address:</span>
                    <span className="text-sm">
                        {addr.street && `${addr.street}, `}
                        {addr.city}
                    </span>
                </div>
                <div className="flex">
                    <span className="text-gray-600 text-sm w-20">Country:</span>
                    <span className="text-sm">{addr.country}</span>
                </div>
                {addr.postalCode && (
                    <div className="flex">
                        <span className="text-gray-600 text-sm w-20">Postal Code:</span>
                        <span className="text-sm">{addr.postalCode}</span>
                    </div>
                )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
                <button
                    onClick={() => onEdit(index)}
                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-xs flex items-center gap-1"
                >
                    <FiEdit2 size={12} /> Edit
                </button>
                <button
                    onClick={() => onViewOnMap(addr)}
                    disabled={loadingGeo}
                    className="px-2 py-1 bg-green-50 hover:bg-green-100 text-green-600 rounded text-xs flex items-center gap-1"
                >
                    <FiMapPin size={12} /> View Map
                </button>
                <button
                    onClick={() => onDelete(index)}
                    className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs flex items-center gap-1"
                >
                    <FiTrash2 size={12} /> Delete
                </button>
                {!isDefault && (
                    <button
                        onClick={() => onSetDefault(index)}
                        className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded text-xs flex items-center gap-1"
                    >
                        <FiStar size={12} /> Set Default
                    </button>
                )}
            </div>
        </motion.div>
    );
};