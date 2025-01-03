import { ReactNode } from "react";
//
interface TypeSetting {
    mode: string;
    yes: ReactNode;
    no: ReactNode;
}

const Setting: React.FC = () => {
    const ListSetting: TypeSetting[] = [
        {
            mode: "Chế độ ban đêm",
            yes: (
                <div className="ChooseType">
                    <input className="Radio" type="radio"></input>
                    <div className="ChooseTypeText">Có</div>
                </div>
            ),
            no: (
                <div className="ChooseType">
                    <input className="Radio" type="radio"></input>
                    <div className="ChooseTypeText">Không</div>
                </div>
            ),
        },
    ];

    const RenderSetting: React.FC = () => {
        return (
            <div>
                {ListSetting.map((item, index) => (
                    <div key={index} className="setting-item">
                        <div className="setting-mode">{item.mode}</div>
                        <div className="setting-yes-no">
                            <span>{item.yes}</span>  <span>{item.no}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div id="Setting">
            <RenderSetting />
        </div>
    );
};

export default Setting;
