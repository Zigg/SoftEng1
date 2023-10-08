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
      email: "",
      username: "",
      password: "",
    },
  });

  // const sleep = (ms: number): Promise<void> => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "Register") {
      axios
        .post("/api/users/register", data)
        .then(() => {
          toast.success("Successfully Registered!");
          return signIn("credentials", data);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;

            if (
              errorMessage &&
              errorMessage.includes("Username already exists")
            ) {
              toast.error("Username already exists");
            } else if (
              errorMessage &&
              errorMessage.includes("Email already exists")
            ) {
              toast.error("Email already exists");
            }
          } else {
            toast.error("Something went wrong!");
          }
        })
        .finally(() => setIsLoading(false));
    }

    // FIXME: Properly implement the sign-in api route
    if (variant === "Login") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          // TODO: <Placeholder> for now | This will be where the user will be redirected after successful login
          if (callback?.ok) {
            router.push("/users");
          }
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            toast.error("Something went wrong!");
          }
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
