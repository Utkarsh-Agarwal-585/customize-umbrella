/*
Algorithm:
    Initialization:
        Initialize planesCount to 0 (representing the count of planes hired).
        Initialize remainingFuel to the fuel available at the starting airport (index 0).
        Initialize maxReachable to 0 (representing the farthest airport that can be reached with the current fuel).
    Iteration through airports:
        Iterate through the array of airports from the second airport (index 1) to the last one.
    For each airport:
        Check if the current airport's index is less than or equal to the remainingFuel.
        If yes, update maxReachable to the current airport index which is the farthest airport that can be reached with the current fuel
        If no, it means we cannot reach the current airport with the remaining fuel. So, hire another plane:
            Increment planesCount by 1.
            Update remainingFuel to the fuel available at the airport represented by maxReachable.(Hire a new plane from the airport that is reachable)
            Update maxReachable to the current airport index (This is the farthest airport that can be reached with newly hired plane)
        Return the count: planesCount.
    After iterating through all airports, return the final value of planesCount, which represents the minimum number of planes required to reach the last airport.
*/

function minPlanesRequired(airportFuel) {
    const N = airportFuel.length;

    let planesCount = 0;
    let remainingFuel = airportFuel[0]; //fuel available at the starting airport
    let maxReachable = 0;

    for (let i = 1; i < N; i++) {
        // If the current airport is reachable from the remaining fuel
        if (i <= remainingFuel) {
            if (i > maxReachable) {
                // the farthest airport that can be reached with the current fuel
                maxReachable = i;
            }
        } 
        // If the current airport is not reachable from the remaining fuel
        // Need to hire a new plane
        else {
            if (maxReachable === 0) {
                return -1;
            }
            // Hire a new plane by incrementing the planesCount
            planesCount++;

            // Update the remaining fuel with the fuel available at the airport
            // Hire a new plane from the airport that is reachable
            remainingFuel = airportFuel[maxReachable];

            // Update the maxReachable airport with the current airport
            // This is the farthest airport that can be reached with newly hired plane
            maxReachable = i;
        }
    }

    return planesCount;
}

const airportFuel1 = [2, 1, 2, 3, 1];
console.log(minPlanesRequired(airportFuel1)); // Output: 2

const airportFuel2 = [1, 6, 3, 4, 5, 0, 0, 0, 6];
console.log(minPlanesRequired(airportFuel2)); // Output: 3
