export const outlineFromPriority = (priority) => {
  switch (priority) {
    case 1:
      return 'outline-success';
    case 2:
      return 'outline-warning';
    case 3:
      return 'outline-error';
    default:
      return 'outline-info';
  }
}