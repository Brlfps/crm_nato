  'use client'

import { Box } from "@chakra-ui/react";

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {

  

  return (
    <Box bg={"#f3f3f3"}>
      {children}
    </Box>
  )
}