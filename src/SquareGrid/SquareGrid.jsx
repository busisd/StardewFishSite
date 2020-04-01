import React from "react";
import "./SquareGrid.css";

const addGridContentClassName = (classNames, additionalClassNames) =>
  `${classNames ? classNames + " " : ""}${
    additionalClassNames ? additionalClassNames + " " : ""
  }grid-item-content`;

const addStyles = (childStyle, additionalStyle) => ({
  ...additionalStyle,
  ...childStyle
});

const gridItemWrap = (child, additionalProps = {}, index) =>
  React.isValidElement(child) ? (
    <div
      className="grid-item-wrapper"
      key={
        child.props.uniqueKey ? `${child.props.uniqueKey}_grid_wrapper` : index
      }
    >
      {React.cloneElement(child, {
        ...additionalProps,
        ...child.props,
        style: addStyles(child.props.style, additionalProps.style),
        className: addGridContentClassName(
          child.props.className,
          additionalProps.className
        )
      })}
    </div>
  ) : (
    <div className="grid-item-wrapper" key={index}>
      <span
        {...additionalProps}
        className={addGridContentClassName(null, additionalProps.className)}
      >
        {child}
      </span>
    </div>
  );

const convertToArray = item => (item ? [].concat(item) : []);

function SquareGrid({ children, childProps, ...rest }) {
  return (
    <div className="square-grid" {...rest}>
      {convertToArray(children).map((child, index) =>
        gridItemWrap(child, childProps, index)
      )}
    </div>
  );
}

export default SquareGrid;
