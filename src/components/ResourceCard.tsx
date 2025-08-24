import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2Icon, FileTextIcon, PlayIcon } from "lucide-react";

export type ResourceType = "pdf" | "video" | "link";

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
  type = "link",
  color = "#E50012",
  tag = "Secure Base",
  onClick,
}: ResourceCardProps) => {
  // Map of resource types to their respective icons
  const getTypeIcon = () => {
    switch (type.toLowerCase()) {
      case "pdf":
        return (
          <div className="bg-white rounded-md p-1.5 shadow-sm flex items-center gap-1">
            <FileTextIcon className="h-3 w-3 text-gray-700" />
            <span className="text-xs font-bold text-gray-700">PDF</span>
          </div>
        );
      case "video":
        return (
          <div className="bg-white rounded-md p-1.5 shadow-sm">
            <PlayIcon className="h-4 w-4 text-gray-700" />
          </div>
        );
      case "link":
        return (
          <div className="bg-white rounded-md p-1.5 shadow-sm">
            <Link2Icon className="h-4 w-4 text-gray-700" />
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-md p-1.5 shadow-sm">
            <Link2Icon className="h-4 w-4 text-gray-700" />
          </div>
        );
    }
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border-0 shadow-sm"
      onClick={onClick}
    >
      {/* Colored wave header with background image */}
      <div className="relative h-24 overflow-hidden">
        {/* Background image based on card ID */}
        <img
          src={`/card${id || "1"}.png`}
          alt="Card background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* White wave overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 400 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-20"
          >
            <path
              d="M0 0V80H400V0C400 0 300 50 200 50C100 50 0 0 0 0Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Icon for resource type - positioned in top right corner */}
        <div className="absolute top-3 right-3 z-10">{getTypeIcon()}</div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{topic}</p>
        <Badge
          variant="secondary"
          className="bg-gray-100 text-gray-700 font-normal text-xs px-2 py-1 rounded-md"
        >
          {tag}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
