/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EMWProductDetails
// ====================================================

export interface EMWProductDetails_emwproduct_emwProdVendorid {
  __typename: "EMWVendor";
  id: string;
  emwVendorId: number;
  emwVendorName: string | null;
}

export interface EMWProductDetails_emwproduct_emwProdImages_edges_node {
  __typename: "EMWProductImage";
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface EMWProductDetails_emwproduct_emwProdImages_edges {
  __typename: "EMWProductImageCountableEdge";
  node: EMWProductDetails_emwproduct_emwProdImages_edges_node;
}

export interface EMWProductDetails_emwproduct_emwProdImages {
  __typename: "EMWProductImageCountableConnection";
  edges: EMWProductDetails_emwproduct_emwProdImages_edges[];
}

export interface EMWProductDetails_emwproduct_sellPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_wholesalePrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_listPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_shipAdder {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_emwProdAdditionalHandling {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_emwProdCatid {
  __typename: "EMWCategory";
  id: string;
  name: string;
}

export interface EMWProductDetails_emwproduct_emwProdAdditionalCats_edges_node_emwProdcatCatid {
  __typename: "EMWCategory";
  emwCatId: number;
  name: string;
}

export interface EMWProductDetails_emwproduct_emwProdAdditionalCats_edges_node {
  __typename: "EMWProductCategory";
  id: string;
  emwProdcatCatid: EMWProductDetails_emwproduct_emwProdAdditionalCats_edges_node_emwProdcatCatid | null;
}

export interface EMWProductDetails_emwproduct_emwProdAdditionalCats_edges {
  __typename: "EMWProductCategoryCountableEdge";
  node: EMWProductDetails_emwproduct_emwProdAdditionalCats_edges_node;
}

export interface EMWProductDetails_emwproduct_emwProdAdditionalCats {
  __typename: "EMWProductCategoryCountableConnection";
  edges: EMWProductDetails_emwproduct_emwProdAdditionalCats_edges[];
}

export interface EMWProductDetails_emwproduct_mapPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_aggregateMapPrice {
  __typename: "Money";
  amount: number;
}

export interface EMWProductDetails_emwproduct_aggregateSellPrice {
  __typename: "Money";
  amount: number;
}

export interface EMWProductDetails_emwproduct_weight {
  __typename: "Weight";
  value: number;
  unit: string;
}

export interface EMWProductDetails_emwproduct_emwProdWidth {
  __typename: "Weight";
  value: number;
  unit: string;
}

export interface EMWProductDetails_emwproduct_emwProdLength {
  __typename: "Weight";
  value: number;
  unit: string;
}

export interface EMWProductDetails_emwproduct_emwProdHeight {
  __typename: "Weight";
  value: number;
  unit: string;
}

export interface EMWProductDetails_emwproduct_emwProdStdpricing_edges_node {
  __typename: "EMWProductStdPricing";
  id: string;
  emwStdpricingQuantity: number | null;
}

export interface EMWProductDetails_emwproduct_emwProdStdpricing_edges {
  __typename: "EMWProductStdPricingCountableEdge";
  node: EMWProductDetails_emwproduct_emwProdStdpricing_edges_node;
}

export interface EMWProductDetails_emwproduct_emwProdStdpricing {
  __typename: "EMWProductStdPricingCountableConnection";
  edges: EMWProductDetails_emwproduct_emwProdStdpricing_edges[];
}

export interface EMWProductDetails_emwproduct_emwProdFiles_edges_node {
  __typename: "EMWProductFile";
  emwFileDescription: string | null;
  emwFileProdfile: string | null;
}

export interface EMWProductDetails_emwproduct_emwProdFiles_edges {
  __typename: "EMWProductFileCountableEdge";
  node: EMWProductDetails_emwproduct_emwProdFiles_edges_node;
}

export interface EMWProductDetails_emwproduct_emwProdFiles {
  __typename: "EMWProductFileCountableConnection";
  edges: EMWProductDetails_emwproduct_emwProdFiles_edges[];
}

export interface EMWProductDetails_emwproduct_emwProdTabs_edges_node {
  __typename: "EMWProductInfoTab";
  emwTabTitle: string | null;
  emwTabContent: string | null;
  emwTabContentJson: string | null;
  emwTabIsActive: boolean;
}

export interface EMWProductDetails_emwproduct_emwProdTabs_edges {
  __typename: "EMWProductInfoTabCountableEdge";
  node: EMWProductDetails_emwproduct_emwProdTabs_edges_node;
}

export interface EMWProductDetails_emwproduct_emwProdTabs {
  __typename: "EMWProductInfoTabCountableConnection";
  edges: EMWProductDetails_emwproduct_emwProdTabs_edges[];
}

export interface EMWProductDetails_emwproduct_emwProdAttributeValues_edges_node_emwProdatrvalValue_emwAtrvalAtrid {
  __typename: "EMWProductAttribute";
  id: string;
  emwAtrName: string | null;
}

export interface EMWProductDetails_emwproduct_emwProdAttributeValues_edges_node_emwProdatrvalValue {
  __typename: "EMWAttributeValue";
  id: string;
  emwAtrvalValue: string | null;
  emwAtrvalAtrid: EMWProductDetails_emwproduct_emwProdAttributeValues_edges_node_emwProdatrvalValue_emwAtrvalAtrid | null;
}

export interface EMWProductDetails_emwproduct_emwProdAttributeValues_edges_node {
  __typename: "EMWProductAttributeValue";
  id: string;
  emwProdatrvalValue: EMWProductDetails_emwproduct_emwProdAttributeValues_edges_node_emwProdatrvalValue | null;
}

export interface EMWProductDetails_emwproduct_emwProdAttributeValues_edges {
  __typename: "EMWProductAttributeValueCountableEdge";
  node: EMWProductDetails_emwproduct_emwProdAttributeValues_edges_node;
}

export interface EMWProductDetails_emwproduct_emwProdAttributeValues {
  __typename: "EMWProductAttributeValueCountableConnection";
  edges: EMWProductDetails_emwproduct_emwProdAttributeValues_edges[];
}

export interface EMWProductDetails_emwproduct_emwProdOptgrps_edges_node {
  __typename: "EMWProductOptionGroup";
  id: string;
  emwOptgrpName: string | null;
  emwOptgrpIsActive: boolean;
  emwOptgrpType: number | null;
  emwOptgrpDefaultOption: number | null;
  emwOptgrpIsRequired: boolean;
}

export interface EMWProductDetails_emwproduct_emwProdOptgrps_edges {
  __typename: "EMWProductOptionGroupCountableEdge";
  node: EMWProductDetails_emwproduct_emwProdOptgrps_edges_node;
}

export interface EMWProductDetails_emwproduct_emwProdOptgrps {
  __typename: "EMWProductOptionGroupCountableConnection";
  edges: EMWProductDetails_emwproduct_emwProdOptgrps_edges[];
}

export interface EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid_sellPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid_listPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid_emwProdImages_edges_node {
  __typename: "EMWProductImage";
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid_emwProdImages_edges {
  __typename: "EMWProductImageCountableEdge";
  node: EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid_emwProdImages_edges_node;
}

export interface EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid_emwProdImages {
  __typename: "EMWProductImageCountableConnection";
  edges: EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid_emwProdImages_edges[];
}

export interface EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid {
  __typename: "EMWProduct";
  id: string;
  emwProdId: number;
  name: string;
  emwProdSesurl: string | null;
  sellPrice: EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid_sellPrice | null;
  listPrice: EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid_listPrice | null;
  emwProdImages: EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid_emwProdImages | null;
}

export interface EMWProductDetails_emwproduct_emwProdRelated_edges_node {
  __typename: "EMWProductRelated";
  id: string;
  emwRelatedProdid: EMWProductDetails_emwproduct_emwProdRelated_edges_node_emwRelatedProdid | null;
  emwRelatedSortorder: number | null;
}

export interface EMWProductDetails_emwproduct_emwProdRelated_edges {
  __typename: "EMWProductRelatedCountableEdge";
  node: EMWProductDetails_emwproduct_emwProdRelated_edges_node;
}

export interface EMWProductDetails_emwproduct_emwProdRelated {
  __typename: "EMWProductRelatedCountableConnection";
  edges: EMWProductDetails_emwproduct_emwProdRelated_edges[];
}

export interface EMWProductDetails_emwproduct_relatedGroups_relprods_emwRelatedProdid_aggregateSellPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_relatedGroups_relprods_emwRelatedProdid_sellPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_relatedGroups_relprods_emwRelatedProdid_listPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_relatedGroups_relprods_emwRelatedProdid_prodImages {
  __typename: "EMWProductImage";
  id: string;
  emwImageUrlPrfix: string | null;
  emwImageName: string | null;
}

export interface EMWProductDetails_emwproduct_relatedGroups_relprods_emwRelatedProdid {
  __typename: "EMWProduct";
  id: string;
  emwProdId: number;
  name: string;
  emwProdSesurl: string | null;
  aggregateSellPrice: EMWProductDetails_emwproduct_relatedGroups_relprods_emwRelatedProdid_aggregateSellPrice | null;
  sellPrice: EMWProductDetails_emwproduct_relatedGroups_relprods_emwRelatedProdid_sellPrice | null;
  listPrice: EMWProductDetails_emwproduct_relatedGroups_relprods_emwRelatedProdid_listPrice | null;
  prodImages: (EMWProductDetails_emwproduct_relatedGroups_relprods_emwRelatedProdid_prodImages | null)[] | null;
}

export interface EMWProductDetails_emwproduct_relatedGroups_relprods {
  __typename: "EMWRelatedProduct";
  id: string;
  emwRelatedSortorder: number | null;
  emwRelatedProdid: EMWProductDetails_emwproduct_relatedGroups_relprods_emwRelatedProdid | null;
}

export interface EMWProductDetails_emwproduct_relatedGroups {
  __typename: "EMWRelatedGroup";
  emwRelgrpName: string | null;
  id: string;
  relprods: (EMWProductDetails_emwproduct_relatedGroups_relprods | null)[] | null;
}

export interface EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptCost {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptWeight {
  __typename: "Weight";
  value: number;
  unit: string;
}

export interface EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptWidth {
  __typename: "Weight";
  value: number;
  unit: string;
}

export interface EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptLength {
  __typename: "Weight";
  value: number;
  unit: string;
}

export interface EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptHeight {
  __typename: "Weight";
  value: number;
  unit: string;
}

export interface EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptOptgrpid {
  __typename: "EMWProductOptionGroup";
  id: string;
  emwOptgrpName: string | null;
}

export interface EMWProductDetails_emwproduct_emwProdOpts_edges_node {
  __typename: "EMWProductOption";
  id: string;
  emwOptName: string | null;
  emwOptStocknumber: string | null;
  emwOptPrice: EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptPrice | null;
  emwOptCost: EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptCost | null;
  emwOptWeight: EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptWeight | null;
  emwOptWidth: EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptWidth | null;
  emwOptLength: EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptLength | null;
  emwOptHeight: EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptHeight | null;
  emwOptOptgrpid: EMWProductDetails_emwproduct_emwProdOpts_edges_node_emwOptOptgrpid | null;
  emwOptImageUrl: string | null;
  emwOptInventory: number | null;
  emwOptSellifoutofstock: boolean;
  emwOptIsActive: boolean;
  emwOptSortorder: number | null;
}

export interface EMWProductDetails_emwproduct_emwProdOpts_edges {
  __typename: "EMWProductOptionCountableEdge";
  node: EMWProductDetails_emwproduct_emwProdOpts_edges_node;
}

export interface EMWProductDetails_emwproduct_emwProdOpts {
  __typename: "EMWProductOptionCountableConnection";
  edges: EMWProductDetails_emwproduct_emwProdOpts_edges[];
}

export interface EMWProductDetails_emwproduct {
  __typename: "EMWProduct";
  id: string;
  emwProdId: number;
  name: string;
  emwProdCreatedAt: any | null;
  emwProdUpdatedAt: any | null;
  emwProdUpdatedBy: string | null;
  description: string;
  descriptionJson: any;
  emwProdVendorPartnumber: string | null;
  emwProdManufacturerPartnumber: string | null;
  emwProdManufacturerModelnumber: string | null;
  weightPounds: number | null;
  emwProdVendorid: EMWProductDetails_emwproduct_emwProdVendorid | null;
  emwProdImages: EMWProductDetails_emwproduct_emwProdImages | null;
  emwProdHsCode: string | null;
  emwProdDisplayWeight: string | null;
  emwProdUpc: string | null;
  emwProdShowPartno: boolean;
  emwProdShowManufPartno: boolean;
  emwProdShowModelno: boolean;
  emwProdShowVendor: boolean;
  emwProdShowHscode: boolean;
  emwProdShowDispweight: boolean;
  emwProdShowUpc: boolean;
  emwProdIsMinimumQuantity: boolean;
  emwProdIsDynamicPricing: boolean;
  sellPrice: EMWProductDetails_emwproduct_sellPrice | null;
  wholesalePrice: EMWProductDetails_emwproduct_wholesalePrice | null;
  listPrice: EMWProductDetails_emwproduct_listPrice | null;
  shipAdder: EMWProductDetails_emwproduct_shipAdder | null;
  emwProdAdditionalHandling: EMWProductDetails_emwproduct_emwProdAdditionalHandling | null;
  emwProdCatid: EMWProductDetails_emwproduct_emwProdCatid | null;
  emwProdAdditionalCats: EMWProductDetails_emwproduct_emwProdAdditionalCats | null;
  emwProdIsActive: boolean;
  emwProdIsInformational: boolean;
  emwProdOnhandInventory: number | null;
  emwProdAllocatedInventory: number | null;
  emwProdIsDiscontinued: boolean;
  minimumQuantity: number | null;
  mapPrice: EMWProductDetails_emwproduct_mapPrice | null;
  aggregateMapPrice: EMWProductDetails_emwproduct_aggregateMapPrice | null;
  aggregateSellPrice: EMWProductDetails_emwproduct_aggregateSellPrice | null;
  usertierName: string | null;
  usertierColorcode: string | null;
  emwProdIsNonreturnable: boolean;
  emwProdIsFreeship: boolean;
  emwProdIsFreight: boolean;
  weight: EMWProductDetails_emwproduct_weight | null;
  emwProdWidth: EMWProductDetails_emwproduct_emwProdWidth | null;
  emwProdLength: EMWProductDetails_emwproduct_emwProdLength | null;
  emwProdHeight: EMWProductDetails_emwproduct_emwProdHeight | null;
  seoTitle: string | null;
  emwProdSeoTitle: string | null;
  seoDescription: string | null;
  emwProdSeoDescription: string | null;
  emwProdSesurl: string | null;
  emwProdSesurlExt: string | null;
  emwProdFileicon: string | null;
  emwProdImageUrl: string | null;
  emwProdImageCaption: string | null;
  emwProdIsGetQuote: boolean;
  emwProdOrderingNotesMessage: string | null;
  emwProdReplacementUrl: string | null;
  emwProdStdpricing: EMWProductDetails_emwproduct_emwProdStdpricing | null;
  emwProdFiles: EMWProductDetails_emwproduct_emwProdFiles | null;
  emwProdTabs: EMWProductDetails_emwproduct_emwProdTabs | null;
  emwProdAttributeValues: EMWProductDetails_emwproduct_emwProdAttributeValues | null;
  emwProdOptgrps: EMWProductDetails_emwproduct_emwProdOptgrps | null;
  emwProdRelated: EMWProductDetails_emwproduct_emwProdRelated | null;
  relatedGroups: (EMWProductDetails_emwproduct_relatedGroups | null)[] | null;
  emwProdOpts: EMWProductDetails_emwproduct_emwProdOpts | null;
}

export interface EMWProductDetails {
  emwproduct: EMWProductDetails_emwproduct | null;
}

export interface EMWProductDetailsVariables {
  id: string;
}
