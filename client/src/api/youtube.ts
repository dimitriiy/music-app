import { HttpClient } from "./httpClient";

const KEY = "AIzaSyAJQ3-DwehM_OIEivp8yFe1ka2Ft8ItBW0";

console.log(
  new URLSearchParams([
    ["value", "1000"],
    ["v", "2"],
  ]).toString()
);

export const YoutubeApi = {
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
  },

  get: function (url: string, params: object) {
    const urlParams = new URLSearchParams(
      Object.entries({ ...this.params, ...params }) as any
    );

    return HttpClient.get(`${this.baseURL}${url}?${urlParams}`);
  },
};
