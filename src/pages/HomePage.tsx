import { Zap, TrendingUp, Activity, Users } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back
          </h1>
          <p className="text-gray-400 text-lg">
            Here's what's happening with your projects today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity className="text-blue-400" size={24} />
              </div>
              <span className="text-green-400 text-sm font-medium">+12%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Active Projects</h3>
            <p className="text-3xl font-bold text-white">24</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Users className="text-emerald-400" size={24} />
              </div>
              <span className="text-green-400 text-sm font-medium">+5%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Team Members</h3>
            <p className="text-3xl font-bold text-white">128</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Zap className="text-amber-400" size={24} />
              </div>
              <span className="text-green-400 text-sm font-medium">+23%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Performance</h3>
            <p className="text-3xl font-bold text-white">98.5%</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-violet-500/10 rounded-lg">
                <TrendingUp className="text-violet-400" size={24} />
              </div>
              <span className="text-green-400 text-sm font-medium">+18%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Growth</h3>
            <p className="text-3xl font-bold text-white">$45.2k</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'New deployment', project: 'Frontend App', time: '2 minutes ago' },
                { action: 'Settings updated', project: 'API Service', time: '1 hour ago' },
                { action: 'Team member added', project: 'Mobile App', time: '3 hours ago' },
                { action: 'Build completed', project: 'Backend Service', time: '5 hours ago' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                  <div>
                    <p className="text-white text-sm font-medium">{item.action}</p>
                    <p className="text-gray-500 text-sm">{item.project}</p>
                  </div>
                  <span className="text-gray-500 text-xs">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-gray-800 hover:bg-gray-750 rounded-lg text-left transition-colors border border-gray-700 hover:border-gray-600">
                <Activity className="text-blue-400 mb-2" size={24} />
                <h3 className="text-white font-medium text-sm mb-1">New Project</h3>
                <p className="text-gray-500 text-xs">Create a new project</p>
              </button>
              <button className="p-4 bg-gray-800 hover:bg-gray-750 rounded-lg text-left transition-colors border border-gray-700 hover:border-gray-600">
                <Users className="text-emerald-400 mb-2" size={24} />
                <h3 className="text-white font-medium text-sm mb-1">Invite Team</h3>
                <p className="text-gray-500 text-xs">Add team members</p>
              </button>
              <button className="p-4 bg-gray-800 hover:bg-gray-750 rounded-lg text-left transition-colors border border-gray-700 hover:border-gray-600">
                <Zap className="text-amber-400 mb-2" size={24} />
                <h3 className="text-white font-medium text-sm mb-1">Deploy</h3>
                <p className="text-gray-500 text-xs">Deploy your app</p>
              </button>
              <button className="p-4 bg-gray-800 hover:bg-gray-750 rounded-lg text-left transition-colors border border-gray-700 hover:border-gray-600">
                <TrendingUp className="text-violet-400 mb-2" size={24} />
                <h3 className="text-white font-medium text-sm mb-1">Analytics</h3>
                <p className="text-gray-500 text-xs">View insights</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
