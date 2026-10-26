# 🛍️ Starter API REST – Node.js / Express

API REST minimaliste (CRUD) qui gère une liste de **produits** stockée en mémoire.
Point de départ pour les travaux pratiques du cours *Web Services*.

> ⚠️ Les données sont stockées **en mémoire** : elles sont réinitialisées à chaque redémarrage du serveur.

## 📋 Prérequis

- [Node.js](https://nodejs.org/) 18 ou supérieur (`node -v` pour vérifier)
- Un client HTTP : extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) pour VS Code, [Postman](https://www.postman.com/) ou autre

## ⚙️ Installation

Le dépôt ne contient que `server.js`. Il faut créer le projet autour :

```bash
git clone https://github.com/VOTRE-USER/nom-du-repo.git
cd nom-du-repo
npm init -y
npm pkg set type=module
npm install express
node server.js
```

- `npm pkg set type=module` est **indispensable** : `server.js` utilise la syntaxe `import`. Selon la version de Node, son absence provoque l'erreur `Cannot use import statement outside a module`.
- Si tout va bien, la console affiche : `Server is running on port 3000`.

## 🔌 Endpoints

Un produit a la forme `{ "name": "p1", "price": 10 }`. Le champ `name` sert d'identifiant.

| Méthode | Route                    | Corps (JSON)                | Succès                          | Erreurs                       |
|---------|--------------------------|-----------------------------|---------------------------------|-------------------------------|
| GET     | `/products`              | –                           | 200 + tableau de produits       | –                             |
| GET     | `/products/:name`        | –                           | 200 + tableau (1 élément)       | 404 produit introuvable       |
| POST    | `/add_product`           | `{ "name": "", "price": 0 }` | 200 + liste mise à jour         | 409 produit déjà existant     |
| PUT     | `/modify_product`        | `{ "name": "", "price": 0 }` | 200 + liste mise à jour         | 404 produit introuvable       |
| DELETE  | `/delete_product/:name`  | –                           | 200 + liste mise à jour         | 404 produit introuvable       |

Données initiales : `p1` (10) et `p2` (20). Le serveur écoute sur le port **3000**.

## 🧪 Tester l'API

Copiez ceci dans un fichier `test.http` (VS Code + REST Client : cliquez sur « Send Request ») :

```http
### Lister
GET http://localhost:3000/products

### Détail
GET http://localhost:3000/products/p1

### Ajouter
POST http://localhost:3000/add_product
Content-Type: application/json

{ "name": "p3", "price": 30 }

### Modifier
PUT http://localhost:3000/modify_product
Content-Type: application/json

{ "name": "p1", "price": 15 }

### Supprimer
DELETE http://localhost:3000/delete_product/p2
```

## 🔍 Limites connues

Ce starter est volontairement simple. Il n'y a notamment :

- aucune validation des données reçues
- aucune persistance (tableau en mémoire)
- aucun test automatisé

## 🎯 Pistes d'amélioration (TP)

- [ ] Valider le corps des requêtes (`name` obligatoire, `price` numérique) et renvoyer `400`
- [ ] Renvoyer le code `201` à la création
- [ ] Revoir le nommage des routes selon les conventions REST
- [ ] Séparer routes et logique métier
- [ ] Remplacer le tableau par une base de données
- [ ] Ajouter des tests automatisés

## 📄 Licence

MIT
