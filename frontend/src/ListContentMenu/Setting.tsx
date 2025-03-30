import { useContext } from "react";
import { ThemeContext } from "@/Context/ThemeContext";

interface SettingProps {
    onClose: () => void; // Nhận onClose từ props
}

const Setting: React.FC<SettingProps> = ({ onClose }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div id="Setting" onClick={onClose}>
            <div className="setting-item">
                <div className="setting-mode">Chế độ ban đêm</div>
                <div className="setting-yes-no">
                    <label className="ChooseType">
                        <input
                            className="Radio"
                            type="radio"
                            checked={theme === "dark"}
                            onChange={toggleTheme}
                        />
                        <div className="ChooseTypeText">Có</div>
                    </label>
                    <label className="ChooseType">
                        <input
                            className="Radio"
                            type="radio"
                            checked={theme === "light"}
                            onChange={toggleTheme}
                        />
                        <div className="ChooseTypeText">Không</div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Setting;
