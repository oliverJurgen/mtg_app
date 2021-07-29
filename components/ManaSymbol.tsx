import React from "react";

// All Mana icons can be found here
// https://andrewgioia.github.io/Mana/icons.html
// the class names and attributes can be found here:
// https://andrewgioia.github.io/Mana/attributes.html
const ManaSymbol = ({ mod }: { mod: string }) => {
  return (
    <i className={`ms ms-${mod} ms-cost`} style={{ marginRight: "5px" }} />
  );
};

export default ManaSymbol;
