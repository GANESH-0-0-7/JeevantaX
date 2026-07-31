import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const TherapistFinder = () => {
    const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 })
    const [therapists, setTherapists] = useState([])
    const [loading, setLoading] = useState(false)
    const [mapsLoaded, setMapsLoaded] = useState(false)
    const [selectedTherapist, setSelectedTherapist] = useState(null)

    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    const mapContainerStyle = {
        width: '100%',
        height: '500px',
        borderRadius: '12px'
    }

    const mapOptions = {
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{ "weight": "2.00" }]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [{ "color": "#9c9c9c" }]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{ "visibility": "on" }]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{ "color": "#f2f2f2" }]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#ffffff" }]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#ffffff" }]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#eeeeee" }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#7b7b7b" }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{ "color": "#ffffff" }]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{ "visibility": "simplified" }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#c8d7d4" }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#070707" }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [{ "color": "#ffffff" }]
            }
        ]
    }

    const findTherapists = () => {
        if (!mapsLoaded || !window.google || !window.google.maps || !window.google.maps.places) {
            console.warn('Google Maps API not loaded yet.')
            return
        }

        if (navigator.geolocation) {
            setLoading(true)
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const userLoc = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    }
                    setMapCenter(userLoc)

                    const map = new window.google.maps.Map(document.createElement('div'), {
                        center: userLoc,
                        zoom: 15,
                    })

                    const service = new window.google.maps.places.PlacesService(map)
                    service.nearbySearch(
                        {
                            location: userLoc,
                            radius: 5000,
                            keyword: 'mental health therapist psychologist counselor',
                        },
                        (results, status) => {
                            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                                const detailsPromises = results.slice(0, 5).map(
                                    (place) =>
                                        new Promise((resolve) => {
                                            service.getDetails(
                                                {
                                                    placeId: place.place_id,
                                                    fields: [
                                                        'name',
                                                        'vicinity',
                                                        'formatted_phone_number',
                                                        'rating',
                                                        'geometry',
                                                        'photos',
                                                    ],
                                                },
                                                (details, detailsStatus) => {
                                                    if (detailsStatus === window.google.maps.places.PlacesServiceStatus.OK) {
                                                        resolve({
                                                            id: place.place_id,
                                                            name: details.name,
                                                            address: details.vicinity,
                                                            phone: details.formatted_phone_number || 'N/A',
                                                            rating: details.rating || 'N/A',
                                                            lat: details.geometry.location.lat(),
                                                            lng: details.geometry.location.lng(),
                                                            photo: details.photos?.[0]?.getUrl({ maxWidth: 200 }) || null,
                                                        })
                                                    } else {
                                                        resolve(null)
                                                    }
                                                }
                                            )
                                        })
                                )

                                Promise.all(detailsPromises).then((therapistDetails) => {
                                    const validTherapists = therapistDetails.filter(Boolean)
                                    setTherapists(validTherapists)
                                    setLoading(false)
                                })
                            } else {
                                console.error('Places search failed:', status)
                                setLoading(false)
                            }
                        }
                    )
                },
                (error) => {
                    console.error('Geolocation error:', error)
                    setLoading(false)
                }
            )
        } else {
            alert('Geolocation is not supported by this browser.')
        }
    }

    return (
        <div className="w-full min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
            <div className="px-4 md:px-12 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Find Therapists Near You</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Connect with qualified mental health professionals in your area
                    </p>
                </div>

                {/* Search Section */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                        <button
                            onClick={findTherapists}
                            disabled={loading || !GOOGLE_MAPS_API_KEY}
                            className="px-8 py-3 bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Finding Therapists...
                                </div>
                            ) : (
                                'Find Therapists Near Me'
                            )}
                        </button>

                        {!GOOGLE_MAPS_API_KEY && (
                            <p className="text-amber-400 text-sm">
                                ⚠️ Google Maps API key required
                            </p>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Therapist List */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Available Therapists</h2>

                        {therapists.length > 0 ? (
                            therapists.map((therapist) => (
                                <div
                                    key={therapist.id}
                                    className={`bg-slate-900/70 border rounded-xl p-6 hover:bg-slate-900/90 transition-colors cursor-pointer ${selectedTherapist?.id === therapist.id ? 'border-indigo-500' : 'border-slate-800'
                                        }`}
                                    onClick={() => setSelectedTherapist(therapist)}
                                >
                                    <div className="flex gap-4">
                                        {therapist.photo ? (
                                            <img
                                                src={therapist.photo}
                                                alt={therapist.name}
                                                className="w-16 h-16 rounded-lg object-cover border border-slate-700"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                                                <span className="text-2xl">👨‍⚕️</span>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-semibold">{therapist.name}</h3>
                                                {therapist.rating !== 'N/A' && (
                                                    <div className="flex items-center text-yellow-400">
                                                        <span className="text-sm">⭐ {therapist.rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-slate-400 text-sm mb-2">{therapist.address}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-indigo-400 text-sm">Mental Health Professional</span>
                                                {therapist.phone !== 'N/A' && (
                                                    <a
                                                        href={`tel:${therapist.phone}`}
                                                        className="px-4 py-2 bg-indigo-500/90 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Call Now
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <div className="text-4xl mb-4">🔍</div>
                                <p>Click "Find Therapists Near Me" to discover mental health professionals in your area.</p>
                            </div>
                        )}
                    </div>

                    {/* Map Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Map View</h2>

                        {GOOGLE_MAPS_API_KEY ? (
                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                                <LoadScript
                                    googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                                    libraries={['places']}
                                    onLoad={() => setMapsLoaded(true)}
                                >
                                    <GoogleMap
                                        mapContainerStyle={mapContainerStyle}
                                        center={mapCenter}
                                        zoom={13}
                                        options={mapOptions}
                                    >
                                        {therapists.map((therapist) => (
                                            <Marker
                                                key={therapist.id}
                                                position={{ lat: therapist.lat, lng: therapist.lng }}
                                                onClick={() => setSelectedTherapist(therapist)}
                                                icon={{
                                                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="20" cy="20" r="18" fill="#6366f1" stroke="#ffffff" stroke-width="2"/>
                                                            <text x="20" y="26" text-anchor="middle" fill="white" font-size="16">🏥</text>
                                                        </svg>
                                                    `),
                                                    scaledSize: new window.google.maps.Size(40, 40)
                                                }}
                                            />
                                        ))}
                                    </GoogleMap>
                                </LoadScript>
                            </div>
                        ) : (
                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-8 text-center">
                                <div className="text-4xl mb-4">🗺️</div>
                                <h3 className="text-xl font-semibold mb-2">Google Maps Integration</h3>
                                <p className="text-slate-400 mb-4">
                                    Add your Google Maps API key to the .env file to enable map functionality
                                </p>
                                <code className="bg-slate-800 px-3 py-1 rounded text-sm text-indigo-400">
                                    VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
                                </code>
                            </div>
                        )}

                        {selectedTherapist && (
                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-3">Selected Therapist</h3>
                                <div className="flex gap-4">
                                    {selectedTherapist.photo ? (
                                        <img
                                            src={selectedTherapist.photo}
                                            alt={selectedTherapist.name}
                                            className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                                            <span className="text-lg">👨‍⚕️</span>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-semibold">{selectedTherapist.name}</h4>
                                        <p className="text-indigo-400 text-sm">Mental Health Professional</p>
                                        <p className="text-slate-400 text-sm">{selectedTherapist.phone}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TherapistFinder