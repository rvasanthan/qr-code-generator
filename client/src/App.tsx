import { QRCodeGenerator } from './components/QRCodeGenerator'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">Generate QR Code</h1>
      <QRCodeGenerator />
    </div>
  )
}

export default App


