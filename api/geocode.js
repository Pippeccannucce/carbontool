// Vercel serverless function — proxies geocoding requests to avoid CORS/CSP
export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing q parameter' });

  try {
    // Try Photon first
    const photonRes = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=1&lang=en`,
      { headers: { 'Accept': 'application/json', 'User-Agent': 'CarbonTool/1.0' } }
    );
    if (photonRes.ok) {
      const data = await photonRes.json();
      const feat = data?.features?.[0];
      if (feat) {
        const [lon, lat] = feat.geometry.coordinates;
        return res.status(200).json({ lat, lon, source: 'photon' });
      }
    }

    // Fallback: Nominatim
    const nomRes = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`,
      { headers: { 'Accept': 'application/json', 'User-Agent': 'CarbonTool/1.0', 'Accept-Language': 'en' } }
    );
    if (nomRes.ok) {
      const data = await nomRes.json();
      if (data?.[0]) {
        return res.status(200).json({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), source: 'nominatim' });
      }
    }

    return res.status(200).json({ lat: null, lon: null });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
