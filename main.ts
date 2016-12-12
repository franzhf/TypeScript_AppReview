import { window } from 'rxjs/operator/window';
import { Observable } from 'rxjs/Rx';


// Observer
class Organization {
    //private points: number[]
    private points = new Array<number>()

    constructor(public name: string) {

    }

    rollUp(weight: number): void {
        console.log( this.name + " # points" + weight);
        this.points.push(weight);
    }

    showPoints()  {

    }

    getTotalPoints() : number {
        let total: number = 0;
        this.points.forEach(wieght => {
            total += wieght;
        });
        return total;
    }

}

// Observable`
class CustomerActions {
    private orgListeners = new Array<Organization>();

    subscriber(org:Organization): void {
        this.orgListeners.push(org);
    }

    // emit
    scoreToOrg(points:number){
        this.orgListeners.forEach(org => {
            console.log(org)
            org.rollUp(points);
        });
    }
}

let OrgABC = new Organization("ABC");
let orgNBC = new Organization("NBC");
let orgFox = new Organization("Fox");

var actions = new CustomerActions();
actions.subscriber(OrgABC);
actions.subscriber(orgFox);

actions.scoreToOrg(10);
//client  
console.log(" Number of points won by NBC: "   + orgNBC.getTotalPoints());

console.log(" Number of points won by ABC: "   + orgFox.getTotalPoints());

// 
let numbers = [1, 2, 4];
let source = Observable.from(numbers)

class MyObserver{
    next(value){
        console.log("value: " + value);
    }
    error(e){
        console.log(e);
    }

    complete(){
        console.log("complete");
    }
}

source.subscribe(new MyObserver())
