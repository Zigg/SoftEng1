"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

type Variant = "Login" | "Register";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("Login");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      // TODO: Once the user is logged in, redirect them to their user page, not working yet
      router.push("/");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "Login") {
      setVariant("Register");
    } else {
      setVariant("Login");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "Register") {
      axios
        .post("/api/users/register", data)
        // FIXME:After registering the toast disappears too quickly
        .then(() => toast.success("Successfully Registered!"))
        // TODO: Just a hotfix, try to make the toast persist using states i guess?
        .then(() => sleep(2000))
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went Wrong!"))
        .finally(() => setIsLoading(false));
    }
    // TODO: Properly implement the sign-in api route
    if (variant === "Login") {
      axios
        .post("/api/users/login", data)
        .then((response) => {
          if (response.data.status === 401) {
            toast.error("Invalid credentials!");
          } else if (response.data.status === 404) {
            toast.error("User not found!");
          } else if (response.data.status === 200) {
            router.push("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => setIsLoading(false));
    }
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
          bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
          "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "Register" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="username"
              label="Username"
            />
          )}

          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          {/* Add check for if password is !== to confirm pass vice-versa */}
          {/* {variant === "Register" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="confirm-password"
              label="Confirm Password"
              type="password"
            />
          )} */}

          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "Login" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-4">
          <div className="relative">
            <div
              className="
                  absolute 
                  inset-0 
                  flex 
                  items-center"
            >
              <div className="w-full border-gray-300" />
            </div>
          </div>
        </div>
        <div
          className="
              flex 
              gap-2 
              justify-center 
              text-sm 
              mt-6 
              px-2 
              text-gray-500
            "
        >
          <div className="text-black">
            {variant === "Login"
              ? "New to Ordering System?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "Login" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
