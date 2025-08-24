import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { LinkIcon, FileTextIcon, PlayIcon } from "lucide-react";

// Define resource types
export type ResourceType = "PDF" | "Video" | "Link" | "DOC";

// Define tag types for filtering
export type TagCategory =
  | "Secure Base"
  | "Sense of Appreciation"
  | "Learning Organisation"
  | "Mission and Vision"
  | "Wellbeing";
export type DocumentType = "PDF" | "Link" | "DOC" | "Video";
export type Category = "Sample";

// Define the resource interface
export interface Resource {
  id: string;
  title: string;
  topic: string;
  type: ResourceType;
  tags: TagCategory[];
  documentType: DocumentType;
  categories: Category[];
  color: string; // For the wave header color
  url: string; // URL to the resource
}

// Define the context state interface
interface ResourceContextState {
  resources: Resource[];
  filteredResources: Resource[];
  searchQuery: string;
  filters: {
    tags: TagCategory[];
    documentTypes: DocumentType[];
    categories: Category[];
  };
  isEmployeeView: boolean;
  isFilterSidebarOpen: boolean;
}

// Define the context interface
interface ResourceContextValue extends ResourceContextState {
  setSearchQuery: (query: string) => void;
  toggleFilter: (
    filterType: "tags" | "documentTypes" | "categories",
    value: string,
  ) => void;
  clearFilters: () => void;
  toggleUserMode: () => void;
  toggleFilterSidebar: () => void;
  getResourceIcon: (type: ResourceType) => JSX.Element;
}

// Sample resources data
const sampleResources: Resource[] = [
  {
    id: "1",
    title: "The ultimate guide to Workplace Chat",
    topic: "Sample Topic",
    type: "Link",
    tags: ["Secure Base"],
    documentType: "Link",
    categories: ["Sample"],
    color: "#E50012", // Red
    url: "/resources/workplace-chat-guide",
  },
  {
    id: "2",
    title: "The ultimate guide to Workplace Chat",
    topic: "Sample Topic",
    type: "Video",
    tags: ["Secure Base"],
    documentType: "Video",
    categories: ["Sample"],
    color: "#00E5A1", // Green
    url: "/resources/workplace-chat-video",
  },
  {
    id: "3",
    title: "The ultimate guide to Workplace Chat",
    topic: "Sample Topic",
    type: "Link",
    tags: ["Secure Base"],
    documentType: "Link",
    categories: ["Sample"],
    color: "#E50012", // Red
    url: "/resources/workplace-chat-guide-2",
  },
  {
    id: "4",
    title: "The ultimate guide to Workplace Chat",
    topic: "Sample Topic",
    type: "Video",
    tags: ["Wellbeing"],
    documentType: "Video",
    categories: ["Sample"],
    color: "#FF6347", // Orange-red
    url: "/resources/workplace-chat-video-2",
  },
  {
    id: "5",
    title: "The ultimate guide to Workplace Chat",
    topic: "Sample Topic",
    type: "PDF",
    tags: ["Secure Base"],
    documentType: "PDF",
    categories: ["Sample"],
    color: "#FFD700", // Yellow
    url: "/resources/workplace-chat-pdf",
  },
  {
    id: "6",
    title: "Taking stock of mental health in your workplace",
    topic: "Sample Topic",
    type: "PDF",
    tags: ["Secure Base"],
    documentType: "PDF",
    categories: ["Sample"],
    color: "#40E0D0", // Turquoise
    url: "/resources/mental-health-workplace",
  },
];

// Create the context
const ResourceContext = createContext<ResourceContextValue | undefined>(
  undefined,
);

// Provider component
export const ResourceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<ResourceContextState>({
    resources: sampleResources,
    filteredResources: sampleResources,
    searchQuery: "",
    filters: {
      tags: [],
      documentTypes: [],
      categories: [],
    },
    isEmployeeView: true,
    isFilterSidebarOpen: false,
  });

  // Helper function to filter resources based on search query and filters
  const filterResources = useCallback(
    (currentState: ResourceContextState): Resource[] => {
      return currentState.resources.filter((resource) => {
        // Filter by search query
        const matchesSearch = currentState.searchQuery
          ? resource.title
              .toLowerCase()
              .includes(currentState.searchQuery.toLowerCase())
          : true;

        // Filter by tags
        const matchesTags =
          currentState.filters.tags.length === 0 ||
          resource.tags.some((tag) => currentState.filters.tags.includes(tag));

        // Filter by document types
        const matchesDocTypes =
          currentState.filters.documentTypes.length === 0 ||
          currentState.filters.documentTypes.includes(resource.documentType);

        // Filter by categories
        const matchesCategories =
          currentState.filters.categories.length === 0 ||
          resource.categories.some((category) =>
            currentState.filters.categories.includes(category),
          );

        return (
          matchesSearch && matchesTags && matchesDocTypes && matchesCategories
        );
      });
    },
    [],
  );

  // Set search query and filter resources
  const setSearchQuery = useCallback(
    (query: string) => {
      setState((prevState) => {
        const newState = { ...prevState, searchQuery: query };
        return {
          ...newState,
          filteredResources: filterResources(newState),
        };
      });
    },
    [filterResources],
  );

  // Toggle a filter and update filtered resources
  const toggleFilter = useCallback(
    (filterType: "tags" | "documentTypes" | "categories", value: string) => {
      setState((prevState) => {
        const currentFilters = [...prevState.filters[filterType]];
        const index = currentFilters.indexOf(value as any);

        if (index === -1) {
          currentFilters.push(value as any);
        } else {
          currentFilters.splice(index, 1);
        }

        const newState = {
          ...prevState,
          filters: {
            ...prevState.filters,
            [filterType]: currentFilters,
          },
        };

        return {
          ...newState,
          filteredResources: filterResources(newState),
        };
      });
    },
    [filterResources],
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      filters: {
        tags: [],
        documentTypes: [],
        categories: [],
      },
      filteredResources: prevState.searchQuery
        ? prevState.resources.filter((resource) =>
            resource.title
              .toLowerCase()
              .includes(prevState.searchQuery.toLowerCase()),
          )
        : prevState.resources,
    }));
  }, []);

  // Toggle between employee and admin view
  const toggleUserMode = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isEmployeeView: !prevState.isEmployeeView,
    }));
  }, []);

  // Toggle filter sidebar visibility (for mobile)
  const toggleFilterSidebar = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isFilterSidebarOpen: !prevState.isFilterSidebarOpen,
    }));
  }, []);

  // Helper function to get the appropriate icon for a resource type
  const getResourceIcon = useCallback((type: ResourceType): JSX.Element => {
    switch (type) {
      case "PDF":
        return <FileTextIcon className="h-5 w-5" />;
      case "Video":
        return <PlayIcon className="h-5 w-5" />;
      case "Link":
        return <LinkIcon className="h-5 w-5" />;
      case "DOC":
        return <FileTextIcon className="h-5 w-5" />;
      default:
        return <FileTextIcon className="h-5 w-5" />;
    }
  }, []);

  const contextValue = useMemo<ResourceContextValue>(
    () => ({
      ...state,
      setSearchQuery,
      toggleFilter,
      clearFilters,
      toggleUserMode,
      toggleFilterSidebar,
      getResourceIcon,
    }),
    [
      state,
      setSearchQuery,
      toggleFilter,
      clearFilters,
      toggleUserMode,
      toggleFilterSidebar,
      getResourceIcon,
    ],
  );

  return (
    <ResourceContext.Provider value={contextValue}>
      {children}
    </ResourceContext.Provider>
  );
};

// Custom hook to use the resource context
export const useResources = (): ResourceContextValue => {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    throw new Error("useResources must be used within a ResourceProvider");
  }
  return context;
};

export default ResourceContext;
