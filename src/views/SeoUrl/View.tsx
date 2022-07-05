import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useLazyQuery } from '@apollo/react-hooks';
import { CategoryOrProductBySeoUrlQuery } from './queries';
import { default as ProductView } from '../Product/View';
import { default as CategoryView } from '../Category/View';
import { getDBIdFromGraphqlId } from '../../core/utils';
import { history } from '../../history';
import ReactSVG from "react-svg";
import loader from '../../images/emw-loader.svg';
import { useAlert } from "react-alert";
import { NotFound } from "../../components";


const View: React.FC<RouteComponentProps<{ seoUrl: string }>> = ({ match, location }) => {
	const alert = useAlert();
    const [seoType, setSeoType] = useState(0);
    const [id, setId] = useState(null);
    const [Loading, setLoading] = useState(true);
    const[isNotFoundPage, setNotFountPage]=useState(false)

    const [EMWCategoryOrProductSearch, { data, loading }] = useLazyQuery(CategoryOrProductBySeoUrlQuery, {
        fetchPolicy: 'network-only',
        onCompleted(data) {
            if (data.categoryOrProductBySeoUrl !== null) {
                const type = (data.categoryOrProductBySeoUrl.type == "product") ? 1 : 2;
                setSeoType(type);
                let seoId = (type == 1) ? { params: { id: data.categoryOrProductBySeoUrl.id } } : data.categoryOrProductBySeoUrl.id;
                setId(seoId)
                setLoading(false)
                setNotFountPage(false)
            } else {
                //history.push('/');
                setNotFountPage(true)
                setLoading(false)
            }

        },
        onError(error) {
			alert.show({ title: "Something went wrong!" }, { type: "error" });
        }
    });

    const transformSeoUrl=(url)=>{
        let transformedUrl=url;
        // remove forward slash
        transformedUrl=url.replace("/", "")
        // check is www.authorize.net present at url end
        if(transformedUrl.includes("www.authorize.net")){
            // remove www.authorize.net from url end
            transformedUrl=transformedUrl.replace('www.authorize.net','')
        }
        return transformedUrl;
    }

    useEffect(() => {
        if (location && location.pathname) {
            let url=transformSeoUrl(location.pathname);
            if(typeof(url) === 'string')
                url = url.trim()
            EMWCategoryOrProductSearch({ variables: { seoUrl: url } })
        }
    }, [location]);

    return (
        (Loading) ? <div className="product-page-details_block loader-wrapper">
            < ReactSVG path={loader} className="medium-size-loader" />
        </div > : (isNotFoundPage) ? <NotFound message="hello"/> :
            (seoType == 1) ?
                <div>
                    <ProductView
                        match={id}
                        prodId={id.params.id}

                    />
                </div>
                :
                (seoType == 2) &&
                <div>
                    <CategoryView
                        seoId={id}
                    />
                </div>
    )
};
export default View;