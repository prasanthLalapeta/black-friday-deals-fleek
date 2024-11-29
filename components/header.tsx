import Image from "next/image";

export function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-20 items-center justify-center">
                <div className="flex items-center gap-3">
                    <Image
                        src="/black-friday-logo.png"
                        alt="Black Friday Deals Logo"
                        width={50}
                        height={50}
                        className="object-contain"
                    />
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Black Friday Deals
                    </h1>
                </div>
            </div>
        </header>
    );
} 