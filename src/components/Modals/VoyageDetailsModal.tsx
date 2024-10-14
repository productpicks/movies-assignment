import React, { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { voyagesDetailsTableColumns } from "@/src/utils/data/appData";
import { getVoyageDetailsById } from "@/src/utils/services/service";

export type VoyageViewProp = {
  viewModal: boolean | null;
  voyageId: string | null;
  setViewModal: React.Dispatch<React.SetStateAction<boolean | null>>;
};

interface VoyageDetails {
  id: string;
  [key: string]: any; // This allows flexibility for other keys
}

export default function VoyageDetailsModal({
  viewModal,
  setViewModal,
  voyageId,
}: VoyageViewProp) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [voyageDetails, setVoyageDetails] = useState<VoyageDetails[]>([]);

  const handleClose = () => {
    setViewModal(false);
    onClose();
  };

  const handleVoyageDetails = async () => {
    const response = await getVoyageDetailsById(`?voyage_id=${voyageId}`);
    setVoyageDetails(response.data.results);
  };

  useEffect(() => {
    if (voyageId) {
      handleVoyageDetails();
    }
    if (viewModal) {
      onOpen();
    }
  }, [viewModal, voyageId]);

  return (
    <>
      <Modal size={"5xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary text-center">
                Data Preview: Contracts
              </ModalHeader>
              <ModalBody>
                <Table
                  aria-label="Vessels table"
                  removeWrapper
                  classNames={{
                    wrapper: "min-h-[222px]",
                    tbody: "text-[#7D7D7F] text-[14px] font-inter font-[400]",
                    th: "bg-secondary text-[#fff] font-poppins text-[14px] font-[500] h-[50px] text-center",
                    thead: "!rounded-[4px]",
                    tr: "h-[50px]",
                    td: "text-center",
                  }}
                >
                  <TableHeader columns={voyagesDetailsTableColumns}>
                    {(column) => (
                      <TableColumn
                        key={column.key}
                        align={column.key === "actions" ? "center" : "start"}
                      >
                        {column.label}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={voyageDetails}>
                    {(item) => (
                      <TableRow key={item?.id}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
