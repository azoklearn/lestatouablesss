# Configuration de l'API Google Places

## Étapes pour activer les avis Google sur votre site

### 1. Obtenir une clé API Google Places

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API "Places API"
4. Créez des identifiants (clé API)
5. Restreignez la clé API aux domaines de votre site

### 2. Remplacer la clé API

Dans le fichier `index.html`, remplacez `YOUR_API_KEY` par votre vraie clé API :

```html
<script src="https://maps.googleapis.com/maps/api/js?key=VOTRE_CLE_API&libraries=places"></script>
```

### 3. Vérifier que votre établissement est sur Google

- Assurez-vous que "Les Tatouables" est bien enregistré sur Google My Business
- L'adresse doit correspondre : 9Av. 1ère Armée Françaises 44-45, 54200 Toul
- Vérifiez qu'il y a des avis clients sur votre fiche Google

### 4. Test

Une fois la clé API configurée, les vrais avis Google s'afficheront automatiquement sur votre site.

## Fonctionnalités incluses

- ✅ Affichage des vrais avis Google
- ✅ Photos de profil des clients
- ✅ Notes et commentaires authentiques
- ✅ Dates des avis
- ✅ Note globale mise à jour automatiquement
- ✅ Fallback si pas d'avis ou erreur API
- ✅ Animations fluides
- ✅ Design responsive

## Coûts

L'API Google Places a des coûts associés :
- 1000 requêtes gratuites par mois
- Puis environ 0.017€ par requête supplémentaire

Pour un site avec peu de trafic, cela reste très abordable.

