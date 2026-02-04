```bash
project-root/
│
├── app.js
├── package.json
├── .env
│
├── config/
│ └── db.js
│
├── models/
│ └── User.model.js
│
├── controllers/
│ └── auth.controller.js
│
├── routes/
│ └── auth.routes.js
│
├── middlewares/
│ ├── auth.middleware.js
│ ├── role.middleware.js
│ └── validate.middleware.js
│
├── validations/
│ └── auth.validation.js
│
└── utils/
└── jwt.js

```
### .env 
```env
PORT=5000
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=auth-db

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1d


```

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "argon2": "^0.44.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "express-rate-limit": "^8.2.1",
    "helmet": "^8.1.0",
    "joi": "^18.0.2",
    "jsonwebtoken": "^9.0.3",
    "mysql2": "^3.16.0",
    "nodemon": "^3.1.11"
  }
}
```
# Créez une base de donnée `auth-db`

```sql

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

# Documentation Postman – Tests API Authentification

API Express – JWT (cookies HTTP-only) – Register / Login

---

# Documentation Postman – Tests API Authentification

API Express – JWT via cookies HTTP-only – Register et Login

# PRÉREQUIS

- API active sur http://localhost:5000
- Base de données initialisée
- Postman v10 ou supérieur
- Cookies activés dans Postman

# CONFIGURATION POSTMAN

Créer un environnement nommé "Auth API Local" avec la variable :

- base_url = http://localhost:5000/api

# TEST 1 – REGISTER

# Requête

- Méthode : POST
- URL : {{base_url}}/auth/register
  Headers
- Content-Type: application/json

# Body (raw / JSON)

```json
{
  "email": "user@test.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

# Réponse attendue

- HTTP 201
  {
  "message": "User created"
  }

# Cas d’erreur à tester

- Email invalide → 400
- Mot de passe < 8 caractères → 400
- Password ≠ confirmPassword → 400
- Email existant → 400 ou 409

# TEST 2 – LOGIN

# Requête

- Méthode : POST
- URL : {{base_url}}/auth/login
  Headers
- Content-Type: application/json
  Body (raw / JSON)

```json
{
  "email": "user@test.com",
  "password": "password123"
}
```

# Réponse attendue

- HTTP 200
  {
  "message": "Authenticated"
  }

# COOKIE JWT

# Après un login réussi, vérifier dans Postman > Cookies :

- Nom : token
- HttpOnly : true
- SameSite : Strict
- Secure : false (true en production)
  Le JWT n’est jamais présent dans le body de la réponse.

# TEST 3 – ROUTE PROTÉGÉE

# Requête

- Méthode : GET
- URL : {{base_url}}/protected

# Conditions

- Aucun header manuel
- Cookie JWT envoyé automatiquement

# Réponses attendues

- Cookie valide → 200
- Cookie absent → 401
- Token invalide ou expiré → 401

# BONNES PRATIQUES

- Tester les erreurs avant les succès
- Utiliser des emails uniques
- Vérifier les codes HTTP
