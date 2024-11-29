import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Deal } from "@/lib/types";
import { ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";

interface DealModalProps {
    deal: Deal | null;
    isOpen: boolean;
    onClose: () => void;
}

export function DealModal({ deal, isOpen, onClose }: DealModalProps) {
    if (!deal) return null;

    const copyToClipboard = () => {
        if (deal.discountCode) {
            navigator.clipboard.writeText(deal.discountCode);
            toast.success("Discount code copied to clipboard!");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{deal.title}</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground pt-2">
                        {deal.category}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground mb-4">{deal.description}</p>
                    {deal.discountCode && (
                        <div className="flex items-center gap-2 mb-4">
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm flex-grow">
                                {deal.discountCode}
                            </code>
                            <Button size="sm" variant="outline" onClick={copyToClipboard}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                    <Button className="w-full" asChild>
                        <a
                            href={deal.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            Visit Deal <ExternalLink className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 