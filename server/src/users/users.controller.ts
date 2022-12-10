import { UsersService } from "./users.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";

import * as fs from "fs/promises";
import { randomUUID } from "crypto";

const cache = {};

@Controller("songs")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/search-music")
  public async searchMusic() {}

  @Get("artist/:id")
  async getArtist() {
    console.log(";;", cache["Pink Floyd"]);
    return Promise.resolve({
      ...cache["Pink Floyd"],
      albums: cache["Pink Floyd"].albums.map((al) => ({
        ...al,
        image: al.image.find((img) => img.size === "large").text,
      })),
    });
  }

  @Get()
  async findAll(): Promise<any[]> {
    const filePath = process.cwd() + "/src/music";

    const prepare = (data: any) => {
      let temp = [];

      return data.albums.flatMap((alb) =>
        alb.tracks.track.map((t) => ({
          ...t,
          image: alb.image.find((img) => img.size === "mega")["text"],
          id: randomUUID(),
        }))
      );
    };
    try {
      if (cache["Pink Floyd"]) {
        const data = prepare(cache["Pink Floyd"]);
        return Promise.resolve(data);
      }

      const files = await fs.readdir(filePath);
      const filesData = await Promise.all(
        files.map((f) => fs.readFile(filePath + "/" + f))
      );
      const data = await Promise.all(
        filesData.map((d) => JSON.parse(d as any))
      );
      data.forEach((artist) => {
        cache[artist.name] = artist;
      });

      return Promise.resolve(prepare(cache["Pink Floyd"]));
    } catch (err) {
      console.log(err);
    }

    return Promise.resolve([]);
  }
}
