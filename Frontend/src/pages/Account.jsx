const Account = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        {/* Account Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-extrabold mb-6 text-gray-800">Account Information</h2>
          <div className="space-y-4">
            <p className="text-xl font-semibold text-gray-800">John Doe</p>
            <p className="text-gray-600">johndoe@example.com</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Account Settings</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Name</label>
              <input type="text" value="John Doe" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Email</label>
              <input type="email" value="johndoe@example.com" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold">Telephone</label>
              <input type="text" value="+1 (555) 123-4567" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Address</label>
              <input type="text" value="DownTown 123, Sydney" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit" className="w-full bg-[#1e1e1e] text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Save Changes</button>
          </form>
        </div>

        {/* Password Management Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Change Password</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold">Current Password</label>
              <input type="password" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-semibold">New Password</label>
              <input type="password" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold">Confirm New Password</label>
              <input type="password" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="w-full bg-[#1e1e1e] text-white p-3 rounded-lg shadow-md hover:bg-gray-500 transition duration-300">Update Password</button>
            <button type="submit" className="w-full bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-gray-500 transition duration-300">Logout</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;