// get lít the loai truyen
const { TheLoaiTruyen } = require('../../Model');
const ParentStoryService = require('../ParentStory/ParentStory');

const RunCrawl = async () => {
    const TheLoaiTruyen = await TheLoaiTruyen.findAll();
    for (const item of TheLoaiTruyen) {
        const category_slug = item.category_slug;
        const parentStoryService = new ParentStoryService(category_slug);
        const data = await parentStoryService.getInstance().getListStoriesByCategory();
        console.log(data);
    }
}