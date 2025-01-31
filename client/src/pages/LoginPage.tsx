import { useState } from "react";
import {
  Button,
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Space,
  Alert,
  Box,
} from "@mantine/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";

// Initial Form Values
const initialValues = {
  email: "",
  password: "",
};

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, e) => {
      // Mock authentication (you can replace it with a real API call)

      // Store user authentication status (localStorage or context)
      if (
        values.email === "admin@example.com" &&
        values.password === "password123"
      ) {
        // Replace with actual authentication logic
        await login({ id: values.email, email: values.email, role: "admin" });
      }
      if (
        values.email === "merchant@example.com" &&
        values.password === "password123"
      ) {
        // Replace with actual authentication logic
        await login({
          id: values.email,
          email: values.email,
          role: "merchant",
        });
      } else {
        setError("Invalid email or password");
      }
    },
  });

  return (
    <Container size="xs" mt="xl">
      <Paper p="xl" shadow="xs" withBorder>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Title order={3}>Admin Login</Title>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && formik.errors.email}
            required
          />
          <Space h="md" />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && formik.errors.password}
            required
          />
          <Space h="md" />
          {error && (
            <Alert color="red" mb={10}>
              {error}
            </Alert>
          )}
          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
