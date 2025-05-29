// components/NoCarsFound.jsx

import { CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NoCarsFound = ({ onClearFilters }: { onClearFilters: () => void }) => {
  return (
    <Card className="w-full max-w-md mx-auto text-center py-8 px-4 border-dashed border-2 border-gray-300 dark:border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex justify-center items-center mb-4">
          <CarFront className="h-12 w-12 text-gray-500 dark:text-gray-400" />
        </div>
        <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          No Cars Found
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
          It looks like there are no cars matching your current filter criteria.
          <br />
          Try adjusting your filters to see more results!
        </CardDescription>
      </CardContent>
      {onClearFilters && (
        <CardFooter className="pt-4">
          <Button onClick={onClearFilters} className="w-full">
            Clear All Filters
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NoCarsFound;
