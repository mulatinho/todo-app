/*
  Todo-App RESTful API
    (c) 2019 Alexandre Mulatinho
*/

'use strict';

module.exports = function(sequelize, DataTypes) {
  let tag = sequelize.define("tag", {
    name: { type: DataTypes.STRING, allowNull: false }
  }, {
    underscored: true
  });

  return tag;
}
