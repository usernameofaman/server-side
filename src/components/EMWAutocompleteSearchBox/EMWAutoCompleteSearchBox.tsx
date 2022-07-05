import './scss/index.scss';
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import ReactSVG from "react-svg";
import TextField from '@material-ui/core/TextField';
import searchImgD from "../../images/menu-search.svg";
import Select from 'react-select';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { SearchProductsQuery, GetAllCategoriesQuery } from './queries';
import { history } from '../../history';
import { siteSearchUrl } from "../../routes/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const EMWSlider: React.FC = (props) => {
      const alert = useAlert();
    const [category,setCategory]=useState("");
    const [searchTerm,setSearchTerm]=useState("");
    const [isFocused,setIsFocused]=useState(false);
    const [productList,setProductList]=useState([]);
    const [categoryListing,setCategoryListing]=useState([{ label: "All", value: "" }]);
    
    const { data: categoryList } = useQuery(GetAllCategoriesQuery,
        {
          variables: {
            level: 0,
            first: 20
          },
          fetchPolicy: "network-only",
        }
    );

    useEffect(() => {
        if(categoryList && categoryList.emwcategories){
            const list=categoryList.emwcategories.edges;
            if(list.length>0){
                const arr=[{
                    label: "All",
                    value: "",
                }];
                list.map(item=>{
                    const items={
                        label: item.node.name,
                        value: item.node.id,
                    }
                    arr.push(items);
                })  
                setCategoryListing(arr);
            }
        }
    }, [categoryList]);

    const [searchProduct, { loading }] = useLazyQuery(SearchProductsQuery, {
        fetchPolicy: 'network-only',
        onCompleted({ emwproducts }) {
          if (emwproducts) {
           setProductList(emwproducts.edges);
          }
        },
        onError(error) {
            alert.show({title: "Something went wrong!"},{ type: "error" });
        },
    });

    const handleCategorySelect=(values)=>{
        setCategory(values.value);
        if(searchTerm){
            searchProduct({ variables: { 
                first: 20, 
                filter: {
                    search: searchTerm,
                    categories: [values.value],
                    emwProdIsActive: true,
                }
            }
            });
        }
        
    }

    const handleSearchedText=(value)=>{
        setSearchTerm(value);
        if(!isFocused){
            setIsFocused(true);
        }
        searchProduct({ variables: { 
            first: 20, 
            filter: {
                search: value,
                categories: [category],
                emwProdIsActive: true,
            }
        }
        });
    }
    const onProductClick=(seoUrl)=>{
        setIsFocused(false);
        // setSearchTerm("");
        history.push(`/${seoUrl}`);
    }

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        if (searchTerm !== "") {
          history.push(`${siteSearchUrl}?term=${searchTerm}`);
          setIsFocused(false);
        }
    };
    // for custom option component
    // const Option = (props) => {
    //     return (
    //       <div>
    //         {`Testing - Cat`}
    //       </div>
    //     )
    // }

    const splitEnds=(value,partNum)=>{
        const name=value.toLowerCase();
        const partNumber=partNum && partNum.toLowerCase();

        const searchedTerm=searchTerm.toLowerCase();
        const splittedValue=name.split(searchedTerm);

        //partNum
        const splittedPartNum=partNumber && partNumber.split(searchedTerm);
        return(
            <>
            {
                (splittedPartNum && splittedPartNum.length>0) &&
                <span>
                {
                    (splittedPartNum.length==1) ?
                        <span className="normal-search-text">{splittedPartNum[0].toUpperCase()}</span>
                    :
                    splittedPartNum.map((item,index)=>{
                        return(
                            <>
                            {
                                (item) &&  <span className="normal-search-text">{item.toUpperCase()}</span>
                            }
                            {
                                ((index+1)<splittedPartNum.length) && <span className="searched-text-bold">{searchTerm.toUpperCase()}</span>
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
            <span className='break-name'>
            {
                splittedValue.map((item,index)=>{
                    return(
                        <>
                        {
                            (item) &&  <span className="normal-search-text">{item.toUpperCase()}</span>
                        }
                        {
                            ((index+1)<splittedValue.length) && <span className="searched-text-bold">{searchTerm.toUpperCase()}</span>
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
        <Box className="autocomplete-wrapper">
            <Box className="search-container autocomplete-box-wrapper" alignItems="center">
                    <Box className="select-container">
                        <Select
                            className="search-category-dropdown"
                            minMenuHeight={42}
                            isSearchable={true}
                            onChange={(values) => handleCategorySelect(values)}
                            defaultValue={{
                                label: "All",
                                value: "",
                            }}
                            classNamePrefix={"search-select"}
                            // components={{ Option }}
                            options={categoryListing}
                        />
                    </Box>
                    <Box className="search-text-wrapper">
                        <form
                            onClick={e => e.stopPropagation()}
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                onChange={evt => handleSearchedText(evt.target.value)}
                                value={searchTerm}
                                autoFocus={true}
                                variant="outlined"
                                placeholder="Search"
                                onFocus={()=> { setIsFocused(true) }}
                                onBlur={()=> setTimeout(function(){ setIsFocused(false) }, 1000)}
                                fullWidth
                            />
                            <span onClick={handleSubmit}><ReactSVG className="emw-menu-search" path={searchImgD} /></span>
                        </form>
                        {
                            (searchTerm && isFocused) &&
                            <Box className="product-list-wrapper">
                                {
                                    (loading) ? 
                                    <Box alignItems="center" display="flex" justifyContent="center">
                                        <CircularProgress />
                                    </Box>
                                    :
                                    (productList && productList.length>0) ? 
                                        productList.map(item=>{
                                            return(
                                                (!item.emwProdIsDeleted) &&
                                                <div 
                                                className="internal-product-div search-cursor" 
                                                onClick={()=>onProductClick(item.node.emwProdSesurl)}
                                                >
                                                    {splitEnds(item.node.name,item.node.emwProdVendorPartnumber)}
                                                </div>
                                            )
                                        })
                                    :
                                    <Box alignItems="center" display="flex" justifyContent="center" className="internal-product-div">
                                        No Products Found.
                                    </Box>
                                    
                                }
                            </Box>
                        }
                        
                    </Box>
            </Box>
            
        </Box>
        {
        (isFocused && productList && productList.length>0) &&
        <div className="black-drop-search">
        </div>
        }
        
        </>
    )
}
export default EMWSlider;