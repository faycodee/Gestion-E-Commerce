# Cahier des Charges : Système de Pop-up de Commande pour Sites e-Commerce

## 1. Introduction
Ce cahier des charges décrit le développement d'un système de pop-up pour la prise de commandes sur les sites e-commerce. Ce système devra être compatible avec toutes les plateformes e-commerce, intégrer 10 tables de données, synchroniser les commandes avec Google Sheets et envoyer des notifications par email lorsqu'une commande est passée.



## 2. Objectifs
- Affichage d'un pop-up de commande interactif sur toutes les plateformes e-commerce.
- Enregistrement des commandes avec 10 tables de données.
- Synchronisation automatique avec Google Sheets.
- Envoi d'une notification email au commerçant à chaque nouvelle commande.

---

## 3. Fonctionnalités Principales

### 3.1. Pop-up de Commande
- Apparition automatique lorsqu'un client clique sur "Ajouter au panier".
- Affichage des détails du panier (produits, quantité, prix, réductions, total).
- Formulaire de commande comprenant :
  - Nom complet
  - Numéro de téléphone
  - Ville
  - Adresse
- Validation et enregistrement des informations client.

### 3.2. Intégration avec Google Sheets
- Chaque commande est enregistrée dans une feuille Google Sheets en temps réel.
- Organisation des données avec 10 tables (produits, clients, commandes, etc.).
- Accès sécurisé via API Google Sheets.

### 3.3. Notifications Email
- Envoi automatique d'un email de notification au commerçant avec les détails de la commande.
- Possibilité d'ajouter plusieurs destinataires.
- Modèle d'email personnalisable.

### 3.4. Compatibilité
- Fonctionne avec toutes les plateformes e-commerce : Shopify, WooCommerce, Magento, PrestaShop, etc.
- Intégration facile via script JavaScript ou plugin.
- Responsive et adapté à tous les appareils.

---

## 4. Architecture Technique
- **Front-end :** JavaScript (React) pour une intégration dynamique.
- **Back-end :** Laravel pour la gestion des commandes.
- **Base de données :** MySQL .
- **Google Sheets API :** Connexion et mise à jour automatique des commandes.
- **Email SMTP/API :** Envoi de notifications avec Mailtramp.

---

## 5. Structure des 10 Tables de Données
1. **Clients** : ID client, nom, email, téléphone, adresse.
2. **Commandes** : ID commande, ID client, date, total, statut.
3. **Produits** : ID produit, nom, description, prix, stock.
4. **Détails Commande** : ID commande, ID produit, quantité, prix.
5. **Livraisons** : ID livraison, ID commande, adresse, statut.
6. **Paiements** : ID paiement, ID commande, mode, statut.
7. **Réductions** : ID réduction, code promo, valeur.
8. **Statistiques** : ID, nombre de commandes, CA.
9. **Notifications** : ID notification, ID commande, statut d'envoi.
10. **Logs** : ID log, action, date.

---

## 6. Délais et Livrables
- **Prototype fonctionnel** : 1 semaines
- **Version finale** : 1 semaines
- **Documentation et guide d'intégration** : 2 semaines

---

## 7. Contraintes Techniques
- Code optimisé et sécurisé.
- Temps de chargement rapide.
- Compatibilité avec tous les navigateurs.
- Respect du RGPD pour la gestion des données client.

---

## 8. Conclusion
Ce projet vise à offrir un outil performant et universel pour simplifier la gestion des commandes sur les sites e-commerce en intégrant des notifications, une synchronisation avec Google Sheets et une compatibilité maximale avec toutes les plateformes     .

