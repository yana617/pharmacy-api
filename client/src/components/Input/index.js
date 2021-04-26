import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({ className, type = 'text', label, id, value, onChange }) => (
  <TextField
    id={id}
    label={label}
    variant="outlined"
    className={className}
    size="small"
    value={value}
    type={type}
    onChange={e => onChange(e.target.value)}
    required
    aria-label={label}
  />
);

export default Input;