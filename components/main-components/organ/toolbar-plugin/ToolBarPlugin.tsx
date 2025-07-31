import { TextBolder, TextItalic, TextUnderline } from "phosphor-react";
import { FC } from "react";

const ToolBarPlugin: FC = () => {
    return (
        <div className="toolbar-plugin">
            <button className="toolbar-button"><TextBolder /></button>
            <button className="toolbar-button"><TextItalic /></button>
            <button className="toolbar-button"><TextUnderline /></button>
        </div>
    );
}

export default ToolBarPlugin;