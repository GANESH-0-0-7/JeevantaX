import express from "express";

const router = express.Router();

router.get("/nearby", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "Latitude and Longitude are required",
      });
    }

    const query = `
[out:json];
(
  node["amenity"="hospital"](around:5000,${lat},${lon});
  way["amenity"="hospital"](around:5000,${lat},${lon});
  relation["amenity"="hospital"](around:5000,${lat},${lon});
);
out center tags;
`;

    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "User-Agent": "JeevantaX/1.0",
        },
        body: query,
      }
    );

    if (!response.ok) {
      throw new Error(`Overpass API returned ${response.status}`);
    }

    const data = await response.json();

    const hospitals = (data.elements || []).map((item) => ({
      id: item.id,
      name: item.tags?.name || "Unnamed Hospital",
      address:
        item.tags?.["addr:full"] ||
        item.tags?.["addr:street"] ||
        "Address unavailable",
      phone: item.tags?.phone || "N/A",
      lat: item.lat || item.center?.lat,
      lng: item.lon || item.center?.lon,
    }));

    res.json(hospitals);
  } catch (err) {
    console.error("Therapist Route Error:", err);

    res.status(500).json({
      message: "Unable to fetch hospitals",
    });
  }
});

export default router;