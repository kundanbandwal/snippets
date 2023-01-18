export function formatShortDate(date?: string | Date | null): string {
  if (!date) {
    return '';
  }
  return new Date(date).toLocaleDateString('en-In', {
    // year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDate(date?: string | Date | null): string {
  if (!date) {
    return '';
  }
  return new Date(date).toLocaleDateString('en-In', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  });
}
export function formatMonthNum(date?: string | Date | null): string {
  if (!date) {
    return '';
  }
  return new Date(date).toLocaleDateString('en-In', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}
export function formatLongDate(date?: string | Date | null): string {
  if (!date) {
    return '';
  }
  return new Date(date).toLocaleDateString('en-In', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getDayOfWeek(date: string | Date): string | undefined {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
    ? undefined
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
        dayOfWeek
      ];
}

export function formatDateRange(
  startDate: string | Date,
  endDate: string | Date,
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start.getFullYear() == end.getFullYear()) {
    const year = start.getFullYear();
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    if (start.getMonth() == end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} ${startMonth} ${year}`;
    }
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${year}`;
  }
  return `${formatShortDate(start)} - ${formatShortDate(end)}`;
}

export function formatAMPM(date?: string | Date | any): string | undefined {
  if (!date) {
    return '';
  }
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return time.replace(/\s/g, '');
}

export function getTommorrowDate(): Date {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

export function extractTimeFromDate(date?: string | Date | any): string | undefined {
  if (!date) {
    return '';
  }
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    // timeZone: 'UTC',
  });
}

export function addMonths(date: Date, months: number) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}
export const isValidate = (d: unknown) => d && d instanceof Date && !isNaN(d.getTime());
