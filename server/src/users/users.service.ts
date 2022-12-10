import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import pg, { Client } from "pg";
import * as fs from "fs";

const sql = fs.readFileSync("db.sql").toString();

// console.log(sql);

@Injectable()
export class UsersService {
  constructor(@InjectClient() private readonly pg: Client) {
    pg.query(sql, function (err, result) {
      if (err) {
        console.log("error: s:", err);
        process.exit(1);
      }
    });
    pg.query("select * from RecordLabel").then((d) => {
      console.log(d);
    });
  }

  public async findAll(): Promise<any> {
    const users = await this.pg.query("SELECT * FROM users");
    return users.rows;
  }
}
