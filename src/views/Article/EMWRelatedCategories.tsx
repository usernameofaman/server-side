import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Link } from "react-router-dom";
import noPhotoImg from "../../images/no-photo.svg";
import { initCategories } from "./TransformData";
import { generateEMWCategorySeoUrl } from "../../core/utils";


interface EMWRelatedCategoriesProps {
    data: any;
}
const EMWRelatedCategories: React.FC<EMWRelatedCategoriesProps> = props => {
    const { data } = props;
    const [category, setCategory] = useState([]);
    useEffect(() => {
        if(data && data.categories){
            const categories = initCategories(data.categories);
            setCategory([...categories]);
        }
    }, [data.categories]);

    return (
        <>
            <div className="cats-page__categories">
                <div className="cats-page__categories__list">
                    {category.length > 0 ? (
                        <>
                            <Grid container spacing={3}>
                                {category && category.length > 0 && category.map((item, index) => (
                                    // ((index + 1) > lastCIndex) && (index + 1) > firstCIndex)) ? 
                                    <Grid item md={3} key={index} sm={12} xs={12}>
                                        <Card  key={index} style={{ backgroundColor: '#f3f3f3', padding: '10px 12.5px' }}>
                                            <Link
                                                to={generateEMWCategorySeoUrl(item.name, item.emwCatSesurl)}
                                                key={index}
                                            >
                                                <h3>{item.name}</h3>
                                                <div
                                                    className="cats-page__categories__list__image"
                                                >
                                                    {
                                                        item.image ? <img src={item.image} /> ? <img src={process.env.REACT_APP_CLOUDFRONT_URL + item.image} /> : <img src={noPhotoImg} />
                                                            : <img src={noPhotoImg} />
                                                    }
                                                </div>
                                            </Link>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    ) : (
                            <div className="products-list__products-not-found">No Related Categories Found</div>
                        )}
                </div>
            </div>
        </>
    );
}
export default EMWRelatedCategories;	