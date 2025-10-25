# 👥 Application de Gestion d'Utilisateurs

Application React + TypeScript permettant de consulter, rechercher et gérer une liste d'utilisateurs via l'API [DummyJSON](https://dummyjson.com/users).

## 🚀 Démo

**Déployé sur Vercel** : [Lien vers l'application]

---

## 📋 Description du projet

Cette application a été développée **from scratch** en suivant une approche progressive par niveaux de complexité croissante, allant d'une simple liste d'utilisateurs à une application complète avec gestion d'état avancée, optimisations React et UX soignée.

---

## ✨ Fonctionnalités

### 🎯 Niveau 1 - Base dynamique
- ✅ Affichage de la liste des utilisateurs depuis l'API
- ✅ Fiche détaillée d'un utilisateur (âge, société, adresse, etc.)
- ✅ Navigation via React Router (`/` et `/user/:id`)
- ✅ Gestion des états de chargement et erreurs réseau

### 🔍 Niveau 2 - Interactivité
- ✅ Recherche en temps réel (nom, prénom, email) avec support multi-mots
- ✅ Tri par nom ou par âge
- ✅ Pagination (10 utilisateurs par page, côté client)
- ✅ Gestion propre des erreurs (try/catch)

### 🎨 Niveau 3 - UX évoluée
- ✅ Système de favoris persistant (localStorage)
- ✅ Thème clair/sombre avec persistance
- ✅ Skeleton loader pendant le chargement
- ✅ Messages d'erreur stylisés avec bouton "Réessayer"
- ✅ Optimisations avec `useMemo` (filtre + tri)
- ✅ Animations CSS (fade-in, hover, transitions)

### ⚡ Niveau 4 - Approche professionnelle
- ✅ **Custom hooks** : `useUsers()`, `useFavorites()`
- ✅ **Optimisations React** : `React.memo`, `useCallback`
- ✅ **ErrorBoundary** pour capturer les erreurs globales
- ✅ **Page 404** pour les routes/utilisateurs inexistants
- ✅ **Notifications toast** (react-hot-toast)
- ✅ Architecture maintenable et performante

---

## 🛠️ Technologies utilisées

- **React 18** avec TypeScript
- **Vite** (build tool)
- **React Router** v6 (navigation)
- **react-hot-toast** (notifications)
- **react-icons** (icônes Material Design)
- **CSS3** (animations, thème dark/light)

---

## 📦 Installation

```bash
# Cloner le dépôt
git clone https://github.com/ton-username/saamsaam.git
cd saamsaam

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
```

---

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   ├── UserList.tsx    # Liste paginée des utilisateurs
│   ├── UserCard.tsx    # Carte utilisateur (mémorisée)
│   ├── UserDetail.tsx  # Détails d'un utilisateur
│   ├── NavBar.tsx      # Barre de navigation (recherche, tri, thème)
│   ├── FavoriteButton.tsx  # Bouton favori
│   ├── SkeletonLoader.tsx  # Loader animé
│   ├── ErrorMessage.tsx    # Message d'erreur avec retry
│   ├── ErrorBoundary.tsx   # Gestion erreurs globales
│   └── ThemeToggle.tsx     # Switch thème clair/sombre
├── contexts/
│   ├── theme.ts        # Contexte thème
│   └── ThemeProvider.tsx   # Provider du thème
├── hooks/
│   ├── useUsers.ts     # Hook custom pour gestion users
│   └── useFavorites.ts # Hook custom pour favoris
├── services/
│   └── userService.ts  # Appels API
├── styles/             # Fichiers CSS
├── types/
│   └── User.ts         # Types TypeScript
└── App.tsx             # Composant racine
```

---

## 🎯 Travail effectué

### 🔧 Architecture

**Séparation des responsabilités :**
- **Hooks customs** centralisent la logique métier
- **Services** isolent les appels API
- **Contexts** gèrent l'état global (thème)
- **Components** purs et réutilisables

**Optimisations :**
- `React.memo` sur `UserCard` et `NavBar` (évite re-renders inutiles)
- `useMemo` pour pipeline filtre+tri (recalcul uniquement si dépendances changent)
- `useCallback` pour stabiliser les callbacks passés en props
- ErrorBoundary attrape les erreurs React non gérées

### 🎨 UX/UI

**Thème adaptatif :**
- Mode clair/sombre avec détection préférence système
- Persistance dans localStorage
- Transition douce entre les thèmes

**Animations :**
- Fade-in sur les cartes utilisateur
- Effet hover avec élévation (translateY + box-shadow)
- Animation pulse sur les favoris
- Skeleton loader fluide pendant chargement

**Notifications :**
- Toast de succès (ajout/retrait favoris, rechargement)
- Toast d'erreur (échec réseau)
- ID unique pour éviter doublons

### 🔍 Recherche avancée

La recherche supporte **plusieurs mots** :
- "john doe" trouve les utilisateurs avec "john" ET "doe" dans nom/prénom/email
- Insensible à la casse
- Reset automatique à la page 1 après recherche

### ⭐ Favoris

- Ajout/retrait avec icône étoile
- Persistance localStorage
- Favoris triés en premier dans la liste
- Bouton "Effacer tous les favoris" dans la navbar
- Compteur de favoris

### 🚦 Gestion d'erreurs

**3 niveaux :**
1. **ErrorBoundary** (erreurs React non catchées)
2. **Try/catch** dans les hooks (erreurs async)
3. **Messages d'erreur** avec bouton retry



## 🧪 Tests

Pour tester l'application :

```bash
# Lancer en dev
npm run dev

# Tester les fonctionnalités :
# 1. Recherche multi-mots : "emily johnson"
# 2. Ajouter/retirer des favoris
# 3. Changer le thème (persistance)
# 4. Pagination (10 users/page)
# 5. Simuler erreur réseau (DevTools → Offline)
# 6. Accéder à un user inexistant : /user/999
```

---

## 📝 Améliorations futures

- [ ] Pagination serveur (API `?limit=10&skip=0`)
- [ ] Mode hors ligne avec cache des favoris
- [ ] Tests unitaires (Vitest)
- [ ] Filtres avancés (ville, entreprise, etc.)
- [ ] Export des favoris en CSV
- [ ] Comparateur de 2 utilisateurs

---

## 👨‍💻 Auteur

**Saam** - Développé dans le cadre d'un projet académique React/TypeScript

---

## 📄 Licence

MIT - Libre d'utilisation

