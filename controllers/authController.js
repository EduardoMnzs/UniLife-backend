const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const authController = {
  async register(req, res) {
    try {
      const { nome, cpf, dataNascimento, instituicao, email, telefone, senha, ra } = req.body;

      if (instituicao.toLowerCase() === 'unimar' && !ra) {
        return res.status(400).json({ 
          success: false,
          message: 'RA é obrigatório para alunos da Unimar' 
        });
      }
  
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }
  
      const cpfExists = await User.findOne({ where: { cpf } });
      if (cpfExists) {
        return res.status(400).json({ message: 'CPF já cadastrado' });
      }

      const telefoneExists = await User.findOne({ where: { telefone } });
      if (telefoneExists) {
        return res.status(400).json({ message: 'Telefone já cadastrado' });
      }
  
      if (instituicao.toLowerCase() === 'unimar') {
        const raExists = await User.findOne({ where: { ra } });
        if (raExists) {
          return res.status(400).json({ message: 'RA já cadastrado' });
        }
      }
  
      const user = await User.create({
        nome,
        cpf,
        dataNascimento,
        instituicao,
        email,
        telefone,
        senha,
        ra: instituicao.toLowerCase() === 'unimar' ? ra : null
      });

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role || 'user'
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(201).json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        cpf: user.cpf,
        dataNascimento: user.dataNascimento,
        telefone: user.telefone,
        ra: user.ra,
        role: user.role,
        instituicao: user.instituicao,
        primeiroAcesso: user.primeiroAcesso,
        senhaTemporaria: user.senhaTemporaria,
        token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const isValidPassword = await user.validPassword(senha);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      if (user.instituicao.toLowerCase() === 'unimar' && user.senhaTemporaria) {
        return res.status(200).json({
          message: 'Troca de senha necessária',
          token,
          primeiroAcesso: true,
          role: user.role
        });
      }

      if (user.primeiroAcesso) {
        await user.update({ primeiroAcesso: false });
      }

      res.status(200).json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
        instituicao: user.instituicao,
        primeiroAcesso: user.primeiroAcesso,
        token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  },

  async changePassword(req, res) {
    try {
      const { senhaAtual, novaSenha } = req.body;
      const userId = req.userId;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const isValidPassword = await user.validPassword(senhaAtual);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Senha atual incorreta' });
      }

      await user.update({ senha: novaSenha, senhaTemporaria: false, primeiroAcesso: false });

      res.status(200).json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  },

  async getMe(req, res) {
    try {
      const user = await User.findByPk(req.userId, {
        attributes: { exclude: ['senha'] }
      });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  },

  async deleteMe(req, res) {
    try {
      const userId = req.userId;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await user.destroy();

      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  },
};

module.exports = authController;