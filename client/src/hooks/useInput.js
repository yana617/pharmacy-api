import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const useInput = ({ className, type = 'text', label, id }) => {
  const [value, setValue] = useState('');
  const input = (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      className={className}
      size="small"
      value={value}
      type={type}
      onChange={e => setValue(e.target.value)}
      required
      aria-label={label}
    />);
  return [value, input];
};

export default useInput;