CREATE TABLE "User" (
  "id" int PRIMARY KEY,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "first_name" varchar NOT NULL,
  "last_name" varchar,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "LabelUserOwner" (
  "id" int PRIMARY KEY,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "first_name" varchar NOT NULL,
  "last_name" varchar,
  "created_at" timestamp NOT NULL,
  "label_id" int NOT NULL
);

CREATE TABLE "RecordLabel" (
  "id" int PRIMARY KEY,
  "name" varchar NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "Artist" (
  "id" int PRIMARY KEY,
  "name" varchar NOT NULL,
  "created_at" timestamp NOT NULL,
  "record_label_id" int NOT NULL
);

CREATE TABLE "Song" (
  "id" int PRIMARY KEY,
  "title" varchar NOT NULL,
  "duration" int NOT NULL,
  "album_id" int,
  "genre" int
);

CREATE TABLE "Song_Artist" (
  "song_id" int NOT NULL,
  "artist_id" uint NOT NULL
);

CREATE TABLE "Song_Genres" (
  "song_id" int NOT NULL,
  "genre_id" int NOT NULL
);

CREATE TABLE "Album" (
  "id" int PRIMARY KEY,
  "title" varchar NOT NULL,
  "artist_id" int NOT NULL,
  "released_date" datetime NOT NULL
);

CREATE TABLE "Genres" (
  "id" int PRIMARY KEY,
  "title" varchar NOT NULL
);

CREATE TABLE "Playlists" (
  "id" int PRIMARY KEY,
  "title" varchar NOT NULL,
  "user_id" int NOT NULL
);

CREATE TABLE "Playlist_Song" (
  "playlist_id" int NOT NULL,
  "song_id" int
);

CREATE TABLE "Favorites" (
  "user_id" int NOT NULL,
  "song_id" int NOT NULL
);

CREATE TABLE "Interactions" (
  "id" int PRIMARY KEY,
  "user_id" int NOT NULL,
  "song_id" int NOT NULL,
  "play_cound" INT GENERATED BY DEFAULT AS IDENTITY,
  "created_at" datetime NOT NULL,
  "liked" boolean
);

ALTER TABLE "Song_Artist" ADD CONSTRAINT unique_song FOREIGN KEY ("song_id") REFERENCES "Song" ("id");

ALTER TABLE "Song_Artist" ADD CONSTRAINT unique_artist FOREIGN KEY ("artist_id") REFERENCES "Artist" ("id");

ALTER TABLE "Playlists" ADD CONSTRAINT unique_palylist FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Playlist_Song" ADD CONSTRAINT unique_playlist_song FOREIGN KEY ("playlist_id") REFERENCES "Playlists" ("id");

ALTER TABLE "Favorites" ADD CONSTRAINT unique_fav FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Favorites" ADD CONSTRAINT unique_fav_song FOREIGN KEY ("song_id") REFERENCES "Song" ("id");

ALTER TABLE "Interactions" ADD CONSTRAINT unique_interact FOREIGN KEY ("user_id") REFERENCES "User" ("id");

ALTER TABLE "Interactions" ADD CONSTRAINT unique_interact_song FOREIGN KEY ("song_id") REFERENCES "Song" ("id");

ALTER TABLE "Album" ADD CONSTRAINT unique_album FOREIGN KEY ("artist_id") REFERENCES "Artist" ("id");

ALTER TABLE "Song_Genres" ADD CONSTRAINT unique_genres FOREIGN KEY ("genre_id") REFERENCES "Genres" ("id");

ALTER TABLE "Song_Genres" ADD CONSTRAINT unique_sgen FOREIGN KEY ("song_id") REFERENCES "Song" ("genre");

ALTER TABLE "Playlist_Song" ADD CONSTRAINT unique_ps FOREIGN KEY ("song_id") REFERENCES "Song" ("id");

ALTER TABLE "RecordLabel" ADD CONSTRAINT unique_rc FOREIGN KEY ("id") REFERENCES "LabelUserOwner" ("label_id");

ALTER TABLE "Artist" ADD CONSTRAINT unique_al FOREIGN KEY ("record_label_id") REFERENCES "RecordLabel" ("id");






