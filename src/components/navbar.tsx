import { Trans, t } from "@lingui/macro";

import "./navbar.scss";

interface navbarProps {
  title?: string,
  description?: string,
  player?: string
}

const Navbar = (props: navbarProps) => {

  return (
    <div className="navbar">

      <nav>
        <header>
          <ul>
            <li><small><Trans>Billy CDKey Remastered Edition</Trans></small></li>
            <li><small><Trans>Current Theme</Trans>: <Trans>Fallout Terminal</Trans></small></li>
            <li><small><Trans>Welcome Back</Trans>, {props.player}</small> {/* Player name */}</li>
          </ul>
        </header>
        <main>
          <h1>{props.title || t`Welcome to Billy CDKey!`}</h1>{/* title */}
          <h2>{props.description}</h2>{/* Description */}
        </main>
      </nav>

    </div>
  );

};

export default Navbar;