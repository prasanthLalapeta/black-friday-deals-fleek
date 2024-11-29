import { Deal } from "./types";

const GITHUB_RAW_URL = "https://raw.githubusercontent.com/trungdq88/Awesome-Black-Friday-Cyber-Monday/main/README.md";

export interface Category {
    name: string;
    dealCount: number;
}

export async function fetchAndParseDeals(): Promise<{ deals: Deal[], categories: Category[] }> {
    try {
        const response = await fetch(GITHUB_RAW_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch markdown: ${response.statusText}`);
        }
        const text = await response.text();
        return parseMarkdownToDealsAndCategories(text);
    } catch (error) {
        console.error("Error fetching deals:", error);
        throw new Error("Failed to fetch deals");
    }
}

function parseMarkdownToDealsAndCategories(markdown: string): { deals: Deal[], categories: Category[] } {
    const deals: Deal[] = [];
    const categories: Category[] = [];

    // Split the markdown into main sections (##)
    const mainSections = markdown.split('## ').filter(section => section.trim());

    mainSections.forEach(section => {
        const lines = section.split('\n');
        const categoryLine = lines[0].trim();

        // Skip non-deal sections
        if (categoryLine.includes('Table of Contents') ||
            categoryLine.includes('Contributing') ||
            categoryLine.includes('License') ||
            !categoryLine) {
            return;
        }

        // Clean up category name (remove emojis but keep the text)
        const categoryName = categoryLine.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();

        // Create category object
        const currentCategory: Category = {
            name: categoryName,
            dealCount: 0
        };

        // Parse table rows for deals
        const tableRows = lines.filter(line =>
            line.trim().startsWith('|') &&
            line.includes('[') &&
            !line.includes('Name') &&
            !line.includes('---')
        );

        tableRows.forEach(row => {
            const columns = row.split('|').map(col => col.trim()).filter(Boolean);

            if (columns.length >= 4) {
                const [, nameCol, description, discountInfo] = columns;
                const nameMatch = nameCol.match(/\[(.*?)\]\((.*?)\)/);

                if (nameMatch) {
                    const deal: Deal = {
                        title: nameMatch[1].trim(),
                        link: nameMatch[2].trim(),
                        description: description.trim(),
                        discountCode: extractDiscountCode(discountInfo),
                        category: categoryName
                    };
                    deals.push(deal);
                    currentCategory.dealCount++;
                }
            }
        });

        if (currentCategory.dealCount > 0) {
            categories.push(currentCategory);
        }
    });

    console.log(`Found ${deals.length} deals in ${categories.length} categories`);
    console.log('Categories:', categories.map(c =>
        `${c.name} (${c.dealCount} deals)`
    ));

    // Sort categories by deal count and deals by title
    categories.sort((a, b) => b.dealCount - a.dealCount);
    deals.sort((a, b) => a.title.localeCompare(b.title));

    return { deals, categories };
}

function extractDiscountCode(discountInfo: string): string | undefined {
    if (!discountInfo) return undefined;

    // Look for text between ** ** that includes the word "code"
    const codeMatch = discountInfo.match(/\*\*(.*?code.*?)\*\*/i);
    if (codeMatch) return codeMatch[1];

    // Look for text between ** **
    const boldMatch = discountInfo.match(/\*\*(.*?)\*\*/);
    if (boldMatch) return boldMatch[1];

    // Look for text after "code" (case insensitive)
    const afterCodeMatch = discountInfo.match(/code\s+(.*?)(?:\s+|$)/i);
    if (afterCodeMatch) return afterCodeMatch[1];

    // If no specific format found, return the whole text
    return discountInfo.trim();
}
