// pages/UserProfile.js - Update dengan konten template
export default function UserProfile() {
    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-xl shadow mb-6">
                {/* Header Profile */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl p-8 text-white">
                    <div className="flex items-center space-x-4">
                        <img src="/avatar.jpg" className="w-24 h-24 rounded-full border-4 border-white" />
                        <div>
                            <h2 className="text-2xl font-bold">Devont Lane</h2>
                            <p>@DevontLane | LinkedIn</p>
                            <p>hello@gmail.com</p>
                        </div>
                    </div>
                </div>
                
                {/* About Section */}
                <div className="p-6 border-b">
                    <h3 className="font-bold text-lg mb-2">About</h3>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <div className="mt-3 space-y-1 text-sm">
                        <p>📧 nijome@domain.com</p>
                        <p>📞 09232125612</p>
                        <p>📍 Location: USA</p>
                    </div>
                </div>
                
                {/* Stats Grid - Pizza, Burger, Posta */}
                <div className="grid md:grid-cols-3 gap-4 p-6">
                    {['Pizza', 'Burger', 'Posta'].map(item => (
                        <div key={item} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-bold mb-2">{item}</h4>
                            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    ))}
                </div>
                
                {/* Action Buttons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                    {['Online Order', 'DineIn', 'Reviews', 'Photos', 
                      'Followers', 'Bookmarks', 'Been There', 'Achievements', 'Blogs'].map(btn => (
                        <div key={btn} className="bg-green-50 rounded-lg p-4 text-center cursor-pointer hover:bg-green-100">
                            <div className="text-green-600 font-bold">{btn}</div>
                            <div className="flex justify-center space-x-4 mt-2 text-sm">
                                <span>👍 140</span>
                                <span>💬 96</span>
                                <span>↗️ Share</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}