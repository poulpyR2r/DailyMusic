const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/user.controller");
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags: [Utilisateur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *       400:
 *         description: Champs requis manquants
 *       409:
 *         description: Un compte avec cet email existe déjà
 *       500:
 *         description: Erreur interne du serveur
 */

router.post("/register", register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecter un utilisateur
 *     tags: [Utilisateur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["email", "password"]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       400:
 *         description: Email et mot de passe requis
 *       401:
 *         description: Email ou mot de passe invalide
 *       500:
 *         description: Erreur interne du serveur
 */

router.post("/login", login);

module.exports = router;
