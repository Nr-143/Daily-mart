import React, { useState } from "react";
import { FaUserCircle, FaCamera, FaCheck, FaTimes } from "react-icons/fa";

const AccountSettings = () => {
    const [user, setUser] = useState({
        profilePic: "/images/user.png",
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1 234 567 890",
        dob: "1995-08-15",
        gender: "Male",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Preview the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Save logic here
        setIsEditing(false);
        // You would typically send the data to your backend here
        console.log("Saved:", user);
    };

    const handleCancel = () => {
        // Reset form or cancel changes
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-2 md:p-3 lg:p-1">
            <div className="bg-white rounded-xl mt-[20px]  shadow-md overflow-scroll custom-scrollbar scrollbar-x-hidden md:max-h-[580px] h-[720px]">
                {/* Header */}
                <div className="bg-gradient-to-r from-electric-purple to-midnight-blue p-2 text-white">
                    <h1 className="text-2xl md:text-3xl font-bold">Account Settings</h1>
                    <p className="opacity-90">Manage your profile information</p>
                </div>

                <div className="p-6 md:p-8">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col md:flex-row items-center mb-8 gap-6">
                        <div className="relative">
                            {user.profilePic ? (
                                <img
                                    src={user.profilePic}
                                    alt=""
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                                />
                            ) : (
                                <FaUserCircle className="w-32 h-32 text-gray-300" />
                            )}
                            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition">
                                <FaCamera className="text-electric-purple" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-xl font-semibold text-midnight-blue">{user.name}</h2>
                            <p className="text-gray-600">{user.email}</p>
                            {selectedFile && (
                                <div className="flex items-center justify-center md:justify-start mt-2">
                                    <span className="text-sm text-gray-500 mr-2">
                                        {selectedFile.name} ({Math.round(selectedFile.size / 1024)}KB)
                                    </span>
                                    <button
                                        className="text-green-500 hover:text-green-700"
                                        onClick={() => setSelectedFile(null)}
                                    >
                                        <FaCheck />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-purple focus:border-transparent"
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                                    disabled
                                />
                                <button
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-electric-purple text-white px-2 py-1 rounded"
                                    disabled={!isEditing}
                                >
                                    Verify
                                </button>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-purple focus:border-transparent"
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={user.dob}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-purple focus:border-transparent"
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                name="gender"
                                value={user.gender}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-purple focus:border-transparent"
                                disabled={!isEditing}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>

                        {/* Change Password */}
                        <div className="md:col-span-2">
                            <button
                                className="w-full md:w-auto bg-sunset-orange text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition"
                                onClick={() => setIsEditing(true)}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                        {isEditing ? (
                            <>
                                <button
                                    className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                                    onClick={handleCancel}
                                >
                                    <FaTimes className="inline mr-2" />
                                    Cancel
                                </button>
                                <button
                                    className="px-6 py-3 bg-midnight-blue text-white rounded-lg hover:bg-opacity-90 transition"
                                    onClick={handleSave}
                                >
                                    <FaCheck className="inline mr-2" />
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button
                                className="px-6 py-3 bg-electric-purple text-white rounded-lg hover:bg-opacity-90 transition"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;