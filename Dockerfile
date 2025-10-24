FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install --no-audit --no-fund --silent

# Copier le reste du code source
COPY . .

# Construire l'application (sortie dans /dist)
RUN npm run build


# ---- Étape 2 : Image minimale sans Nginx ----
FROM alpine:3.19

WORKDIR /app

# Copier uniquement les fichiers statiques construits
COPY --from=builder /app/dist /app

# Installer un mini serveur pour tester (optionnel)
RUN apk add --no-cache nodejs npm && npm install -g serve

# Expose un port peu utilisé pour éviter les conflits
EXPOSE 8081

# Lancer le serveur de fichiers statiques
CMD ["serve", "-s", "/app", "-l", "8081"]
