import { Trans } from "@lingui/macro";

import "./tips.scss";

interface tipsProps {

}

const Tips = (props: tipsProps) => {
  return (
    <div className="tips">
      <ul>
        <li> <a href="##" onClick={(e) => {e.preventDefault();window.history.back();}}><b>ESC)</b><span><Trans>Go Back</Trans></span></a></li>
        <li> <a href="##" onClick={(e) => {e.preventDefault();window.location.href = "#";}}><b>Home)</b><span><Trans>Go Home</Trans></span></a></li>
      </ul>
    </div>
  );
};

export default Tips;