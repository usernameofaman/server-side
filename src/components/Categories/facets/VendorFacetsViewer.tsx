import React from "react";
import { TypedMultipleVendorMetaQuery } from "@temp/views/Category/queries";
import { Loader } from "@temp/components";
import ExpandableFacets from "../ExpandableFacets";

import ReactSVG from "react-svg";
import loader from '../../../images/emw-loader.svg'
interface VendorFacetsViewerProps {
    selectedVendors: any[]
    vendors: any[]
    onSelect: (vendor: any) => void
}

const VendorFacetsViewer: React.FC<VendorFacetsViewerProps> = (props: VendorFacetsViewerProps) => {
    const { 
        selectedVendors,
        vendors = [],
        onSelect,
    } = props;
    
    if (!vendors.length) {
        return (
            <ExpandableFacets
                title={"Vendors"}
                selectedItems={[]}
            >
                <p>No vendors found</p>
            </ExpandableFacets>
        )
    }

    const getAttrBucketDocCount  = (id) => {
    let temp = vendors.find(o => o.key === id);
    return temp ? temp.doc_count : 'N/A'
  }

    return (
        <TypedMultipleVendorMetaQuery
            variables={{
                ids: vendors.map(vendor => String(vendor.key)),
            }}
        >
            {({ data, loading }) => {

                let vendorWithMeta = []

                if (loading) {
                    return <div className="product-page-details_block loader-wrapper">
                    < ReactSVG path={loader} className="medium-size-loader" />
                  </div >
                }

                if (data) {
                    vendorWithMeta = data.emwElasticVendorQueries.edges.map(edge => edge.node)
                }

                const selectedItems = vendorWithMeta.filter(
                    (vendor) => selectedVendors.find(item => item.key === vendor.emwVendorId)
                )

                return (
                    <ExpandableFacets
                        title={"Vendor"}
                        selectedItems={selectedItems.map((item, index) => `${item.emwVendorName} ${index !== selectedItems.length - 1 ? "," : ""}`)}
                    >
                        {
                            vendorWithMeta.map(
                                (vendor) => {
                                    const selected = selectedVendors.find(item => item.key === vendor.emwVendorId)
                                    return (
                                        <span
                                            key={vendor.emwVendorId}
                                            className={`filterItem filterChips ${selected ? "selected" : ""}`}
                                            onClick={() => onSelect({
                                                key: vendor.emwVendorId,
                                                ...vendor,
                                                name: vendor.emwVendorName,
                                                type: 'vendor',
                                            })}
                                        >
                                            <span className={`filter-chip-name ${selected ? "filter-chip-name-selected" : "filter-chip-name-regular-color"}`}>{vendor.emwVendorName}
                                            </span> 
                                            <span className={`filter-chip-count ${selected ? "filter-chip-count-selected" : "filter-chip-count-regular-color"} `}>({getAttrBucketDocCount(vendor.emwVendorId)})</span>
                                        </span>
                                    )
                                }
                            )
                        }
                    </ExpandableFacets>
                )
            }
        }
        </TypedMultipleVendorMetaQuery>
    )
}

export default VendorFacetsViewer
