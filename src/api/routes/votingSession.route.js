const express = require("express");
const router = express.Router();

const {
  createVotingSession,
  getInformationOfVotingSession,
  getAllVotingSessions,
  deleteVotingSession,
  updateVotingSession,
} = require("../controllers/votingSession.controller");
const { verifyToken } = require("../middleware/verifyToken");
const { verifyIfIsAdmin } = require("../middleware/verifyUser");
/**
 * @swagger
 * /create-session:
 *   post:
 *     summary: Créer une nouvelle session de vote
 *     tags: [Session de Vote]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VotingSession'
 *     responses:
 *       201:
 *         description: Session de vote créée avec succès
 *       400:
 *         description: Requête incorrecte
 *       401:
 *         description: En-tête d'autorisation manquant ou format invalide
 *       403:
 *         description: Jeton invalide ou expiré
 *       500:
 *         description: Erreur interne du serveur
 */

router.post(
  "/create-session",
  verifyToken,
  verifyIfIsAdmin,
  createVotingSession
);
/**
 * @swagger
 * /get-sessions:
 *   get:
 *     summary: Obtenir toutes les sessions de vote
 *     tags: [Session de Vote]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des sessions de vote
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/get-sessions", verifyToken, getAllVotingSessions);
/**
 * @swagger
 * /get-informations/{sessionId}:
 *   get:
 *     summary: Obtenir des informations sur une session de vote spécifique
 *     tags: [Session de Vote]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la session de vote
 *       404:
 *         description: Session non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

router.get(
  "/get-informations/:sessionId",
  verifyToken,
  verifyIfIsAdmin,
  getInformationOfVotingSession
);
/**
 * @swagger
 * /delete-session/{sessionId}:
 *   delete:
 *     summary: Supprimer une session de vote spécifique
 *     tags: [Session de Vote]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session de vote supprimée avec succès
 *       404:
 *         description: Session non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

router.delete(
  "/delete-session/:sessionId",
  verifyToken,
  verifyIfIsAdmin,
  deleteVotingSession
);
/**
 * @swagger
 * /update-session/{sessionId}:
 *   put:
 *     summary: Mettre à jour une session de vote avec des références musicales
 *     tags: [Session de Vote]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *           description: L'ID unique de la session de vote à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               musics:
 *                 type: array
 *                 description: Une liste des ID de musiques à associer à la session de vote
 *                 items:
 *                   type: string
 *                   description: L'ID unique d'une musique
 *           example:
 *             musics: ["5f8d0a807b6b8b3d3208cebf", "5f8d0a817b6b8b3d3208cec0"]
 *     responses:
 *       200:
 *         description: Session de vote mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VotingSession'
 *       400:
 *         description: Format des musiques invalide
 *       404:
 *         description: Session non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

router.put("/update-session/:sessionId", verifyToken, updateVotingSession);

module.exports = router;
