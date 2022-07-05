export const apiUrl = process.env.API_URI || "/graphql/";
export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT, 10) || 60 * 1000;

export const homePageMetaDescription="Electric Motor Wholesale, Inc. established in Jan, 2001 is a USA based premium e-commerce electric motor distributor. EMW, Inc. globally sells electric motors and related products manufactured by ABB, BALDOR, REGAL, LEESON, MARATHON, WEG, LINCOLN, REXNORD, STEARNS, KB, LENZE, GROVE, BISON-GEAR, LITTELFUSE, SYMCOM, DANFOSS, VACON and INVERTEK Drives. We provide superior customer service and tech support for the products we represent."

export const cartExpiredMessage="This cart has expired. Please create a new cart.";

export const defaultBillingAddressMessage="You are designating this address as the default billing address. The primary email entered has been replaced with the “Account Holder Email” and can be edited in “Account Settings”.";

export const defaultAddressRequiredMessage="A default billing address is required. Please proceed to address book to add an address.";
export const accountSettingOptions =[
{value:'account',label:'Account Information'},
{value:'address-book',label:'Address Book'},
{value:'order-history',label:'Order History'},
{value:'document-tax', label: 'Documents and Tax'}];
export const unverifiedAddressMsg ="Expedited shipping is not guaranteed when choosing an unverified address. Ensure address accuracy before continuing.";
