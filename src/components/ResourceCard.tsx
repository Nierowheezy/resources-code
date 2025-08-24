import React from "react";
import {
  Card,
  CardBody,
  Image,
  Text,
  Heading,
  Badge,
  Box,
} from "@chakra-ui/react";
import { useResources } from "../context/ResourceContext";
import { ResourceType } from "../context/ResourceContext";

export type ResourceCardColor = "red" | "green" | "blue" | "orange" | "yellow";

export interface ResourceCardProps {
  id?: string;
  title: string;
  topic: string;
  type: ResourceType;
  color: string;
  tag: string;
  onClick?: () => void;
}

const ResourceCard = ({
  id = "",
  title = "The ultimate guide to Workplace Chat",
  topic = "Sample Topic",
  type = "Link",
  color = "#E50012",
  tag = "Secure Base",
  onClick,
}: ResourceCardProps) => {
  const { getResourceIcon } = useResources();

  return (
    <Card
      overflow="hidden"
      _hover={{ boxShadow: "lg" }}
      transition="all 0.3s"
      cursor="pointer"
      bg="white"
      boxShadow="sm"
      border="none"
      onClick={onClick}
    >
      <Box position="relative" h="24" overflow="hidden">
        <Image
          src={`/card${id || "1"}.png`}
          alt="Card background"
          position="absolute"
          top="-20px"
          left="-4px"
          w="full"
          h="full"
        />

        <Box position="absolute" top={10} left={10} zIndex={10}>
          {getResourceIcon(type)}
        </Box>
      </Box>
      <CardBody p={4}>
        <Heading as="h3" size="md" color="gray.900" mb={1} lineHeight="tight">
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={3}>
          {topic}
        </Text>
        <Badge
          bg="gray.100"
          color="gray.700"
          fontWeight="normal"
          fontSize="xs"
          px={2}
          py={1}
          borderRadius="md"
        >
          {tag}
        </Badge>
      </CardBody>
    </Card>
  );
};

export default ResourceCard;
