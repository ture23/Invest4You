import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/core/Typography';

export default function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
