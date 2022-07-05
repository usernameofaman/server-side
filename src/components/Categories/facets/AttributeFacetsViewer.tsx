import React from "react";
import { TypedMultipleProductAttributeMetaQuery } from "@temp/views/Category/queries";
import { Loader } from "@temp/components";
import { groupBy } from "lodash";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import ExpandableFacets from "../ExpandableFacets";

import ReactSVG from "react-svg";
import loader from '../../../images/emw-loader.svg'
interface AttributeFacetsViewerProps {
  selectedAttributes: any[]
  attributes: any[]
  onSelect: (attribute: any) => void
}

const AttributeFacetsViewer: React.FC<AttributeFacetsViewerProps> = (props: AttributeFacetsViewerProps) => {
  const {
    selectedAttributes,
    attributes,
    onSelect,
  } = props;



  if (!attributes.length) {
    return null
  }


  const getAttrBucketDocCount  = (id) => {
    let temp = attributes.find(o => o.key === id);
    return temp ? temp.doc_count : 'N/A'
  }

  return (
    <TypedMultipleProductAttributeMetaQuery
      variables={{
        ids: attributes.map(attribute => String(attribute.key)),
      }}
    >
      {({ data, loading }) => {

        let attributesWithMeta = []

        if (loading) {
          return <div className="product-page-details_block loader-wrapper">
          < ReactSVG path={loader} className="medium-size-loader" />
        </div >
        }

        if (data) {
          attributesWithMeta = data.emwElasticProductAttrQueries.edges.map(edge => edge.node)
        }

        const sort_by_key = (array, key)=>
        {
        return array.sort(function(a, b)
        {
          var x = a[0].emwAtrvalAtrid[key]; var y = b[0].emwAtrvalAtrid[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        }

        function sort_by_keys(array, key)
        {
            return array.sort(function(a, b){
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        const groupedAttributesTemp = groupBy(attributesWithMeta, item => item.emwAtrvalAtrid.emw_atr_name)
        const groupedAttributes = sort_by_key(Object.values(groupedAttributesTemp), "emw_atr_sort_order")
        return (
          <>
            {
              Object.keys(groupedAttributes)
                .map(
                  attribute => {
                    const selectedItems = groupedAttributes[attribute].filter(
                      (attributeValue) => selectedAttributes.find(item => item.key === attributeValue.emwAtrvalId)
                    )
                    const sortedAttributesValues=sort_by_keys(groupedAttributes[attribute], "emwAtrvalSortorder");
                    return (
                      <ExpandableFacets
                        key={Math.random()}
                        title={groupedAttributes[attribute][0].emwAtrvalAtrid.emw_atr_name}
                        selectedItems={selectedItems.map((item, index) => `${item.emwAtrvalValue} ${index !== selectedItems.length - 1 ? "," : ""}`)}
                      >
                        {
                            sortedAttributesValues.map(
                              (attributeValue) => {
                                const selected = selectedAttributes.find(item => item.key === attributeValue.emwAtrvalId)
                                return (
                                  <span
                                    key={Math.random()}
                                    className={`filterItem filterChips ${selected ? "selected" : ""}`}
                                    onClick={() => onSelect({
                                      key: attributeValue.emwAtrvalId,
                                      ...attributeValue,
                                      name: attributeValue.emwAtrvalValue,
                                      type: 'attribute',
                                    })}
                                  >
                                    <span className={`filter-chip-name ${selected ? "filter-chip-name-selected" : "filter-chip-name-regular-color"}`}>
                                      {attributeValue.emwAtrvalValue}
                                    </span> 
                                    <span className={`filter-chip-count ${selected ? "filter-chip-count-selected" : "filter-chip-count-regular-color"} `}>({getAttrBucketDocCount(attributeValue.emwAtrvalId)})</span>
                                  </span>
                                )
                              }
                            )
                          }
                      </ExpandableFacets>
                    )
                  }
                )
            }
          </>
        )
      }}
    </TypedMultipleProductAttributeMetaQuery>
  )
}

export default AttributeFacetsViewer
