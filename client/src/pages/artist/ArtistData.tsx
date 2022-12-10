import * as React from "react";
import { Box, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { BorderBox } from "../../components/BorderBox";
import { YoutubeApi } from "../../api/youtube";
import { TrackItem } from "../../components/TrackItem";
import { useFetch } from "../../hooks/fetch";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const TrackList: React.FC<{ data: any }> = ({ data }) => {
  console.log(data);

  if (!data) return null;

  return (
    <div>
      {data.albums
        .flatMap((al) =>
          al.tracks.track.map((track) => ({ ...track, image: al.image }))
        )
        .map((track, i) => (
          <TrackItem
            key={i}
            duration={track.duration}
            title={track.name}
            artist={track.artist.name}
            image={track.image}
          />
        ))}
    </div>
  );
};

export const VideoList: React.FC<{ name: string }> = ({ name }) => {
  const {
    data: videos,
    isLoading,
    error,
  } = useFetch(() => YoutubeApi.get("/search", { q: name }));

  if (isLoading) {
    return (
      <Grid container gap={2}>
        {[...Array.from({ length: 8 })].map((_, i) => (
          <Box key={i} style={{ flex: "0", minWidth: 200 }}>
            <Skeleton variant="rectangular" height={118} />

            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        ))}
      </Grid>
    );
  }

  console.log(videos);
  return (
    <Grid container gap={2}>
      {(videos?.items ?? []).map((video, i) => {
        const videoURL = `https://www.youtube.com/embed/${video.id.videoId}`;

        return (
          <Box sx={{ pt: 0.5 }} key={videoURL}>
            <iframe title="video-player" src={videoURL} />
          </Box>
        );
      })}
    </Grid>
  );
};

export const AlbumList: React.FC<{ data: any }> = ({ data }) => {
  if (!data?.albums) return null;

  return (
    <div>
      <Grid container spacing={2}>
        {data.albums.map((albm) => {
          return (
            <Grid item xs={4}>
              <div>
                <div>
                  {albm.image ? <img src={albm.image} alt="" /> : <div></div>}
                </div>

                <Typography variant="subtitle1">{albm.name}</Typography>
                <Typography variant="subtitle2">{albm.artist}</Typography>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export const ArtistData = ({ data }) => {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <BorderBox single={true}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
          aria-label="basic tabs example"
        >
          <Tab label="Альбомы" />
          <Tab label="Треки" />
          <Tab label="Клипы" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <AlbumList data={data} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TrackList data={data} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <VideoList name={data.name} />
      </TabPanel>
    </BorderBox>
  );
};
