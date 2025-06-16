import React, { useEffect, useState } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAGKuE_Jpa-lFDy5A_udmam2cd0WbM32Sc';

function UserLocationMap() {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            setIsLoading(false);
            return;
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setIsLoading(false);
            },
            (err) => {
                setError('Unable to retrieve your location. Please allow location access.');
                console.error('Geolocation error:', err);
                setIsLoading(false);
            },
            options
        );
    }, []);

    const mapUrl = coords
        ? `https://maps.googleapis.com/maps/api/staticmap?center=${coords.lat},${coords.lng}&zoom=14&size=600x300&markers=color:red%7C${coords.lat},${coords.lng}&key=${GOOGLE_MAPS_API_KEY}`
        : null;

    return (
        <div className="relative max-w-3xl mx-auto mt-10 p-6 rounded-2xl overflow-hidden">
            {/* Glass background layer */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />

            {/* Content */}
            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-center mb-6 text-white tracking-wide">
                    Your Current Location
                </h2>

                {isLoading ? (
                    <div className="text-center py-4">
                        <p className="text-white/80 animate-pulse">Detecting your location...</p>
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <p className="text-red-300">{error}</p>
                        <p className="text-white/70 mt-2">Please enable location permissions in your browser settings.</p>
                    </div>
                ) : coords ? (
                    <>
                        <img
                            src={mapUrl!}
                            alt="Your current location"
                            className="w-full rounded-xl border border-white/20 shadow-lg"
                        />
                        <p className="text-center mt-3 text-white/80 text-sm">
                            Coordinates: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                        </p>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default UserLocationMap;