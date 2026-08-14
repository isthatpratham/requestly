import { ApiItem } from "@/types/api";

export interface MockRequestSample {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  category: string;
  status: number;
  statusText: string;
  responseTime: number;
  headers: Record<string, string>;
  requestBody?: string;
  responseBody: object;
  codeSnippets: {
    curl: string;
    javascript: string;
    python: string;
  };
}

export const MOCK_CATALOG_APIS: ApiItem[] = [
  {
    id: "open-meteo",
    name: "Open-Meteo Weather API",
    description: "Free weather forecast API for non-commercial use with high-resolution models.",
    url: "https://api.open-meteo.com/v1/forecast",
    category: "Weather",
    auth: null,
    https: true,
    cors: "yes",
  },
  {
    id: "github-users",
    name: "GitHub REST API",
    description: "Inspect public GitHub user profiles, repositories, organizations, and commits.",
    url: "https://api.github.com/users/octocat",
    category: "Development",
    auth: null,
    https: true,
    cors: "yes",
  },
  {
    id: "coingecko",
    name: "CoinGecko Crypto Data",
    description: "Live cryptocurrency prices, market cap, volume, historical charts, and exchange rates.",
    url: "https://api.coingecko.com/api/v3/simple/price",
    category: "Finance",
    auth: null,
    https: true,
    cors: "yes",
  },
  {
    id: "jsonplaceholder",
    name: "JSONPlaceholder",
    description: "Free fake REST API for testing and prototyping frontend applications.",
    url: "https://jsonplaceholder.typicode.com/posts",
    category: "Development",
    auth: null,
    https: true,
    cors: "yes",
  },
  {
    id: "pokeapi",
    name: "PokéAPI",
    description: "RESTful Pokémon database covering species, moves, abilities, and sprites.",
    url: "https://pokeapi.co/api/v2/pokemon/ditto",
    category: "Games",
    auth: null,
    https: true,
    cors: "yes",
  },
];

export const MOCK_REQUEST_SAMPLES: Record<string, MockRequestSample> = {
  "open-meteo": {
    method: "GET",
    url: "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true",
    category: "Weather",
    status: 200,
    statusText: "OK",
    responseTime: 142,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "max-age=60",
    },
    responseBody: {
      latitude: 52.52,
      longitude: 13.415,
      generationtime_ms: 0.124,
      utc_offset_seconds: 0,
      timezone: "GMT",
      timezone_abbreviation: "GMT",
      elevation: 38.0,
      current_weather: {
        temperature: 18.5,
        windspeed: 12.4,
        winddirection: 210,
        weathercode: 1,
        is_day: 1,
        time: "2026-08-14T18:00",
      },
    },
    codeSnippets: {
      curl: `curl -X GET "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true" \\
  -H "Accept: application/json"`,
      javascript: `const response = await fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true"
);
const data = await response.json();
console.log(data);`,
      python: `import requests

url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true"
response = requests.get(url)
print(response.json())`,
    },
  },
  "github-users": {
    method: "GET",
    url: "https://api.github.com/users/octocat",
    category: "Development",
    status: 200,
    statusText: "OK",
    responseTime: 186,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-ratelimit-limit": "60",
      "x-ratelimit-remaining": "58",
    },
    responseBody: {
      login: "octocat",
      id: 583231,
      node_id: "MDQ6VXNlcjU4MzIzMQ==",
      avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
      name: "The Octocat",
      company: "@github",
      blog: "https://github.blog",
      location: "San Francisco",
      public_repos: 8,
      followers: 12840,
      following: 9,
    },
    codeSnippets: {
      curl: `curl -X GET "https://api.github.com/users/octocat" \\
  -H "Accept: application/vnd.github.v3+json"`,
      javascript: `const response = await fetch("https://api.github.com/users/octocat", {
  headers: { "Accept": "application/vnd.github.v3+json" }
});
const user = await response.json();
console.log(user);`,
      python: `import requests

url = "https://api.github.com/users/octocat"
headers = {"Accept": "application/vnd.github.v3+json"}
response = requests.get(url, headers=headers)
print(response.json())`,
    },
  },
  "jsonplaceholder": {
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/posts",
    category: "Development",
    status: 201,
    statusText: "Created",
    responseTime: 215,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "location": "https://jsonplaceholder.typicode.com/posts/101",
    },
    requestBody: JSON.stringify(
      {
        title: "Testing API with Requestly",
        body: "Restrained developer tool playground.",
        userId: 1,
      },
      null,
      2
    ),
    responseBody: {
      id: 101,
      title: "Testing API with Requestly",
      body: "Restrained developer tool playground.",
      userId: 1,
    },
    codeSnippets: {
      curl: `curl -X POST "https://jsonplaceholder.typicode.com/posts" \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Testing API with Requestly","body":"Restrained developer tool playground.","userId":1}'`,
      javascript: `const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Testing API with Requestly",
    body: "Restrained developer tool playground.",
    userId: 1
  })
});
const post = await response.json();
console.log(post);`,
      python: `import requests

url = "https://jsonplaceholder.typicode.com/posts"
payload = {
    "title": "Testing API with Requestly",
    "body": "Restrained developer tool playground.",
    "userId": 1
}
response = requests.post(url, json=payload)
print(response.json())`,
    },
  },
};
