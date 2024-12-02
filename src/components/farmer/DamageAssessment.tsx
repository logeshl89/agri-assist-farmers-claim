import React, { useState } from 'react';
import { Upload, MapPin, Send } from 'lucide-react';
import { damages } from '../../services/api';

interface DamageReport {
  cropType: string;
  damageType: string;
  description: string;
  location: {
    lat: string;
    lng: string;
  };
}

export default function DamageAssessment() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [formData, setFormData] = useState<DamageReport>({
    cropType: '',
    damageType: '',
    description: '',
    location: { lat: '', lng: '' }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleLocationCapture = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          setLocation({ lat, lng });
          setFormData(prev => ({
            ...prev,
            location: { lat, lng }
          }));
        },
        (error) => {
          setError('Error getting location: ' + error.message);
        }
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitFormData = new FormData();
      submitFormData.append('cropType', formData.cropType);
      submitFormData.append('damageType', formData.damageType);
      submitFormData.append('description', formData.description);
      submitFormData.append('location', JSON.stringify(formData.location));

      selectedFiles.forEach((file) => {
        submitFormData.append('images', file);
      });

      await damages.create(submitFormData);
      // Reset form
      setFormData({
        cropType: '',
        damageType: '',
        description: '',
        location: { lat: '', lng: '' }
      });
      setSelectedFiles([]);
      setLocation({ lat: '', lng: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit damage report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Report Crop Damage</h2>
        <p className="text-gray-600 mt-2">
          Submit details about the damage to your crops for assessment
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Crop Type</label>
              <select
                name="cropType"
                value={formData.cropType}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Select crop type</option>
                <option value="rice">Rice</option>
                <option value="wheat">Wheat</option>
                <option value="corn">Corn</option>
                <option value="soybean">Soybean</option>
                <option value="cotton">Cotton</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Damage Type</label>
              <select
                name="damageType"
                value={formData.damageType}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Select damage type</option>
                <option value="flood">Flood</option>
                <option value="drought">Drought</option>
                <option value="pest">Pest Infestation</option>
                <option value="disease">Disease</option>
                <option value="storm">Storm</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={`${location.lat}, ${location.lng}`}
                  placeholder="Capture or enter location coordinates"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  readOnly
                />
              </div>
              <button
                type="button"
                onClick={handleLocationCapture}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                Capture Location
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Images</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <span className="sr-only">Remove</span>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Provide additional details about the damage..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5 mr-2" />
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}