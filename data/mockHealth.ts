import { HealthCheckResult } from "@/types/api";

export const MOCK_HEALTH_DATA: Record<string, HealthCheckResult> = {
  "open-meteo": {
    status: "operational",
    statusCode: 200,
    responseTime: 142,
    checkedAt: "2026-08-14T23:10:00.000Z",
  },
  "github-users": {
    status: "operational",
    statusCode: 200,
    responseTime: 186,
    checkedAt: "2026-08-14T23:12:00.000Z",
  },
  "coingecko": {
    status: "operational",
    statusCode: 200,
    responseTime: 210,
    checkedAt: "2026-08-14T23:14:00.000Z",
  },
  jsonplaceholder: {
    status: "operational",
    statusCode: 200,
    responseTime: 165,
    checkedAt: "2026-08-14T23:15:00.000Z",
  },
  pokeapi: {
    status: "operational",
    statusCode: 200,
    responseTime: 240,
    checkedAt: "2026-08-14T23:08:00.000Z",
  },
  "shodan-io": {
    status: "error",
    statusCode: 401,
    responseTime: 195,
    checkedAt: "2026-08-14T23:05:00.000Z",
    error: {
      type: "AUTHENTICATION_REQUIRED",
      message: "Target API returned HTTP 401 Unauthorized (API Key required).",
    },
  },
  "nasa-api": {
    status: "operational",
    statusCode: 200,
    responseTime: 310,
    checkedAt: "2026-08-14T23:00:00.000Z",
  },
  "huggingface-inference": {
    status: "operational",
    statusCode: 200,
    responseTime: 420,
    checkedAt: "2026-08-14T22:55:00.000Z",
  },
  "world-bank-data": {
    status: "operational",
    statusCode: 200,
    responseTime: 280,
    checkedAt: "2026-08-14T22:50:00.000Z",
  },
  "open-flight-radar": {
    status: "operational",
    statusCode: 200,
    responseTime: 198,
    checkedAt: "2026-08-14T22:45:00.000Z",
  },
  haveibeenpwned: {
    status: "error",
    statusCode: 401,
    responseTime: 210,
    checkedAt: "2026-08-14T22:40:00.000Z",
    error: {
      type: "API_KEY_REQUIRED",
      message: "Requires subscription API key header hibp-api-key.",
    },
  },
  "frankfurter-rates": {
    status: "operational",
    statusCode: 200,
    responseTime: 155,
    checkedAt: "2026-08-14T22:35:00.000Z",
  },
  "rest-countries": {
    status: "operational",
    statusCode: 200,
    responseTime: 175,
    checkedAt: "2026-08-14T22:30:00.000Z",
  },
  "httbin-org": {
    status: "operational",
    statusCode: 200,
    responseTime: 130,
    checkedAt: "2026-08-14T22:25:00.000Z",
  },
  "ip-api": {
    status: "unavailable",
    statusCode: null,
    responseTime: null,
    checkedAt: "2026-08-14T22:20:00.000Z",
    error: {
      type: "CONNECTION_FAILED",
      message: "Target server refused connection or DNS resolution failed.",
    },
  },
  "national-weather-service": {
    status: "operational",
    statusCode: 200,
    responseTime: 290,
    checkedAt: "2026-08-14T22:15:00.000Z",
  },
  "rawg-video-games": {
    status: "operational",
    statusCode: 200,
    responseTime: 260,
    checkedAt: "2026-08-14T22:10:00.000Z",
  },
  "arxiv-search": {
    status: "timeout",
    statusCode: null,
    responseTime: null,
    checkedAt: "2026-08-14T22:05:00.000Z",
    error: {
      type: "REQUEST_TIMEOUT",
      message: "Target API did not respond within the 5.0 second timeout limit.",
    },
  },
  "openai-v1": {
    status: "error",
    statusCode: 401,
    responseTime: 180,
    checkedAt: "2026-08-14T22:00:00.000Z",
    error: {
      type: "AUTHENTICATION_REQUIRED",
      message: "Requires Authorization: Bearer <token>.",
    },
  },
  "stripe-api": {
    status: "error",
    statusCode: 401,
    responseTime: 160,
    checkedAt: "2026-08-14T21:55:00.000Z",
    error: {
      type: "AUTHENTICATION_REQUIRED",
      message: "Requires secret key authentication.",
    },
  },
  abuseipdb: {
    status: "operational",
    statusCode: 200,
    responseTime: 230,
    checkedAt: "2026-08-14T21:50:00.000Z",
  },
  "public-transit-amtrak": {
    status: "operational",
    statusCode: 200,
    responseTime: 190,
    checkedAt: "2026-08-14T21:45:00.000Z",
  },
};

export const DEFAULT_HEALTH_RECORD: HealthCheckResult = {
  status: "operational",
  statusCode: 200,
  responseTime: 180,
  checkedAt: new Date().toISOString(),
};

export function getMockHealth(apiId: string): HealthCheckResult {
  return MOCK_HEALTH_DATA[apiId] || DEFAULT_HEALTH_RECORD;
}
