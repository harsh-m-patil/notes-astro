---
title: Mongoose Notes
description: notes for mongoose
---

> MongoDB Object Modeling for Node.js

---

### Introduction

To set up a MongoDB connection using Mongoose:

```js
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const User = mongoose.model("User", { name: String });

const rick = new User({ name: "Rick Astley" });
rick.save().then(() => console.log("Never Gonna Give You Up"));
```

### Defining a Schema

Schemas define the structure and data types of documents. You can also add
schema methods, statics, and virtuals.

```js
const { Schema } = require("mongoose");

const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: { votes: Number, favs: Number },
});

// Adding keys later
blogSchema.add({ views: Number });
```

### Schema Validation

Schemas support validation rules, such as required fields, length constraints,
and custom validators.

```js
const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  age: { type: Number, min: 18, max: 65 },
  bio: {
    type: String,
    match: /[a-z]/,
    validate: {
      validator: function (v) {
        return v.length > 10;
      },
      message: "Bio should be longer than 10 characters",
    },
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user", "moderator"],
      message: "{VALUE} is not supported",
    },
    default: "user",
  },
  date: { type: Date, default: Date.now },
  email: { type: String, required: [true, "Email is required"] },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
});
```

### Supported Schema Types

| Schema Type  | Description                           |
| ------------ | ------------------------------------- |
| `String`     | Text data                             |
| `Number`     | Numeric data                          |
| `Date`       | Date and time                         |
| `Buffer`     | Binary data                           |
| `Boolean`    | Boolean values                        |
| `Mixed`      | Flexible type (any data type)         |
| `ObjectId`   | References to other documents         |
| `Array`      | Array of any data type                |
| `Decimal128` | High-precision floating-point numbers |
| `Map`        | Key-value pairs, keys must be strings |
| `UUID`       | Universally unique identifiers        |

### Middleware

Middleware functions in Mongoose are executed during the document lifecycle,
like on save or query.

- **Pre and Post Middleware**: Useful for operations like hashing passwords
  before saving.

  ```js
  const schema = new Schema({ name: String });

  schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  });

  schema.post("save", function (doc) {
    console.log("post save middleware executed");
  });
  ```

- **Query Middleware**: Execute middleware on query actions, such as finding
  documents.

  ```js
  schema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    next();
  });
  ```

### Aggregation Pipeline

Use the aggregation pipeline for complex data transformations, filtering,
grouping, and statistics:

```js
db.products.aggregate([
  { $match: { category: "Electronics" } }, // Filter by category
  { $group: { _id: "$brand", totalSales: { $sum: "$sales" } } }, // Group by brand, calculate total sales
  { $sort: { totalSales: -1 } }, // Sort by total sales (desc)
  { $limit: 5 }, // Top 5 brands
]);
```

### Virtuals

Virtuals are fields you define that don’t get persisted to MongoDB. They can be
used to derive values, like a full name from first and last names.

```js
const userSchema = new Schema({
  firstName: String,
  lastName: String,
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
```

#### Virtual Populate

Virtual populates let you reference documents in other collections without
storing them as actual fields.

```js
const userSchema = new Schema({
  name: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

userSchema.virtual("postCount", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
  count: true, // Returns number of posts
});
```

### Indexing

Indexes optimize query performance. Adding indexes on frequently queried fields
can greatly speed up read operations.

```js
// Single-field index
schema.index({ name: 1 });

// Compound index
schema.index({ name: 1, age: -1 });

// Unique index
schema.index({ email: 1 }, { unique: true });

// Text index for full-text search
schema.index({ title: "text", body: "text" });

// Sparse index: includes documents only if the indexed field exists
schema.index({ date: 1 }, { sparse: true });

// Geospatial index: for location-based queries
locationSchema.index({ coordinates: "2dsphere" });
```
