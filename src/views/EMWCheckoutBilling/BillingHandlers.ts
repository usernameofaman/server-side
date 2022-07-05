export const handleCheckboxChange = (event,inputValues,setInputValues) => {
    
    const { name, checked } = event.target;
    setInputValues({ ...inputValues, [name]: checked });
}

export const handleRadioButtonChange = (event,inputValues,setInputValues) => {
    const { value } = event.target;
    setInputValues({ ...inputValues, sameAsShipping: value === 'sameAsShipping' ? true : false });
}

export const handleDropdownChange = (event,inputValues,setInputValues,setOpenAddressModal) => {
    const { name, value } = event.target;
    if (name === "billingAddress" && value === "addNew") {
        setOpenAddressModal(true);
    }
    setInputValues({ ...inputValues, [name]: value });
}

export const addressChangeHandler=(id,inputValues,setInputValues,setOpenAddressModal)=>{
    if (id==="addNew") {
        //localStorage.setItem("shippingtemp", "")
        setOpenAddressModal(true);
    }
    setInputValues({ ...inputValues,sameAsShipping:false, billingAddress: id });
}

export const formValidateHandler=(data)=>{
    const fields = data;
    let formIsValid = true;
    if(!fields.streetAddress1)
    {
        formIsValid = false;
    }

    if(!fields.city)
    {
        formIsValid = false;
    }

    if(!fields.countryArea)
    {
        formIsValid = false;
    }

    if(!fields.postalCode)
    {
        formIsValid = false;
    }
    return formIsValid;
}

export const isCheckboxChecked=(data,loggedIn)=>{
    let checkboxChecked=false;
    if(loggedIn)
    {
        if(data && data.billingAddress==null)
        {
            checkboxChecked=false;
        }else{
            if(data && data.shippingAddress &&  data.billingAddress)
            {
                checkboxChecked = data.shippingAddress.id===data.billingAddress.id;
            }
        }
    }else{
        checkboxChecked=false; // for anonymous back step
    }
    
    return checkboxChecked;
}