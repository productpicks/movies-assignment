"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllMovies } from "@/src/utils/services/service";
import { LoadingCircle } from "@/src/utils/icons/icons";
import RGMButton from "../../commonComponents/Button/RGMButton";
import ManageStorage from "@/src/utils/services/cookiesStorage";
import Image from "next/image";
import { Pagination, Button } from "@nextui-org/react";

export default function MyMovies() {
  const [allMoviesData, setAllMoviesData] = useState<object[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4;

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleAllMovies = async () => {
    const response = await getAllMovies();
    if (response.data) {
      setAllMoviesData(response.data);
      setLoading(false);
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleLogout = () => {
    ManageStorage.removeItem("access_token");
    router.push("/login");
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = allMoviesData.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(allMoviesData.length / moviesPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    handleAllMovies();
  }, []);
  console.log("allMoviesData", allMoviesData);
  return (
    <div className={`flex justify-center  w-full h-full `}>
      {loading ? (
        <div className="flex items-center">
          <LoadingCircle />
        </div>
      ) : allMoviesData.length > 0 ? (
        <div className="mdl:px-8 px-0 w-full">
          <div className="mb-4 sml:flex-row flex-col">
            <div className="font-poppins font-[500] text-[24px] flex justify-between mb-4 sml:mb-24">
              My Movies
              <div
                className="flex items-center cursor-pointer"
                onClick={handleLogout}
              >
                {" "}
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-8">
              {currentMovies.map((item: any, index) => {
                return (
                  <div
                    key={index}
                    className="w-[282px] bg-[#092C39] p-2 rounded-lg mb-4 sml:mb-0"
                  >
                    <Image
                      src={`${item?.poster}`}
                      alt="Movies Image"
                      height={400}
                      width={282}
                    />
                    <div className="flex flex-col">
                      <span className="text-[20px] mt-4">{item.title}</span>
                      <span className="text-[14px] my-4">{item.year}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center mt-8 space-x-4">
              <Button
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
                className="bg-transparent text-[#fff] font-[600]"
              >
                Previous
              </Button>

              <Pagination
                total={Math.ceil(allMoviesData.length / moviesPerPage)}
                initialPage={1}
                page={currentPage}
                onChange={handlePageChange}
              />

              <Button
                disabled={
                  currentPage ===
                  Math.ceil(allMoviesData.length / moviesPerPage)
                }
                onClick={handleNextPage}
                className="bg-transparent text-[#fff] font-[600]"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center align-middle items-center">
          <div className="text-[48px] font-poppins font-[600] mb-4">
            Your movie list is empty
          </div>
          <RGMButton
            btnType="submit"
            btnText="Add a new movie"
            classnames="w-full bg-btnColor text-white h-[50px] font-[500] text-[16px] w-[186px]"
            onclick={() => router.push("/createnewmovie")}
          />
        </div>
      )}
    </div>
  );
}
