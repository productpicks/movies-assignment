"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DatePicker } from "@nextui-org/react";
import VoyagesTable from "./VoyagesTable/VoyagesTable";
import { DateValue, CalendarDate } from "@nextui-org/react";
import RGMButton from "../../commonComponents/Button/RGMButton";
import VoyageDetailsModal from "../../Modals/VoyageDetailsModal";
import { getLocalTimeZone, today } from "@internationalized/date";
import { BackIcon, LoadingCircle } from "@/src/utils/icons/icons";
import { deleteVoyage, getAllVoyages } from "@/src/utils/services/service";

export default function Voyages() {
  const [allVesselsData, setAllVesselsData] = useState<object[]>([]);
  const [toDate, setToDate] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [fromDateRestrict, setFromDateRestrict] = useState<any | null>(null);
  const [viewModal, setViewModal] = useState<boolean | null>(null);
  const [voyageId, setVoyageId] = useState<string | null>(null);
  const [isFiltered, setIsFiltered] = useState(false); // To track if filters are applied
  const [isFromDateComplete, setIsFromDateComplete] = useState(true);
  const [isToDateComplete, setIsToDateComplete] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (
    value: DateValue | null,
    setDate: React.Dispatch<React.SetStateAction<string | null>>,
    setIsComplete: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!value) {
      setDate(null);
      setIsComplete(false);
      return;
    }
    let newDate: Date | null = null;
    if (value instanceof Date) {
      newDate = value;
    } else if ("toDate" in value) {
      newDate = (value as CalendarDate).toDate("UTC");
    }
    if (newDate) {
      const formattedDate = formatDate(newDate);
      setDate(formattedDate);
      setIsComplete(isValidDate(formattedDate));
    } else {
      setDate(null);
      setIsComplete(false);
    }
  };

  const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }
    return day > 0 && day <= monthLength[month - 1];
  };

  const handleNewVoyageNavigation = () => {
    router.push("/voyages/createnewvoyage");
  };

  const handleVesselDelete = async (id: number) => {
    const response = await deleteVoyage(id);
    if (response.status) {
      toast.success(`${response.msg}`);
      handleAllVoyages("");
    } else {
      toast.error(`${response.msg}`);
    }
  };

  const handleVesselUpdate = (id: number) => {
    router.push(`/voyages/createnewvoyage?id=${id}`);
  };

  const handleAllVoyages = async (data: string) => {
    const response = await getAllVoyages(data);
    if (response.data) {
      setAllVesselsData(response.data.results);
      setLoading(false);
    }
  };

  const handleBackNavigation = () => {
    setFromDate(null);
    setToDate(null);
    handleAllVoyages("");
    setIsFiltered(false); // Reset filter state
  };

  useEffect(() => {
    if (!isFromDateComplete || !isToDateComplete) return;
    const queryParams = new URLSearchParams();
    if (fromDate) {
      queryParams.append("fromDate", fromDate);
    }
    if (toDate) {
      queryParams.append("toDate", toDate);
    }
    const queryString = queryParams.toString();
    handleAllVoyages(queryString ? `?${queryString}` : "");
    setIsFiltered(!!fromDate || !!toDate); // Update the filter state
  }, [fromDate, toDate, isFromDateComplete, isToDateComplete]);

  return (
    <div
      className={`flex justify-center  w-full h-full ${
        !(allVesselsData.length > 0) && "items-center"
      }`}
    >
      <VoyageDetailsModal
        viewModal={viewModal}
        setViewModal={setViewModal}
        voyageId={voyageId}
      />
      {loading ? (
        <div className="flex items-center">
          <LoadingCircle />
        </div>
      ) : allVesselsData.length > 0 ? (
        <div className="mdl:px-8 px-0 w-full">
          <div className="flex justify-between items-center mb-4 sml:flex-row flex-col">
            <div className="font-poppins font-[500] text-[24px] text-main ">
              Voyage List
            </div>
            <div className="flex items-center sml:flex-row flex-col w-full sm:w-[auto] justify-end">
              <div className="flex w-full sm:w-[auto]">
                <div className="relative mr-3 sml:w-[auto] w-[49%]">
                  <DatePicker
                    onChange={(value) => {
                      handleDateChange(
                        value,
                        setFromDate,
                        setIsFromDateComplete
                      );
                      setFromDateRestrict(value);
                    }}
                    label="From"
                    classNames={{
                      base: "h-[44px] ",
                      inputWrapper: ["!border", "shadow-none", "mr-2"],
                    }}
                    variant="bordered"
                    maxValue={today(getLocalTimeZone())}
                  />
                </div>
                <div className="relative mr-0 sml:mr-3 sml:w-[auto] w-[49%]">
                  <DatePicker
                    onChange={(value) =>
                      handleDateChange(value, setToDate, setIsToDateComplete)
                    }
                    label="To"
                    classNames={{
                      base: "h-[44px] ",
                      inputWrapper: ["!border", "shadow-none", "mr-2"],
                    }}
                    variant="bordered"
                    maxValue={today(getLocalTimeZone())}
                    minValue={fromDateRestrict}
                  />
                </div>
              </div>
              <RGMButton
                btnText="Create New Voyage"
                classnames="w-full sml:w-[186px] bg-secondary text-white h-[44px] font-[500] text-[14px] mt-4 sml:mt-0"
                onclick={handleNewVoyageNavigation}
              />
            </div>
          </div>
          <VoyagesTable
            data={allVesselsData}
            handleVesselDelete={handleVesselDelete}
            handleVesselUpdate={handleVesselUpdate}
            setViewModal={setViewModal}
            setVoyageId={setVoyageId}
          />
        </div>
      ) : (
        <div className="w-full sml:w-[70%] text-center bg-[#fff] px-4 sml:px-16 py-10 rounded-md">
          {isFiltered ? (
            <>
              <BackIcon onclick={handleBackNavigation} />
              <div className="text-[#0E3337] text-[20px] font-poppins font-[500] pb-3">
                No Voyages Found for the Selected Date Range
              </div>
              <div className="text-[#7D7D7F] text-[14px] font-poppins font-[400] pb-2">
                Try adjusting the filters or clear them to view all voyages.
              </div>
              <RGMButton
                btnText="Clear Filters"
                classnames="w-full bg-secondary text-white h-[44px] font-[500] text-[16px] w-[186px]"
                onclick={handleBackNavigation}
              />
            </>
          ) : (
            <>
              <div className="text-[#0E3337] text-[20px] font-poppins font-[500] pb-3">
                You don&apos;t have any Voyages
              </div>
              <div className="text-[#7D7D7F] text-[14px] font-poppins font-[400] pb-2">
                You currently don&apos;t have any voyages. Please create one to
                get started.
              </div>
              <RGMButton
                btnText="Create New Voyage"
                classnames="w-full bg-secondary text-white h-[44px] font-[500] text-[16px] w-[186px]"
                onclick={handleNewVoyageNavigation}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
