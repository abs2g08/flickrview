export function findItemByIds(authorId, itemId, items) {
  return items.filter((item)=> {
    return (item.author_id === authorId && item.id === itemId);
  })[0];
}
