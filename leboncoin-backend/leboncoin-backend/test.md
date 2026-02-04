## Base URL

http://localhost:5000/api


# Documentation complète – Backend API Leboncoin Clone

## 1. Présentation générale

Ce projet est une API REST développée avec **Node.js** et **Express**, inspirée du fonctionnement de Leboncoin. Elle permet :

* l’authentification des utilisateurs (JWT)
* la gestion des catégories
* la gestion des annonces avec upload d’images

Architecture en couches :

* **Routes** : définition des endpoints
* **Controllers** : logique métier
* **Models** : accès base de données MySQL
* **Middlewares** : sécurité, authentification, upload

---

## 2. Stack technique

* Node.js (ESM)
* Express.js
* MySQL
* JWT (jsonwebtoken)
* Argon2 (hash des mots de passe)
* Multer (upload fichiers)
* Joi (validation des données)
* Helmet / CORS

---

## 3. Arborescence du projet

```
backend/
│── app.js
│── server.js
│── .env
│── uploads/
│
├── routes/
│   ├── auth.routes.js
│   ├── category.routes.js
│   └── annonce.routes.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── category.controller.js
│   └── annonce.controller.js
│
├── models/
│   ├── user.model.js
│   ├── category.model.js
│   └── annonce.model.js
│
├── middlewares/
│   ├── auth.middleware.js
│   └── upload.middleware.js
│
├── validations/
│   ├── auth.validation.js
│   ├── categorie.validation.js
│   └── annonce.validation.js
│
└── config/
    └── db.js
```

---

## 4. Installation et lancement

### 4.1 Prérequis

* Node.js >= 18
* MySQL >= 8

### 4.2 Création de la base de données

```sql
CREATE DATABASE leboncoin_db;
```

Importer le dump SQL :

```bash
mysql -u root -p leboncoin_db < dump.sql
```

### 4.3 Configuration `.env`

Créer un fichier `.env` à la racine du backend :

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=a
DB_NAME=leboncoin_db
JWT_SECRET=jwt_secret_simple
```

### 4.4 Installation des dépendances

```bash
cd backend
npm install
# ou
yarn install
# ou
pnpm install
```

### 4.5 Lancement du serveur

```bash
npm run dev
# ou
yarn dev
```

API disponible sur :

```
http://localhost:5000/api
```

---

## 5. Authentification

### POST /api/auth/register

**Description** : Création d’un utilisateur avec avatar.

* Type : `multipart/form-data`
* Champ fichier : `avatar`

**Body** :

```json
{
  "email": "user@mail.com",
  "password": "password123"
}
```

**Réponses** :

* 201 : utilisateur créé
* 400 : validation invalide
* 409 : email déjà utilisé

---

### POST /api/auth/login

**Description** : Connexion utilisateur.

**Body** :

```json
{
  "email": "user@mail.com",
  "password": "password123"
}
```

**Comportement** :

* Génère un JWT
* Stocke le token dans un cookie HTTP-only

---

## 6. Middleware d’authentification

### authMiddleware

* Vérifie le header `Authorization: Bearer <token>`
* Décode le JWT
* Injecte `req.user = { id, role }`

### roleMiddleware

* Restreint l’accès selon le rôle (`admin`, `user`)

---

## 7. Catégories

### GET /api/categories

Retourne la liste des catégories.

### POST /api/categories

Crée une catégorie.

```json
{
  "name": "Immobilier"
}
```

### PUT /api/categories/:id

Met à jour une catégorie.

### DELETE /api/categories/:id

Supprime une catégorie.

---

## 8. Annonces

### GET /api/annonces

Retourne toutes les annonces.

---

### POST /api/annonces

**Route protégée** (JWT requis).

* Type : `multipart/form-data`
* Champ image : `image` (jusqu’à 5 fichiers)

**Body** :

```json
{
  "title": "iPhone 13",
  "price": 650,
  "city": "Paris",
  "category_id": 2
}
```

---

### GET /api/annonces/:id

Retourne une annonce par ID.

---

### PUT /api/annonces/:id

Met à jour une annonce existante.

---

### DELETE /api/annonces/:id

Supprime une annonce.

---

## 9. Upload des fichiers

* Dossier public : `/uploads`
* Accès public :

```
http://localhost:5000/uploads/nom-du-fichier
```

### Formats autorisés

* PNG
* JPEG / JPG
* WEBP
* SVG

### Taille maximale

* 20 Mo par fichier

---

## 10. Sécurité

* Mots de passe hashés avec **Argon2**
* JWT signé avec secret serveur
* Cookies HTTP-only
* Protection CORS
* Headers sécurisés via Helmet

---

## 11. Outils de test

* Postman
* Insomnia
* Thunder Client

Utiliser `multipart/form-data` pour les routes avec upload.
