import React from "react";
import { HttpClient } from "../../api/httpClient";
import {
  Card,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Button,
  Box,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom"; // Grid version 1

export const SongCard = ({ data }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="100" image={data.image} />
      <CardContent>
        <Link to={`/artists/${data.artist.mbid}`}>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            style={{ opacity: 0.8 }}
          >
            {data.artist.name}
          </Typography>
        </Link>

        <Typography gutterBottom variant="subtitle1" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/*Lizards are a widespread group of squamate reptiles, with over 6,000*/}
          {/*species, ranging across all continents except Antarctica*/}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Play</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export const SongsPage = () => {
  const [songs, setSongs] = React.useState([]);

  React.useEffect(() => {
    async function getSongs() {
      const data = await HttpClient.get("http://localhost:3001/songs");
      setSongs(data);
      console.log(data);
    }

    getSongs();
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} gap={3} justifyContent="center">
          {songs.map((song) => (
            <Grid xs={2} item={true} key={song.id}>
              <SongCard data={song} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
