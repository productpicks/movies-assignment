"use client";
import React, { useCallback, useState } from "react";
import { VesselDataInterface } from "@/src/interfaces";
import { voyagesTableColumns } from "@/src/utils/data/appData";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "@/src/utils/icons/icons";

export type RGMInputProp = {
  data?: any;
  handleVesselDelete: (id: number) => Promise<void>;
  handleVesselUpdate: (id: number) => void;
  setViewModal: React.Dispatch<React.SetStateAction<boolean | null>>;
  setVoyageId: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function VoyagesTable({
  data,
  handleVesselDelete,
  handleVesselUpdate,
  setViewModal,
  setVoyageId,
}: RGMInputProp) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const pages = Math.ceil(data.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const renderCell = useCallback((voyage: any, columnKey: any) => {
    const cellValue = voyage[columnKey];
    switch (columnKey) {
      case "name":
        return <div>{voyage.name}</div>;
      case "vessel":
        return (
          <p className="text-bold text-sm capitalize text-default-400">
            {voyage.vessel}
          </p>
        );
      case "start_port":
        return <div>{voyage.start_port.name}</div>;
      case "call_sign":
        return <div>{voyage.call_sign}</div>;
      case "mmsi":
        return <div>{voyage.mmsi}</div>;
      case "destination_port":
        return <div>{voyage.destination_port.name}</div>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            <Tooltip
              content="View Voyage Details"
              classNames={{
                base: "text-secondary",
              }}
            >
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  setViewModal(true);
                  setVoyageId(voyage.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path
                    fill-rule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </Tooltip>
            <Tooltip
              content="Edit Voyage"
              classNames={{
                base: "text-secondary",
              }}
            >
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleVesselUpdate(voyage.id)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Voyage">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleVesselDelete(voyage.id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      case "download":
        return (
          <div className="relative flex items-center justify-center">
            <Tooltip
              content="Download Vessel"
              classNames={{
                base: "text-secondary",
              }}
            >
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-full overflow-x-auto h-full">
      <Table
        aria-label="Vessels table"
        removeWrapper
        bottomContent={
          <div className="flex w-full justify-end">
            <Button
              size="sm"
              variant="flat"
              color="secondary"
              onPress={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
              className="mr-2 bg-[none] text-[#758892]"
            >
              Previous
            </Button>
            <Pagination
              onChange={(page) => setPage(page)}
              color="secondary"
              page={page}
              total={pages}
              radius="sm"
              initialPage={1}
              classNames={{
                item: "bg-[#EDF4FF] text-secondary",
              }}
            />
            <Button
              size="sm"
              variant="flat"
              color="secondary"
              onPress={() =>
                setPage((prev) => (prev < pages ? prev + 1 : prev))
              }
              className="ml-2 bg-[none] text-[#758892]"
              disabled={page >= pages}
            >
              Next
            </Button>
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
          tbody: "text-[#7D7D7F] text-[14px] font-inter font-[400]",
          th: "bg-secondary text-[#fff] font-poppins text-[14px] font-[500] h-[50px] text-center",
          thead: "!rounded-[4px]",
          tr: "h-[50px]",
          td: "text-center",
        }}
      >
        <TableHeader columns={voyagesTableColumns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {items.map((item: VesselDataInterface, rowIndex: number) => (
            <TableRow
              key={item?.id}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#EBF0FA]"}
            >
              {voyagesTableColumns.map((column) => (
                <TableCell key={column.key}>
                  {renderCell(item, column.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
