import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Pagination,
} from "@nextui-org/react";
import { LoadingCircle } from "@/src/utils/icons/icons";
import { getSheetDetails } from "@/src/utils/services/service";

export type VoyageViewProp = {
  viewModal: boolean | null;
  sheetViewButton: boolean;
  sheetId: string | null;
  setViewModal: React.Dispatch<React.SetStateAction<boolean | null>>;
  setSheetViewButton: React.Dispatch<React.SetStateAction<boolean>>;
};

interface VoyageDetails {
  id: string;
  [key: string]: any; // This allows flexibility for other keys
}
interface TableColumns {
  key: string;
  label: string; // This allows flexibility for other keys
}

export default function ShowSheetDetails({
  viewModal,
  setViewModal,
  sheetId,
  setSheetViewButton,
  sheetViewButton,
}: VoyageViewProp) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sheetDetails, setSheetDetails] = useState<VoyageDetails[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumns[]>([]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(sheetDetails?.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sheetDetails?.slice(start, end);
  }, [page, sheetDetails]);

  const handleClose = () => {
    setViewModal(false);
    onClose();
    setSheetDetails([]);
    setTableColumns([]);
    setSheetViewButton(false);
  };

  const handleSheetDetails = async () => {
    const response = await getSheetDetails(`${sheetId}`);
    if (response?.data?.status) {
      const sheetData = response.data.results.sheet_data;
      setTableColumns(response.data.results.columns);
      const dataWithIds = sheetData?.map((item: any, index: number) => ({
        ...item,
        id: index + 1, // Add id starting from 1
      }));
      setSheetDetails(dataWithIds);
    } else {
      toast.error(`${response.data.msg}`);
      handleClose();
    }
  };

  useEffect(() => {
    if (sheetId && sheetViewButton) {
      handleSheetDetails();
    }
  }, [sheetId, sheetViewButton]);

  useEffect(() => {
    if (viewModal) {
      onOpen();
    }
  }, [viewModal]);

  return (
    <>
      <Modal
        size={"5xl"}
        isOpen={isOpen}
        onClose={handleClose}
        className="data-preview-scrollbar"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary text-center">
                Data Preview
              </ModalHeader>
              <ModalBody>
                {tableColumns?.length > 0 && sheetDetails?.length > 0 ? (
                  <>
                    <div className="max-h-[300px] overflow-auto">
                      <Table
                        aria-label="Data Preview table"
                        removeWrapper
                        classNames={{
                          tbody:
                            "text-[#7D7D7F] text-[14px] font-inter font-[400]",
                          th: "bg-secondary text-[#fff] font-poppins text-[14px] font-[500] h-[50px] text-center",
                          thead: "!rounded-[4px]",
                          tr: "h-[50px]",
                          td: "text-center",
                        }}
                      >
                        <TableHeader columns={tableColumns}>
                          {(column) => (
                            <TableColumn
                              key={column?.key}
                              align={
                                column?.key === "actions" ? "center" : "start"
                              }
                            >
                              {column?.label}
                            </TableColumn>
                          )}
                        </TableHeader>
                        <TableBody items={items}>
                          {(item) => (
                            <TableRow
                              key={item?.id}
                              className="even:bg-gray-100"
                            >
                              {(columnKey) => (
                                <TableCell>
                                  {getKeyValue(item, columnKey)}
                                </TableCell>
                              )}
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex w-full justify-end mt-4">
                      <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        onPress={() =>
                          setPage((prev) => (prev > 1 ? prev - 1 : prev))
                        }
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
                  </>
                ) : (
                  <div className="flex items-center w-full justify-center">
                    <LoadingCircle />
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
