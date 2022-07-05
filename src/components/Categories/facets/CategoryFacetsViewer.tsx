import React from "react";
import { TypedMultipleCategoryMetaQuery } from "@temp/views/Category/queries";
import { Loader } from "@temp/components";
import ExpandableFacets from "../ExpandableFacets";

interface CategoryFacetsViewerProps {
    selectedCategories: any[]
    categories: any[]
    onSelect: (category: any) => void
}

const CategoryFacetsViewer: React.FC<CategoryFacetsViewerProps> = (props: CategoryFacetsViewerProps) => {
    const { 
        selectedCategories,
        categories = [],
        onSelect,
    } = props;

    if (!categories.length) {
        return (
            <ExpandableFacets
                title={"Category"}
                selectedItems={[]}
            >
                <p>No categories found</p>
            </ExpandableFacets>
        )
    }

    return (
        <TypedMultipleCategoryMetaQuery
            variables={{
                ids: categories.map(category => String(category.key)),
            }}
        >
            {({ data, loading }) => {

                let categoryWithMeta = []

                if (loading) {
                    return <Loader />
                }

                if (data) {
                    categoryWithMeta = data.emwElasticCatQueries.edges.map(edge => edge.node)
                }

                const selectedItems = categoryWithMeta.filter(
                    (category) => selectedCategories.find(item => item.key === category.emwCatId)
                )

                return (
                    <ExpandableFacets
                        title={"Category"}
                        selectedItems={selectedItems.map((item, index) => `${item.name} ${index !== selectedItems.length - 1 ? "," : ""}`)}
                    >
                        {
                            categoryWithMeta.map(
                                (category) => {
                                    const selected = selectedCategories.find(item => item.key === category.emwCatId)
                                    return (
                                        <span
                                            key={category.emwCatId}
                                            className={`filterItem ${selected ? "selected" : ""}`}
                                            onClick={() => onSelect({
                                                key: category.emwCatId,
                                                ...category,
                                                type: 'category',
                                            })}
                                        >
                                            {category.name}
                                        </span>
                                    )
                                }
                            )
                        }
                    </ExpandableFacets>
                )
            }
        }
        </TypedMultipleCategoryMetaQuery>
    )
}

export default CategoryFacetsViewer
