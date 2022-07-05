import * as React from "react";

import { NavLink } from "..";
import { TypedSecondaryMenuQuery } from "./queries";
import ReactSVG from "react-svg";
import visa from '../../images/visa1.svg'
import amex from '../../images/amex1.svg'
import discover from '../../images/discover1.svg'
import mastercard from '../../images/mastercard1.svg'
import aplus from '../../images/A+.svg'
import bbblogo from '../../images/BBB Logo.svg'
import "./scss/index.scss";
import { Container, Grid } from '@material-ui/core';

class Nav extends React.PureComponent {
  render() {
    return (
      <footer className="footer-nav">
        <Container>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12} md={3}>
              <div className="footer-nav__section">
                <h4 className="footer-nav__section-header footer-header-styling">
                  Telephone
                </h4>
                <h4 className="footer-nav__section-header footer-telphone">
                  302-653-1844
                </h4>
                <h4 className="footer-nav__section-header footer-header-styling">
                  Hours of Operation
                </h4>
                <h4 className="footer-nav__section-header footer-value-styling">
                  M - F 8:00 A.M. - 5:00 P.M. EST
                </h4>
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={6} className="footer-center-grid">
              <TypedSecondaryMenuQuery>
                {({ data }) => {
                  return data.shop.navigation.secondary.items.map(item => (
                    <div className="footer-nav__section" key={item.id}>
                      <h4 className="footer-nav__section-header">
                        <NavLink item={item} />
                      </h4>
                      <div className="footer-nav__section-content">
                        {item.children.map(subItem => (
                          <p key={subItem.id}><NavLink item={subItem} /></p>
                        ))}
                      </div>
                    </div>
                  ));
                }}
              </TypedSecondaryMenuQuery>
            </Grid>
            <Grid item sm={12} xs={12} md={3} className="footer-last-grid">
              <div className="top-content">
                < ReactSVG path={visa} className="emw-footer-icon" />
                < ReactSVG path={amex} className="emw-footer-icon" />
                < ReactSVG path={discover} className="emw-footer-icon" />
                < ReactSVG path={mastercard} className="emw-footer-icon" />
              </div>
              <div className="bottom-content">
                < ReactSVG path={bbblogo} className="emw-footer-icon" />
                < ReactSVG path={aplus} className="emw-footer-icon" />
              </div>
            </Grid>
          </Grid>
          {/* <div className="left-container">
            <div className="footer-nav__section">
              <h4 className="footer-nav__section-header">
                Telephone
                </h4>
              <h4 className="footer-nav__section-header">
                302-653-1844
                </h4>
              <h4 className="footer-nav__section-header">
                Hours of Operation
                </h4>
              <h4 className="footer-nav__section-header">
                M - F 8:00 A.M. - 5:00 P.M. EST
                </h4>
            </div>
          </div>
          <div className="center-container">
            <TypedSecondaryMenuQuery>
              {({ data }) => {
                return data.shop.navigation.secondary.items.map(item => (
                  <div className="footer-nav__section" key={item.id}>
                    <h4 className="footer-nav__section-header">
                      <NavLink item={item} />
                    </h4>
                    <div className="footer-nav__section-content">
                      {item.children.map(subItem => (
                        <p key={subItem.id}><NavLink item={subItem} /></p>
                      ))}
                    </div>
                  </div>
                ));
              }}
            </TypedSecondaryMenuQuery>
          </div>
          <div className="right-container">
            <div className="top-content">
              < ReactSVG path={visa} className="emw-footer-icon" />
              < ReactSVG path={amex} className="emw-footer-icon" />
              < ReactSVG path={discover} className="emw-footer-icon" />
              < ReactSVG path={mastercard} className="emw-footer-icon" />
            </div>
            <div className="bottom-content">
              < ReactSVG path={aplus} className="emw-footer-icon" />
              < ReactSVG path={bbblogo} className="emw-footer-icon" />
            </div>
          </div> */}
        </Container>
      </footer>
    );
  }
}

export default Nav;
