import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Link, Settings, QrCode, RefreshCw } from 'lucide-react';

export const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [size, setSize] = useState<number>(256);

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleReset = () => {
    setUrl('');
    setFgColor('#000000');
    setBgColor('#ffffff');
    setSize(256);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto">
      {/* Left Column: Controls */}
      <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            Configuration
          </h2>
          <p className="text-gray-500">Customize your QR code content and appearance.</p>
        </div>

        {/* URL Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Destination URL</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400 bg-gray-50 hover:bg-white"
            />
          </div>
        </div>

        {/* Customization Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Foreground Color</label>
            <div className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg bg-gray-50">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-8 w-8 rounded cursor-pointer border-none bg-transparent p-0"
              />
              <span className="text-sm text-gray-600 font-mono">{fgColor}</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Background Color</label>
            <div className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg bg-gray-50">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-8 w-8 rounded cursor-pointer border-none bg-transparent p-0"
              />
              <span className="text-sm text-gray-600 font-mono">{bgColor}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">Size (px)</label>
            <span className="text-sm text-gray-500">{size}x{size}</span>
          </div>
          <input
            type="range"
            min="128"
            max="512"
            step="32"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="pt-4 border-t border-gray-100">
            <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
                <RefreshCw className="w-4 h-4" />
                Reset to Defaults
            </button>
        </div>
      </div>

      {/* Right Column: Preview */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl text-white flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 w-full">
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                        <QrCode className="w-5 h-5" />
                        Live Preview
                    </h3>
                    <p className="text-gray-400 text-sm">
                        {url ? 'Scan this code to visit the URL' : 'Enter a URL to generate a QR code'}
                    </p>
                </div>

                <div className={`p-6 bg-white rounded-xl shadow-lg transition-all duration-500 ${url ? 'opacity-100 scale-100' : 'opacity-50 scale-95 blur-sm'}`}>
                    <QRCodeCanvas
                        id="qr-code"
                        value={url || 'https://example.com'}
                        size={size}
                        fgColor={fgColor}
                        bgColor={bgColor}
                        level={"H"}
                        includeMargin={true}
                    />
                </div>

                <button
                    onClick={handleDownload}
                    disabled={!url}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 ${
                        url 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer' 
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <Download className="w-5 h-5" />
                    Download PNG
                </button>
            </div>
        </div>
        
        <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
                Generated QR codes are static and will work forever.
            </p>
        </div>
      </div>
    </div>
  );
};
