import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import noPhotoImg from "../../images/no-photo.svg";
import { Thumbnail } from "@components/molecules";
import { initProducts } from "./TransformData";
import { generateProductUrl,generateEMWProductSeoUrl } from "../../core/utils";
import { Link } from "react-router-dom";


interface EMWRelatedProductsProps {
    data: any;
}
const EMWRelatedProducts: React.FC<EMWRelatedProductsProps> = props => {
    const { data } = props;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(data && data.products){
            const products = initProducts(data.products);
            setProducts([...products]);
        }
    }, [data.products]);

    return (
        <>
            <div className="productListWrapper">
                {products.length > 0 ? (
                    <>
                        <Grid container spacing={3}>
                            {products.map((item, index) => {
                                return (
                                    <Grid item key={index} lg={3} md={4} sm={6} xs={6}>
                                        <Link
                                            to={generateEMWProductSeoUrl(item.emwProdId,item.name, item.emwProdSesurl)}
                                            key={item.id}
                                        >
                                        <Card className="productListWrapper__product">
                                            <h4>{item.name}</h4>
                                            <div className="productListWrapper__product__image image-vertical-fix">
                                                {item.image ? <Thumbnail source={item.image} /> : <Thumbnail source={noPhotoImg} />}
                                            </div>
                                            <div className="productListWrapper__product__pricebx">
                                                <div className="productListWrapper__product__pricebx__cutPricebx">
                                                    {<span>MSRP: <del>${item.listPrice && item.listPrice.amount ? item.listPrice.amount.toFixed(2) : 0}</del></span>}
                                                </div>
                                                <div className="productListWrapper__product__pricebx__price">
                                                    {<h4>${item.aggregateSellPrice && item.aggregateSellPrice.amount ? item.aggregateSellPrice.amount.toFixed(2) : 0}</h4>}
                                                </div>
                                            </div>
                                        </Card>
                                        </Link>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        {/* <div className="products-list__products__load-more">
                            {displayLoader ? (
                                <Loader />
                            ) : null}
                        </div> */}
                    </>
                ) : (
                        <div className="products-list__products-not-found">No Related Products Found</div>
                    )}
            </div>
        </>
    );
}
export default EMWRelatedProducts;	
