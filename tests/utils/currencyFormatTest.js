import { formatCurrency } from "../../scripts/utils/currencyFormat.js";

describe("test suite: formatCurrency", () => {
  it("converts cents to dollars", () => {
    expect(formatCurrency(1000)).toEqual("10.00");
  });
    
  it("works with zero", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
    
  it("rounds up to 2 decimal places", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
    
  it("rounds down to 2 decimal places", () => {
    expect(formatCurrency(2000.49)).toEqual("20.00");
  });
});

