const db = require("../models");
const Denuncias = db.denuncias;
const Op = db.Sequelize.Op;
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')

cloudinary.config({
    cloud_name: 'dkzdetg2g',
    api_key: '694116824371623',
    api_secret: '-llUzX9C4sCAnOz3BWObuRtH344',
    secure: true
});

exports.getDenunciasByID = async function (id) {
    var condition = id ? { idDenuncia: { [Op.eq]: `${id}` } } : null;
    
    try {
        var _denuncias = await Denuncias.findAll({ where: condition });
        return _denuncias;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.createDenuncia = async function (denuncia) {
    let imageFiles = denuncia.imageFiles;
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

        var newDenuncia = new Denuncias({
            nombre: publicacion.nombre,
            direccion1: publicacion.direccion1,
            direccion2: publicacion.direccion2,
            motivo: publicacion.motivo,
            descripcion: publicacion.descripcion,
            urlImagenes: urlImagen,
            estado: publicacion.estado,
            denunciante: publicacion.denunciante,
            
        })


        var savedDenuncia = await newDenuncia.save();

        return savedDenuncia;
    } catch (e) {
        throw Error('Error creando la denuncia: ' + e)
    }
}