import React, { useState } from "react";
import { FiUser, FiCamera, FiCheck, FiX, FiEdit, FiLock, FiMail, FiPhone, FiCalendar, FiChevronDown } from "react-icons/fi";

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
    const [activeTab, setActiveTab] = useState("profile");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Saved:", user);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-1 ">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-180px)] md:h-[88vh] overflow-y-auto custom-scrollbar">                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                    <h1 className="text-2xl font-bold">Account Settings</h1>
                    <p className="opacity-90 mt-1">Manage your personal information and preferences</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                    >
                        <FiUser className="mr-2" /> Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "security" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                    >
                        <FiLock className="mr-2" /> Security
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    {activeTab === "profile" && (
                        <>
                            {/* Profile Picture Section */}
                            <div className="flex flex-col md:flex-row items-start mb-8 gap-8">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                                        {user.profilePic ? (
                                            <img
                                                src={user.profilePic}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <FiUser className="w-16 h-16 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <label className="absolute -bottom-2 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-all group-hover:opacity-100 opacity-90">
                                        <FiCamera className="text-blue-600" />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                                    <p className="text-gray-600">{user.email}</p>
                                    {selectedFile && (
                                        <div className="flex items-center mt-2 bg-blue-50 rounded-lg p-2 max-w-xs">
                                            <span className="text-sm text-gray-700 truncate">
                                                {selectedFile.name} ({Math.round(selectedFile.size / 1024)}KB)
                                            </span>
                                            <button
                                                className="ml-2 text-green-500 hover:text-green-700"
                                                onClick={() => setSelectedFile(null)}
                                            >
                                                <FiCheck />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            disabled={!isEditing}
                                        />
                                        {!isEditing && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="absolute right-3 top-3 text-gray-400 hover:text-blue-600"
                                            >
                                                <FiEdit size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                                            disabled
                                        />
                                        <button
                                            className="absolute right-3 top-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            disabled={!isEditing}
                                        >
                                            Verify
                                        </button>
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={user.phone}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            disabled={!isEditing}
                                        />
                                        {!isEditing && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="absolute right-3 top-3 text-gray-400 hover:text-blue-600"
                                            >
                                                <FiEdit size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="dob"
                                            value={user.dob}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                                            disabled={!isEditing}
                                        />
                                        {!isEditing && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="absolute right-3 top-3 text-gray-400 hover:text-blue-600"
                                            >
                                                <FiEdit size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                    <div className="relative">
                                        <select
                                            name="gender"
                                            value={user.gender}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none pr-10"
                                            disabled={!isEditing}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                            <option value="Prefer not to say">Prefer not to say</option>
                                        </select>
                                        <div className="absolute right-3 top-3 pointer-events-none">
                                            <FiChevronDown className="text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="flex justify-end gap-3 mt-8">
                                    <button
                                        className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center"
                                        onClick={handleCancel}
                                    >
                                        <FiX className="mr-2" /> Cancel
                                    </button>
                                    <button
                                        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                                        onClick={handleSave}
                                    >
                                        <FiCheck className="mr-2" /> Save Changes
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === "security" && (
                        <div className="space-y-6">
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <FiLock className="mr-2 text-blue-600" /> Change Password
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <FiMail className="mr-2 text-blue-600" /> Email Preferences
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="newsletter"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                                            Receive newsletter and updates
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="promotions"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="promotions" className="ml-2 block text-sm text-gray-700">
                                            Receive promotional offers
                                        </label>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                            Save Preferences
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;