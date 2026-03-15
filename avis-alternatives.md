# Méthodes alternatives pour afficher les avis Google

## Méthode 1 : Widget Google Maps (Actuellement implémentée)
✅ **Avantages :**
- Aucune clé API nécessaire
- Affiche la carte + avis directement
- Toujours à jour
- Gratuit

❌ **Inconvénients :**
- Moins de contrôle sur l'affichage
- Taille fixe

## Méthode 2 : Capture d'écran des avis
```html
<div class="reviews-screenshot">
    <img src="images/google-reviews-screenshot.png" alt="Avis Google" style="width: 100%; border-radius: 15px;">
    <div class="reviews-overlay">
        <a href="https://share.google/p5wd7uw9rmSMzKdKG" target="_blank" class="btn btn-google">
            Voir tous les avis sur Google
        </a>
    </div>
</div>
```

## Méthode 3 : Badge Google Reviews
```html
<div class="google-badge">
    <a href="https://share.google/p5wd7uw9rmSMzKdKG" target="_blank">
        <img src="https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=Les+Tatouables+Toul" 
             alt="Google Reviews" style="width: 100%; max-width: 300px;">
    </a>
</div>
```

## Méthode 4 : Intégration simple avec lien
```html
<div class="reviews-simple">
    <div class="reviews-preview">
        <h3>Nos clients nous font confiance</h3>
        <p>Découvrez ce que nos clients disent de nous</p>
        <div class="rating-display">
            <span class="rating-number">5.0</span>
            <span class="rating-text">sur Google</span>
        </div>
    </div>
    <a href="https://share.google/p5wd7uw9rmSMzKdKG" target="_blank" class="btn btn-google">
        Voir tous les avis
    </a>
</div>
```

## Méthode 5 : API Google Places (Complexe)
- Nécessite une clé API
- Coûte de l'argent
- Plus de contrôle mais plus complexe

## Recommandation
La **Méthode 1 (Widget Google Maps)** est la plus simple et efficace pour votre cas d'usage.

