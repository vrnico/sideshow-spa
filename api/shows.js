// api/shows.js
// -----------------------------------------------------------------------------
// This is a SERVERLESS FUNCTION. It runs on Vercel's servers, never in the
// visitor's browser. That is the whole reason it exists: the secret key stays
// here, on the server, where nobody can read it from the page source.
//
// GitHub Pages can't run this file (it only serves static files). Vercel turns
// any file in /api into a live URL automatically: this becomes /api/shows.
// -----------------------------------------------------------------------------

// Where the live events feed lives. This Freakscene endpoint validates the API
// key and returns NF Calendar events grouped by the cities on the tour route,
// already shaped the way the page wants them.
const FEED_URL = "https://freakscene.space/route-events.php";

export default async function handler(req, res) {
  // The secret. It is NOT written in this file. It lives in:
  //   - Vercel → Settings → Environment Variables  (for the live site)
  //   - .env.local on your machine                 (for local testing, gitignored)
  const KEY = process.env.FREAKSCENE_API_KEY;

  // ---- Live version ---------------------------------------------------------
  // Because this runs on the server, the key is attached here in the XF-Api-Key
  // header and never reaches the browser, so it can't be stolen from page source.
  try {
    if (!KEY) throw new Error("FREAKSCENE_API_KEY is not set");

    const r = await fetch(FEED_URL, {
      headers: { "XF-Api-Key": KEY },
      // Don't let a slow upstream hang the request forever.
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error("Feed responded " + r.status);

    const data = await r.json();

    // Let browsers/CDN cache the result briefly so we don't hammer the forum.
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(data);
  } catch (err) {
    // ---- Fallback -----------------------------------------------------------
    // If the key is missing or the feed is unreachable, serve a saved snapshot
    // of real Freakscene shows so the page never breaks. Same shape as live.
    console.error("shows: falling back to snapshot —", err && err.message);
    res.setHeader("Cache-Control", "s-maxage=60");
    return res.status(200).json(SNAPSHOT);
  }
}

const SNAPSHOT = {
  "Sacramento, CA": [
    { date: "2026-06-27", title: "Local Sounds Showcase", venue: "4311 Attawa Ave #300", url: "https://freakscene.diy/events/7161/" },
    { date: "2026-06-15", title: "Sync Up Sacramento", venue: "1819 E St", url: "https://freakscene.diy/events/6613/" },
    { date: "2026-05-02", title: "Pregnant, TV-MA, Moonlust @ Red Museum", venue: "212 15th St", url: "https://freakscene.diy/events/6606/" }
  ],
  "San Francisco, CA": [
    { date: "2026-05-31", title: "Chicas de la Calle @ Thrillhouse Records", venue: "Thrillhouse Records, Mission St", url: "https://freakscene.diy/events/6947/" },
    { date: "2026-05-17", title: "SF Powerpop Fest @ O'Reilly's Pub", venue: "1840 Haight St", url: "https://freakscene.diy/events/6835/" },
    { date: "2026-05-03", title: "Glitches and Witches w/ Aivi & Surasshu", venue: "395 S Van Ness Ave", url: "https://freakscene.diy/events/6396/" }
  ],
  "Los Angeles, CA": [
    { date: "2026-06-28", title: "Plum, Prefix, Nighttime, Lilliana Villines", venue: "Plant Material, 3024 La Paz Dr", url: "https://freakscene.diy/events/7088/" },
    { date: "2026-06-20", title: "Gumby's Junk, Springbreeding, Ologist @ Crash Haus", venue: "6417 Whittier Blvd", url: "https://freakscene.diy/events/7145/" },
    { date: "2026-06-12", title: "Neap, Mound, Eric Buechel", venue: "Heavy Manners Library", url: "https://freakscene.diy/events/7085/" }
  ]
};
