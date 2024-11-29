import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Category } from "@/lib/api";

interface SidebarProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    isLoading?: boolean;
    totalDealsCount: number;
}

export function Sidebar({
    categories,
    selectedCategory,
    onCategoryChange,
    isLoading,
    totalDealsCount
}: SidebarProps) {
    const sidebarContent = (
        <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <Button
                            variant={selectedCategory === "all" ? "secondary" : "ghost"}
                            className="w-full justify-start font-medium"
                            onClick={() => {
                                onCategoryChange("all");
                            }}
                        >
                            <span className="truncate">All Deals</span>
                            <span className="ml-auto text-xs text-muted-foreground">
                                ({totalDealsCount})
                            </span>
                        </Button>

                        {categories.map((category) => (
                            <Button
                                key={category.name}
                                variant={selectedCategory === category.name ? "secondary" : "ghost"}
                                className="w-full justify-start font-medium"
                                onClick={() => {
                                    onCategoryChange(category.name);
                                }}
                            >
                                <span className="truncate">{category.name}</span>
                                <span className="ml-auto text-xs text-muted-foreground">
                                    ({category.dealCount})
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="w-64 hidden lg:block">
                <div className="px-3 py-2">
                    <div className="space-y-2">
                        {[...Array(5)].map((__, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="hidden lg:block w-64 border-r">
            {sidebarContent}
        </div>
    );
} 