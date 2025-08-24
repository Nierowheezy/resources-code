import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
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

  // Filter categories with their current state
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
        { id: "Sample", label: "Sample", checked: false },
        { id: "Sample", label: "Sample", checked: false },
        { id: "Sample", label: "Sample", checked: false },
        { id: "Sample", label: "Sample", checked: false },
      ],
    },
  ];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCheckboxChange = (
    filterType: "tags" | "documentTypes" | "categories",
    value: string,
    checked: boolean,
  ) => {
    toggleFilter(filterType, value);
  };

  return (
    <div className={`bg-white ${className}`}>
      {isMobile && (
        <Button
          variant="outline"
          className="w-full mb-4 flex items-center justify-center gap-2"
          onClick={toggleFilters}
        >
          <Filter className="h-4 w-4" />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          {showFilters ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      )}

      {showFilters && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

          {filterCategories.map((category, categoryIndex) => (
            <div key={category.title} className="space-y-3">
              <h3 className="font-medium text-gray-900">{category.title}</h3>

              <div className="space-y-3">
                {category.options.map((option, optionIndex) => (
                  <div
                    key={`${option.id}-${optionIndex}`}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`${category.title}-${option.id}-${optionIndex}`}
                      checked={option.checked}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          category.type,
                          option.id,
                          checked === true,
                        )
                      }
                      className="data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
                    />
                    <label
                      htmlFor={`${category.title}-${option.id}-${optionIndex}`}
                      className="text-sm text-gray-700 leading-none cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
