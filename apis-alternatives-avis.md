# APIs alternatives pour les avis Google

## Solution actuelle implémentée

### API AllOrigins (Gratuite)
- **URL** : `https://api.allorigins.win/raw?url=`
- **Avantages** : Gratuite, pas de clé API nécessaire
- **Inconvénients** : Peut être limitée par Google

## Autres alternatives disponibles

### 1. ScrapingBee API
```javascript
const response = await fetch(`https://app.scrapingbee.com/api/v1/?api_key=YOUR_API_KEY&url=${encodeURIComponent(googleUrl)}`);
```
- **Coût** : 1000 requêtes gratuites, puis payant
- **Avantages** : Spécialisé dans le scraping

### 2. ScraperAPI
```javascript
const response = await fetch(`http://api.scraperapi.com?api_key=YOUR_API_KEY&url=${encodeURIComponent(googleUrl)}`);
```
- **Coût** : 1000 requêtes gratuites, puis payant
- **Avantages** : Proxy rotatif, anti-détection

### 3. Bright Data (ex-Luminati)
```javascript
const response = await fetch(`https://api.brightdata.com/request?url=${encodeURIComponent(googleUrl)}`);
```
- **Coût** : Payant
- **Avantages** : Très fiable, grande échelle

### 4. SerpAPI
```javascript
const response = await fetch(`https://serpapi.com/search?api_key=YOUR_API_KEY&q=Les+Tatouables+Toul&tbm=lcl`);
```
- **Coût** : 100 requêtes gratuites, puis payant
- **Avantages** : Spécialisé dans les résultats Google

### 5. Google My Business API (Officielle)
```javascript
// Nécessite une clé API Google
const response = await fetch(`https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews`);
```
- **Coût** : Gratuit avec clé API
- **Avantages** : Officielle, fiable
- **Inconvénients** : Complexe à configurer

## Solution recommandée

Pour votre cas d'usage, je recommande :

1. **Solution actuelle** (AllOrigins) - Fonctionne bien pour commencer
2. **SerpAPI** - Si vous voulez plus de fiabilité
3. **Google My Business API** - Pour une solution officielle

## Configuration SerpAPI (Recommandée)

1. Créez un compte sur [SerpAPI](https://serpapi.com/)
2. Obtenez votre clé API
3. Remplacez dans le code :

```javascript
const response = await fetch(`https://serpapi.com/search?api_key=VOTRE_CLE&q=Les+Tatouables+Toul&tbm=lcl`);
```

## Avantages de chaque solution

| API | Gratuit | Fiabilité | Facilité | Recommandation |
|-----|---------|-----------|----------|----------------|
| AllOrigins | ✅ | ⭐⭐ | ⭐⭐⭐ | Bon pour tester |
| SerpAPI | ⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | **Recommandé** |
| ScrapingBee | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ | Bonne alternative |
| Google My Business | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐ | Solution officielle |

