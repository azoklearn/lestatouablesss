// === Configuration ===
const placeId = "ChIJxdQjnRWvlEcRRpXxQEALOOI"; // Place ID de ton entreprise
const apiKey = "AIzaSyDu7OtByU-uH0OBsfEe-7pko_VO0MQequE"; // Clé API Google Places

// === Fonction principale ===
export async function loadGoogleReviews() {
  const container = document.getElementById("google-reviews");
  if (!container) {
    console.error("❌ Élément #google-reviews introuvable.");
    return;
  }

  // Essayer plusieurs proxies CORS au cas où l'un ne fonctionne pas
  const proxyUrls = [
    "https://corsproxy.io/?",
    "https://api.allorigins.win/raw?url=",
    "https://cors-anywhere.herokuapp.com/"
  ];

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&language=fr&key=${apiKey}`;

  let lastError = null;

  // Essayer chaque proxy jusqu'à ce qu'un fonctionne
  for (const proxyUrl of proxyUrls) {
    try {
      console.log(`Tentative avec proxy: ${proxyUrl}`);
      const fullUrl = proxyUrl === "https://api.allorigins.win/raw?url=" 
        ? `${proxyUrl}${encodeURIComponent(url)}`
        : `${proxyUrl}${url}`;
      
      const response = await fetch(fullUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Vérifier si l'API a retourné une erreur
      if (data.status && data.status !== 'OK') {
        console.error("Erreur API Google:", data.status, data.error_message || '');
        container.innerHTML = `
          <div style="background:#2d2d2d;border:1px solid #333;border-radius:15px;padding:2.5rem 2rem;margin-bottom:2rem;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
            <h2 style="text-align:center;color:#ffffff;font-family:'Playfair Display',serif;font-size:2rem;margin-bottom:1rem;">⭐ Nos Avis Google</h2>
            <p style="text-align:center;font-size:1.1rem;color:#b8b8b8;margin-bottom:0.5rem;">
              Impossible de charger les avis automatiquement (${data.status}).
            </p>
            ${data.error_message ? `<p style="text-align:center;color:#b8b8b8;font-size:0.9rem;margin-top:0.5rem;">${data.error_message}</p>` : ''}
            <p style="text-align:center;color:#b8b8b8;font-size:0.95rem;margin-top:1rem;">
              Vous pouvez consulter tous nos avis directement sur Google.
            </p>
            <div style="text-align:center;margin-top:1.5rem;">
              <a href="https://www.google.com/maps/place/?q=place_id:${placeId}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#4285f4;color:#ffffff;padding:0.8rem 1.6rem;border-radius:999px;text-decoration:none;font-weight:600;font-size:0.95rem;">
                <span>Voir tous les avis sur Google</span>
              </a>
            </div>
          </div>
        `;
        return;
      }

      if (data.result && data.result.reviews && data.result.reviews.length > 0) {
        const r = data.result;
        container.innerHTML = `
          <div style="background:#2d2d2d;border:1px solid #333;border-radius:15px;padding:2.5rem 2rem;margin-bottom:2rem;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
            <h2 style="text-align:center;color:#ffffff;font-family:'Playfair Display',serif;font-size:2rem;margin-bottom:1rem;">⭐ Nos Avis Google</h2>
            <p style="text-align:center;font-size:1.2rem;color:#b8b8b8;margin-bottom:0;">
              <strong style="color:#ffffff;font-size:2rem;">${r.rating || 'N/A'}</strong> / 5
            </p>
            <p style="text-align:center;color:#b8b8b8;font-size:1rem;margin-top:0.5rem;">
              ${r.user_ratings_total || 0} avis clients
            </p>
          </div>
          
          <div style="display:grid;gap:1.5rem;">
            ${(r.reviews || []).map(rv => `
              <div style="background:#2d2d2d;border:1px solid #333;border-radius:15px;padding:1.5rem;box-shadow:0 10px 30px rgba(0,0,0,0.3);transition:transform 0.3s ease;" 
                   onmouseover="this.style.transform='translateY(-5px)'" 
                   onmouseout="this.style.transform='translateY(0)'">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
                  <div style="display:flex;align-items:center;gap:1rem;">
                    <div style="width:50px;height:50px;background:#ffffff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#000;font-size:1.2rem;font-weight:600;">
                      ${rv.author_name ? rv.author_name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <strong style="color:#ffffff;font-size:1.1rem;display:block;margin-bottom:0.3rem;">${rv.author_name || 'Anonyme'}</strong>
                      <span style="color:#FFD700;font-size:1rem;">${'★'.repeat(rv.rating || 0)}${'☆'.repeat(5 - (rv.rating || 0))}</span>
                    </div>
                  </div>
                </div>
                <p style="font-size:1rem;color:#e0e0e0;line-height:1.6;margin-bottom:0.8rem;font-style:italic;">"${rv.text || 'Aucun commentaire'}"</p>
                <small style="color:#b8b8b8;font-size:0.9rem;">${rv.relative_time_description || ''}</small>
              </div>
            `).join('')}
          </div>
          
          <div style="text-align:center;margin-top:2rem;">
            <a href="https://www.google.com/maps/place/?q=place_id:${placeId}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#4285f4;color:#ffffff;padding:0.8rem 1.6rem;border-radius:999px;text-decoration:none;font-weight:600;font-size:0.95rem;">
              <span>Voir tous les avis sur Google</span>
            </a>
          </div>
        `;
        console.log("✅ Avis chargés avec succès");
        return; // Succès, sortir de la boucle
      } else {
        container.innerHTML = `
          <div style="background:#2d2d2d;border:1px solid #333;border-radius:15px;padding:2.5rem 2rem;margin-bottom:2rem;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
            <h2 style="text-align:center;color:#ffffff;font-family:'Playfair Display',serif;font-size:2rem;margin-bottom:1rem;">⭐ Nos Avis Google</h2>
            <p style="text-align:center;color:#b8b8b8;font-size:1.1rem;margin-bottom:0.5rem;">
              Aucun avis n'a été retourné par l'API pour le moment.
            </p>
            <p style="text-align:center;color:#b8b8b8;font-size:0.95rem;margin-top:1rem;">
              Vous pouvez tout de même consulter nos avis directement sur Google.
            </p>
            <div style="text-align:center;margin-top:1.5rem;">
              <a href="https://www.google.com/maps/place/?q=place_id:${placeId}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#4285f4;color:#ffffff;padding:0.8rem 1.6rem;border-radius:999px;text-decoration:none;font-weight:600;font-size:0.95rem;">
                <span>Voir tous les avis sur Google</span>
              </a>
            </div>
          </div>
        `;
        return;
      }
    } catch (error) {
      console.error(`Erreur avec proxy ${proxyUrl}:`, error);
      lastError = error;
      // Continuer avec le proxy suivant
      continue;
    }
  }

  // Si tous les proxies ont échoué
  container.innerHTML = `
    <div style="background:#2d2d2d;border:1px solid #333;border-radius:15px;padding:2.5rem 2rem;margin-bottom:2rem;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
      <h2 style="text-align:center;color:#ffffff;font-family:'Playfair Display',serif;font-size:2rem;margin-bottom:1rem;">⭐ Nos Avis Google</h2>
      <p style="text-align:center;color:#b8b8b8;font-size:1.1rem;margin-bottom:0.5rem;">
        Erreur lors du chargement des avis.
      </p>
      <p style="text-align:center;color:#b8b8b8;font-size:0.9rem;margin-top:0.5rem;">
        Vous pouvez tout de même consulter tous nos avis directement sur Google.
      </p>
      <div style="text-align:center;margin-top:1.5rem;">
        <a href="https://www.google.com/maps/place/?q=place_id:${placeId}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;background:#4285f4;color:#ffffff;padding:0.8rem 1.6rem;border-radius:999px;text-decoration:none;font-weight:600;font-size:0.95rem;">
          <span>Voir tous les avis sur Google</span>
        </a>
      </div>
    </div>
  `;
  console.error("❌ Tous les proxies ont échoué. Dernière erreur:", lastError);
}

