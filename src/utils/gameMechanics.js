
export function canReinforceNode(user, node, power) {
  return node.ownerId === user.id && node.power + power <= node.maxPower;
}

export function canAttackNode(user, node) {
  return node.ownerId !== user.id;
}
