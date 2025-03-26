import { FiX, FiCheck, FiStar } from 'react-icons/fi';

export const StatusMessages = ({
    error,
    successMessage,
    defaultAddressIndex,
    addresses,
    onClearError,
    onClearSuccess
}) => {
    return (
        <>
            {error && (
                <div className="mt-2 p-2 bg-red-50 text-red-700 rounded border border-red-100 flex items-start gap-2">
                    <FiX className="flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-sm">Error</p>
                        <p className="text-xs">{error}</p>
                    </div>
                    <button
                        onClick={onClearError}
                        className="ml-auto text-red-600 hover:text-red-800"
                    >
                        <FiX size={16} />
                    </button>
                </div>
            )}

            {successMessage && (
                <div className="mt-2 p-2 bg-green-50 text-green-700 rounded border border-green-100 flex items-start gap-2">
                    <FiCheck className="flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-sm">Success</p>
                        <p className="text-xs">{successMessage}</p>
                    </div>
                    <button
                        onClick={onClearSuccess}
                        className="ml-auto text-green-600 hover:text-green-800"
                    >
                        <FiX size={16} />
                    </button>
                </div>
            )}

            {defaultAddressIndex !== null && (
                <div className="mt-2 p-2 bg-blue-50 text-blue-800 rounded border border-blue-100 flex items-center gap-2">
                    <FiStar className="text-yellow-500 flex-shrink-0" />
                    <p className="text-sm truncate">
                        Default: {addresses[defaultAddressIndex]?.street}, {addresses[defaultAddressIndex]?.city}
                    </p>
                </div>
            )}
        </>
    );
};