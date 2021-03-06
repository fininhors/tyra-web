const PET = require('../models/pet.js');
const FS = require('fs');

/* Create Pet
 *
 * The user may want to create a pet to the application.
 *
 * When a client in created we first create it's pet. */
exports.CreatePet = (req, res, next) => {
	const pet = new PET({
		name: req.body.petName,
		birthdate: req.body.petBirthdate,
		age: req.body.petAge,
		weight: req.body.petWeight,
		breed: req.body.petBreed,
		femaleOrMale: req.body.petFemaleOrMale,
	}).save((err, pet) => {
		if(err)
			return res.status(406).json(err);

		/* Success
		 *
		 * Send Pet to createClient method in Client Controller. */
		res.locals.pet = pet;
		next();
	});
};

/* Add Owner to Pet
 *
 * Once the client is created we update the pet to
 * set the owner attribute. */
exports.AddOwnerToPet = (req, res) => {
	PET.findByIdAndUpdate(res.locals.pet._id,
						  { owner: res.locals.client._id },
						  err => {
		if(err)
			res.status(406).json(err);

		/* Success */
		res.status(201).json();
	});
};

/* Upload Profile Picture
 *
 * So the user may want to upload a profile picture for a pet.
 * What we need to do is before anything, create the uploads directory
 * to save all the pet profile pictures inside that directory.
 *
 * Once we have that directory we process the image, change it's name
 * for the pet's id and then save it. */
exports.UploadProfilePicture = async (req, res) => {
	if(req.files){
		const PICTURE = req.files.picture;

		const FOLDER = await CheckPetPicturesFolder();

		if(FOLDER)
			PICTURE.mv('./uploads/pet-pictures/' + req.body.id + '.png',
					   err => {
				if(err)
					return res.status(406).json(err);

				/* Success */
				res.sendStatus(201);
			});
	}else{
		res.sendStatus(404);
	}
};

function CheckPetPicturesFolder(){
	const PET_PICTURES_FOLDER = 'uploads/pet-pictures';

	try{
		if(!FS.existsSync(PET_PICTURES_FOLDER));
			FS.mkdirSync(PET_PICTURES_FOLDER);

		return true;
	}catch(err){
		console.error(err);
		return false;
	}
};

/* Get Profile Picture
 *
 * We need to check whether or not the file exists. */
exports.GetProfilePicture = (req, res) => {
	const PET_PICTURE = 'uploads/pet-pictures/' + req.query.id + '.png';

	try{
		FS.access(PET_PICTURE, err => {
			if(err)
				return res.status(406).json(err);

			/* Success */
			res.sendStatus(200);
		})
	}catch(err){
		return res.status(406).json(err);
	}
};

/* Get Pet
 *
 * The user may want just one Pet to See, Edit or Delete it. */
exports.GetPet = (req, res) => {
	PET.findById(req.query.id, (err, pet) => {
		if(err)
			res.status(403).json(err);

		if(pet)
			/* Success */
			res.status(200).json(pet);
		else
			res.sendStatus(404);
	});
};

/* Get all Pet
 *
 * The user may want to see a list of all the available pets. */
exports.GetPets = (req, res) => {
	PET.find()
		  .populate('client')
		  .sort([['name', 'ascending']])
		  .exec((err, pets) => {
			  if(err)
				  return res.status(406).json(err);

			  /* Success */
			  res.status(200).json(pets);
		  });
};
