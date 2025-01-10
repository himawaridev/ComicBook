const { where } = require('sequelize');
const { Category } = require('../Model');
// Import model `Category` từ file `../Model`.

const CATEGORIES_DEFAULT = require('../Seeds/Categories.json');
// Import dữ liệu mặc định của các danh mục từ file JSON.

const Categories = async () => {
    try {
        // Sử dụng `Promise.all` để xử lý tất cả các mục trong mảng `CATEGORIES_DEFAULT` song song.
        await Promise.all(CATEGORIES_DEFAULT.map((async (cate) => {
            // console.log('[Cate: ]', cate)
            // Ghi log thông tin danh mục hiện tại (để debug hoặc kiểm tra quá trình xử lý).

            const checkExits = await Category.findOne({ where: { slug: cate.slug } });
            // Kiểm tra xem danh mục có tồn tại trong cơ sở dữ liệu hay không dựa trên `slug`.

            if (!checkExits) {
                // Nếu danh mục không tồn tại, thêm mới vào cơ sở dữ liệu.
                await Category.create({
                    ...cate // Thêm toàn bộ thông tin từ đối tượng `cate`.
                })
            }
        })));

        console.log('Init Categories successfully: Categories');
        // Ghi log khi quá trình khởi tạo hoàn tất thành công.

    } catch (err) {
        console.error('Init Categories error', err)
        // Xử lý lỗi nếu xảy ra trong quá trình khởi tạo.
    };
};

module.exports = {
    Categories
};

