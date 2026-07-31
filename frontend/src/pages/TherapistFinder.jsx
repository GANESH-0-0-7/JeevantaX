import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ChangeMap({ center }) {
  const map = useMap();

  map.setView(center, 14);

  return null;
}

export default function TherapistFinder() {
  const [loading, setLoading] = useState(false);

  const [center, setCenter] = useState([
    20.5937,
    78.9629,
  ]);

  const [therapists, setTherapists] = useState([]);

  const [selected, setSelected] = useState(null);

  const findTherapists = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;

        const lon = position.coords.longitude;

        setCenter([lat, lon]);

        const query = `
[out:json];
(
 node["amenity"="hospital"](around:5000,${lat},${lon});
 way["amenity"="hospital"](around:5000,${lat},${lon});
 relation["amenity"="hospital"](around:5000,${lat},${lon});
);
out center tags;
`;

        try {
          const response = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
              method: "POST",
              body: query,
            }
          );

          const data = await response.json();

          const hospitals = data.elements.map(
            (item) => ({
              id: item.id,

              name:
                item.tags?.name ||
                "Unnamed Hospital",

              address:
                item.tags?.["addr:full"] ||
                item.tags?.street ||
                "Address unavailable",

              phone:
                item.tags?.phone ||
                "N/A",

              lat:
                item.lat ||
                item.center.lat,

              lng:
                item.lon ||
                item.center.lon,
            })
          );

          setTherapists(hospitals);
        } catch (err) {
          console.log(err);

          alert("Unable to load hospitals.");
        }

        setLoading(false);
      },
      (err) => {
        console.log(err);

        alert("Location permission denied.");

        setLoading(false);
      }
    );
  };
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="text-center mb-10">

          <h1 className="text-5xl font-extrabold mb-4">
            Find Nearby Therapists
          </h1>

          <p className="text-slate-300 text-lg">
            Locate nearby hospitals and mental health professionals
            using OpenStreetMap.
          </p>

          <button
            onClick={findTherapists}
            disabled={loading}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Searching..."
              : "Find Therapists Near Me"}
          </button>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT */}

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Nearby Hospitals
            </h2>

            {therapists.length === 0 ? (

              <div className="bg-slate-900 rounded-2xl p-10 text-center">

                <div className="text-6xl mb-4">
                  🏥
                </div>

                <p className="text-slate-400">

                  Click

                  <span className="font-semibold text-indigo-400">

                    {" "}Find Therapists Near Me{" "}

                  </span>

                  to search nearby hospitals.

                </p>

              </div>

            ) : (

              <div className="space-y-5 max-h-[700px] overflow-y-auto pr-2">

                {therapists.map((hospital) => (

                  <div
                    key={hospital.id}
                    onClick={() => {
                      setSelected(hospital);
                      setCenter([
                        hospital.lat,
                        hospital.lng,
                      ]);
                    }}
                    className={`rounded-2xl border p-5 cursor-pointer transition hover:border-indigo-500 hover:bg-slate-800

                    ${
                      selected?.id === hospital.id
                        ? "border-indigo-500 bg-slate-800"
                        : "border-slate-700 bg-slate-900"
                    }`}
                  >

                    <h3 className="text-xl font-bold">

                      {hospital.name}

                    </h3>

                    <p className="text-slate-400 mt-2">

                      {hospital.address}

                    </p>

                    <div className="flex justify-between items-center mt-5">

                      <span className="text-green-400">

                        {hospital.phone}

                      </span>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
                      >
                        Directions
                      </a>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* RIGHT */}

          <div>

            <MapContainer
              center={center}
              zoom={13}
              style={{
                height: "700px",
                width: "100%",
                borderRadius: "20px",
              }}
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <ChangeMap center={center} />

              <Marker position={center}>

                <Popup>

                  Your Location

                </Popup>

              </Marker>
                            {therapists.map((hospital) => (
                <Marker
                  key={hospital.id}
                  position={[
                    hospital.lat,
                    hospital.lng,
                  ]}
                  eventHandlers={{
                    click: () => setSelected(hospital),
                  }}
                >
                  <Popup>

                    <div className="w-60">

                      <h3 className="font-bold text-lg">

                        {hospital.name}

                      </h3>

                      <p className="text-sm mt-2">

                        {hospital.address}

                      </p>

                      <p className="mt-2">

                        📞 {hospital.phone}

                      </p>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg"
                      >
                        Get Directions
                      </a>

                    </div>

                  </Popup>

                </Marker>
              ))}

            </MapContainer>

            {selected && (

              <div className="mt-6 bg-slate-900 border border-slate-700 rounded-2xl p-6">

                <h2 className="text-2xl font-bold">

                  Selected Hospital

                </h2>

                <h3 className="mt-4 text-xl font-semibold">

                  {selected.name}

                </h3>

                <p className="text-slate-400 mt-2">

                  {selected.address}

                </p>

                <p className="mt-3">

                  📞 {selected.phone}

                </p>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-5 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
                >
                  Open Navigation
                </a>

              </div>

            )}

          </div>

        </div>
              </div>

      <footer className="mt-16 border-t border-slate-700 pt-8">

        <div className="text-center">

          <h2 className="text-xl font-semibold">
            JeevantaX
          </h2>

          <p className="text-slate-400 mt-2">
            Mental Health Support • Nearby Therapist Finder • Powered by
            OpenStreetMap
          </p>

          <p className="text-slate-500 text-sm mt-6">
            © {new Date().getFullYear()} JeevantaX. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}