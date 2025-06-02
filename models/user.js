const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    },
    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    instituicao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    telefone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ra: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'student'),
      defaultValue: 'student'
    },
    primeiroAcesso: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    senhaTemporaria: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    pontos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.instituicao.toLowerCase() === 'unimar' && user.role === 'student') {
          if (!user.ra) {
            throw new Error('RA é obrigatório para alunos da Unimar');
          }

          const raRegex = /^\d{7,10}$/;
          if (!raRegex.test(user.ra)) {
            throw new Error('RA deve conter apenas números (7 a 10 dígitos)');
          }
        }

        if (user.instituicao.toLowerCase() !== 'unimar') {
          user.ra = null;
        }

        if (user.senha) {
          const salt = await bcrypt.genSalt(10);
          user.senha = await bcrypt.hash(user.senha, salt);
        }

        if (user.instituicao.toLowerCase() === 'unimar') {
          user.senhaTemporaria = true;
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('instituicao')) {
          if (user.instituicao.toLowerCase() === 'unimar' && user.role === 'student' && !user.ra) {
            throw new Error('RA é obrigatório para alunos da Unimar');
          }
        }

        if (user.instituicao.toLowerCase() === 'unimar' && user.role === 'student' && user.changed('ra')) {
          if (!user.ra) {
            throw new Error('RA é obrigatório para alunos da Unimar');
          }

          const raRegex = /^\d{7,10}$/;
          if (!raRegex.test(user.ra)) {
            throw new Error('RA deve conter apenas números (7 a 10 dígitos)');
          }
        }

        if (user.changed('senha')) {
          const salt = await bcrypt.genSalt(10);
          user.senha = await bcrypt.hash(user.senha, salt);
          user.senhaTemporaria = false;
        }
      }
    },
    validate: {
      raRequiredForUnimar() {
        if (this.instituicao.toLowerCase() === 'unimar' && this.role === 'student' && !this.ra) {
          throw new Error('RA é obrigatório para alunos da Unimar');
        }
      }
    }
  });

  User.prototype.validPassword = async function (senha) {
    return await bcrypt.compare(senha, this.senha);
  };

  return User;
};