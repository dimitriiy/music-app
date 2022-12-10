import * as React from "react";
import { formatDuration } from "../../utils";
import "./styles.scss";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { makeStyles } from "@mui/styles";

export const TrackItem: React.FC<{
  duration: number;
  title: string;
  artist: string;
  image: string;
}> = ({ title, image, artist, duration }) => {
  return (
    <div className="track">
      <img
        src={image}
        alt=""
        width="50px"
        height="50px"
        className="track__image"
      />
      <div className="track__title">{title}</div>
      <span className="px-1">&mdash;</span>
      <div className="track__artist">{artist}</div>
      <div className="track__actions">
        <IconButton className="track__like-btn">
          <input hidden accept="image/*" type="file" />
          <FavoriteIcon />
        </IconButton>
        <div className="track__duration">
          {duration ? formatDuration(duration) : null}
        </div>
      </div>
    </div>
  );
};
