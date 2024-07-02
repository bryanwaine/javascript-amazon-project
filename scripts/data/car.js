class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
    this.speed = 0;
    this.isTrunkOpen = "closed";
  }

  displayInfo() {
    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed}km/h, Trunk: ${this.isTrunkOpen} `
    );
  }

  go() {
    if (this.speed > (200 - 5)) {
      return;
    }
    if (this.isTrunkOpen === "open") {
      return;
    }
    this.speed += 5;
  }

  brake() {
    if (this.speed < 5) {
      return;
    }
    this.speed -= 5;
  }

  openTrunk() {
    if (this.speed > 0) {
      return;
    }
    if (this.isTrunkOpen === "open") {
      return;
    }
    this.isTrunkOpen = "open";
  }

  closeTrunk() {
    if (this.isTrunkOpen === "closed") {
      return;
    } else {
      this.isTrunkOpen = "closed";
    }
  }
}

class RaceCar extends Car {
   
    acceleration;

    constructor(brand, model, acceleration) {
        super(brand, model)
        this.acceleration = acceleration
        this.isTrunkOpen = 'Not applicable'
    }

    go() {
        if (this.speed > (300 - this.acceleration)) {
            return
        }
        this.speed += this.acceleration
    }

   
}

const toyota = new Car("Toyota", "Corolla");
const tesla = new Car("Tesla", "Model 3");
const mcLaren = new RaceCar('McLaren', 'F1', 20)

toyota.go();
//toyota.go();

//toyota.brake();
//toyota.brake();

toyota.openTrunk();
//toyota.closeTrunk();

//toyota.go();

mcLaren.go()
console.log(toyota.displayInfo());
//console.log(tesla.displayInfo());
console.log(mcLaren.displayInfo())
