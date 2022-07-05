import React from "react";
import { TypedMultipleProductTypeMetaQuery } from "@temp/views/Category/queries";
import { Loader } from "@temp/components";
import ExpandableFacets from "../ExpandableFacets";

import ReactSVG from "react-svg";
import loader from '../../../images/emw-loader.svg'
interface ProductTypeFacetsViewerProps {
    selectedProductTypes: any[]
    productTypes: any[]
    onSelect: (productType: any) => void
}

const ProductTypeFacetsViewer: React.FC<ProductTypeFacetsViewerProps> = (props: ProductTypeFacetsViewerProps) => {
    const { 
        selectedProductTypes,
        productTypes = [],
        onSelect,
    } = props;

    if (!productTypes.length) {
        return (
            null
        )
    }

    
    return (
        <TypedMultipleProductTypeMetaQuery
            variables={{
                first: productTypes.length,
                ids: productTypes.map(productType => String(productType.key)),
            }}
        >
            {({ data, loading }) => {

                let productTypeWithMeta = []

                if (loading) {
                    return <div className="product-page-details_block loader-wrapper">
                    < ReactSVG path={loader} className="medium-size-loader" />
                  </div >
                }

                if (data) {
                    productTypeWithMeta = data.emwElasticProdtypeQueries.edges.map(edge => ({
                        key: edge.node.emwProdtypeId,
                        name: edge.node.emwProdtypeName,
                    }))
                } else {
                    productTypeWithMeta = productTypes.map(productType => ({
                        key: productType.key,
                        name: productType.key,
                    }))
                }

                const selectedItems = productTypeWithMeta.filter(
                    (productType) => selectedProductTypes.find(item => item.key === productType.key)
                )

                const getAttrBucketDocCount  = (id) => {
                    let temp = productTypes.find(o => o.key === id);
                    return temp ? temp.doc_count : 'N/A'
                  }

                  
                return (
                    <ExpandableFacets
                        title={"Product Types"}
                        selectedItems={selectedItems.map((item, index) => `${item.name} ${index !== selectedItems.length - 1 ? "," : ""}`)}
                    >
                        {
                            productTypeWithMeta.map(
                                (productType) => {
                                    const selected = selectedProductTypes.find(item => item.key === productType.key)
                                    return (
                                        <span
                                            key={Math.random()}
                                            className={`filterItem filterChips ${selected ? "selected" : ""}`}
                                            onClick={() => onSelect({
                                                key: productType.key,
                                                ...productType,
                                                type: 'productType',
                                            })}
                                        >
                                            <span key={Math.random()} className={`filter-chip-name ${selected ? "filter-chip-name-selected" : "filter-chip-name-regular-color"}`}>{productType.name}</span>
                                            <span key={Math.random()} className={`filter-chip-count ${selected ? "filter-chip-count-selected" : "filter-chip-count-regular-color"} `}>({getAttrBucketDocCount(productType.key)}) </span>
                                        </span>
                                    )
                                }
                            )
                        }
                    </ExpandableFacets>
                )
            }
        }
        </TypedMultipleProductTypeMetaQuery>
    )
}

export default ProductTypeFacetsViewer
