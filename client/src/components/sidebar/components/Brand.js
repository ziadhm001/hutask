import React from "react";

// Chakra imports
import { Image, Flex } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {

  return (
    <Flex align='center' direction='column'>
      <Image src="/huNEW.png" objectFit='cover' boxSize='100px' marginBottom='20px'/>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
