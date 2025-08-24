import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import ResourceCard from "./ResourceCard";
import { useResources } from "../context/ResourceContext";
import { Resource } from "../context/ResourceContext";

const ResourcesGrid = () => {
  const { filteredResources } = useResources();

  const mapResourceToCardProps = (resource: Resource) => ({
    id: resource.id,
    title: resource.title,
    topic: resource.topic,
    type: resource.type,
    color: resource.color,
    tag: resource.tags[0] || "Sample",
  });

  return (
    <Box w="full">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              {...mapResourceToCardProps(resource)}
              onClick={() => {
                console.log("Resource clicked:", resource.title);
              }}
            />
          ))
        ) : (
          <Box gridColumn="1 / -1" textAlign="center" py={12}>
            <Text color="gray.500" fontSize="lg">
              No resources found. Try adjusting your filters or search query.
            </Text>
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default ResourcesGrid;
