"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Checkbox } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signupSchema } from "@/src/utils/schema/authSchema";
import RGMInput from "../../commonComponents/Input/RGMInput";
import { signupWithEmail } from "@/src/utils/services/service";
import RGMButton from "../../commonComponents/Button/RGMButton";

function Signup() {
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
      confirm_password: "",
      termsAccepted: false,
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    setButtonSpinner(true);

    const response = await signupWithEmail(data);
    if (response) {
      setButtonSpinner(false);
      localStorage.setItem("email", data.email);
      toast.error(`${response.message}`);
      router.push(`/login`);
    } else {
      setButtonSpinner(false);
      toast.error(`${response.msg}`);
    }
  };
  return (
    <div className="w-[100%] bg-background h-[100vh] font-poppins">
      <div className="flex md:w-[100%] w-full flex-col h-full justify-center items-center px-[8px] sml:px-[25px]">
        <div className="w-[320px] h-full mt-4 lgl:mt-12">
          <h2 className="font-[500] text-[32px] font-poppins">
            Create an account
          </h2>
          <h4 className="w-[90%] font-manrope text-[16px] font-[500]">
            Fill your email address and password to sign up your account.
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mt-[16px] lgl:mt-[37px]">
              <div className="flex flex-col gap-y-[12px] mdl:gap-y-[32px]">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <RGMInput
                      {...field}
                      type="text"
                      placeholder="Email Address"
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
                      placeholder="Enter your Password"
                      classname="h-[56px] auth-input"
                      errorMsg={errors.password?.message}
                      showEye
                      borderColor="#FFFEFC"
                    />
                  )}
                />
                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <RGMInput
                      {...field}
                      type="password"
                      placeholder="Enter Confirm Password"
                      classname="h-[56px] auth-input"
                      errorMsg={errors.confirm_password?.message}
                      showEye
                      borderColor="#FFFEFC"
                    />
                  )}
                />
              </div>
              <div className="flex">
                <Controller
                  name="termsAccepted"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      isSelected={field.value}
                      onChange={field.onChange}
                      radius="sm"
                      className="font-poppins mt-2"
                    />
                  )}
                />
                <div className="text-[13px] leading-[16px] pt-4 lgl:pt-8">
                  By creating an account you accept our{" "}
                  <Link
                    className="text-[#4D8C9C] font-[500] underline"
                    href={"#"}
                  >
                    terms & conditions
                  </Link>{" "}
                  and our
                  <Link
                    className="text-[#4D8C9C] font-[500] underline"
                    href={"#"}
                  >
                    {" "}
                    privacy policies.
                  </Link>
                </div>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.termsAccepted.message}
                </p>
              )}
            </div>
            <div className="mb-2 mdl:mb-4">
              <RGMButton
                btnType="submit"
                btnText="Sign Up"
                classnames="w-full bg-secondary text-white h-[50px] font-[500] text-[16px] mt-4 lgl:mt-8"
                isLoading={buttonSpinner}
              />
            </div>
            <div className="text-[16px] mt-[20px] pb-4 lgl:mt-[34px] mb-1 lgl:mb-12 text-center font-[500] font-poppins">
              Already you have an account?
              <Link className="text-[#4D8C9C]" href={"/login"}>
                {" "}
                Login{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
