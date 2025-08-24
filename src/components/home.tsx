import React, { useState } from "react";
import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FilterSidebar from "./FilterSidebar";
import ResourcesGrid from "./ResourcesGrid";
import { useResources } from "../context/ResourceContext";

const HomePage = () => {
  const { isEmployeeView, toggleUserMode, searchQuery, setSearchQuery } =
    useResources();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              </div>

              <nav className="hidden md:flex space-x-8">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4 -mb-4"
                >
                  Resources
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Toolkit
                </a>
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  Switch to Employee
                </span>
                <Switch
                  checked={isEmployeeView}
                  onCheckedChange={toggleUserMode}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jonathan"
                    alt="Jonathan"
                  />
                  <AvatarFallback className="bg-green-500 text-white text-sm font-medium">
                    JA
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-900 hidden sm:block">
                  Jonathan
                </span>
              </div>

              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Consectetur adipiscing elit duis tristique sollicitudin nibh sit
            amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus
            vitae congue
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by title or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden">
            <Sheet
              open={isMobileFiltersOpen}
              onOpenChange={setIsMobileFiltersOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mb-6 flex items-center justify-center gap-2 py-3"
                >
                  <Menu className="h-4 w-4" />
                  Show Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="py-4">
                  <FilterSidebar isMobile={true} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Resources Grid */}
          <div className="flex-1">
            <ResourcesGrid />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
