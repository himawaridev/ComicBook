const TruyenHoanService = require("../TruyenHoan");

const BASE_URL_TRUYEN_HOAN = 'https://truyenhoan.com'
class ParentStoryService {
    static instance = null;
    url = null;
    getInstance() {
        if (ParentStoryService.instance == null) {
            ParentStoryService.instance = new ParentStoryService();
        }
        return ParentStoryService.instance;
    }
    constructor(category_slug) {
        this.url = `${BASE_URL_TRUYEN_HOAN}/${category_slug}/hoan`;
        console.log(`URL: ${this.url}`);
    }

    async getListStoriesByCategory() {
        if (!this.url) {
            throw new Error('URL is not set. Please set the URL before calling this method.');
        }
        const truyenHoanService = new TruyenHoanService();
        const data = await truyenHoanService.getInstance().GetStoriesByURL(this.url)
        return data;
    }
}

module.exports = ParentStoryService;