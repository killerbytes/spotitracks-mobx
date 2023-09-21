import React from 'react';

export default function useToggle(state) {
  const [toggle, setToggle] = React.useState(state);
  const handleToggle = React.useCallback((item) => {
    setToggle((prevState) => ({ ...prevState, ...item }));
  }, []);

  const result = [toggle, handleToggle];
  result.toggle = result[0];
  result.handleToggle = result[1];

  return result;
}
