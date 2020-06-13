import * as R from 'ramda';
import { Maybe } from 'ramda-fantasy'

Object.getPrototypeOf(Maybe.Just(1)).map = function (f) {
    return Maybe(f(this.value));
}

export const fst = R.nth(0);
export const snd = R.nth(1);

export { Maybe };