import dayjs, { Dayjs } from 'dayjs';
import db from '../lib/db-client';

export class FinancialMonth {
  month: number;
  year: number;

  constructor(month: number, year: number) {
    this.month = month;
    this.year = year;
  }

  static fromDate(firstDay: number, date: Dayjs) {
    const month = date.date() < firstDay ? (date.month() + 11) % 12 : date.month();
    const year = date.date() < firstDay && date.month() === 0 ? date.year() - 1 : date.year();

    return new FinancialMonth(month, year);
  }

  addMonths(months: number) {
    const month = (this.month + months) % 12;
    const year = this.year + Math.floor((this.month + months) / 12);

    return new FinancialMonth(month, year);
  }

  subtractMonths(months: number) {
    const month = (12 + ((this.month - months) % 12)) % 12;
    const year = this.year + Math.floor((this.month - months) / 12);

    return new FinancialMonth(month, year);
  }
}

export class MonthRange {
  from: Dayjs;
  to: Dayjs;

  constructor(from: Dayjs, to: Dayjs) {
    this.from = from;
    this.to = to;
  }

  static fromMonth(firstDay: number, financialMonth: FinancialMonth): MonthRange {
    let date = dayjs().utc().startOf('day').date(firstDay).month(financialMonth.month).year(financialMonth.year);
    const from = date.date() === firstDay ? date : date.add(1, 'day');

    const nextMonth = (financialMonth.month + 1) % 12;
    const nextYear = financialMonth.year + (financialMonth.month === 11 ? 1 : 0);

    date = dayjs().utc().startOf('day').date(firstDay).month(nextMonth).year(nextYear);
    const to = date.date() === firstDay ? date.subtract(1, 'day') : date;

    return new MonthRange(from, to);
  }

  static fromDate(firstDay: number, date: Dayjs): MonthRange {
    return this.fromMonth(firstDay, FinancialMonth.fromDate(firstDay, date));
  }

  toArray(): [Dayjs, Dayjs] {
    return [this.from, this.to];
  }

  toDateArray(): [Date, Date] {
    return [this.from.toDate(), this.to.toDate()];
  }
}

export const monthSeries = (firstDay: number, from: Dayjs, to: Dayjs = dayjs.utc()): MonthRange[] => {
  const dates: MonthRange[] = [];

  let financialMonth = FinancialMonth.fromDate(firstDay, from);
  let financialRange = MonthRange.fromMonth(firstDay, financialMonth);
  while (financialRange.from.isBefore(to)) {
    dates.push(financialRange);

    financialMonth = financialMonth.addMonths(1);
    financialRange = MonthRange.fromMonth(firstDay, financialMonth);
  }

  return dates;
};

export const dbMonthSeries = (firstDay: number, from: Dayjs, to: Dayjs = dayjs.utc()) => {
  const months = monthSeries(firstDay, from, to);
  const financialMonths = months.map(month => FinancialMonth.fromDate(firstDay, month.from));

  return db.raw(`
    unnest(
      ARRAY [${months.map(date => `'${date.from.format('YYYY-MM-DD')}'::timestamp`).join(',')}]::timestamp[],
      ARRAY [${months.map(date => `'${date.to.format('YYYY-MM-DD')}'::timestamp`).join(',')}]::timestamp[],
      ARRAY [${financialMonths.map(month => `${month.month}`).join(',')}]::integer[],
      ARRAY [${financialMonths.map(month => `${month.year}`).join(',')}]::integer[]
      ) as month("from", "to", "month", "year")
  `);
};
