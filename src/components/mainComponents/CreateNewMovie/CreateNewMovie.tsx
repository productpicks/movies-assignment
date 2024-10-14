"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VesselDataInterface } from "@/src/interfaces";
import RGMInput from "../../commonComponents/Input/RGMInput";
import { movieSchema } from "@/src/utils/schema/movieSchema";
import RGMButton from "../../commonComponents/Button/RGMButton";
import { createMovie } from "@/src/utils/services/service";
interface ImageData {
  file: File;
  preview: string;
}

const CreateNewMovie = () => {
  const [buttonSpinner, setButtonSpinner] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<string>();
  const [fileEnter, setFileEnter] = useState(false);
  const params = useSearchParams();
  const [image, setImage] = useState<ImageData | null>(null);
  const [vesselData, setVesselData] = useState<VesselDataInterface>();
  const [previewImage, setPreviewImage] = useState();
  const router = useRouter();
  const vesselId = params?.get("id");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      year: "",
    },
    resolver: zodResolver(movieSchema),
  });

  const handleVesselDataByID = async (id: string) => {
    // const response = await getVesselById(id);
    const response = true;
    // setVesselData(response.data.results);
    // reset({
    //   title: response.data.results.name || "",
    //   year: response.data.results.imo.toString() || "",
    // });
    // setFile(response.data.results.image);
    // setImage(response.data.results.image);
    // setPreviewImage(response.data.results.image);
  };

  const onSubmit = async (data: any) => {
    setButtonSpinner(true);
    const formData = new FormData();
    if (data.title) {
      formData.append("title", data.title);
    }
    if (data.year) {
      formData.append("year", data.year);
    }
    if (image != previewImage) {
      formData.append("file", image?.file);
    }
    if (file == "") {
      formData.append("file", "none");
    }
    let response;
    const vesselId = params?.get("id");
    if (vesselId) {
      // response = await updateVessel(vesselId, formData);
    } else {
      response = await createMovie(formData);
    }

    if (response.success) {
      setButtonSpinner(false);
      toast.success(`Movie added successfully`);
      router.push("/movies");
    } else {
      setButtonSpinner(false);
      toast.error(`${response.message}`);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
  };
  const handleBackNavigation = () => {
    router.push("/movies");
  };

  useEffect(() => {
    if (selectedFile != null) handleUpload();
  }, [selectedFile]);

  useEffect(() => {
    const vesselId = params?.get("id");
    if (vesselId) {
      handleVesselDataByID(vesselId);
    }
  }, [params]);

  return (
    <div className="pb-4 px-0 sml:px-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-6 text-[#fff] mb-4 cursor-pointer"
        onClick={handleBackNavigation}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
      <div className="font-poppins text-[24px] text-[#fff] font-[500] mb-8">
        {vesselId ? "Edit Movie" : "Create a new movie"}{" "}
      </div>
      <div className="w-full h-full mt-4 mdl:mt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-[16px] mdl:mt-[37px] px-4 py-6">
            <div className="flex flex-col sml:flex-row">
              <div className="mt-8 w-[100%] sml:w-[40%]">
                {!file ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setFileEnter(true);
                    }}
                    onDragLeave={(e) => {
                      setFileEnter(false);
                    }}
                    onDragEnd={(e) => {
                      e.preventDefault();
                      setFileEnter(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setFileEnter(false);
                      let filesArray = [];
                      if (e.dataTransfer.items) {
                        for (let i = 0; i < e.dataTransfer.items.length; i++) {
                          const file = e.dataTransfer.items[i].getAsFile();
                          if (file) filesArray.push(file);
                        }
                      } else {
                        for (let i = 0; i < e.dataTransfer.files.length; i++) {
                          filesArray.push(e.dataTransfer.files[i]);
                        }
                      }

                      filesArray.forEach((file, i) => {
                        const blobUrl = URL.createObjectURL(file);
                        const preview = URL.createObjectURL(file);
                        setFile(blobUrl);
                        setSelectedFile(file);
                        setImage({ file, preview });
                      });
                    }}
                    className={`${
                      fileEnter ? "border-2" : "border-none"
                    } mx-auto  flex flex-col w-full h-64 sml:h-72 items-center justify-center`}
                  >
                    <label
                      htmlFor="file"
                      className="h-full flex flex-col justify-center w-full"
                    >
                      <div className="flex flex-col mt-[4px] mdl:mt-[37px] px-4 pb-6">
                        <>
                          <div className="bg-secondary h-[200px] sml:h-[400px] border border-dashed border-[#fff] rounded-md text-center flex flex-col items-center pt-8 pb-10 cursor-pointer">
                            <Image
                              src={"/gallery-add.svg"}
                              width={34}
                              height={34}
                              alt="Upload Icon"
                            />
                            <div className="text-[#fff] font-poppins font-[500] text-[13px] pt-2">
                              Drop an image here
                            </div>
                          </div>
                        </>
                      </div>
                    </label>
                    <input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        let files = e.target.files;
                        if (files && files[0]) {
                          let blobUrl = URL.createObjectURL(files[0]);
                          const file = files[0];
                          const preview = URL.createObjectURL(file);
                          setFile(blobUrl);
                          setSelectedFile(files[0]);
                          setImage({ file, preview });
                        }
                      }}
                      accept=".png, .jpg, .jpeg"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <object
                      className="rounded-md w-full h-72"
                      data={file}
                      type="image/png" //need to be updated based on type of file
                    />
                    <button
                      onClick={() => setFile("")}
                      className="px-4 mt-10 uppercase py-2 tracking-widest outline-none text-secondary border border-secondary rounded-md"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-x-[16px] mdl:gap-x-[32px] py-4 flex-col w-[100%] sml:w-[35%] pl-0 sml:pl-16 ">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <RGMInput
                      {...field}
                      type="text"
                      placeholder="Title*"
                      classname="h-[45px] w-full mb-4 sml:mb-0"
                      errorMsg={errors.title?.message}
                      borderColor="#D3E0E9"
                      textColor="#7d7d7f"
                      btnType={2}
                      mainWidth={"sml:w-[90%] mdl:w-[320px] mb-4"}
                    />
                  )}
                />
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <RGMInput
                      {...field}
                      type="number"
                      placeholder="Publishin year*"
                      classname="h-[45px] w-full"
                      errorMsg={errors.year?.message}
                      borderColor="#D3E0E9"
                      textColor="#7d7d7f"
                      btnType={2}
                      mainWidth={"sml:w-[65%] mdl:w-[320px]"}
                    />
                  )}
                />
                <div className="mb-2 mdl:mb-4 flex mt-8">
                  <RGMButton
                    btnType="submit"
                    btnText="Cancel"
                    classnames="w-[167px] border bg-transparent border-[#fff] text-white h-[50px] font-[500] text-[16px] mt-4 mr-4"
                    onclick={() => router.push("/movies")}
                  />
                  <RGMButton
                    btnType="submit"
                    btnText="Submit"
                    classnames="w-[167px] bg-btnColor text-white h-[50px] font-[500] text-[16px] mt-4"
                    isLoading={buttonSpinner}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewMovie;
