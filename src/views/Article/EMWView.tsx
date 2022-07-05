import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { MetaWrapper, NotFound } from "../../components";
import { STATIC_PAGES } from "../../core/config";
import { generatePageUrl, maybe } from "../../core/utils";
// import Page from "./Page";
import { Page } from "./EMWArticalPage";
import { useQuery } from '@apollo/react-hooks';
import { emwarticleQuery } from "./query";
import PublishPageError from './PublishPageError';
import ReactSVG from "react-svg";
import loader from '../../images/emw-loader.svg';
const canDisplay = page =>
    maybe(() => !!page && !!page.title && !!page.isPublished);
// const getHeaderImage = (shop: Article_shop) =>
//   maybe(() => shop.homepageCollection.backgroundImage.url);

type ViewProps = RouteComponentProps<{ slug: string }>;

export const View: React.FC<ViewProps> = ({
    match: {
        params: { slug },
    },
}) => {
    const { data, loading, error } = useQuery(emwarticleQuery, {
        variables: { slug }, fetchPolicy: "network-only",
    });
    return (
        <>
            {
                (!loading) ?
                    (canDisplay(data && data.emwpageBySlug)) ?
                        <MetaWrapper
                            meta={{
                                description: data && data.emwpageBySlug && data.emwpageBySlug.seoDescription,
                                title: data && data.emwpageBySlug && data.emwpageBySlug.seoTitle,
                            }}
                        >
                            <Page
                                //   breadcrumbs={breadcrumbs}
                                //   navigation={navigation}
                                page={data.emwpageBySlug}
                            />
                        </MetaWrapper>
                        :
                        (data && data.emwpageBySlug && !(data.emwpageBySlug.isPublished) && !error) ?
                            <PublishPageError />
                            :
                            <NotFound />
                    :
                    <>
                        <div className="article-loader-height">
                            <div className="product-page-details_block loader-wrapper">
                                <ReactSVG path={loader} className="medium-size-loader" />
                            </div>
                        </div>
                    </>

            }

        </>
    )
};
export default View;
