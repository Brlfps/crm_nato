import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import { SelectTagsAlerta } from "../dropdow/selectTagsAlerta";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";

interface CardGridTagsAlertProps extends BoxProps {
  ID: number;
}

export async function CardGridTagsAlert({
  ID,
  ...props
}: CardGridTagsAlertProps) {
  const session = await getServerSession(auth);
  return (
    <>
      {session?.user?.hierarquia === "ADM" && (
        <Box {...props}>
          <FormLabel fontSize="sm" fontWeight="md" m={0}>
            Tags Alertas
          </FormLabel>
          <SelectTagsAlerta setValue={ID} />
        </Box>
      )}
    </>
  );
}
