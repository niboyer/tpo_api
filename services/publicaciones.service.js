const db = require("../models");
const Publicaciones = db.publicaciones;
const Op = db.Sequelize.Op;
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')

cloudinary.config({
    cloud_name: 'dkzdetg2g',
    api_key: '694116824371623',
    api_secret: '-llUzX9C4sCAnOz3BWObuRtH344',
    secure: true
});

exports.getPublicacionesByTipo = async function (tipo) {
    var condition = tipo ? { tipoPublicacion: { [Op.eq]: `${tipo}` }, estado: { [Op.eq]: 'Aceptada' } } : null;
    
    try {
        var _publicaciones = await Publicaciones.findAll({ where: condition });
        return _publicaciones;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.createPublicacion = async function (publicacion) {
    let imageFiles = publicacion.imageFiles;
    let urlImagen = '';
    try {
        if (imageFiles !== null) {
            if (imageFiles.files.length !== undefined) {
                for (let i = 0; i < imageFiles.files.length; i++) {
                    let streamUpload = (imageFiles, i) => {
                        return new Promise((resolve, reject) => {
                            let stream = cloudinary.uploader.upload_stream(
                                (error, result) => {
                                    if (result) {
                                        resolve(result);
                                    } else {
                                        reject(error);
                                    }
                                }
                            );
                            streamifier.createReadStream(imageFiles.files[i].data).pipe(stream);
                        });
                    };

                    let result = await streamUpload(imageFiles, i);
                    urlImagen = urlImagen + '|' + result.url;
                }
            } else {
                let streamUpload = (imageFiles) => {
                    return new Promise((resolve, reject) => {
                        let stream = cloudinary.uploader.upload_stream(
                            (error, result) => {
                                if (result) {
                                    resolve(result);
                                } else {
                                    reject(error);
                                }
                            }
                        );
                        streamifier.createReadStream(imageFiles.files.data).pipe(stream);
                    });
                };

                let result = await streamUpload(imageFiles);
                urlImagen = urlImagen + '|' + result.url;
            }
        }

        var newPublicacion = new Publicaciones({
            nombre: publicacion.nombre,
            horarios: publicacion.horarios,
            rubros: publicacion.rubros,
            descripcion: publicacion.descripcion,
            direccion: publicacion.direccion,
            telefono: publicacion.telefono,
            email: publicacion.email,
            urlImagenes: urlImagen,
            tipoPublicacion: publicacion.tipoPublicacion
        })


        var savedPublicacion = await newPublicacion.save();

        return savedPublicacion;
    } catch (e) {
        throw Error('Error creando la publicacion: ' + e)
    }
}