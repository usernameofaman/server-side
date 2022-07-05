import React from "react";
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import './css/index.css';

interface EMWFroalaViewerProps{
    content: any;
}
const EMWFroalaViewer: React.FC<EMWFroalaViewerProps> = props => {
    const { content }=props;
    return(
        <div className="reset-this">
            <FroalaEditorView model={`${content}`} />
        </div>
    )
}

export default EMWFroalaViewer;