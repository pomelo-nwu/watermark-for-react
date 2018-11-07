import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {
    marginTop: "15px"
  },
  slider: {
    padding: "22px 0px"
  },
  title: {
    fontSize: "14px"
  },
  subTitle: {
    fontSize: "14px"
  }
};

const Controller = props => {
  const { value, title, subTitle, onChange, classes, unit, ...others } = props;
  return (
    <div style={styles.root}>
      <span style={styles.title}> {title} | </span>
      <span style={styles.subTitle}>{subTitle} | </span>
      <span>
        {value}
        {unit ? unit : "px"}
      </span>
      <Slider
        {...others}
        classes={{ container: classes.slider }}
        value={value}
        aria-labelledby="label"
        onChange={onChange}
      />
    </div>
  );
};

Controller.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Controller);
