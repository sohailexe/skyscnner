// src/components/FiltersSidebar.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Mock data - in a real app, this would come from an API or state
const popularSuppliers = [
  { id: "europcar", name: "Europcar", fromPrice: 17640, logoTag: "Europcar" },
  { id: "avis", name: "Avis", fromPrice: 18500, logoTag: "Avis" },
  { id: "hertz", name: "Hertz", fromPrice: 19200, logoTag: "Hertz" },
];

const carFeatures = [
  { id: "ac", label: "Air Conditioning" },
  { id: "auto", label: "Automatic Transmission" },
  { id: "manual", label: "Manual Transmission" },
  { id: "4plusseats", label: "4+ Seats" },
  { id: "suv", label: "SUV" },
];

const FiltersSidebar = () => {
  // In a real app, checkbox states would be managed here for filtering
  return (
    <div className="bg-white p-5 rounded-lg shadow-md sticky top-8">
      {" "}
      {/* Added sticky top for sidebar scroll */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Features</h2>
      <Accordion type="multiple" defaultValue={["supplier"]} className="w-full">
        {/* Removed the Features accordion from here to match screenshot more closely: "Features" as a title and then "Supplier" as accordion */}
        <div className="mb-6">
          <div className="space-y-3">
            {carFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Checkbox id={`feature-${feature.id}`} />
                <Label
                  htmlFor={`feature-${feature.id}`}
                  className="text-sm font-normal text-gray-700 cursor-pointer hover:text-blue-600"
                >
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <AccordionItem value="supplier" className="border-t pt-4">
          <AccordionTrigger className="font-semibold text-xl text-gray-800 hover:no-underline">
            Supplier
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex justify-between items-center mb-3">
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Select all
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Clear all
              </Button>
            </div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              Popular suppliers
            </h4>
            <div className="space-y-4">
              {popularSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`supplier-${supplier.id}`} />
                    <Label
                      htmlFor={`supplier-${supplier.id}`}
                      className="text-sm font-normal text-gray-700 cursor-pointer hover:text-blue-600"
                    >
                      {supplier.name}
                      <p className="text-xs text-gray-500">
                        from Rs {supplier.fromPrice.toLocaleString()}
                      </p>
                    </Label>
                  </div>
                  {/* Small supplier tag like in image */}
                  <span
                    className={`text-xs px-1.5 py-0.5 text-white rounded-sm font-medium ${
                      supplier.name === "Europcar"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {supplier.logoTag}
                  </span>
                </div>
              ))}
            </div>
            <Button
              variant="link"
              className="p-0 h-auto text-blue-600 hover:text-blue-700 mt-4 text-sm font-medium"
            >
              Show all suppliers
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FiltersSidebar;
