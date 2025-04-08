const { uploadToS3 } = require('../services/s3service.js');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const imageUrl = await uploadToS3(req.file);

    res.status(200).json({ message: 'Upload bem-sucedido!', imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar imagem.' });
  }
};

module.exports = { uploadImage };