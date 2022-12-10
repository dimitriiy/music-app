// @ts-nocheck
import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { PostgresModule } from "nest-postgres";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import fetch from "node-fetch";
import * as fs from "fs/promises";

const DEFAULT_ADMIN = {
  email: "admin@example.com",
  password: "password",
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `../.env` }),
    PostgresModule.forRoot({
      host: "localhost",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      port: 5432,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}

setTimeout(async () => {
  console.log();
  const lastFmApi = {
    API_KEY: "3a5083b5977e1a9f23ce0c70e12ed477",
    req: async (path: string, body: any = undefined) => {
      return fetch(path, body).then((d) => d.json());
    },
    getArtistByName: function (name: string) {
      return this.req(
        `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${lastFmApi.API_KEY}&limit=10&format=json`
      );
    },

    getArtistInfo: function (mbid: number) {
      return this.req(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${mbid}&api_key=${lastFmApi.API_KEY}&limit=10&format=json`
      );
    },
    getTopAlbums: function (mbid: string) {
      return this.req(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=${mbid}&api_key=${lastFmApi.API_KEY}&limit=10&format=json`
      );
    },
    getAlbumInfo: function (name: string, albumName: string) {
      return this.req(
        `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${name}&album=${albumName}&api_key=${lastFmApi.API_KEY}&limit=10&format=json`
      );
    },
  };

  const loadMusicData = async (name: string) => {
    try {
      const data = await lastFmApi.getArtistByName(name);
      const artist = data.results.artistmatches.artist[0];

      const fullInfoArtist = (await lastFmApi.getArtistInfo(artist.name))
        .artist;
      console.log({ artist });
      const topAlbums = await lastFmApi.getTopAlbums(artist.name);

      const allAlbumsInfo = await Promise.all(
        (topAlbums.topalbums ?? { album: [] }).album.map((albm) =>
          lastFmApi.getAlbumInfo(artist.name, albm.name)
        )
      );
      // console.log(
      //   "al",
      //   artist.mbid,
      //   topAlbums.topalbums.album[0].name,
      //   allAlbumsInfo
      // );
      const full = {
        name: fullInfoArtist.name,
        mbid: fullInfoArtist.mbid,
        bio: fullInfoArtist.bio.summary,
        tags: fullInfoArtist.tags,
        albums: allAlbumsInfo.map(({ album }) => ({
          ...album,
          wiki: {
            published: album?.wiki?.published,
            summary: album?.wiki?.summary,
          },
        })),
      };

      const filePath =
        process.cwd() + "/src/music/" + `${fullInfoArtist.name}.json`;

      await fs.writeFile(filePath, JSON.stringify(full));
      console.log("WRITE DONE");
      // fs.writeFileSync(filePath, JSON.stringify(full));
    } catch (e) {
      console.log(e);
    }
  };

  const artists = [
    // "Pink Floyd",
    // "Metallica",
    // "Red Hot Chili Peppers",
    // "Bicep",
    // "Ocean Jet",
    // "Shortparis",
    // "Rapossa",
    // "SKYND",
    // "Nothing But Thieves",
    // "Rainbow",
    // "Polyphia",
    // "Shinedown",
    // "nobody.one",
    // "System of A Down",
    // "Nirvana",
    // "Луна",
    // "Welshly Arms",
    // "Disturbed",
    // "Linkin Park",
  ];

  for await (let artist of artists) {
    await loadMusicData(artist);
  }
  //
}, 100);
