export function findItemByIds(authorId, itemId, items) {
  return items.filter((item)=> {
    return (item.author_id === authorId && item.id === itemId);
  })[0];
}

export function parseAuthorIdAndEmail(str) {
  const tmp = str.match(/\(.*\)/)[0];
  const email = str.split('(')[0].trim();

  return {
    email,
    name: tmp.slice(1, -1)
  };
}
