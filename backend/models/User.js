import { DataTypes } from "sequelize";
import Sequelize from './Sequalize.js'

const User = Sequelize.define('User',{

    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email:    { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }



})
export default User