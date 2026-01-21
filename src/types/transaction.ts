export interface MoneyObject {
  currencyCode: string;
  value: string;
  valueInBaseUnits: number;
}

export interface TransactionResource {
  type: "transactions";
  id: string;
  attributes: {
    status: "HELD" | "SETTLED";
    rawText: string | null;
    description: string;
    message: string | null;
    isCategorizable: boolean;
    holdInfo: {
      amount: MoneyObject;
      foreignAmount: MoneyObject | null;
    } | null;
    roundUp: {
      amount: MoneyObject;
      boostPortion: MoneyObject | null;
    } | null;
    cashback: {
      description: string;
      amount: MoneyObject;
    } | null;
    amount: MoneyObject;
    foreignAmount: MoneyObject | null;
    cardPurchaseMethod: {
      method: "BAR_CODE" | "OCR" | "CARD_PIN" | "CARD_DETAILS" | "CARD_ON_FILE" | "ECOMMERCE" | "MAGNETIC_STRIPE" | "CONTACTLESS";
      cardNumberSuffix: string | null;
    } | null;
    settledAt: string | null;
    createdAt: string;
    transactionType: string; // e.g., "PURCHASE"
    note: string | null;
    performingCustomer: {
      displayName: string;
    } | null;
  };
  relationships: {
    account: { data: { type: "accounts"; id: string } };
    transferAccount: { data: { type: "accounts"; id: string } | null };
    category: { data: { type: "categories"; id: string } | null };
    parentCategory: { data: { type: "categories"; id: string } | null };
    tags: { data: { type: "tags"; id: string }[] };
  };
  links: {
    self: string;
  };
}

export interface TransactionResponse {
  data: TransactionResource[];
  links: {
    prev: string | null;
    next: string | null;
  };
}
