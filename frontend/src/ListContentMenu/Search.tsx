import { SearchOutlined } from "@ant-design/icons";
// Import scss and any:
import "@/ListContentMenu/Search.scss";


const Search: React.FC = () => {
    return (
        <div id="Search">
            <input className="InputSearch" placeholder="Tìm kiếm..."></input>
            <SearchOutlined className="Icon" />
        </div>
    );
};
export default Search;