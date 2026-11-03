// Seleção de variante para testes A/B de título e CTA sem reconstruir a página.
// ?v=b na URL escolhe a variante "b"; a escolha persiste durante a sessão.
export function pickVariant<T>(variants: Record<string, T>, page: string): { key: string; value: T } {
  const storageKey = `salet.variant.${page}`;
  let key = new URLSearchParams(location.search).get('v') ?? '';
  try {
    if (key && variants[key]) sessionStorage.setItem(storageKey, key);
    else key = sessionStorage.getItem(storageKey) ?? '';
  } catch { /* sem armazenamento */ }
  if (!variants[key]) key = Object.keys(variants)[0];
  return { key, value: variants[key] };
}
