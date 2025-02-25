import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const ActivityLog = sequelize.define('ActivityLog', {
  action: { type: DataTypes.STRING, allowNull: false },
  details: { type: DataTypes.TEXT, allowNull: true }
});

// Association: A User has many ActivityLogs
User.hasMany(ActivityLog, { foreignKey: 'userId' });
ActivityLog.belongsTo(User, { foreignKey: 'userId' });

export default ActivityLog;
