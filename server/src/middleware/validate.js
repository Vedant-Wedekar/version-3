import { ApiError } from "../utils/ApiError.js";

// Validates req.body against a Zod schema. Returns 400 with details on failure.
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const issues = result.error.issues.map((i) => ({
      path: i.path.join("."),
      message: i.message,
    }));
    return next(new ApiError(400, `Validation failed: ${JSON.stringify(issues)}`));
  }
  req.body = result.data; // sanitized + parsed
  next();
};