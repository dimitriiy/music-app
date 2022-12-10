import { Link, useParams } from "react-router-dom";
import React from "react";
import { HttpClient } from "../../api/httpClient";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { SongCard } from "../songs";
import { BorderBox } from "../../components/BorderBox";
import { ArtistData } from "./ArtistData";

export const ArtistPage = () => {
  const { id } = useParams();

  const [artistData, setSongs] = React.useState([]);

  React.useEffect(() => {
    async function getSongs() {
      const data = await HttpClient.get(
        `http://localhost:3001/songs/artist/${id}`
      );
      setSongs(data);
      console.log(data);
    }

    getSongs();
  }, []);

  console.log(id);
  return (
    <div>
      <Box>
        <Grid
          container
          justifyContent="center"
          style={{ maxWidth: 700, margin: "auto" }}
        >
          <BorderBox>
            <div className="p-5">
              <CardMedia component="img" height="100" image={""} />
              <div>
                <Typography variant="h3">{artistData.name}</Typography>
              </div>
              <p dangerouslySetInnerHTML={{ __html: artistData.bio }}></p>
            </div>
          </BorderBox>

          <div className="pt-8" style={{ width: "100%" }}>
            <ArtistData data={artistData} />
          </div>
        </Grid>
      </Box>
    </div>
  );
};
