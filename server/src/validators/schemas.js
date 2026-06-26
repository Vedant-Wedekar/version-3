import { z } from "zod";

// Inquiry from contact form (public, no auth required)
export const inquirySchema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is too short").max(20),
  travelers: z.string().max(10).optional().default("2"),
  travelDate: z.string().max(20).optional().default(""),
  interest: z.string().max(40).optional().default("Custom"),
  message: z.string().max(2000).optional().default(""),
});

// User profile created after signup
export const createUserSchema = z.object({
  name: z.string().min(1).max(80).optional().default(""),
});