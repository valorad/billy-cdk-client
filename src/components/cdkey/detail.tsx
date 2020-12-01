import React from "react";
import { Trans, t } from "@lingui/macro";

import { DetailedCDKey } from "../../models/cdkey.interface";
import { MenuItem } from "../../models/menu.interface";
import Menu from "../menu";

import "./detail.scss";

interface cdkeyDetailProps {
  CDKey: DetailedCDKey,
  menus: MenuItem[],
}

const CDKeyDetail = (props: cdkeyDetailProps) => {

  return (
    <div className="cdkeyDetail">

      <header>
        <h1>{props.CDKey.isActivated? "!" + t`Attention: this CDKey has already been activated` + "!": null}</h1>
        <h1><Trans>Owner Player</Trans>:{props.CDKey.playerName || props.CDKey.player || t`Unknown`}</h1>
        <h1><Trans>CDKey Value</Trans>:{props.CDKey.value || t`Unknown`}</h1>
        <h1><Trans>Game to Activate</Trans>:{props.CDKey.gameName || props.CDKey.game || t`Unknown`}</h1>
        <h1><Trans>Price</Trans>:{props.CDKey.price || t`Unknown`}</h1>
        <h1><Trans>Platform</Trans>:{props.CDKey.platform || t`Unknown`}</h1>
      </header>

      <Menu menus={props.menus} />
    </div>
  );
};

export default CDKeyDetail;