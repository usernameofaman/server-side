import "./scss/index.scss";

// import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import { EMWCategory_emwcategory_children } from "../../views/Category/types/EMWCategory";

import { generateEMWCategorySeoUrl } from "../../core/utils";

import noPhotoImg from "../../images/no-photo.svg";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Thumbnail } from "../../@next/components/molecules";

const Categories: React.FC<{
  subCats: any;
}> = ({ subCats }) => (

  <div className="cats-page__categories">
    {/* <div className="container"> */}
    {/* <h3>Shop by category</h3>
        <h6>1-6 of 6 items</h6> */}


    <div className="cats-page__categories__list">
      <Grid container spacing={3}>
        {subCats.edges.map(({ node: category }, index) => (
          // ((index + 1) > lastCIndex) && (index + 1) > firstCIndex)) ? 
          // <Grid style={{display: ((index + 1 <= lastCIndex) && (index + 1 >= firstCIndex)) ? 'block' : 'none' }} item md={3} sm={12} xs={12}>
          <Grid item md={3} sm={4} xs={12} key={Math.random()}>
            <Card className="emw-mobile-cat-view" key={Math.random()}>
              <Link
                to={generateEMWCategorySeoUrl(category.name, category.emwCatSesurl)}
                key={Math.random()}
              >
                <h3>{category.name}</h3>
                <div
                  className="cats-page__categories__list__image"
                >
                  {/* {
                    category.emwCatImageUrl ? <img src={category.emwCatImageUrl} /> ? <img src={process.env.REACT_APP_CLOUDFRONT_URL + category.emwCatImageUrl} /> : <img src={noPhotoImg} />
                      : <img src={noPhotoImg} />
                  } */}
                  {
                    category.emwCatImageUrl ? <Thumbnail source={{thumbnail: {url : process.env.REACT_APP_CLOUDFRONT_URL + category.emwCatImageUrl, alt: "" }}}/>  : <Thumbnail source={category} /> 
                  }
                </div>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    {/* </div> */}
  </div>
);

export default Categories;
