import { useState, useEffect } from "react";
import {
  User,
  Bell,
  Shield,
  Github,
  Palette,
  Database,
  Zap,
  Globe,
  Lock,
  Mail,
  Smartphone,
  Eye,
  CreditCard,
  Users,
  Download,
  Code,
  Slack,
  Chrome,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "github", label: "GitHub", icon: Github },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "api", label: "API", icon: Database },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "privacy", label: "Privacy", icon: Eye },
  { id: "slack", label: "Slack", icon: Slack },
  { id: "team", label: "Team", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "developer", label: "Developer", icon: Code },
  { id: "extension", label: "Extension", icon: Chrome },
  { id: "data", label: "Data", icon: Download },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [teamName, setTeamName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [defaultRole, setDefaultRole] = useState("Member");
  const [allowInvites, setAllowInvites] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToastNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSendInvite = () => {
    if (!inviteEmail) {
      showToastNotification("Please enter an email address", "error");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      showToastNotification("Please enter a valid email address", "error");
      return;
    }

    showToastNotification(`Invite sent to ${inviteEmail}!`, "success");
    // Clear the email input after sending
    setInviteEmail("");
  };

  useEffect(() => {
    // Handle initial hash
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setActiveSection(id);
    }

    // Update active section based on scroll position
    const handleScroll = () => {
      const sections = settingsSections.map((s) => s.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Handle hash change
    const handleHashChange = () => {
      const id = window.location.hash.substring(1);
      if (id) {
        setActiveSection(id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-4 z-50 animate-slide-in">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg px-6 py-4 flex items-center gap-3 min-w-[300px]">
            {toastType === "success" ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <AlertCircle className="text-red-500" size={20} />
            )}
            <p className="text-white text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-8 space-y-1">
              {settingsSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group ${
                      isActive
                        ? "text-white bg-blue-600/20 border border-blue-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <section.icon
                      size={18}
                      className={`transition-colors ${
                        isActive
                          ? "text-blue-400"
                          : "text-gray-500 group-hover:text-white"
                      }`}
                    />
                    <span className="text-sm font-medium">{section.label}</span>
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <section
              id="profile"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <User className="text-blue-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Profile Settings
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Update your personal information
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </section>

            <section
              id="github"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Github className="text-emerald-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    GitHub Integration
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Connect your GitHub account
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    placeholder="yourusername"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Access Token
                  </label>
                  <input
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Default Repository
                  </label>
                  <input
                    type="text"
                    placeholder="username/repository"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="auto-sync"
                      className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-emerald-500"
                    />
                    <label
                      htmlFor="auto-sync"
                      className="text-sm text-gray-300"
                    >
                      Enable auto-sync
                    </label>
                  </div>
                  <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                    Connect GitHub
                  </button>
                </div>
              </div>
            </section>

            <section
              id="notifications"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Bell className="text-amber-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Notification Preferences
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Manage how you receive notifications
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-400" size={18} />
                    <div>
                      <p className="text-white font-medium text-sm">
                        Email Notifications
                      </p>
                      <p className="text-gray-500 text-xs">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <Smartphone className="text-gray-400" size={18} />
                    <div>
                      <p className="text-white font-medium text-sm">
                        Push Notifications
                      </p>
                      <p className="text-gray-500 text-xs">
                        Receive push notifications on your device
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <Bell className="text-gray-400" size={18} />
                    <div>
                      <p className="text-white font-medium text-sm">
                        Desktop Notifications
                      </p>
                      <p className="text-gray-500 text-xs">
                        Show desktop notifications
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Zap className="text-gray-400" size={18} />
                    <div>
                      <p className="text-white font-medium text-sm">
                        Activity Alerts
                      </p>
                      <p className="text-gray-500 text-xs">
                        Get notified about important activities
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
              </div>
            </section>

            <section
              id="security"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Shield className="text-red-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Security Settings
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Keep your account secure
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your current password"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-6">
                  <div className="flex items-center gap-2">
                    <Lock className="text-gray-400" size={18} />
                    <div>
                      <p className="text-white font-medium text-sm">
                        Two-Factor Authentication
                      </p>
                      <p className="text-gray-500 text-xs">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-750 text-white rounded-lg text-sm font-medium transition-colors border border-gray-700">
                    Enable 2FA
                  </button>
                </div>
                <div className="flex justify-end pt-2">
                  <button className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </section>

            <section
              id="appearance"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-500/10 rounded-lg">
                  <Palette className="text-violet-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Appearance
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Customize how the app looks
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="p-4 bg-gray-800 border-2 border-violet-500 rounded-lg text-center transition-all hover:bg-gray-750">
                      <div className="w-full h-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded mb-2"></div>
                      <p className="text-white text-sm font-medium">Dark</p>
                    </button>
                    <button className="p-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-center transition-all hover:bg-gray-750 hover:border-gray-600">
                      <div className="w-full h-12 bg-gradient-to-br from-gray-100 to-white rounded mb-2"></div>
                      <p className="text-white text-sm font-medium">Light</p>
                    </button>
                    <button className="p-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-center transition-all hover:bg-gray-750 hover:border-gray-600">
                      <div className="w-full h-12 bg-gradient-to-br from-gray-900 via-gray-100 to-gray-900 rounded mb-2"></div>
                      <p className="text-white text-sm font-medium">Auto</p>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Accent Color
                  </label>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 bg-blue-500 rounded-lg ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900"></button>
                    <button className="w-10 h-10 bg-emerald-500 rounded-lg hover:ring-2 hover:ring-emerald-500 hover:ring-offset-2 hover:ring-offset-gray-900"></button>
                    <button className="w-10 h-10 bg-amber-500 rounded-lg hover:ring-2 hover:ring-amber-500 hover:ring-offset-2 hover:ring-offset-gray-900"></button>
                    <button className="w-10 h-10 bg-red-500 rounded-lg hover:ring-2 hover:ring-red-500 hover:ring-offset-2 hover:ring-offset-gray-900"></button>
                    <button className="w-10 h-10 bg-violet-500 rounded-lg hover:ring-2 hover:ring-violet-500 hover:ring-offset-2 hover:ring-offset-gray-900"></button>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="api"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Database className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    API Configuration
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Manage your API keys and endpoints
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="sk_live_xxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <button className="px-4 py-2.5 bg-gray-800 hover:bg-gray-750 text-white rounded-lg font-medium transition-colors border border-gray-700">
                      Regenerate
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://api.yoursite.com/webhook"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Rate Limit (req/min)
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      placeholder="30"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors">
                    Save API Settings
                  </button>
                </div>
              </div>
            </section>

            <section
              id="localization"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <Globe className="text-teal-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Localization
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Set your language and region preferences
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC+1 (CET)</option>
                      <option>UTC+9 (JST)</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date Format
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Time Format
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>12-hour</option>
                      <option>24-hour</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            </section>

            <section
              id="privacy"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-500/10 rounded-lg">
                  <Eye className="text-rose-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Privacy Settings
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Control your data and privacy preferences
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <div>
                    <p className="text-white font-medium text-sm">
                      Profile Visibility
                    </p>
                    <p className="text-gray-500 text-xs">
                      Make your profile visible to others
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-rose-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <div>
                    <p className="text-white font-medium text-sm">
                      Activity Status
                    </p>
                    <p className="text-gray-500 text-xs">
                      Show when you're active
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-rose-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <div>
                    <p className="text-white font-medium text-sm">
                      Search Engine Indexing
                    </p>
                    <p className="text-gray-500 text-xs">
                      Allow search engines to index your profile
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-rose-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-white font-medium text-sm">
                      Data Collection
                    </p>
                    <p className="text-gray-500 text-xs">
                      Allow anonymous usage data collection
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-rose-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>
              </div>
            </section>

            <section
              id="slack"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Slack className="text-indigo-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Slack Integration
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Connect your Slack workspace
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    placeholder="your-workspace"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bot Token
                  </label>
                  <input
                    type="password"
                    placeholder="xoxb-xxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Default Channel
                  </label>
                  <input
                    type="text"
                    placeholder="#general"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="slack-notifications"
                      className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="slack-notifications"
                      className="text-sm text-gray-300"
                    >
                      Send notifications to Slack
                    </label>
                  </div>
                  <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                    Connect Slack
                  </button>
                </div>
              </div>
            </section>

            <section
              id="team"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Users className="text-orange-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Team Management
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Manage your team members and permissions
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your  Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Invite Team Members
                  </label>
                  <input
                    type="email"
                    placeholder="colleague@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSendInvite();
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Default Role
                  </label>
                  <select
                    value={defaultRole}
                    onChange={(e) => setDefaultRole(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>Member</option>
                    <option>Admin</option>
                    <option>Viewer</option>
                    <option>Editor</option>
                  </select>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="team-invites"
                      checked={allowInvites}
                      onChange={(e) => setAllowInvites(e.target.checked)}
                      className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-orange-500"
                    />
                    <label
                      htmlFor="team-invites"
                      className="text-sm text-gray-300"
                    >
                      Allow members to invite others
                    </label>
                  </div>
                  <button
                    onClick={handleSendInvite}
                    className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Send Invite
                  </button>
                </div>
              </div>
            </section>

            <section
              id="billing"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <CreditCard className="text-green-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Billing & Subscription
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Manage your subscription and payment methods
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">Current Plan</p>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                      Pro
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    $29/month • Renews on Dec 8, 2025
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Payment Method
                  </label>
                  <div className="flex items-center gap-3 p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <CreditCard className="text-gray-400" size={20} />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">
                        •••• •••• •••• 4242
                      </p>
                      <p className="text-gray-500 text-xs">Expires 12/2026</p>
                    </div>
                    <button className="px-4 py-2 bg-gray-750 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors border border-gray-600">
                      Update
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Billing Email
                  </label>
                  <input
                    type="email"
                    placeholder="billing@example.com"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-between pt-2">
                  <button className="px-6 py-2.5 bg-gray-800 hover:bg-gray-750 text-white rounded-lg font-medium transition-colors border border-gray-700">
                    View Invoices
                  </button>
                  <button className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </section>

            <section
              id="developer"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Code className="text-purple-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Developer Tools
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Configure developer-specific settings
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    IDE Integration
                  </label>
                  <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Visual Studio Code</option>
                    <option>JetBrains IDEs</option>
                    <option>Sublime Text</option>
                    <option>Vim/Neovim</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Code Editor Theme
                  </label>
                  <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Monokai</option>
                    <option>Dracula</option>
                    <option>One Dark Pro</option>
                    <option>GitHub Dark</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tab Size
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>2 spaces</option>
                      <option>4 spaces</option>
                      <option>8 spaces</option>
                      <option>Tabs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Line Ending
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>LF (Unix)</option>
                      <option>CRLF (Windows)</option>
                      <option>Auto</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="auto-format"
                      className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-purple-500"
                      defaultChecked
                    />
                    <label
                      htmlFor="auto-format"
                      className="text-sm text-gray-300"
                    >
                      Auto-format on save
                    </label>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </section>

            <section
              id="extension"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <Chrome className="text-pink-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Browser Extension
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Configure browser extension settings
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Extension API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="ext_xxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button className="px-4 py-2.5 bg-gray-800 hover:bg-gray-750 text-white rounded-lg font-medium transition-colors border border-gray-700">
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sync Interval
                  </label>
                  <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    <option>Real-time</option>
                    <option>Every 5 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Every hour</option>
                    <option>Manual only</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <div>
                    <p className="text-white font-medium text-sm">
                      Context Menu Integration
                    </p>
                    <p className="text-gray-500 text-xs">
                      Add extension to right-click menu
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-white font-medium text-sm">
                      Badge Notifications
                    </p>
                    <p className="text-gray-500 text-xs">
                      Show notification count on extension icon
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>
                <div className="flex justify-end pt-2">
                  <button className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors">
                    Update Settings
                  </button>
                </div>
              </div>
            </section>

            <section
              id="data"
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-sky-500/10 rounded-lg">
                  <Download className="text-sky-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Data Management
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Export, import, and manage your data
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">
                        Export All Data
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Download a copy of all your data in JSON format
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium transition-colors">
                      Export
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">
                        Import Data
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Import your data from a JSON file
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-gray-750 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors border border-gray-600">
                      Choose File
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Auto Backup
                  </label>
                  <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                    <option>Disabled</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 font-medium text-sm mb-2">
                      Danger Zone
                    </p>
                    <p className="text-gray-400 text-xs mb-3">
                      Permanently delete your account and all associated data
                    </p>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
