import React from "react";
import ResourceCard from "./ResourceCard";
import { useResources } from "../context/ResourceContext";

const ResourcesGrid = () => {
  const { filteredResources } = useResources();

  // Map resource data to card props
  const mapResourceToCardProps = (resource: any) => ({
    id: resource.id,
    title: resource.title,
    topic: resource.topic,
    type: resource.type.toLowerCase() as "pdf" | "video" | "link",
    color: resource.color,
    tag: resource.tags[0] || "Sample",
  });

  return (
    <div className="w-full">
      {/* Resources grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              {...mapResourceToCardProps(resource)}
              onClick={() => {
                // Handle resource click
                console.log("Resource clicked:", resource.title);
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No resources found. Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesGrid;
