import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState<string>('');

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

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold text-gray-700 text-center">Static QR Code Generator</h2>
      <div className="w-full">
        <input
          type="text"
          placeholder="Enter URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400 bg-gray-50"
        />
      </div>
      
      {url && (
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <QRCodeCanvas
              id="qr-code"
              value={url}
              size={256}
              level={"H"}
              includeMargin={true}
            />
          </div>
          <button 
            onClick={handleDownload}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all transform active:scale-95 shadow-md hover:shadow-lg"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};
