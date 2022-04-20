function flatten(tree) {
  if (Array.isArray(tree)) {
    return tree;
  } else {
    return Object.values(tree).map(flatten).flat();
  }
}

export { flatten };
