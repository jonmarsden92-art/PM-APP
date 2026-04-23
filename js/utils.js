function uid() {
  return Math.random().toString(36).substr(2, 9);
}

function dateStr(ts) {
  return new Date(ts).toISOString().split('T')[0];
}
