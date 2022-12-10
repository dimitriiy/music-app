class HttpClientClass {
  public post(url: string, body = {}) {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok || response.status >= 400) {
          throw new Error(response.statusText);
        }
        return response.json();
      })

      .catch((e) => {
        throw new Error(e);
      });
  }

  public get(url: string) {
    return fetch(url)
      .then((response) => {
        if (!response.ok || response.status >= 400) {
          throw new Error(response.statusText);
        }
        return response.json();
      })

      .catch((e) => {
        throw new Error(e);
      });
  }
}

export const HttpClient = new HttpClientClass();
