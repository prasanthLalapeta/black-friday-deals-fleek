import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
    category: string;
    subcategory: string;
}

export function Breadcrumb({ category, subcategory }: BreadcrumbProps) {
    if (category === "all") {
        return <h1 className="text-2xl font-bold">All Deals</h1>;
    }

    return (
        <div className="flex items-center gap-2 text-2xl font-bold">
            <span>{category}</span>
            <ChevronRight className="h-5 w-5" />
            <span>{subcategory}</span>
        </div>
    );
} 