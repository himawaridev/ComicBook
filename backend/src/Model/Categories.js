"use strict";
const { Model, DataTypes } = require("sequelize");
// Import các module cần thiết từ Sequelize.

module.exports = (sequelize) => {
    // Xuất một hàm nhận đối tượng Sequelize để định nghĩa model.

    class Category extends Model {
        // Khai báo class `Category` kế thừa từ Sequelize `Model`.

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Định nghĩa các mối quan hệ (association) với các model khác tại đây nếu cần.
        }
    }

    // Khởi tạo cấu trúc của model `Category` với các thuộc tính (fields).
    Category.init(
        {
            // Thuộc tính `title` với kiểu dữ liệu là chuỗi.
            title: {
                type: DataTypes.STRING, // Kiểu chuỗi (string).
                allowNull: false,      // Không cho phép giá trị null.
                validate: {
                    notNull: { message: 'title required' }
                    // Thêm thông báo lỗi khi không có giá trị.
                }
            },
            // Thuộc tính `slug` với kiểu dữ liệu là chuỗi.
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: 'slug required' }
                    // Thông báo lỗi nếu giá trị null.
                }
            },
            // Thuộc tính `description` để lưu mô tả danh mục.
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: 'description required' }
                    // Thông báo lỗi khi `description` rỗng.
                }
            },
            // Thuộc tính `link` lưu liên kết liên quan đến danh mục.
            link: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: 'link required' }
                    // Bắt buộc nhập `link`, nếu không sẽ trả lỗi.
                }
            },
            // Thuộc tính `status` thể hiện trạng thái (có thể `true` hoặc `false`).
            status: DataTypes.BOOLEAN
        },
        {
            freezeTableName: true,
            // Sử dụng đúng tên bảng được chỉ định, không tự động đổi sang số nhiều.

            tableName: "categories",
            // Đặt tên bảng trong cơ sở dữ liệu là `categories`.

            timestamps: true,
            // Tự động thêm các trường `createdAt` và `updatedAt` vào bảng.

            sequelize
            // Đối tượng Sequelize được truyền vào model.
        }
    );

    return Category;
    // Trả về model `Category` để sử dụng ở các module khác.
};
