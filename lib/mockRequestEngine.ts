import {
  ApiRequestState,
  ApiResponseWrapper,
  ApiResponseData,
} from "@/types/api";

export async function executeMockRequest(
  req: ApiRequestState
): Promise<ApiResponseWrapper> {
  const startTime = Date.now();

  // 1. Validate URL presence
  if (!req.url || req.url.trim() === "") {
    return {
      success: false,
      error: {
        code: "INVALID_URL",
        message: "Please enter an API URL before sending a request.",
      },
    };
  }

  // 2. Validate URL syntax
  let parsedUrl: URL;
  try {
    const targetUrl = req.url.startsWith("http://") || req.url.startsWith("https://")
      ? req.url
      : `https://${req.url}`;
    parsedUrl = new URL(targetUrl);
  } catch {
    return {
      success: false,
      error: {
        code: "INVALID_URL",
        message: `Invalid URL format: "${req.url}". Must be a valid HTTP or HTTPS URL.`,
      },
    };
  }

  // 3. Validate Request Body if present for POST/PUT/PATCH
  let parsedBody: unknown = null;
  if (["POST", "PUT", "PATCH"].includes(req.method) && req.body.trim() !== "") {
    try {
      parsedBody = JSON.parse(req.body);
    } catch {
      return {
        success: false,
        error: {
          code: "INVALID_BODY",
          message: "Malformed JSON request body. Please fix syntax errors before sending.",
        },
      };
    }
  }

  // Simulate realistic network latency (120ms - 280ms)
  await new Promise((resolve) => setTimeout(resolve, 300));
  const latency = Date.now() - startTime;

  const urlPath = parsedUrl.pathname.toLowerCase();
  const fullUrl = parsedUrl.toString();

  // Compile active headers map
  const responseHeaders: Record<string, string> = {
    "content-type": "application/json; charset=utf-8",
    "x-requestly-mock": "true",
    "x-response-time": `${latency}ms`,
    "cache-control": "no-cache, no-store, must-revalidate",
  };

  // Compile query params received
  const activeQueryParams: Record<string, string> = {};
  req.query.filter((q) => q.enabled && q.key.trim()).forEach((q) => {
    activeQueryParams[q.key.trim()] = q.value;
  });

  // 4. Mock Routing Logic based on URL pattern or Catalog ID match

  // Case A: Mock Timeout (arxiv-search)
  if (fullUrl.includes("arxiv.org") || req.url.includes("arxiv-search")) {
    return {
      success: false,
      error: {
        code: "REQUEST_TIMEOUT",
        message: "The target API did not respond within the 5.0 second timeout limit.",
      },
    };
  }

  // Case B: Connection Failed (ip-api)
  if (fullUrl.includes("ip-api.com") || req.url.includes("ip-api")) {
    return {
      success: false,
      error: {
        code: "CONNECTION_FAILED",
        message: "Failed to establish TCP connection with target host ip-api.com:80.",
      },
    };
  }

  // Case C: Auth Required APIs (shodan, openai, stripe) without credentials
  const requiresAuth =
    fullUrl.includes("shodan.io") ||
    fullUrl.includes("openai.com") ||
    fullUrl.includes("stripe.com") ||
    fullUrl.includes("haveibeenpwned.com");

  const hasAuthToken =
    req.auth.type !== "none" &&
    ((req.auth.type === "apiKey" && req.auth.apiKey?.value.trim()) ||
      (req.auth.type === "bearer" && req.auth.bearer?.token.trim()) ||
      (req.auth.type === "basic" && req.auth.basic?.username.trim()));

  if (requiresAuth && !hasAuthToken) {
    const errorResponseBody = {
      error: {
        message: "You must provide a valid API key or Bearer token to access this endpoint.",
        type: "invalid_request_error",
        param: null,
        code: "unauthorized",
      },
    };

    return {
      success: true,
      data: {
        status: 401,
        statusText: "Unauthorized",
        responseTime: latency,
        headers: responseHeaders,
        body: errorResponseBody,
        rawBody: JSON.stringify(errorResponseBody, null, 2),
        contentType: "application/json",
      },
    };
  }

  // Case D: Open-Meteo Weather API
  if (fullUrl.includes("open-meteo.com") || req.url.includes("open-meteo")) {
    const weatherData = {
      latitude: 52.52,
      longitude: 13.419998,
      generationtime_ms: 0.12,
      utc_offset_seconds: 0,
      timezone: "GMT",
      timezone_abbreviation: "GMT",
      elevation: 38.0,
      current_weather: {
        temperature: 18.4,
        windspeed: 12.1,
        winddirection: 210,
        weathercode: 3,
        is_day: 1,
        time: "2026-08-14T23:00",
      },
      hourly_units: {
        time: "iso8601",
        temperature_2m: "°C",
        relative_humidity_2m: "%",
      },
    };

    return {
      success: true,
      data: {
        status: 200,
        statusText: "OK",
        responseTime: latency,
        headers: responseHeaders,
        body: weatherData,
        rawBody: JSON.stringify(weatherData, null, 2),
        contentType: "application/json",
      },
    };
  }

  // Case E: GitHub REST API
  if (fullUrl.includes("github.com") || req.url.includes("github")) {
    const githubData = {
      login: "octocat",
      id: 583231,
      node_id: "MDQ6VXNlcjU4MzIzMQ==",
      avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
      html_url: "https://github.com/octocat",
      type: "User",
      site_admin: false,
      name: "The Octocat",
      company: "@github",
      location: "San Francisco",
      public_repos: 8,
      public_gists: 8,
      followers: 12490,
      following: 9,
      created_at: "2011-01-25T18:44:36Z",
    };

    return {
      success: true,
      data: {
        status: 200,
        statusText: "OK",
        responseTime: latency,
        headers: responseHeaders,
        body: githubData,
        rawBody: JSON.stringify(githubData, null, 2),
        contentType: "application/json",
      },
    };
  }

  // Case F: JSONPlaceholder
  if (fullUrl.includes("typicode.com") || req.url.includes("jsonplaceholder")) {
    if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
      const createdPost = {
        id: 101,
        title: (parsedBody as { title?: string })?.title || "Requestly Post",
        body: (parsedBody as { body?: string })?.body || "Tested via Requestly API Playground",
        userId: (parsedBody as { userId?: number })?.userId || 1,
      };

      return {
        success: true,
        data: {
          status: 201,
          statusText: "Created",
          responseTime: latency,
          headers: responseHeaders,
          body: createdPost,
          rawBody: JSON.stringify(createdPost, null, 2),
          contentType: "application/json",
        },
      };
    }

    const postsData = [
      { id: 1, title: "sunt aut facere repellat provident", userId: 1 },
      { id: 2, title: "qui est esse", userId: 1 },
      { id: 3, title: "ea molestias quasi exercitationem", userId: 1 },
    ];

    return {
      success: true,
      data: {
        status: 200,
        statusText: "OK",
        responseTime: latency,
        headers: responseHeaders,
        body: postsData,
        rawBody: JSON.stringify(postsData, null, 2),
        contentType: "application/json",
      },
    };
  }

  // Case G: Default Arbitrary URL Response Engine
  if (req.method === "DELETE") {
    const deleteResp = {
      success: true,
      message: "Resource deleted successfully",
      targetUrl: fullUrl,
      timestamp: new Date().toISOString(),
    };

    return {
      success: true,
      data: {
        status: 200,
        statusText: "OK",
        responseTime: latency,
        headers: responseHeaders,
        body: deleteResp,
        rawBody: JSON.stringify(deleteResp, null, 2),
        contentType: "application/json",
      },
    };
  }

  const genericResponseData = {
    status: "success",
    message: "Requestly mock execution completed successfully",
    request: {
      method: req.method,
      url: fullUrl,
      host: parsedUrl.host,
      pathname: urlPath,
      queryParams: activeQueryParams,
      authType: req.auth.type,
    },
    receivedBody: parsedBody,
    timestamp: new Date().toISOString(),
  };

  return {
    success: true,
    data: {
      status: req.method === "POST" ? 201 : 200,
      statusText: req.method === "POST" ? "Created" : "OK",
      responseTime: latency,
      headers: responseHeaders,
      body: genericResponseData,
      rawBody: JSON.stringify(genericResponseData, null, 2),
      contentType: "application/json",
    },
  };
}
