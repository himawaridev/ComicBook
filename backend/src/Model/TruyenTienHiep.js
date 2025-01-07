"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    class TruyenTienHiep extends Model {
        // Khai báo class `TruyenTienHiep` kế thừa từ Sequelize `Model`.

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Định nghĩa các mối quan hệ (association) với các model khác tại đây nếu cần.
        }
    }

    TruyenTienHiep.init(
        {
            Slug: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "ImageLinks is required" },
                },
            },
            ImageLinks: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "ImageLinks is required" },
                },
            },
            Title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "TitleIntro is required" },
                },
            },
            Author: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "NameComic is required" },
                },
            },
            Chapters: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Rating is required" },
                },
            }
        },
        {
            sequelize,
            modelName: "TruyenTienHiep",
            freezeTableName: true,
            tableName: "TruyenTienHiep",
            timestamps: true,
        }
    );

    return TruyenTienHiep;
}


