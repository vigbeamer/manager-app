import { useEffect, useState, useRef } from "react";
import { Search, Clock, Zap, X, Bot, Loader2 } from "lucide-react";

interface CommandBarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Declare userflow on window object
declare global {
  interface Window {
    userflow?: {
      start: (flowId: string) => void;
    };
  }
}

const TRENDING_SEARCHES = [
  "GitHub Integration",
  "API Settings",
  "Profile Settings",
  "Notification Preferences",
  "Security Settings",
  "Team Management",
];

const RECENT_HISTORY = [
  "Dark mode toggle",
  "Email notifications",
  "Privacy settings",
  "Account settings",
];

export function CommandBar({ isOpen, onClose }: CommandBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiLoadingMessage, setAiLoadingMessage] = useState("thinking...");
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      // Reset state when closing
      setIsAiSearching(false);
      setIsClosing(false);
      setSearchQuery("");
      setAiLoadingMessage("thinking...");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleAiSearch = () => {
    setIsAiSearching(true);
    setAiLoadingMessage("thinking...");

    // Stage 1: Thinking (800ms)
    setTimeout(() => {
      setAiLoadingMessage("starting a flow for you");

      // Stage 2: Starting flow (800ms)
      setTimeout(() => {
        setIsClosing(true);

        // Stage 3: Fade out animation (300ms) then call userflow
        setTimeout(() => {
          if (
            window.userflow &&
            process.env.VITE_USERFLOWJS_TEAM_MANAGEMENT_FLOW
          ) {
            window.userflow.start(
              process.env.VITE_USERFLOWJS_TEAM_MANAGEMENT_FLOW
            );
          }
          onClose();
          // Reset states after close
          setTimeout(() => {
            setIsAiSearching(false);
            setIsClosing(false);
            setAiLoadingMessage("thinking...");
          }, 100);
        }, 300);
      }, 800);
    }, 1500);
  };

  if (!isOpen) return null;

  // Filter searches based on query
  const filteredRecent = searchQuery
    ? RECENT_HISTORY.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : RECENT_HISTORY;

  const filteredTrending = searchQuery
    ? TRENDING_SEARCHES.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : TRENDING_SEARCHES;

  const hasResults = filteredRecent.length > 0 || filteredTrending.length > 0;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
          <Search className="text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for settings, features, or commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-gray-900 placeholder-gray-400 outline-none text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <kbd className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded font-mono">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {hasResults && (
            <>
              {filteredRecent.length > 0 && (
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-gray-500" />
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Recent History
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {filteredRecent.map((item, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 text-sm transition-colors flex items-center gap-3"
                      >
                        <Clock size={16} className="text-gray-400" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredTrending.length > 0 && (
                <div
                  className={`${
                    filteredRecent.length > 0 ? "border-t border-gray-100" : ""
                  } px-4 py-3`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} className="text-gray-500" />
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Trending Searches
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {filteredTrending.map((item, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 text-sm transition-colors flex items-center gap-3"
                      >
                        <Zap size={16} className="text-amber-500" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {searchQuery && !hasResults && (
            <div className="px-4 py-3">
              {isAiSearching ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2
                    size={32}
                    className="text-blue-500 animate-spin mb-3"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {aiLoadingMessage === "thinking..." ? "🤔" : "🚦"}
                    </span>
                    <p className="text-sm text-gray-600 font-medium capitalize">
                      {aiLoadingMessage}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">"{searchQuery}"</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <Bot size={16} className="text-blue-500" />
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      AI Assistant
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={handleAiSearch}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 text-sm transition-colors flex items-center gap-3 group"
                    >
                      <Bot size={16} className="text-blue-500" />
                      <span className="font-medium">
                        Ask AI:{" "}
                        <span className="font-normal">{searchQuery}</span>
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 100 100"
              className="w-4 h-4"
            >
              <path
                fill="currentColor"
                d="m61.539 30.37-1.652 9.37c-1.762 10-11.293 18-21.244 18h-8.159c-10.011 0-16.628-8.09-14.877-18l3.314-18.77h9.42l-3.313 18.77a6.992 6.992 0 0 0 1.405 6.088 7.006 7.006 0 0 0 5.713 2.542h8.16a10.77 10.77 0 0 0 6.58-2.553 10.748 10.748 0 0 0 3.58-6.077l2.483-14.07a5.849 5.849 0 0 1 5.537-4.7h17.43l1.08-6.15C78.448 6.63 72.992 0 64.783 0H24.738C16.548 0 8.72 6.63 7.288 14.82l-7.008 40C-1.16 63 4.285 69.63 12.494 69.63h40.045c8.199 0 16.018-6.63 17.45-14.81l4.314-24.45H61.54Z"
              />
              <path
                fill="currentColor"
                d="M87.668 30.37h-4.004l-6.097 34.57c-1.442 8.18-9.26 14.82-17.45 14.82h-36.09l-.951 5.43C21.624 93.37 27.08 100 35.289 100h40.045c8.19 0 16.018-6.63 17.45-14.81l7.008-40c1.531-8.18-3.935-14.82-12.124-14.82Z"
              />
            </svg>
            <p>
              Made with <span className="font-semibold">Userflow</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
