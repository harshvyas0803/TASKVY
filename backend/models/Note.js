import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Note = sequelize.define(
  'Note',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    reminder: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);


// Association: A User has many Notes
User.hasMany(Note, { foreignKey: 'userId' });
Note.belongsTo(User, { foreignKey: 'userId' });


export default Note;

