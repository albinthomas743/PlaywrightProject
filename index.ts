function hello(name: string) {


    let age: number = 34;
    let price: number = 99.99;

    let firstname: string = "Albin";
    let lastname: string = "Thomas";
    let fullname: string = `${firstname} ${lastname}` // template literal

    let isLoggedIn: boolean = true;
    let hasPerm: boolean = false;

    let numbers: number[] = [1, 2, 4, -8, 0]
    let fruits: Array<string> = ["Apple", "Orange", "Banana"]

    let user: [string, number, boolean] = ["Aaryan", 34, true]; // tuple

    enum Direction {
        Up = 100, Down = 200, Left = 300, Right = 400 // 0 1 2 3
    }

    let move: Direction = Direction.Down;
    console.log(move);

    let data: any = "Hello"; // any - disable type checks
    data = 45; // OK
    data = true; // OK

    let value: unknown = "hello"; // similar to any - safer

    if(typeof value === "string") {
        console.log(value.toUpperCase());
    } if(typeof value === "number") {
        console.log(value * 10)
    }

    console.log('Hello', name);
}

function sum(...numbers: (number | string)[]): number {
    // let sum = 0;
    // for(let num of numbers) {
    //     sum += num;
    // }
    // return sum;

    // let a: number | string = 10;

    // return numbers.reduce((acc, curr) => acc + curr, 0);

    // let total = 0;

    // for(const val of numbers) {
    //     // Type narrowing - check the actual type at runtime

    //     if(typeof val === "number") {
    //         total += val;
    //     } else if (typeof val === "string") {
    //         const num = parseFloat(val); // convert string -> number
    //         if(!isNaN(num)) {
    //             total += num;
    //         } else {
    //             console.warn(`Skipping invalid number ${val}`);
    //         }
    //     }
    // }

    const sum = numbers.reduce<number>((acc, curr) => {
        const num = typeof curr === "number" ? curr : parseFloat(curr);
        return acc + (isNaN(num) ? 0 : num);
    }, 0);

    return sum;
}

function operate(
    operation: "sum" | "avg" | "mul",
    ...values: (number | string)[] 
): number {
    const numbers = values
                        .map(v => (typeof v === "number" ? v : parseFloat(v)))
                        .filter(v => !isNaN(v));
    switch(operation) {
        case "sum":
            return numbers.reduce((a, b) => a + b, 0);
        case "avg":
            return numbers.reduce((a, b) => a + b, 0) / numbers.length;
        case "mul":
            return numbers.reduce((a, b) => a * b, 1);
        default:
            return 0;
    }
}


// console.log(sum(1, 2, 3, "4", "Arush"))
// console.log("Sum:", sum(10, 20, 30, "40", "Aaryan", "Arush"))

console.log(operate("sum", 1, "2", "Arush", "3")) // Output: 6
console.log(operate("avg", 1, "3", "Arush", "3")) // Output: 7/3
console.log(operate("mul", 1, "3", "Arush", "3")) // Output: 9

hello("test");