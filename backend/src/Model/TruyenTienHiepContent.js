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
            ImageLinks: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "ImageLinks is required" },
                },
            },
            TitleIntro: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "TitleIntro is required" },
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
            GenresArray: {
                type: DataTypes.JSON,
                allowNull: false,
                validate: {
                    notNull: { msg: "GenresArray is required" },
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
            freezeTableName: true,
            // Sử dụng đúng tên bảng được chỉ định, không tự động đổi sang số nhiều.

            tableName: "TruyenTienHiepContent",
            // Đặt tên bảng trong cơ sở dữ liệu là `TruyenTienHiepContent`.

            timestamps: true,
            // Tự động thêm các trường `createdAt` và `updatedAt` vào bảng.

            sequelize
            // Đối tượng Sequelize được truyền vào model.
        }
    );

    return TruyenTienHiepContent;
}


