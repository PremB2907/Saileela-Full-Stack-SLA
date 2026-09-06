export function createNumber(prefix) { return `${prefix}-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`; }
