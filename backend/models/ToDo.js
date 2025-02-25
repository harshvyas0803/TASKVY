import { DataTypes } from 'sequelize';
import sequelize from '../models/Sequalize.js';
import User from './User.js';

const ToDo = sequelize.define('ToDo', {
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    allowNull: false,
    defaultValue: 'medium'
  },
  // Added reminder field:
  reminder: {
    type: DataTypes.DATE,
    allowNull: true, // Optional field for setting a reminder time
  }
}, {
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt'
});

// Association: A User has many ToDos
User.hasMany(ToDo, { foreignKey: 'userId' });
ToDo.belongsTo(User, { foreignKey: 'userId' });

export default ToDo;
