const doc = document.body,
  curry = require('fj-curry').curry,
  isDom = require('fd-isDom'),
  ifElse = require('fj-ifelse'),
  and = require('fj-and');

require('6to5/polyfill');

export function select(dom, selector) {
  return ifElse(
    () => typeof dom === 'string',
    () => [ ... document.querySelectorAll(dom) ],
    () => ifElse(
      and(isDom(dom),() => !!selector),
      () => [ ... dom.querySelectorAll(selector) ],
      () => curry(select)(dom)
    )
  );
}
