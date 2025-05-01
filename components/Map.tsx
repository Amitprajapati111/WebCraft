import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const center = {
    lat: 28.4591, // Your latitude
    lng: 77.4978  // Your longitude
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

const App = () => {
  return (
    <div className="aspect-video bg-muted rounded-md overflow-hidden">
      <Map />
    </div>
  );
};

export default App;