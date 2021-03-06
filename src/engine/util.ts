import { Logger } from './logger'


/**
 * https://developers.google.com/web/fundamentals/getting-started/primers/promises
 * @param  {string}       url [description]
 * @return {Promise<any>}     [description]
 */
export function getXMLRequest(url: string): Promise<any> {
    // Return a new promise.
    return new Promise<any>(function(resolve, reject) {
        // Do the usual XHR stuff
        var logger = Logger.getInstance();
        var req = new XMLHttpRequest();


        req.open('GET', url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.readyState === XMLHttpRequest.DONE && req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful erro
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

export class Vector2 {
    public x: number;
    public y: number;

    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }
}

export class cRectangle {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number = 0, y: number = 0, w: number = 1, h: number = 1) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    within(outer_rect: cRectangle): boolean {
        if (outer_rect.x > this.x) {
            // this is not in it;
            return false;
        }
        else if (outer_rect.y > this.y) {
            return false;
        }
        else if (outer_rect.x + outer_rect.w < this.x + this.w) {
            return false;
        }
        else if (outer_rect.y + outer_rect.h < this.y + this.h) {
            return false;
        }
        return true;

    }

    collides(outer_rect: cRectangle): boolean {
        // Logger.getInstance().debug(this, outer_rect);

        return !(
            (this.y + this.h < outer_rect.y) ||
            (this.y > outer_rect.y + outer_rect.h) ||
            (this.x > outer_rect.x + outer_rect.w) ||
            (this.x + this.w < outer_rect.x))
    }
}

/**
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 * @type {[type]}
 */
export function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

/** basic sleep function to be used for async functions */
export function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}


export function SortArray(values: any[]) {
    return values.sort((a, b) => {
        if (a < b) {
            return -1;
        }

        if (a > b) {
            return 1;
        }

        return 0
    });
}

export function CircleCollision(obj1: Vector2, obj2: Vector2, rad1: number, rad2: number): boolean {
    let hit = false;

    // Get distance with Pythagoras
    let squaredist = (obj1.x * obj2.x) + (obj1.y * obj2.y);
    hit = squaredist <= (rad1 + rad2) * (rad1 + rad2);

    return hit;
}
