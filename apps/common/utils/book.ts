export const getOverdueDays = (borrowedAt?: string) => {
  if (!borrowedAt) {
    return 0;
  }

  const msPerDay = 1000 * 60 * 60 * 24;

  // Once the current time passes the checkout time, it is already
  // considered as overdue for that day.
  const elapsedDays = Math.ceil(
    (Date.now() - new Date(borrowedAt).getTime()) / msPerDay,
  );

  return Math.max(0, elapsedDays - 7);
};
