import { formatCurrency } from "../../scripts/utils/currencyFormat.js";

console.log("test suite: formatCurrency");
// BASIC TESTS

console.log("formats from cents");
if (formatCurrency(1000) === "10.00") { 
    console.log("test passed");
} else {
    console.log("test failed");
}


// EDGE CASES

console.log("formats zero cents");

if (formatCurrency(0) === "0.00") { 
    console.log("test passed");
} else {
    console.log("test failed");
}


console.log("rounds up to 2 decimal places");

if (formatCurrency(2000.5) === "20.01") { 
    console.log("test passed");
} else {
    console.log("test failed");
}

console.log("rounds down to 2 decimal places");

if (formatCurrency(2000.4) === "20.00") { 
    console.log("test passed");
} else {
    console.log("test failed");
}