import { useContext } from "react";
import { ThemeContext } from "@/Context/ThemeContext";

interface SettingProps {
    onClose: () => void; // Nhận onClose từ props
}

import "@/Views/Setting.scss";

const Setting: React.FC<SettingProps> = ({ onClose }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div id="Setting" onClick={onClose}>
            <div className="Setting-item">
                <div className="Setting-mode">Mode Dark/Light</div>
                <div className="Setting-yes-no">
                    <label className="ChooseType" style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            className="Radio"
                            type="radio"
                            checked={theme === "dark"}
                            onChange={toggleTheme}
                        />
                        <div className="ChooseTypeText" style={{ margin: '0px 0px 0px 10px' }}>Dark</div>
                    </label>
                    <label className="ChooseType" style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            className="Radio"
                            type="radio"
                            checked={theme === "light"}
                            onChange={toggleTheme}
                        />
                        <div className="ChooseTypeText" style={{ margin: '0px 0px 0px 10px' }}>Light</div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Setting;
