---
title: URL Shortener Guide
description: A guide explaining how does a url shortener work
---

### What are URL Shorteners

> URL shorteners are services that convert long URLs into shorter, more
> manageable links. They are used to turn a long URL into a much shorter one.
> This shorter URL is easier to share, manage, and remember.

### How do URL Shorteners work

1. Take a long URL
2. Generate a unique short URL
3. Store the short URL and the long URL in a database
4. When a user clicks on the short URL, the service redirects the user to the
   long URL

#### Redirection Process

1. When a user clicks on the short URL, the url shortener server receives a
   request
2. Server uses the **unique** short URL to look up the corresponding long URL in
   the database
3. If the URL is found server sends an HTTP Response including a statuscode
   instructing the browser to redirect to the long URL

### Different types of URL Shorteners

1. **301 Redirects** : The most common type of redirect, a 301 HTTP response
   code tells the browser that the orignal URL has moved **permanently** to a
   new URL.

2. **302 Redirects** : A 302 HTTP response code tells the browser that the
   original URL has moved **temporarily** to a new URL.This type of redirection
   is useful when the content of webpage is expected to return to the original
   URL.

3. **307 Redirects** : The 307 HTTP response code is similar to the 302
   redirect. The difference is that it maintains the HTTP method and request
   body used in the original

4. **JavaScript Redirects** : JavaScript redirects are used to redirect users to
   a new page using JavaScript. This type of redirect is not recommended for SEO
   purposes.

### References

- [Everything you need to know about URL Shorteners](https://tinyurl.com/blog/everything-you-need-to-know-about-url-shorteners/)
