import './scss/index.scss';
import React, { useState } from 'react';
import Slider from "react-slick";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { vendorsList } from './constants';
import ReactSVG from "react-svg";
import  launchIcon from "../../images/launch-icon.svg";
import  leftArrow from "../../images/slider-left-arrow.svg";
import  rightArrow from "../../images/slider-right-arrow.svg";
import { history } from '../../history';

const EMWSlider: React.FC = () => {
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props } : any) => (
        <img src={leftArrow} 
            {...props}
            className={
                "slick-prev slick-arrow" +
                (currentSlide === 0 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === 0 ? true : false}
        />
    );
    const SlickArrowRight = ({ currentSlide, slideCount, ...props } : any) => (
        <img 
            src={rightArrow}
            {...props}
            className={
            "slick-next slick-arrow" +
            (currentSlide === slideCount - 1 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1 ? true : false}
        />
    );
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: <SlickArrowRight/>,
        prevArrow: <SlickArrowLeft/>,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                arrow: false,
              }
            },
        ]
    };

    const onExternalClick=(externalLink)=>{
        window.open(externalLink);
    }

    const onInternalClick=(internalLink)=>{
        history.push(internalLink);
    }

    return (
        <>
            <Box className="emw-slick-slider">
                <Container maxWidth="lg">
                <Slider {...settings}>
                    {
                        vendorsList.map((item,index)=>{
                            return(
                                <div key={Math.random()} className="slider-container">
                                    <div className="custom-text">
                                        <ReactSVG path={launchIcon} 
                                            className="slider-external-link" 
                                            onClick={()=>onExternalClick(item.externalLink)}
                                        />
                                        <ReactSVG path={item.image} 
                                            className="slider-item"
                                            onClick={()=>onInternalClick(item.link)}
                                        />
                                    </div>
                                </div>
                            )
                            
                        })
                    }
                </Slider>
                </Container>
            </Box>
        </>
    )
}
export default EMWSlider;