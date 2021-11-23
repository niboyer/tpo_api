const db = require("../models");
const Denuncias = db.denuncias;
const DenunciasExtendidas = db.denunciasExtendidas;
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
    try {
        var _denuncias = await Denuncias.findByPk(id, { include: ["denunciasExtendidas"] });
        return _denuncias;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.getDenunciasByDocumento = async function (documento) {
    var condition = documento ? { documento: { [Op.eq]: `${documento}` } } : null;

    try {
        var _denuncias = await Denuncias.findAll({ where: condition, include: ["denunciasExtendidas"] });
        return _denuncias;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.getDenunciasByDocumentoDenunciado = async function (documento) {
    var condition = documento ? { '$denunciasExtendidas.documentoDenunciado$': { [Op.eq]: `${documento}` } } : null;

    try {
        var _denuncias = await Denuncias.findAll({ where: condition, include: ["denunciasExtendidas"] });
        return _denuncias;
    } catch (e) {
        throw Error('Error de servicio: ' + e.message)
    }    
}

exports.createDenuncia = async function (denuncia) {
    let imageFiles = denuncia.imageFiles;
    let urlImagen = [];
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
                    urlImagen.push(result.url);
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
                urlImagen.push(result.url);
            }
        }

        var newDenuncia = new Denuncias({
            documento: denuncia.documento,
            idSitio: denuncia.idSitio,
            descripcion: denuncia.descripcion,
            estado: "Pendiente de Revision",
            aceptaResponsabilidad: 1
        })

        var savedDenuncia = await newDenuncia.save();

        urlImagen.forEach(async function(elemento, indice, array) {
            var newDenunciaExtendida = new DenunciasExtendidas({
                idDenuncias: savedDenuncia.idDenuncias,
                descripcionDenunciado: denuncia.descripcionDenunciado,
                urlImagenes: elemento,
           });
   
           var savedDenunciaExtendida = await newDenunciaExtendida.save();
        })       

        return savedDenuncia;
    } catch (e) {
        console.log(e.message)
        throw Error('Error creando la denuncia: ' + e.message)
    }
}