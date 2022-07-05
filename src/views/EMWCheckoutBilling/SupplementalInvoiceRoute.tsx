import "./scss/index.scss";
import React, { useState, useEffect } from "react";
import { OverlayContext } from '../../components/Overlay';
import EMWModal from "../../components/EMWModal/EMWModal";
import { history } from '../../history';

interface SupplementalInvoiceRouteProps {
    location: any;
}

const SupplementalInvoiceRoute: React.FC<SupplementalInvoiceRouteProps> = (props) => {
    const { location }= props;
    const loggedIn = localStorage.getItem('loggedIn') ? true : false;
    const [viewShipping, setviewShipping] = useState(true);
    const [params, setParams] = useState([]);
    const closeModal=()=>{
        history.push(`/`);
        setviewShipping(false);
    }
    const getQueryParmas=()=>{
        const query= new URLSearchParams(location.search);
        const params=[];
        if(query)
        {
            for(let param of query.entries())
            {
                const setData={
                    key: param[0] ? param[0] : "",
                    value: param[1] ? param[1] : "",
                }
                params.push(setData); 
            }
        }
        return params;
    }

    useEffect(() => {
       const paramsValue=getQueryParmas();
       setParams(paramsValue);
    }, []);
    
    return (
        <>
            {
                <OverlayContext.Consumer>
                {
                    overlayContext => (
                        <EMWModal step={3} overlayContext={overlayContext} Mopen={viewShipping} hide={() => closeModal()} isSupplimental={true} supplementalParams={params}/>
                    )
                }
                </OverlayContext.Consumer> 
            }
        </>
    );
};

export default SupplementalInvoiceRoute;
