import React from "react";
import SquareGrid from "./SquareGrid";

const toggleState = (setSelectState, item_name, newValue) => {
  setSelectState(oldSelectState => ({
    ...oldSelectState,
    [item_name]: newValue
  }));
};

/*  Each item should be in the form:
  {
    name: [key of item in selectState]
    checked: [something renderable to go in the grid]
    unchecked: [something renderable to go in the grid]
  }
*/
const SelectGrid = ({ selectState, setSelectState, items, ...rest }) => (
  <SquareGrid {...rest}>
    {items.map(item =>
      selectState[item.name]
        ? React.cloneElement(item.checked, {
            ...item.props,
            onClick: () => toggleState(setSelectState, item.name, false),
            key: item.name
          })
        : React.cloneElement(item.unchecked, {
            ...item.props,
            onClick: () => toggleState(setSelectState, item.name, true),
            key: item.name
          })
    )}
  </SquareGrid>
);

export default SelectGrid;
