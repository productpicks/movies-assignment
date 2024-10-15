"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Checkbox } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "@/src/utils/schema/authSchema";
import RGMInput from "../../commonComponents/Input/RGMInput";
import { loginWithEmail } from "@/src/utils/services/service";
import RGMButton from "../../commonComponents/Button/RGMButton";
import ManageStorage from "@/src/utils/services/cookiesStorage";

function Login() {
  const [buttonSpinner, setButtonSpinner] = useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setButtonSpinner(true);

    const response = await loginWithEmail(data);
    if (response?.token) {
      ManageStorage.setItem("access_token", response.token);
      setButtonSpinner(false);
      toast.success(`Login successful`);
      router.push("/movies");
    } else {
      setButtonSpinner(false);
      toast.error(`${response.msg}`);
    }
  };

  return (
    <div className="w-[100%] bg-background h-[100vh] font-poppins">
      <div className="flex md:w-[100%] w-full flex-col h-full justify-center items-center px-[8px] sml:px-[25px]">
        <div className="w-[320px] h-full flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <h2 className="font-[500] text-[32px] font-poppins mb-2 text-center">
              Sign In
            </h2>
            <div className="flex flex-col mt-[24px] mdl:mt-[37px]">
              <div className="flex flex-col gap-y-[20px] mdl:gap-y-[32px]">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <RGMInput
                      {...field}
                      type="text"
                      placeholder="Email"
                      label="Email Address"
                      labelPlacement="outside"
                      classname="!h-[56px] auth-input"
                      errorMsg={errors.email?.message}
                      borderColor="#FFFEFC"
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <RGMInput
                      {...field}
                      type="password"
                      placeholder="Password"
                      classname="h-[56px] auth-input"
                      errorMsg={errors.password?.message}
                      showEye
                      borderColor="#FFFEFC"
                    />
                  )}
                />
              </div>
              <div className="flex justify-center items-center">
                <Checkbox radius="sm" className="py-8">
                  <span className="text-[#fff] text-[14px] font-poppins font-[400]">
                    Remember me
                  </span>
                </Checkbox>
              </div>
            </div>
            <div className="mb-4">
              <RGMButton
                btnType="submit"
                btnText="Sign In"
                classnames="w-full bg-btnColor text-white h-[50px] font-[500] text-[16px]"
                isLoading={buttonSpinner}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
