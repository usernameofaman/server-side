import React from "react";
interface EMWContentAreaProps {
    data: any;
}

const EXTRA_SPACE = 50

const EMWContentArea: React.FC<EMWContentAreaProps> = props => {
    const { data }=props;
    // const contentJson = data.contentJson;
    const slug = data.slug;    
    // const PreviewHTML = ({
    //     content,
    // }) => {
    //     const contentJSON = JSON.parse(content)
    //     const html = contentJSON["gjs-html"] || ""
    //     const css = contentJSON["gjs-css"] || ""

    //     const onLoad = (event) => {
    //         const { target = null } = event

    //         if (target) {
    //             target.style.height = slug === "bottom-hero" ? `${target.contentWindow.document.body.scrollHeight}px`:  `${target.contentWindow.document.body.scrollHeight + EXTRA_SPACE}px`
    //         }
    //     } 

    //     return (
    //         <iframe
    //             style={{
    //                 width: "100%",
    //             }}
    //             onLoad={onLoad}
    //             srcDoc={
    //                 `
    //                     <html>
    //                         <head>
    //                             <style>
    //                                 ${css}
    //                             </style>
    //                         </head>
    //                         <body>
    //                             ${html}
    //                         </body>
    //                     </html>
    //                 `
    //             }
    //         />
    //     )

    // }
    const onLoad = (event) => {
        const { target = null } = event
        if (target) {
            target.style.height = slug === "bottom-hero" ? `${target.contentWindow.document.body.scrollHeight}px`:  `${target.contentWindow.document.body.scrollHeight + EXTRA_SPACE}px`;
            
            // set contenteditable attr to false to not allow user to edit content
            const editable_elements = target.contentWindow.document.querySelectorAll('[contenteditable="true"]');
            for(let i=0; i<editable_elements.length; i++){
                editable_elements[i].setAttribute("contenteditable", "false");
            }

            //set base tag so that every anchor click redirect to parent
            const baseTag= document.createElement('base');
            baseTag.target = '_parent';
            target.contentWindow.document.getElementsByTagName('head')[0].appendChild(baseTag);

            // set iframe body background colour
            target.contentWindow.document.body.style.background= "#FFFFFF";

            // box shadow set none 
            const elements = target.contentWindow.document.getElementsByClassName('fdb-block');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.boxShadow="none";
            }
        }
    }
    return (
        <>
            <div>
                {/* <PreviewHTML
                    content={contentJson}
                /> */}
                <iframe
                    onLoad={onLoad}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    srcDoc={data.content}
                />
            </div>
        </>
    );
}
export default EMWContentArea;	
