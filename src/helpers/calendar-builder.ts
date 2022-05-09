import moment, { Moment } from 'moment';

export type DayType = {
	day: Moment;
	isCurrent: boolean;
	isToday: boolean;
};

export type MonthType = Array<{
	week: number;
	days: Array<DayType>;
}>;

export type Month = {
	title: string;
	dayInMonth: number;
	days: Array<Moment>;
};

const fillMonthCalendar = (
	week: number,
	date: Moment
): {
	week: number;
	days: Array<DayType>;
} => {
	const days = Array(7)
		.fill(0)
		.map((n, index) =>
			date
				.clone()
				.week(week)
				.startOf('week')
				.clone()
				.add(n + index, 'day')
		);

	return {
		week,
		days: days.map((day) => {
			return {
				day,
				isCurrent: day.month() === date.month(),
				isToday: day.isSame(moment(), 'day'),
			};
		}),
	};
};

export function buildMonthCalendar(date: Moment = moment()): MonthType {
	const endWeek = date.endOf('months').week();
	const startWeek = date.startOf('months').week();
	const weeks = date.weeksInYear();
	const calendar = [];

	if (startWeek > endWeek) {
		for (let week = startWeek; week <= endWeek + weeks; week++) {
			calendar.push(fillMonthCalendar(week, date));
		}
		return calendar;
	}
	for (let week = startWeek; week <= endWeek; week++) {
		calendar.push(fillMonthCalendar(week, date));
	}
	return calendar;
}
