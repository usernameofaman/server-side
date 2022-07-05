/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { EMWAddressInput } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: getshippingPricesForCheckout
// ====================================================

export interface getshippingPricesForCheckout_shippingPricesForCheckoutByItem_line_lineshipping {
  __typename: "EMWLineShipping";
  residentialSurcharge: number | null;
}

export interface getshippingPricesForCheckout_shippingPricesForCheckoutByItem_line_product {
  __typename: "EMWProduct";
  id: string;
  name: string;
  emwProdIsFreeship: boolean;
  emwProdIsFreight: boolean;
}

export interface getshippingPricesForCheckout_shippingPricesForCheckoutByItem_line {
  __typename: "EMWCheckoutLine";
  id: string;
  quantity: number;
  lineshipping: (getshippingPricesForCheckout_shippingPricesForCheckoutByItem_line_lineshipping | null)[] | null;
  product: getshippingPricesForCheckout_shippingPricesForCheckoutByItem_line_product | null;
}

export interface getshippingPricesForCheckout_shippingPricesForCheckoutByItem_shipping_price {
  __typename: "Money";
  amount: number;
  localized: string;
}

export interface getshippingPricesForCheckout_shippingPricesForCheckoutByItem_shipping_residentialSurcharge {
  __typename: "Money";
  amount: number;
}

export interface getshippingPricesForCheckout_shippingPricesForCheckoutByItem_shipping {
  __typename: "EMWShipping";
  code: string | null;
  name: string | null;
  price: getshippingPricesForCheckout_shippingPricesForCheckoutByItem_shipping_price | null;
  occurence: number | null;
  businessDaysInTransit: string | null;
  residentialSurcharge: getshippingPricesForCheckout_shippingPricesForCheckoutByItem_shipping_residentialSurcharge | null;
}

export interface getshippingPricesForCheckout_shippingPricesForCheckoutByItem {
  __typename: "EMWCheckoutLineShippingPrices";
  line: getshippingPricesForCheckout_shippingPricesForCheckoutByItem_line | null;
  shipping: (getshippingPricesForCheckout_shippingPricesForCheckoutByItem_shipping | null)[] | null;
}

export interface getshippingPricesForCheckout {
  shippingPricesForCheckoutByItem: (getshippingPricesForCheckout_shippingPricesForCheckoutByItem | null)[] | null;
}

export interface getshippingPricesForCheckoutVariables {
  id: string;
  address: EMWAddressInput;
}
