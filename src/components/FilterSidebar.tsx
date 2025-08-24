import React, { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Box, Flex, Text, Button, Checkbox, Stack } from "@chakra-ui/react";
import { useResources } from "../context/ResourceContext";

interface FilterSidebarProps {
  className?: string;
  isMobile?: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  className = "",
  isMobile = false,
}) => {
  const { filters, toggleFilter } = useResources();
  const [showFilters, setShowFilters] = useState(!isMobile);

  const filterCategories = [
    {
      title: "Key Foundational Principles",
      type: "tags" as const,
      options: [
        {
          id: "Secure Base",
          label: "Secure Base",
          checked: filters.tags.includes("Secure Base"),
        },
        {
          id: "Sense of Appreciation",
          label: "Sense of Appreciation",
          checked: filters.tags.includes("Sense of Appreciation"),
        },
        {
          id: "Learning Organisation",
          label: "Learning Organisation",
          checked: filters.tags.includes("Learning Organisation"),
        },
        {
          id: "Mission and Vision",
          label: "Mission and Vision",
          checked: filters.tags.includes("Mission and Vision"),
        },
        {
          id: "Wellbeing",
          label: "Wellbeing",
          checked: filters.tags.includes("Wellbeing"),
        },
      ],
    },
    {
      title: "Document type",
      type: "documentTypes" as const,
      options: [
        {
          id: "DOC",
          label: "DOC",
          checked: filters.documentTypes.includes("DOC"),
        },
        {
          id: "Link",
          label: "Link",
          checked: filters.documentTypes.includes("Link"),
        },
        {
          id: "PDF",
          label: "PDF",
          checked: filters.documentTypes.includes("PDF"),
        },
        {
          id: "Video",
          label: "Video",
          checked: filters.documentTypes.includes("Video"),
        },
      ],
    },
    {
      title: "Categories",
      type: "categories" as const,
      options: [
        {
          id: "Sample",
          label: "Sample",
          checked: filters.categories.includes("Sample"),
        },
        { id: "Sample2", label: "Sample", checked: false },
        { id: "Sample3", label: "Sample", checked: false },
        { id: "Sample4", label: "Sample", checked: false },
        { id: "Sample5", label: "Sample", checked: false },
      ],
    },
  ];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCheckboxChange = (
    filterType: "tags" | "documentTypes" | "categories",
    value: string,
    checked: boolean
  ) => {
    toggleFilter(filterType, value);
  };

  return (
    <Box
      bg="gray.50" /* Subtle background for contrast */
      p={isMobile ? "4" : "6"} /* Increased padding on desktop */
      borderRadius="md"
      boxShadow="sm"
      className={className}
    >
      {isMobile && (
        <Button
          variant="outline"
          w="full"
          mb="4"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="2"
          onClick={toggleFilters}
        >
          <Filter size={16} />
          <Text>{showFilters ? "Hide Filters" : "Show Filters"}</Text>
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      )}

      {showFilters && (
        <Stack spacing="6">
          <Text as="h2" fontSize="lg" fontWeight="semibold" color="gray.900">
            Filters
          </Text>

          <hr />

          {filterCategories.map((category, categoryIndex) => (
            <Stack key={category.title} spacing="4" /* Increased spacing */>
              <Text as="h3" fontWeight="medium" color="gray.900">
                {category.title}
              </Text>

              <Stack spacing="3">
                {category.options.map((option, optionIndex) => (
                  <Flex
                    key={`${option.id}-${optionIndex}`}
                    alignItems="center"
                    gap="4" /* Increased gap */
                  >
                    <Checkbox
                      id={`${category.title}-${option.id}-${optionIndex}`}
                      isChecked={option.checked}
                      onChange={(e) =>
                        handleCheckboxChange(
                          category.type,
                          option.id,
                          e.target.checked
                        )
                      }
                      colorScheme="blue" /* Changed to blue for contrast */
                    />
                    <Text
                      as="label"
                      htmlFor={`${category.title}-${option.id}-${optionIndex}`}
                      fontSize="sm"
                      color="gray.700"
                      cursor="pointer"
                    >
                      {option.label}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default FilterSidebar;
