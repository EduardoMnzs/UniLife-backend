const produtoService = require('../services/produto');

async function resgatar(req, res) {
  try {
    const userId = req.user.id;
    const { id: itemId } = req.params;

    const resultado = await produtoService.resgatarProduto(userId, itemId);

    return res.status(200).json(resultado);

  } catch (error) {
    
    return res.status(403).json({ message: error.message });
  }
}

module.exports = { resgatar };