import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";
import LocationDropdown from "./LocationDropDown";
import { useNavigate } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/calender";
import { CalendarIcon, Clock } from "lucide-react";
import { CarSearchPayload, useCarStore } from "@/store/carStore";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Zod Schema and Types
const FormSchema = z.object({
  pickupLocation: z.object({
    name: z.string().min(1, "Pickup location is required"),
    code: z.string().min(1, "Pickup location code is required"),
  }),
  pickupDate: z.date(),
  pickupTime: z.string().min(1, "Pickup time is required"),
  dropoffLocation: z.object({
    name: z.string().min(1, "Drop-off location is required"),
    code: z.string().min(1, "Drop-off location code is required"),
  }),
  dropoffDate: z.date(),
  dropoffTime: z.string().min(1, "Drop-off time is required"),
  returnToSameLocation: z.boolean(),
});

type FormData = z.infer<typeof FormSchema>;

// Time Options Generator
const generateTimeOptions = () => {
  const options: { value: string; label: string }[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const hourFormatted = hour.toString().padStart(2, "0");
      const minuteFormatted = minute.toString().padStart(2, "0");
      const time = `${hourFormatted}:${minuteFormatted}`;
      const displayTime = `${hour % 12 || 12}:${minuteFormatted} ${
        hour < 12 ? "AM" : "PM"
      }`;
      options.push({ value: time, label: displayTime });
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

export default function CarSearchForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      pickupLocation: { name: "", code: "" },
      pickupDate: new Date(),
      pickupTime: "12:00",
      dropoffLocation: { name: "", code: "" },
      dropoffDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      dropoffTime: "12:00",
      returnToSameLocation: false,
    },
    resolver: zodResolver(FormSchema),
  });

  const navigate = useNavigate();
  const returnToSameLocation = watch("returnToSameLocation");
  const { fetchCars } = useCarStore();
  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    const payload = {
      pickUpLocation: data.pickupLocation.code,
      pickUpDate: data.pickupDate.toISOString().split("T")[0],
      pickUpTime: data.pickupTime,
      dropOffLocation: returnToSameLocation
        ? data.pickupLocation.code
        : data.dropoffLocation.code,
      dropOffDate: data.dropoffDate.toISOString().split("T")[0],
      dropOffTime: data.dropoffTime,
      returnToSameLocation: data.returnToSameLocation,
    } as CarSearchPayload;

    console.log("Payload:", payload);
    try {
      fetchCars(payload);
      navigate("/cars/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-dark-blue p-6 md:p-8 rounded-3xl text-white max-w-6xl mx-auto shadow-lg"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2.5 items-end">
        {/* Pickup Location */}
        <div>
          <Label className="text-xs text-gray-300 mb-1 block">
            Pick-up location
          </Label>
          <Controller
            name="pickupLocation"
            control={control}
            render={({ field }) => (
              <LocationDropdown
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.pickupLocation?.name && (
            <p className="text-red-400 text-xs mt-1">
              {errors.pickupLocation.name.message}
            </p>
          )}
        </div>

        {/* Pickup Date */}
        <div>
          <Label className="text-xs text-gray-300 mb-1 block">
            Pick-up date
          </Label>
          <Controller
            name="pickupDate"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full bg-white text-black h-12 justify-start font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(field.value)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //   date < new Date(new Date().setHours(0, 0, 0, 0))
                    // }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.pickupDate && (
            <p className="text-red-400 text-xs mt-1">
              {errors.pickupDate.message}
            </p>
          )}
        </div>

        {/* Pickup Time */}
        <div>
          <Label className="text-xs text-gray-300 mb-1 block">Time</Label>
          <Controller
            name="pickupTime"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-white text-black h-12 py w-full">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.pickupTime && (
            <p className="text-red-400 text-xs mt-1">
              {errors.pickupTime.message}
            </p>
          )}
        </div>

        {/* Dropoff Location */}
        <div>
          <Label className="text-xs text-gray-300 mb-1 block">
            Drop-off location
          </Label>
          <Controller
            name="dropoffLocation"
            control={control}
            render={({ field }) => (
              <LocationDropdown
                value={field.value}
                onChange={field.onChange}
                disabled={returnToSameLocation}
              />
            )}
          />
          {errors.dropoffLocation?.name && (
            <p className="text-red-400 text-xs mt-1">
              {errors.dropoffLocation.name.message}
            </p>
          )}
        </div>

        {/* Dropoff Date */}
        <div>
          <Label className="text-xs text-gray-300 mb-1 block">
            Drop-off date
          </Label>
          <Controller
            name="dropoffDate"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild className="py-0">
                  <Button
                    variant="outline"
                    className="w-full bg-white text-black py-0 justify-start font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(field.value)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) => date < watch("pickupDate")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.dropoffDate && (
            <p className="text-red-400 text-xs mt-1">
              {errors.dropoffDate.message}
            </p>
          )}
        </div>

        {/* Dropoff Time */}
        <div>
          <Label className="text-xs text-gray-300 mb-1 block">Time</Label>
          <Controller
            name="dropoffTime"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-white text-black h-12 w-full">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.dropoffTime && (
            <p className="text-red-400 text-xs mt-1">
              {errors.dropoffTime.message}
            </p>
          )}
        </div>

        {/* Return to Same Location */}
        <div className="flex items-center gap-2 mt-4 col-span-full">
          <Controller
            name="returnToSameLocation"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label className="text-sm cursor-pointer">
            Return to same location
          </Label>
        </div>

        {/* Submit Button */}
        <div className="mt-4 col-span-full">
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
          >
            Search Cars
          </Button>
        </div>
      </div>
    </form>
  );
}
