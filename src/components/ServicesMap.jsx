import React, { useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Phone, 
  X, 
  Locate, 
  Navigation, 
  Clock, 
  DollarSign,
  CheckCircle,
  Award
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Import mock providers data
import { mockProviders } from '../data/mockProfiles';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c).toFixed(1);
};

// Custom marker icons
const createCustomIcon = (available, isUser = false) => {
  const color = isUser ? '#dc2626' : (available ? '#2563eb' : '#9ca3af');
  const size = isUser ? 16 : 40;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative;">
        ${!isUser ? `
          <div style="
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            opacity: 0.3;
            animation: pulse 2s infinite;
          "></div>
        ` : ''}
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          ${!isUser ? `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          ` : ''}
        </div>
        ${available && !isUser ? `
          <div style="
            position: absolute;
            top: -4px;
            right: -4px;
            width: 14px;
            height: 14px;
            background: #10b981;
            border-radius: 50%;
            border: 2px solid white;
          "></div>
        ` : ''}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Add pulsing animation and custom popup styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0.3;
      }
      50% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
    .leaflet-popup-content-wrapper {
      padding: 0;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
    .leaflet-popup-content {
      margin: 0;
      width: auto !important;
    }
    .leaflet-popup-close-button {
      display: none;
    }
  `;
  document.head.appendChild(style);
}

// Recenter button component
const RecenterButton = ({ center }) => {
  const map = useMap();
  
  const handleRecenter = () => {
    map.flyTo(center, 13, { duration: 1 });
  };

  return null;
};

// Enhanced Provider Info Window
const ProviderInfoWindow = ({ provider, distance, onClose, onBookNow }) => {
  const isAvailable = provider.availability?.status === 'available';
  
  return (
    <div className="bg-white rounded-lg p-4 min-w-[320px] max-w-[320px]">
      <button
        onClose={() => setSelectedProvider(null)}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {provider.fullName.split(' ').map(n => n[0]).join('')}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-900 text-sm line-clamp-1">
              {provider.fullName}
            </h3>
          </div>
          <p className="text-xs text-gray-600 line-clamp-1">{provider.profession}</p>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-blue-600 text-blue-600" />
              <span className="text-xs font-semibold text-gray-900">
                {provider.rating.overall}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-xs text-gray-600">
              {provider.workExperience.totalJobs} jobs
            </span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-3">
        <div className="flex flex-wrap gap-1">
          {provider.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {provider.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
              +{provider.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="space-y-2 mb-3 pb-3 border-b border-gray-200">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <Navigation className="w-3 h-3" />
            <span>Distance</span>
          </div>
          <span className="font-semibold text-gray-900">{distance} km</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Status</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isAvailable 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {isAvailable ? 'Available' : 'Busy'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <a
          href={`tel:${provider.phone}`}
          className="flex-1 py-2 px-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-xs flex items-center justify-center gap-2"
        >
          <Phone className="w-3 h-3" />
          Call
        </a>
        
        <button
          onClick={() => onBookNow(provider)}
          disabled={!isAvailable}
          className={`flex-1 py-2 px-3 rounded-lg font-semibold text-xs transition-colors ${
            isAvailable
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// Main Services Map Component
const ServicesMap = ({ userLocation = [5.6037, -0.1870] }) => {
  const mapRef = useRef();
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Transform providers data for map
  const mappedProviders = useMemo(() => {
    return mockProviders.map(provider => ({
      ...provider,
      position: [
        provider.location.coordinates.lat,
        provider.location.coordinates.lng
      ],
      distance: calculateDistance(
        userLocation[0],
        userLocation[1],
        provider.location.coordinates.lat,
        provider.location.coordinates.lng
      )
    }));
  }, [userLocation]);

  const availableCount = mappedProviders.filter(
    p => p.availability?.status === 'available'
  ).length;

  const handleMarkerClick = (provider) => {
    setSelectedProvider(provider);
    if (mapRef.current) {
      mapRef.current.flyTo(provider.position, 14, { duration: 1 });
    }
  };

  const handleBookNow = (provider) => {
    console.log('Booking with:', provider.fullName);
    // Navigate to booking page: navigate(`/booking_request/${provider.id}`);
    setSelectedProvider(null);
  };

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(userLocation, 13, { duration: 1 });
    }
  };

  return (
    <div className="relative w-full">
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: '500px', width: '100%', borderRadius: '12px' }}
        ref={mapRef}
        zoomControl={false}
      >
        {/* Beautiful map tiles (Carto Voyager) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Provider markers */}
        {mappedProviders.map((provider) => (
          <Marker
            key={provider.id}
            position={provider.position}
            icon={createCustomIcon(provider.availability?.status === 'available')}
            eventHandlers={{
              click: () => handleMarkerClick(provider),
            }}
          >
            <Popup>
              <ProviderInfoWindow
                provider={provider}
                distance={provider.distance}
                onClose={() => setSelectedProvider(null)}
                onBookNow={handleBookNow}
              />
            </Popup>
          </Marker>
        ))}

        {/* User location marker */}
        <Marker
          position={userLocation}
          icon={createCustomIcon(false, true)}
        >
          <Popup>
            <div className="p-2 text-center">
              <p className="font-semibold text-gray-900">Your Location</p>
              <p className="text-xs text-gray-600">Accra, Ghana</p>
            </div>
          </Popup>
        </Marker>

        <RecenterButton center={userLocation} />
      </MapContainer>

      {/* Custom zoom controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="w-10 h-10 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center font-bold text-gray-700"
        >
          +
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="w-10 h-10 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center font-bold text-gray-700"
        >
          −
        </button>
        <button
          onClick={handleRecenter}
          className="w-10 h-10 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          title="Recenter map"
        >
          <Locate className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-gray-700">Busy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-gray-700">You</span>
          </div>
        </div>
      </div>

      {/* Provider count badge */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2 z-[1000]">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-gray-900">
            {availableCount} available • {mappedProviders.length} total
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServicesMap;