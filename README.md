# DailyMusic API

## Clonage du Projet

Pour commencer, clonez le projet sur votre machine locale avec la commande suivante :

```bash
git clone https://github.com/poulpyR2r/DailyMusic
```

Executer

## Configuration des Variables d'Environnement

1. Créez un fichier `.env` dans le répertoire racine du projet.
2. Ajoutez vos identifiants Spotify Developer :

   ```plaintext
   SPOTIFY_CLIENT_ID=votre_client_id
   SPOTIFY_CLIENT_SECRET=votre_client_secret
   ```

### Création d'un Compte Développeur Spotify

Pour obtenir vos identifiants, suivez ces étapes :

1. Rendez-vous sur [le site des développeurs Spotify](https://developer.spotify.com).
2. Créez un compte ou connectez-vous si vous en avez déjà un.
3. Créez une application pour obtenir vos `SPOTIFY_CLIENT_ID` et `SPOTIFY_CLIENT_SECRET`.

## Lancement de l'Application

Pour démarrer l'application, exécutez :

Installez les dépendences :

```bash
npm i
```

Lancez l'API

```bash
npm start
```

Votre application devrait maintenant être en cours d'exécution localement.

## Role administrateur

Pour tester toutes les fonctionnalités de l'application, il est nécessaire de convertir un utilisateur en "admin" dans la base de données :

1. Créez un compte en fournissant un nom, un email et un mot de passe.
2. Ouvrez MongoDB Compass et sélectionnez la base de données DailyMusic.
3. Localisez l'utilisateur que vous venez de créer et modifiez son champ 'role' en le changeant en "admin".

Cela devrait se présenter de la manière suivante :
![MongodbCompass user](/git/markdown.png)


## Swagger

Il est possible d'accèder au Swagger de l'API via

```bash
[LOCAL_URL]/api-docs
```

## Test

Il est possible d'executer les test à l'aide de la commande :

```bash
npm test
```

## Contribution

Si vous souhaitez contribuer à ce projet, veuillez suivre les instructions suivantes :

1. Forkez le dépôt.
2. Créez une nouvelle branche (`git checkout -b feature-branch`).
3. Faites vos changements et committez-les (`git commit -am 'Add some feature'`).
4. Poussez la branche (`git push origin feature-branch`).
5. Créez une nouvelle Pull Request.
