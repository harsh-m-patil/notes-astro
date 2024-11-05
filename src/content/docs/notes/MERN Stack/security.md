---
title: Secure your express app
description: Ways to secure your express app from common attacks
---

### 1. Rate Limiting

To prevent abuse and limit the number of requests a client can make to the server within a specified time window.

```js
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  max: 100, // Maximum number of requests allowed per IP within the window
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  message: "Too many requests from this IP, please try again in an hour.", // Custom error message sent when limit is exceeded
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers (deprecated)
});

app.use("/api", limiter); // Apply rate limiting to all `/api` routes
```

### 2. Limit Body Payload Size

To prevent large payload attacks, limit the size of incoming JSON request bodies.

```js
const express = require("express");

app.use(
  express.json({
    limit: "10kb", // Restrict JSON payload to 10 KB
  }),
);
```

### 3. Cross-Site Scripting (XSS) Protection

Prevent XSS attacks by sanitizing user input and removing any harmful HTML.

```js
const xss = require("xss-clean");

app.use(xss()); // Clean user input in all requests
```

### 4. Secure HTTP Headers

Use `helmet` to set various HTTP headers that enhance security, like `Content-Security-Policy`, `X-Frame-Options`, and more.

```js
const helmet = require("helmet");

app.use(helmet()); // Apply secure headers to all routes
```

### 5. NoSQL Injection Protection

Use `mongoSanitize` to remove `$` and `.` operators in query inputs, preventing NoSQL injection attacks in MongoDB.

```js
const mongoSanitize = require("express-mongo-sanitize");

app.use(mongoSanitize()); // Sanitize data to prevent NoSQL injection
```

### 6. HTTP Parameter Pollution (HPP) Prevention

Prevent parameter pollution by only allowing listed parameters to be repeated in the query string.

```js
const hpp = require("hpp");

app.use(
  hpp({
    whitelist: ["duration", "price"], // Allow these query parameters to be duplicated
  }),
);
```
