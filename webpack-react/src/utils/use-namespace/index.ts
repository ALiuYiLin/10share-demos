type Styles = Record<string, string> | undefined;
const NAME_SPACE = "wr";
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace ? namespace + "-" : ""}${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

function toCamelCase(name: string) {
  const parts = name.split(/(?:__|--|[-_]+)/);
  return (
    parts[0] +
    parts
      .slice(1)
      .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
      .join("")
  );
}

function map(styles: Styles, name: string) {
  const camel = toCamelCase(name);
  return styles?.[camel] ?? styles?.[name] ?? name;
}

const statePrefix = "is-";

export function useNameSpace(styles: Styles, block: string) {
  const namespace = NAME_SPACE;
  const b = (blockSuffix = "") =>
    map(styles, _bem(namespace, block, blockSuffix, "", ""));
  const e = (element?: string) =>
    element ? map(styles, _bem(namespace, block, "", element, "")) : "";
  const m = (modifier?: string) =>
    modifier ? map(styles, _bem(namespace, block, "", "", modifier)) : "";
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? map(styles, _bem(namespace, block, blockSuffix, element, ""))
      : "";
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? map(styles, _bem(namespace, block, "", element, modifier))
      : "";
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? map(styles, _bem(namespace, block, blockSuffix, "", modifier))
      : "";
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? map(styles, _bem(namespace, block, blockSuffix, element, modifier))
      : "";
  const is: {
    (name: string, state: boolean | undefined): string;
    (name: string): string;
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true;
    return name && state ? `${statePrefix}${name}` : "";
  };
  const cx = (...names: string[]) =>
    names
      .map((n) => map(styles, n))
      .filter(Boolean)
      .join(" ");

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    cx,
  };
}
