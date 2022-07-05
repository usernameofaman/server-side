import * as React from "react";
import { Button } from "../..";

const Empty: React.FC<{ overlayHide(): void }> = ({ overlayHide }) => {

  return(
  <div className="cart__empty">
    {/* <h4>Your bag is empty456</h4> */}
    <p className="emptyCartMsg">
      You have not added items to your cart just yet.
    </p>
    <div className="cart__empty__action emptyShoppingButton">
      {/* <Button dataCy="emptyCartHideOverlayButton" secondary onClick={overlayHide}>
        Continue Shopping
      </Button> */}
      <button onClick={overlayHide}>Continue Shopping</button>
    </div>
  </div>
  )
};

export default Empty;
