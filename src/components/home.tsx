import React, { useState } from "react";
import { Search, Menu, X, Filter, ChevronDown } from "lucide-react"; // Added Filter to import
import {
  Box,
  Flex,
  Image,
  Text,
  Input,
  Button,
  Switch,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import FilterSidebar from "./FilterSidebar";
import ResourcesGrid from "./ResourcesGrid";
import { useResources } from "../context/ResourceContext";

const HomePage = () => {
  const { isEmployeeView, toggleUserMode, searchQuery, setSearchQuery } =
    useResources();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box
        as="header"
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <Flex
          maxW="7xl"
          mx="auto"
          px={{ base: 4, sm: 6, lg: 8 }}
          h="16"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo and Navigation */}
          <Flex alignItems="center" gap="8">
            <Flex alignItems="center">
              <Image src="/logo.png" alt="Logo" h="8" />
            </Flex>

            <Flex display={{ base: "none", md: "flex" }} gap="8">
              <Text
                as="a"
                href="#"
                color="gray.600"
                _hover={{ color: "gray.900" }}
                fontWeight="medium"
              >
                Dashboard
              </Text>
              <Text
                as="a"
                href="#"
                color="blue.600"
                fontWeight="medium"
                pb="4"
                mb="-4"
                borderBottom="2px"
                borderColor="blue.600"
              >
                Resources
              </Text>
              <Text
                as="a"
                href="#"
                color="gray.600"
                _hover={{ color: "gray.900" }}
                fontWeight="medium"
              >
                Toolkit
              </Text>
            </Flex>
          </Flex>

          {/* Right side */}
          <Flex alignItems="center" gap="4">
            <Flex alignItems="center" gap="2">
              <Switch
                isChecked={isEmployeeView}
                onChange={toggleUserMode}
                colorScheme="blue"
              />
              <Text
                display={{ base: "none", sm: "block" }}
                fontSize="sm"
                fontWeight="medium"
                color="gray.700"
              >
                Switch to Employee
              </Text>
              <span style={{ color: "gray" }}>|</span>
            </Flex>

            <Flex alignItems="center" gap="2">
              <Box
                w="8"
                h="8"
                borderRadius="full"
                bg="gray.200"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
                fontWeight="bold"
                color="gray.700"
              >
                AJ
              </Box>
              <Text
                display={{ base: "none", sm: "block" }}
                fontWeight="medium"
                color="gray.900"
              >
                Jonathan
              </Text>
              <ChevronDown color="gray" />
            </Flex>

            <Button
              variant="ghost"
              size="sm"
              display={{ md: "none" }}
              iconSpacing={0}
            >
              <Menu size={20} />
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box as="main" maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py="8">
        {/* Page Title */}
        <Box
          bg="#F5F7FA"
          textAlign="center"
          py="8"
          px="6"
          borderRadius="md"
          boxShadow="sm"
          mb="8"
        >
          <Text
            as="h1"
            fontSize="4xl"
            fontWeight="bold"
            color="gray.900"
            mb="4"
          >
            Resources
          </Text>
          <Text color="gray.600" maxW="2xl" mx="auto" lineHeight="relaxed">
            Consectetur adipiscing elit duis tristique sollicitudin nibh sit
            amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus
            vitae congue
          </Text>
        </Box>

        {/* Search Bar */}
        <Box maxW="2xl" mx="auto" mb="8">
          <Box position="relative">
            <Box
              position="absolute"
              left="4"
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
            >
              <Search size={20} />
            </Box>
            <Input
              type="text"
              placeholder="Search by title or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              pl="12"
              py="3"
              fontSize="md"
              borderColor="gray.300"
              borderRadius="lg"
              _focus={{
                ring: 2,
                ringColor: "blue.500",
                borderColor: "blue.500",
              }}
            />
          </Box>
        </Box>

        <Flex direction={{ base: "column", lg: "row" }} gap="8">
          {/* Desktop Filters Sidebar */}
          <Box
            display={{ base: "none", lg: "block" }}
            w="64"
            flexShrink="0"
            p="4"
          >
            <FilterSidebar />
          </Box>

          {/* Mobile Filters */}
          <Box display={{ lg: "none" }}>
            <Button
              variant="outline"
              w="full"
              mb="6"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="2"
              py="4"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <Filter size={16} />
              Show Filters
            </Button>
            <Drawer
              isOpen={isMobileFiltersOpen}
              onClose={() => setIsMobileFiltersOpen(false)}
              placement="left"
            >
              <DrawerOverlay />
              <DrawerContent w="80">
                <DrawerHeader
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    Filters
                  </Text>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    <X size={20} />
                  </Button>
                </DrawerHeader>
                <DrawerBody p="4">
                  <FilterSidebar isMobile={true} />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>

          {/* Resources Grid */}
          <Box flex="1">
            <ResourcesGrid />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default HomePage;
