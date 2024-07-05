import React, { useMemo, useCallback } from "react";

const MyComponent = ({ items }) => {
  const expensiveCalculation = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);

  const handleClick = useCallback(() => {
    console.log("Item clicked!");
  }, []);

  return <div onClick={handleClick}>Total Value: {expensiveCalculation}</div>;
};
