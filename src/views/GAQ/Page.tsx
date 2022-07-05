import React, { useState, useEffect } from "react";
import GetAQuoteMenu from "../../views/EMWAddToCart/GetAQuoteMenu"

const Page: React.FC= () => {
	return (
        <>
            <GetAQuoteMenu mainMenu={false} openModal={true}/>
        </>
    );
}
export default Page;	