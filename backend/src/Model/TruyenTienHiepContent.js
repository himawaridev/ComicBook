"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    class TruyenTienHiepContent extends Model {
        // Khai báo class `TruyenTienHiepContent` kế thừa từ Sequelize `Model`.

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Định nghĩa các mối quan hệ (association) với các model khác tại đây nếu cần.
        }
    }

    TruyenTienHiepContent.init(
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
            NameComic: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "NameComic is required" },
                },
            },
            Rating: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Rating is required" },
                },
            },
            RatingCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: "RatingCount is required" },
                },
            },
            Description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: "Description is required" },
                },
            },
            Author: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Author is required" },
                },
            },
            Genres: {
                type: DataTypes.JSON,
                allowNull: false,
                validate: {
                    notNull: { msg: "Genres is required" },
                },
            },
            Status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Status is required" },
                },
            },
            Tags: {
                type: DataTypes.JSON,
                allowNull: false,
                validate: {
                    notNull: { msg: "Tags are required" },
                },
            },
            Chapters: {
                type: DataTypes.JSON,
                allowNull: false,
                validate: {
                    notNull: { msg: "Chapters are required" },
                },
            },
        },
        {
            sequelize,
            modelName: "TruyenTienHiepContent",
            freezeTableName: true,
            tableName: "TruyenTienHiepContent",
            timestamps: true,
        }
    );

    return TruyenTienHiepContent;
}


