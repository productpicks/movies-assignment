import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is not valid"),
  password: z.string().min(1, "Password is required"),
});
export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email")
      .refine(
        (value) => /^[^@]*[a-zA-Z][^@]*@/.test(value), // Regex to ensure at least one letter before @
        {
          message: "Email must contain at least one alphabet",
        }
      ),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)<>\~\-\+\/\?\. , _])(?=.{8,})/,
        "Must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
      ),

    confirm_password: z.string().nonempty("Confirm password is required"),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "New password and confirm password must match",
  });

export const changePasswordSchema = z
  .object({
    currentpassword: z.string().min(1, "Current password is required"),
    newpassword: z
      .string()
      .nonempty("New password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\\(\)<>\~\-\+\/\?\. , _])(?=.{8,})/,
        "Must contain at least 8 characters, one uppercase, one lowercase, one number, and one special case character"
      ),
    confirmnewpassword: z
      .string()
      .nonempty("Confirm password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\\(\)<>\~\-\+\/\?\. , _])(?=.{8,})/,
        "Must contain at least 8 characters, one uppercase, one lowercase, one number, and one special case character"
      ),
  })
  .refine((data) => data.newpassword === data.confirmnewpassword, {
    path: ["confirmnewpassword"],
    message: "New password and confirm password must match",
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .refine(
      (value) => /^[^@]*[a-zA-Z][^@]*@/.test(value), // Regex to ensure at least one letter before @
      {
        message: "Enter a valid email",
      }
    ),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("New password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)<>\~\-\+\/\?\. , _])(?=.{8,})/,
        "Must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
      ),
    confirm_password: z.string().min(1, "Confirm new password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export const kycVerificationSchema = z.object({
  // add a schema for country, document Type, pdfFront, pdfBack
  documentType: z.string().nonempty({ message: "Please select documentType" }),
  documentFrontURL: z.string().nonempty({ message: "Upload a Front Document" }),
  documentBackURL: z.string().nonempty({ message: "Upload a Back Document" }),
});
