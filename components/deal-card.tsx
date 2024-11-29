import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Deal } from "@/lib/types";
import { toast } from "sonner";

interface DealCardProps {
    deal: Deal;
    onSelect: (deal: Deal) => void;
}

export function DealCard({ deal, onSelect }: DealCardProps) {
    const copyToClipboard = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (deal.discountCode) {
            navigator.clipboard.writeText(deal.discountCode);
            toast.success("Discount code copied to clipboard!");
        }
    };

    return (
        <Card
            className="h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelect(deal)}
        >
            <CardHeader>
                <CardTitle className="text-base sm:text-lg line-clamp-2">{deal.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{deal.description}</p>
                {deal.discountCode && (
                    <div className="mt-4">
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm break-all">
                            {deal.discountCode}
                        </code>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
                {deal.discountCode && (
                    <Button
                        variant="secondary"
                        onClick={copyToClipboard}
                        className="w-full sm:w-auto"
                    >
                        Copy Code
                    </Button>
                )}
                <Button
                    asChild
                    onClick={(e) => e.stopPropagation()}
                    className="w-full sm:w-auto"
                >
                    <a href={deal.link} target="_blank" rel="noopener noreferrer">
                        View Deal
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
} 