const Pet = require('../models/pet.js')

/* Create Pet */
/* When a client in created we first create it's pet. */
exports.post_create_pet = (req, res, next) => {
	const pet = new Pet({
		name: req.body.petName,
		birthday: req.body.petBirthday,
		age: req.body.petAge,
		weight: req.body.petWeight,
		breed: req.body.petBreed
	}).save((err, thePet) => {
		if(err)
			return next(err)

		/* Success */
		/* Send Pet to next method */
		res.locals.pet = thePet
		next()
	})
}

/* Add Owner to Pet */
/* Once the client is created we update the pet to
 * set the owner attribute. */
exports.post_add_owner = (req, res) => {
	Pet.findByIdAndUpdate(res.locals.pet._id,
						  { owner: res.locals.client._id },
						  (err, thePet) => {
		if(err)
			res.status(403).json(err)

		/* Success */
		res.status(201).json()
	})
}