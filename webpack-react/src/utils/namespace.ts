type Styles = Record<string, string> | undefined;

function toCamelCase(name: string) {
  const parts = name.split(/(?:__|--|[-_]+)/);
  return parts[0] + parts.slice(1).map(s => (s ? s[0].toUpperCase() + s.slice(1) : s)).join("");
}

function map(styles: Styles, name: string) {
  const camel = toCamelCase(name);
  return styles?.[camel] ?? styles?.[name] ?? name;
}

export function useNameSpace(styles: Styles, block: string) {
  const b = (suffix?: string) => map(styles, suffix ? `${block}-${suffix}` : block);
  const e = (el: string) => map(styles, `${block}__${el}`);
  const m = (mod: string) => map(styles, `${block}--${mod}`);
  const be = (el: string) => map(styles, `${block}__${el}`);
  const bem = (el: string, mod?: string) => map(styles, `${block}__${el}${mod ? `--${mod}` : ""}`);
  const cx = (...names: string[]) => names.map(n => map(styles, n)).join(" ");

  return { b, e, m, be, bem, cx };
}
