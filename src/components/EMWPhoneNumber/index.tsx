import './scss/index.scss';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface EMWPhoneNumberEMW {
    phoneNum: any;
    handleOnChangeNum: any;
    handleOnBlur?: any;
    defaultCountry?: string;
    name: any;
    required: boolean;
    readOnly: boolean;
    className: string;
}

const EMWPhoneNumber: React.FC<EMWPhoneNumberEMW> = (props) => {
    const { phoneNum, readOnly, handleOnChangeNum, handleOnBlur, defaultCountry, name, required, className } = props;
    const [changedValueClass, setChangedValueClass] = useState(false);
    const changeHandler = (value) => {
        handleOnChangeNum(value);
        if (value) {
            setChangedValueClass(true);
        } else {
            setChangedValueClass(false);
        }
    }

    return (
        <>
            <PhoneInput
                containerClass={[(changedValueClass) ? "selected-phone-container" : "emw-phone-container", "basic-phone-contatiner"].join(" ")}
                inputClass={`emw-phone-num ${className ? className : ''}`}
                dropdownClass="emw-phone-dropdown"
                preferredCountries={['us']}
                country={defaultCountry}
                value={phoneNum}
                onChange={changeHandler}
                disabled={readOnly}
                inputProps={{
                    name: name,
                    required: required
                }}
                //className="input__select--error"
                onBlur={handleOnBlur}
            />
            {className && className.length && <span className="input__error">This field is required to continue</span>}
        </>
    )
};

export default EMWPhoneNumber;
