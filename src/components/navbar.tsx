import React from "react";

import "./navbar.scss";

interface navbarProps {
  title?: string
}

export default (props: navbarProps) => {

  // const [title, setTitle] = useState(props.title);
  
  return (
    <div className="navbar">
      <nav>
        <h1>Title: {props.title || "title0"}</h1>
        <h2>words: www</h2>
        <h2>loggedin as xxx</h2>
      </nav>
    </div>
  );

};