import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Link } from "react-router-dom";
import noPhotoImg from "../../images/no-photo.svg";
import { initVendors } from "./TransformData";


interface EMWRelatedVendorsProps {
    data: any;
}
const EMWRelatedVendors: React.FC<EMWRelatedVendorsProps> = props => {
    const { data } = props;
    
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        if(data && data.vendors){
            const vendors = initVendors(data.vendors);
            setVendors([...vendors]);
        }
    }, [data.vendors]);

    return (
        <>
            <div className="cats-page__categories">
                <div className="cats-page__categories__list">
                    {vendors.length ? (
                        <>
                            <Grid container spacing={3}>
                                {vendors && vendors.length > 0 && vendors.map((item, index) => (
                                    <Grid item key={index}>
                                        <Card  key={index} style={{ backgroundColor: '#f3f3f3', padding: '10px 12.5px' }}>
                                            <div
                                                className="cats-page__categories__list__image"
                                            >
                                                {
                                                    item.image ? <img src={item.image} /> ? <img src={process.env.REACT_APP_CLOUDFRONT_URL + item.image} /> : <img src={noPhotoImg} />
                                                : <h1>{item.name}</h1>
                                                }
                                            </div>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    ) : null }
                </div>
            </div>
        </>
    );
}
export default EMWRelatedVendors;	