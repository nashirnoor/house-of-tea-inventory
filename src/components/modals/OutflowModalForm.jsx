import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const OutflowModalForm = ({ products, branches, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    product: "",
    branch: "",
    quantity_sent: "",
    expiry_date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product" className="text-right">
            Product
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="col-span-3 justify-between"
              >
                {formData.product
                  ? products.find((p) => p.id.toString() === formData.product)
                      ?.name
                  : "Select product..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search product..." />
                <CommandList>
                  <CommandEmpty>No products found.</CommandEmpty>
                  <CommandGroup>
                    {products.map((product) => (
                      <CommandItem
                        key={product.id}
                        value={product.name}
                        onSelect={() => {
                          setFormData({
                            ...formData,
                            product: product.id.toString(),
                          });
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            formData.product === product.id.toString()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {product.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="branch" className="text-right">
            Branch
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="col-span-3 justify-between"
              >
                {formData.branch
                  ? branches.find((b) => b.id.toString() === formData.branch)
                      ?.name
                  : "Select branch..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search branch..." />
                <CommandList>
                  <CommandEmpty>No branch found.</CommandEmpty>
                  <CommandGroup>
                    {branches.map((branch) => (
                      <CommandItem
                        key={branch.id}
                        value={branch.name}
                        onSelect={() => {
                          setFormData({
                            ...formData,
                            branch: branch.id.toString(),
                          });
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            formData.branch === branch.id.toString()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {branch.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity_sent" className="text-right">
            Quantity Sent
          </Label>
          <Input
            id="quantity_sent"
            type="number"
            value={formData.quantity_sent}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity_sent: e.target.value,
              })
            }
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="expiry_date" className="text-right">
            Expiry Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "col-span-3 justify-start text-left font-normal",
                  !formData.expiry_date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.expiry_date ? (
                  format(new Date(formData.expiry_date), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  formData.expiry_date
                    ? new Date(formData.expiry_date)
                    : undefined
                }
                onSelect={(date) =>
                  setFormData({
                    ...formData,
                    expiry_date: date ? format(date, "yyyy-MM-dd") : "",
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Outflow</Button>
      </DialogFooter>
    </form>
  );
};

export default OutflowModalForm;
