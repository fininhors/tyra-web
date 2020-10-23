const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const AUTH_TOKEN = require('../middlewares/authenticateToken.js');

/* Require Controller Modules */
const PET = require(PATH.join(__dirname, '../controllers/pet.js'));

/* Pet Routes */
ROUTER.get('/', AUTH_TOKEN, PET.GetPet);
ROUTER.get('/all', AUTH_TOKEN, PET.GetPets);
ROUTER.post('/upload-picture', AUTH_TOKEN, PET.UploadProfilePicture);
ROUTER.get('/picture', AUTH_TOKEN, PET.GetProfilePicture);

module.exports = ROUTER;
