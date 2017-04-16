/**
 * https://developers.google.com/web/fundamentals/getting-started/primers/promises
 * @param  {string}       url [description]
 * @return {Promise<any>}     [description]
 */
export function getXMLRequest(url: string): Promise<any> {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
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
        // which will hopefully be a meaningful error
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
}