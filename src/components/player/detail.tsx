import React from "react";
import { Trans, t } from "@lingui/macro";

import { Player } from "../../models/player.interface";
import { MenuItem } from "../../models/menu.interface";

import Menu from "../menu";

import "./detail.scss";

interface playerDetailProps {
  player: Player,
  menus: MenuItem[],
}

const PlayerDetail = (props: playerDetailProps) => {

  const placePremiumBadge = () => {
    if (props.player.isPremium) {
      return (
        <h1> <span role="img" aria-label="star">🌟</span> <Trans>TuHao Premium Membership</Trans> <span role="img" aria-label="star">🌟</span></h1>
      );
    }
  };

  return (
    <div className="playerDetail">
      <header>
        {placePremiumBadge()}
        <h1><Trans>Biography</Trans>: {props.player.bio || t`This player is too busy playing to introduce himself/herself`}</h1>
      </header>

      <Menu menus={props.menus} />
    </div>
  );
};

export default PlayerDetail;