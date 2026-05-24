const MS_PER_DAY = 1000 * 60 * 60 * 24;
const OVERDUE_THRESHOLD_MS = 7 * MS_PER_DAY;

export const getOverdueDays = (borrowedAt?: string) => {
  if (!borrowedAt) {
    return 0;
  }

  // Once the current time passes the checkout time, it is already
  // considered as overdue for that day.
  const elapsedDays = Math.ceil(
    (Date.now() - new Date(borrowedAt).getTime()) / MS_PER_DAY,
  );

  return Math.max(0, elapsedDays - 7);
};

export const getIsOverdue = (borrowedAt: Date) => {
  const elapsedMs = Date.now() - borrowedAt.getTime();
  if (elapsedMs > OVERDUE_THRESHOLD_MS) {
    return true;
  } else {
    return false;
  }
};
