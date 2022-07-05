import './scss/index.scss';
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import ReactSVG from "react-svg";
import TextField from '@material-ui/core/TextField';
import searchImgD from "../../images/menu-search.svg";
//import Select from 'react-select';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { SearchProductsQuery } from '../../EMWAutocompleteSearchBox/queries';
import { history } from '../../../history';
import { siteSearchUrl } from "../../../routes/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import { DebouncedTextField } from "../../Debounce";
import searchImg from "../../../images/search-mobile.svg";
import classNames from "classnames";
import { useAlert } from "react-alert";

interface EMWSearchBoxProps {
    hideOverlay: any;
}
const EMWSearchBox: React.FC<EMWSearchBoxProps> = (props) => {
    const { hideOverlay } = props
	const alert = useAlert();
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [productList, setProductList] = useState([]);



    const [searchProduct, { loading }] = useLazyQuery(SearchProductsQuery, {
        fetchPolicy: 'network-only',
        onCompleted({ emwproducts }) {
            if (emwproducts) {
                setProductList(emwproducts.edges);
            }
        },
        onError(error) {
            alert.show({ title: "Something went wrong!" }, { type: "error" });
        },
    });

    const handleSearchedText = (value) => {
        setSearchTerm(value);
        searchProduct({
            variables: {
                first: 20,
                filter: {
                    search: value,
                    categories: [""],
                    emwProdIsActive: true,
                }
            }
        });
    }
    const onProductClick = (seoUrl) => {
        setIsFocused(false);
        history.push(`/${seoUrl}`);
        hideOverlay();
    }

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        if (searchTerm !== "") {
            history.push(`${siteSearchUrl}?term=${searchTerm}`);
            hideOverlay();
        }
    };

    const splitEnds = (value, partNum) => {
        const name = value.toLowerCase();
        const partNumber = partNum && partNum.toLowerCase();

        const searchedTerm = searchTerm.toLowerCase();
        const splittedValue = name.split(searchedTerm);

        //partNum
        const splittedPartNum = partNumber && partNumber.split(searchedTerm);
        return (
            <>
                {
                    (splittedPartNum && splittedPartNum.length > 0) &&
                    <span key={Math.random()}>
                        {
                            (splittedPartNum.length == 1) ?
                                <span className="normal-search-text">{splittedPartNum[0].toUpperCase()}</span>
                                :
                                splittedPartNum.map((item, index) => {
                                    return (
                                        <>
                                            {
                                                (item) && <span className="normal-search-text" key={Math.random()}>{item.toUpperCase()}</span>
                                            }
                                            {
                                                ((index + 1) < splittedPartNum.length) && <span className="searched-text-bold" key={Math.random()}>{searchTerm.toUpperCase()}</span>
                                            }
                                        </>
                                    )
                                })
                        }
                &nbsp;
                -
                &nbsp;
                </span>
                }
                <span className='break-name' key={Math.random()}>
                    {
                        splittedValue.map((item, index) => {
                            return (
                                <>
                                    {
                                        (item) && <span className="normal-search-text" key={Math.random()}>{item.toUpperCase()}</span>
                                    }
                                    {
                                        ((index + 1) < splittedValue.length) && <span className="searched-text-bold" key={Math.random()}>{searchTerm.toUpperCase()}</span>
                                    }
                                </>
                            )
                        })
                    }
                </span>
            </>
        )
    }

    return (
        <>
            <Box alignItems="center" className="emw-mobile-search-box">
                <form
                    className={classNames("search", {
                        "emw-search--has-results": searchTerm.length > 0,
                    })}
                    onClick={e => e.stopPropagation()}
                    onSubmit={handleSubmit}
                >
                    <div className="search__input emw-mobile-seach">
                        <DebouncedTextField
                            onChange={evt => handleSearchedText(evt.target.value)}
                            value={searchTerm}
                            // iconLeft={
                            //   <ReactSVG path={closeImg} onClick={this.props.overlay.hide} />
                            // }
                            iconRight={<ReactSVG path={searchImg} onClick={handleSubmit} />}
                            autoFocus={true}
                            placeholder="Search"
                        // onBlur={hideOverlay}
                        />
                    </div>
                    {
                        (searchTerm) &&
                        <div className="emw-mobile-search-product-list-box">
                            <Box className={(loading || (productList && productList.length==0)) ? "emw-mobile-search-product-list-height" : ""}>
                                {
                                    (loading) ?
                                        <Box alignItems="center" display="flex" justifyContent="center" className="emw-mobile-search-loader">
                                            <CircularProgress />
                                        </Box>
                                        :
                                        (productList && productList.length > 0) ?
                                            productList.map(item => {
                                                return (
                                                    (!item.emwProdIsDeleted) &&
                                                    <div
                                                        onClick={() => onProductClick(item.node.emwProdSesurl)}
                                                        key={Math.random()}
                                                        className="emw-mobile-search-product-item"
                                                    >
                                                        {splitEnds(item.node.name, item.node.emwProdVendorPartnumber)}
                                                    </div>
                                                )
                                            })
                                            :
                                            <Box alignItems="center" display="flex" justifyContent="center" className="emw-mobile-search-loader">
                                                No Products Found.
                                            </Box>

                                }
                            </Box>

                        </div>
                    }
                </form>
            </Box>
        </>
    )
}
export default EMWSearchBox;