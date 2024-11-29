"use client";

import { useState, useEffect } from "react";
import { DealsGrid } from "@/components/deals-grid";
import { DealsSearch } from "@/components/deals-search";
import { DealsPagination } from "@/components/deals-pagination";
import { DealModal } from "@/components/deal-modal";
import { Sidebar } from "@/components/sidebar";
import { Deal } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "sonner";
import { fetchAndParseDeals } from "@/lib/api";
import { Category } from "@/lib/api";
import { Breadcrumb } from "@/components/breadcrumb";
import { Header } from "@/components/header";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const ITEMS_PER_PAGE = 9;

export default function Home() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [displayedDeals, setDisplayedDeals] = useState<Deal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedDeals(filteredDeals.slice(startIndex, endIndex));
  }, [currentPage, filteredDeals]);

  const fetchDeals = async () => {
    try {
      const { deals: fetchedDeals, categories } = await fetchAndParseDeals();
      setDeals(fetchedDeals);
      setCategoriesData(categories);

      // Set initial category and filtered deals
      setSelectedCategory("all");
      setFilteredDeals(fetchedDeals);
    } catch (err) {
      setError("Failed to load deals");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (search: string) => {
    const filtered = deals.filter(
      (deal) =>
        (selectedCategory === "all" || deal.category === selectedCategory) &&
        (deal.title.toLowerCase().includes(search.toLowerCase()) ||
          deal.description?.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredDeals(filtered);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredDeals(deals);
    } else {
      const filtered = deals.filter((deal) => deal.category === category);
      setFilteredDeals(filtered);
    }
    setCurrentPage(1);
  };

  const handleSort = (sort: string) => {
    const sorted = [...filteredDeals].sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "category-asc":
          return a.category.localeCompare(b.category);
        case "category-desc":
          return b.category.localeCompare(a.category);
        default:
          return 0;
      }
    });
    setFilteredDeals(sorted);
    setCurrentPage(1);
  };

  const handleDealSelect = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDeal(null);
  };

  const totalPages = Math.ceil(filteredDeals.length / ITEMS_PER_PAGE);
  const totalDealsCount = deals.length;

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-card">
          <Sidebar
            categories={categoriesData}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            isLoading={isLoading}
            totalDealsCount={totalDealsCount}
          />
        </aside>

        <main className="flex-1 w-full">
          <div className="container px-4 sm:px-6 lg:px-8 py-6">
            {/* Mobile Category Filter */}
            <div className="mb-6 lg:hidden">
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deals ({totalDealsCount})</SelectItem>
                  {categoriesData.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name} ({category.dealCount})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Category Title */}
            <h2 className="text-2xl font-bold mb-6 hidden lg:block">
              {selectedCategory === "all" ? `All Deals (${totalDealsCount})` : `${selectedCategory} (${categoriesData.find(c => c.name === selectedCategory)?.dealCount || 0})`}
            </h2>

            <DealsSearch
              onSearch={handleSearch}
              onSortChange={handleSort}
              selectedCategory={selectedCategory}
            />
            <DealsGrid
              deals={displayedDeals}
              onDealSelect={handleDealSelect}
              isLoading={isLoading}
            />
            {!isLoading && filteredDeals.length > 0 && (
              <DealsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
            {!isLoading && filteredDeals.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No deals found for the selected criteria
              </div>
            )}
          </div>
        </main>

        <DealModal
          deal={selectedDeal}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
        <Toaster />
      </div>

      {/* Credits Footer */}
      <footer className="border-t py-6 bg-background/95">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            Developed by{" "}
            <a
              href="https://x.com/heylalapeta"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-foreground"
            >
              @heylalapeta
            </a>
          </p>
          <p className="mt-2">
            Data sourced from{" "}
            <a
              href="https://github.com/trungdq88/Awesome-Black-Friday-Cyber-Monday"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-foreground"
            >
              Awesome Black Friday & Cyber Monday Deals
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
