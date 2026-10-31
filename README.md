# Chambourcy Executive Taxi

Site vitrine premium pour une entreprise de taxi à **Chambourcy (78240)**.
Site statique Next.js (App Router), sans base de données, optimisé pour le SEO local et déployable sur Vercel.

- **Framework :** Next.js 15 (App Router) · React 19 · TypeScript strict
- **Styles :** Tailwind CSS + tokens CSS · polices via `next/font`
- **Blog :** MDX (fichiers dans `content/blog`)
- **Icônes :** lucide-react
- **Validation :** Zod
- **Hébergement cible :** Vercel

> ⚠️ **Avant publication** : les coordonnées, mentions légales et certaines informations sont des **valeurs de démonstration** clairement identifiées. Elles doivent être remplacées par les informations réelles de l'entreprise (voir §5 et §6).

---

## 1. Installation

```bash
npm install
```

## 2. Lancement local

```bash
npm run dev
```

Le site est disponible sur http://localhost:3000.

## 3. Build de production

```bash
npm run build
npm run start
```

Scripts utiles :

```bash
npm run typecheck   # vérification TypeScript
npm run lint        # ESLint
npm run format      # Prettier
```

## 4. Ajouter un article de blog

1. Créer un fichier `content/blog/mon-article.mdx`.
2. Renseigner le frontmatter (en-tête entre `---`) :

```mdx
---
title: 'Titre de l’article'
description: 'Description pour le SEO et les cartes.'
date: '2026-01-15'
updated: '2026-02-01'        # facultatif
author: 'L’équipe Chambourcy Executive Taxi'
category: 'Guide pratique'
cover: '/images/blog/mon-article.webp'
coverAlt: 'Texte alternatif de l’image de couverture'
featured: false              # true pour la mise en avant
draft: false                 # true pour masquer l’article
---

## Un sous-titre

Le contenu de l’article en **Markdown / MDX**.
```

3. L'article apparaît automatiquement dans `/blog`, le sitemap et les articles associés.
   Les titres `##` et `###` alimentent le sommaire automatiquement.

## 5. Modifier les coordonnées et informations de l'entreprise

Tout est centralisé dans **`src/config/site.ts`** :

- Nom commercial, baseline, description
- Téléphone, e-mail
- Ville, code postal, région, adresse
- Zone de service, horaires
- Réseaux sociaux
- Informations légales (SIRET, licence, RCS…)

Après avoir renseigné les **vraies coordonnées**, passez la constante `hasRealContact` à `true`
(dans le même fichier) pour afficher le téléphone et l'e-mail dans le header et le footer.

La navigation se configure dans **`src/config/navigation.ts`**.
Les contenus des services, zones et FAQ sont dans **`src/data/`**.

## 6. Remplacer les photos

Des **images provisoires** (panneaux sombres) sont présentes pour éviter les images cassées.
Remplacez-les par vos **photos réelles** en conservant les mêmes chemins et noms de fichiers :

| Emplacement | Chemin du fichier | Format conseillé |
|---|---|---|
| Fond du hero (accueil) | `public/images/hero/hero.webp` | paysage ~1920×1080 |
| Section « À propos » | `public/images/hero/interior.webp` | 4:3 ~1200×900 |
| Service — Transferts aéroports | `public/images/services/airport.webp` | portrait ~900×1100 |
| Service — Taxi professionnel | `public/images/services/business.webp` | portrait ~900×1100 |
| Service — Trajets privés | `public/images/services/private.webp` | portrait ~900×1100 |
| Service — Mise à disposition | `public/images/services/disposal.webp` | portrait ~900×1100 |
| Image Open Graph (partages) | `public/images/branding/og-default.jpg` | 1200×630 |

Images de couverture du blog : placez-les dans `public/images/blog/` et référencez-les
dans le frontmatter (`cover:`). Par défaut, les articles réutilisent les photos ci-dessus.

> N'affichez jamais une voiture de démonstration comme le véhicule réellement exploité.

## 7. Configuration du domaine

Dans Vercel : **Project → Settings → Domains**, ajoutez votre domaine et suivez les
instructions DNS. Mettez ensuite à jour `NEXT_PUBLIC_SITE_URL` (voir §9).

## 8. Déploiement sur Vercel

1. Poussez le projet sur un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com), **New Project → Import** le dépôt.
3. Vercel détecte Next.js automatiquement (aucune configuration requise).
4. Ajoutez les variables d'environnement (§9), puis **Deploy**.

## 9. Variables d'environnement

Copiez `.env.example` en `.env.local` pour le développement, et configurez ces variables
dans Vercel pour la production.

| Variable | Rôle | Obligatoire |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (métadonnées, sitemap, canonical) | Recommandé |
| `RESEND_API_KEY` | Clé d'un service d'e-mails transactionnels (optionnel) | Non |
| `RESERVATION_TO_EMAIL` | Destinataire des demandes (si envoi activé) | Non |
| `RESERVATION_FROM_EMAIL` | Expéditeur des demandes (si envoi activé) | Non |

**Formulaire de réservation :** par défaut, il prépare un e-mail via un lien `mailto:`
(aucune donnée stockée, aucune réservation automatique). Pour activer un envoi serveur,
voir `src/app/api/reservation/route.ts`.

## 10. Vérifier le sitemap et les métadonnées

Après `npm run build && npm run start` :

- Sitemap : http://localhost:3000/sitemap.xml
- Robots : http://localhost:3000/robots.txt
- Métadonnées : inspectez le `<head>` de chaque page (title, description, canonical, Open Graph).
- Données structurées : vérifiez les blocs JSON-LD (Organization, Service, BreadcrumbList, BlogPosting, FAQPage).

---

## Structure du projet

```
content/blog/            Articles MDX
public/images/           Images (hero, services, blog, branding)
src/
  app/                   Routes App Router (pages, sitemap, robots, 404, API)
  components/            layout, home, booking, services, blog, seo, ui
  config/                site.ts, navigation.ts
  data/                  services.ts, locations.ts, faq.ts
  lib/                   blog.ts, seo.ts, utils.ts, validations.ts, mdx.ts
  types/                 types partagés
design-reference/        Maquette HTML d'origine (référence visuelle)
```

## Informations restant à personnaliser

- [ ] Coordonnées réelles dans `src/config/site.ts` + `hasRealContact = true`
- [ ] Informations légales (mentions légales) : SIRET, licence, RCS, raison sociale, adresse
- [ ] Contenu de la page « À propos » (identité, expérience, véhicule réel)
- [ ] Photos réelles (voir §6)
- [ ] `NEXT_PUBLIC_SITE_URL` avec le domaine définitif
- [ ] Relecture de la politique de confidentialité avec un professionnel
