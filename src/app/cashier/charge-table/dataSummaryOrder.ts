export interface DataSummaryOrderInterface {
    dish: string;
    amount: number;
    priceU: number;
}

export async function getSummaryOrderById(): Promise<DataSummaryOrderInterface[]> {
    return [
        { dish: "Spaghetti Carbonara", amount: 2, priceU: 8.5 },
        { dish: "Ensalada César", amount: 1, priceU: 5.0 },
        { dish: "Pollo a la Parrilla", amount: 3, priceU: 10.0 },
        { dish: "Tiramisú", amount: 2, priceU: 4.5 }
    ];
}
