import { useState, useEffect } from 'react'
import { QRCodeGenerator } from './components/QRCodeGenerator'
import { Login } from './components/Login'
import { QrCode, LogOut } from 'lucide-react'
import { auth, db } from './firebase'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.email) {
        try {
          // Check if user exists in the 'allowed_users' collection
          // We use the email as the document ID for easy lookup
          const userDocRef = doc(db, 'allowed_users', currentUser.email);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser(currentUser);
            setAuthError(undefined);
          } else {
            // User is authenticated but not authorized
            await signOut(auth);
            setAuthError(`Access denied. The email ${currentUser.email} is not authorized.`);
            setUser(null);
          }
        } catch (error) {
          console.error("Error checking user permission:", error);
          setAuthError("Error verifying permissions. Please try again.");
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login error={authError} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Nexus QR</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
              <img src={user.photoURL || ''} alt="Profile" className="w-5 h-5 rounded-full" />
              <span>{user.email}</span>
            </div>
            <button 
              onClick={handleSignOut}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Generate QR Codes <span className="text-blue-600">Instantly</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create custom, high-quality QR codes for your links, business cards, and more. 
            Completely free and runs entirely in your browser.
          </p>
        </div>

        <QRCodeGenerator />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Nexus QR. Open source project.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


