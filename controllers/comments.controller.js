//llamar a mongoose
//llamar al model de comments y celebrities

const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.model');
const Comment = require('../models/comment.model');

// qué cosas hacemos con un comment?
// crear el comentario(do Create)

module.exports.doCreate = (req, res, next) => {
    console.log(req.body);

    const id = req.body.celebrity;
    Celebrity.findById(id)
        .then( celebrity => {
            if(celebrity){
                let comment = new Comment ({
                    Title: req.body.Title,
                    text: req.body.text,
                    celebrity: celebrity._id
                });

                comment.save()
                    .then(()=>{
                        celebrity.comments.push(comment)

                        return celebrity.save(); //entiendo por qué hacemos el save de celebrity (creo) pero ¿por qué en un return? 
                    })
                    .then(()=>{
                        res.redirect(`/celebrities/${id}`);
                    })

                    .catch(error => {
                        console.log(error)
                    })
            }
        })
        .catch(error => {
            console.error(error);
        })
}

// Actualizar el comentario