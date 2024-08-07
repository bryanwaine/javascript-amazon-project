import { Product, Appliance, Clothing } from "../../scripts/data/products.js";

describe("test suite: Product", () => {
  let product;

  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    });
  });

  it("should have the correct properties", () => {
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.image).toEqual(
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );
    expect(product.name).toEqual(
      "Black and Gray Athletic Cotton Socks - 6 Pairs"
    );
  });
  it("should get stars url", () => {
    expect(product.getStarsUrl()).toContain(
      `images/ratings/rating-${4.5 * 10}.png`
    );
  });
  it("should get price", () => {
    expect(product.getPrice()).toContain("$10.90");
  });
  it("should not contain extra info", () => {
    expect(product.extraInfoHtml()).toEqual("");
  });
});

describe("test suite: Clothing", () => {
  let clothing;

  beforeEach(() => {
    clothing = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
  });

  it("should have the correct properties", () => {
    expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(clothing.type).toEqual("clothing");
  });

  it("should contain extra info on clothing size", () => {
    expect(clothing.extraInfoHtml()).toContain(
      "images/clothing-size-chart.png"
    );
  });

  describe("test suite: Appliance", () => {
    let appliance;

    beforeEach(() => {
      appliance = new Appliance({
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        image: "images/products/black-2-slot-toaster.jpg",
        name: "2 Slot Toaster - Black",
        rating: {
          stars: 5,
          count: 2197,
        },
        priceCents: 1899,
        keywords: ["toaster", "kitchen", "appliances"],
        type: "appliance",
        instructionsLink: "images/appliance-instructions.png",
        warrantyLink: "images/appliance-warranty.png",
      });
    });

    it("should have the correct properties", () => {
      expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
      expect(appliance.name).toEqual("2 Slot Toaster - Black");
      expect(appliance.image).toEqual(
        "images/products/black-2-slot-toaster.jpg"
      );
      expect(appliance.rating.stars).toEqual(5);
      expect(appliance.type).toEqual("appliance");
    });

    it("should contain extra info on appliance instructions", () => {
      expect(appliance.extraInfoHtml()).toContain(
        "images/appliance-instructions.png"
      );
      expect(appliance.extraInfoHtml()).toContain(
        "images/appliance-warranty.png"
      );
    });
  });
});
