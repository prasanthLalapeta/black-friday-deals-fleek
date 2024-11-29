export interface Deal {
    title: string;
    link: string;
    description: string;
    discountCode?: string;
    category: string;
}

export interface DealsResponse {
    deals: Deal[];
    total: number;
    currentPage: number;
    totalPages: number;
} 