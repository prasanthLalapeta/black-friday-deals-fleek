import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search } from "lucide-react";

interface DealsSearchProps {
    onSearch: (search: string) => void;
    onSortChange: (sort: string) => void;
    selectedCategory: string;
}

export function DealsSearch({ onSearch, onSortChange, selectedCategory }: DealsSearchProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search deals..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="pl-9 w-full h-10"
                />
            </div>
            <Select onValueChange={onSortChange}>
                <SelectTrigger className="w-full sm:w-[180px] h-10">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                    <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                    {selectedCategory === "all" && (
                        <>
                            <SelectItem value="category-asc">Category (A-Z)</SelectItem>
                            <SelectItem value="category-desc">Category (Z-A)</SelectItem>
                        </>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
} 