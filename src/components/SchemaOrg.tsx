export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "Atropina",
    "genre": ["Death Metal", "Black Metal"],
    "description": "Banda brasileira de Death Metal com nuances de Black Metal",
    "url": "https://atropina.com.br",
    "logo": "https://atropina.com.br/logo-white.png",
    "sameAs": [
      "https://www.youtube.com/@AtropinaDeathMetal",
      "https://www.instagram.com/atropina_deathmetal/",
      "https://www.facebook.com/atropinametal",
      "https://open.spotify.com/intl-pt/artist/0qGHuO9Q7nvPNmtjuDZb8v"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
