import React from "react";
import CurrentNetwork from '../MemoryDappUI/CurrentNetwork/CurrentNetwork';


export const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <CurrentNetwork currentNetwork={props.currentNetwork}/>
    </nav>
  );
};
