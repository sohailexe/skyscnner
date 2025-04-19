import { useState, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// FilterButton component
interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

const FilterButton = ({ active, onClick, children }: FilterButtonProps) => (
  <Button
    variant={active ? "default" : "outline"}
    onClick={onClick}
    className={cn(
      "text-sm font-medium transition-colors",
      active ? "bg-primary text-primary-foreground" : "hover:bg-accent"
    )}
  >
    {children}
  </Button>
);

// PlannerLink component
interface PlannerLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

const PlannerLink = ({ href, className, children }: PlannerLinkProps) => (
  <a
    href={href}
    className={cn(
      "text-sm text-light-blue hover:underline transition-colors",
      className
    )}
  >
    {children}
  </a>
);

// PaginationDot component
interface PaginationDotProps {
  active: boolean;
  onClick: () => void;
}

const PaginationDot = ({ active, onClick }: PaginationDotProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-3 h-3 rounded-full transition-colors",
      active ? "bg-dark-blue" : "bg-light-blue/20 hover:bg-light-blue/40"
    )}
    aria-label={active ? "Current page" : "Go to page"}
  />
);

// Main Planner component
type FilterType = "City" | "Region" | "Airport" | "Country";

interface PlannerProps {
  title?: string;
  initialFilter?: FilterType;
  itemsPerPage?: number;
  data?: string[];
}

const Planner = ({
  title = "Start planning your adventure",
  initialFilter = "City",
  itemsPerPage = 9,
  data = defaultCarHireData,
}: PlannerProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>(initialFilter);
  const [currentPage, setCurrentPage] = useState(0);

  const filters: FilterType[] = ["City", "Region", "Airport", "Country"];
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <Card className="maxScreen border-none shadow-none ">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </FilterButton>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {currentItems.map((item) => (
            <PlannerLink key={item} href="#">
              {item}
            </PlannerLink>
          ))}
        </div>

        {data.length > itemsPerPage && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationDot
                  key={index}
                  active={currentPage === index}
                  onClick={() => goToPage(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const defaultCarHireData = [
  "Best car hire in Beijing",
  "Car hire in Bangkok",
  "Car hire in Paris",
  "Car hire in Singapore",
  "Car hire in Doha",
  "Best car hire in Melbourne",
  "Cheap car hire in London",
  "Car hire in Lahore",
  "Tehran car hire",
  "Another City Hire 1",
  "Regional Car Rental 1",
  "Airport Car Service 1",
  "Another City Hire 2",
  "Regional Car Rental 2",
  "Airport Car Service 2",
  "Another City Hire 3",
  "Regional Car Rental 3",
  "Airport Car Service 3",
  "Page 2 - Item 1",
  "Page 2 - Item 2",
  "Page 2 - Item 3",
  "Page 2 - Item 4",
  "Page 2 - Item 5",
  "Page 2 - Item 6",
  "Page 2 - Item 7",
  "Page 2 - Item 8",
  "Page 2 - Item 9",
  "Page 3 - Item 1",
  "Page 3 - Item 2",
  "Page 3 - Item 3",
  "Page 3 - Item 4",
  "Page 3 - Item 5",
  "Page 3 - Item 6",
  "Page 3 - Item 7",
  "Page 3 - Item 8",
  "Page 3 - Item 9",
];

export default Planner;
