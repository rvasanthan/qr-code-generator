import { QRCodeGenerator } from './components/QRCodeGenerator'
import { QrCode, Github } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">QR Master</span>
          </div>
          <a 
            href="https://github.com/rvasanthan/qr-code-generator" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
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
              © {new Date().getFullYear()} QR Master. Open source project.
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


