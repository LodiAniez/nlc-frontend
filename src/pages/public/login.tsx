import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Input from "@components/input";
import Button from "@components/button";
import { Endpoints, defaultHeaders } from "@constants/api";
import { Routes } from "@constants/pages";
import { catchError } from "@utils/methods";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: LoginRequest) => {
    try {
      const request = await fetch(Endpoints.Auth.Login, {
        method: "POST",
        credentials: "include",
        headers: defaultHeaders,
        body: JSON.stringify(data),
      });

      const json: LoginResponse = await request.json();
      localStorage.setItem("accessToken", json.accessToken);

      navigate(Routes.PROJECTS);
    } catch (e) {
      const err = catchError(e);
      alert(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-6">Login</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input name="email" label="Email" type="email" />
            <Input name="password" label="Password" type="password" />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
