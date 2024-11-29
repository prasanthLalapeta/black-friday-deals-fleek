import { motion } from "framer-motion";
import { Deal } from "@/lib/types";
import { DealCard } from "./deal-card";
import { Skeleton } from "./ui/skeleton";

interface DealsGridProps {
    deals: Deal[];
    isLoading?: boolean;
    onDealSelect: (deal: Deal) => void;
}

export function DealsGrid({ deals, isLoading, onDealSelect }: DealsGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="h-[125px] rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Skeleton className="h-10 w-full sm:w-[100px]" />
                            <Skeleton className="h-10 w-full sm:w-[100px]" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {deals.map((deal, index) => (
                <motion.div
                    key={deal.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <DealCard deal={deal} onSelect={onDealSelect} />
                </motion.div>
            ))}
        </div>
    );
} 