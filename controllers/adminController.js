const User = require('../models/user');

const adminController = {
  async listUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['senha'] },
        order: [['createdAt', 'DESC']]
      });
      
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar usuários' });
    }
  },

  async getUserDetails(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['senha'] }
      });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao obter detalhes do usuário' });
    }
  },

  async updateUser(req, res) {
    try {
      const { role } = req.body;
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (role && ['admin', 'student'].includes(role)) {
        user.role = role;
      }

      await user.save();

      res.status(200).json({
        message: 'Usuário atualizado com sucesso',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (user.id === req.userId) {
        return res.status(400).json({ message: 'Você não pode se remover' });
      }

      await user.destroy();

      res.status(200).json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao remover usuário' });
    }
  },

  async dashboard(req, res) {
    try {
      const totalUsers = await User.count();
      const totalAdmins = await User.count({ where: { role: 'admin' } });
      const totalStudents = await User.count({ where: { role: 'student' } });
      const latestUsers = await User.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'nome', 'email', 'role', 'createdAt']
      });

      res.status(200).json({
        stats: {
          totalUsers,
          totalAdmins,
          totalStudents
        },
        latestUsers
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao obter dados do painel' });
    }
  }
};

module.exports = adminController;