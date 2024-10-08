import React from "react";
import SwitchProvider from "@dhiwise/react-switch";
import PropTypes from "prop-types";

const Switch = ({
  value = false,
  className,
  checkedIcon = <></>,
  uncheckedIcon = <></>,
  onChange,
}) => {
  const [selected, setSelected] = React.useState(value);

  const handleChange = (val) => {
    setSelected(val);

    // Toggle dark mode based on switch value
    if (val) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    onChange?.(val);
  };

  return (
    <div className={className}>
      <SwitchProvider
        checked={selected}
        onChange={handleChange}
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
      />
    </div>
  );
};

Switch.propTypes = {
  value: PropTypes.bool,
  className: PropTypes.string,
  checkedIcon: PropTypes.node,
  uncheckedIcon: PropTypes.node,
  onChange: PropTypes.func,
};

export { Switch };
