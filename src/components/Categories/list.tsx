import "./scss/index.scss";

// import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import { EMWCategory_emwcategory_children } from "../../views/Category/types/EMWCategory";
import { generateEMWCategorySeoUrl } from "../../core/utils";

import Grid from '@material-ui/core/Grid';
const CategoriesListView: React.FC<{
  subCats: EMWCategory_emwcategory_children;

}> = ({ subCats}) => (

  <div className="cats-page__categories">
    <div className="cats-page__categories__list">
      <Grid container spacing={1}>
        {subCats.edges.map(({ node: category }, index) => (
          // <Grid style={{ display: ((index + 1 <= lastCIndex) && (index + 1 >= firstCIndex)) ? 'block' : 'none' }} item sm={12} xs={12}>
          <Grid item sm={12} xs={12} key={category.id}>
            <Link
              to={generateEMWCategorySeoUrl(category.name, category.emwCatSesurl)}
              key={category.id} className="listView-cat"
            >
              <div className="categories__listView">
                <h4>{category.name}</h4>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
    {/* </div> */}
  </div>
);

export default CategoriesListView;
