"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbMonthSeries = exports.monthSeries = exports.MonthRange = exports.FinancialMonth = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var db_client_1 = __importDefault(require("../lib/db-client"));
var FinancialMonth = /** @class */ (function () {
    function FinancialMonth(month, year) {
        this.month = month;
        this.year = year;
    }
    FinancialMonth.fromDate = function (firstDay, date) {
        var month = date.date() < firstDay ? (date.month() + 11) % 12 : date.month();
        var year = date.date() < firstDay && date.month() === 0 ? date.year() - 1 : date.year();
        return new FinancialMonth(month, year);
    };
    FinancialMonth.prototype.addMonths = function (months) {
        var month = (this.month + months) % 12;
        var year = this.year + Math.floor((this.month + months) / 12);
        return new FinancialMonth(month, year);
    };
    FinancialMonth.prototype.subtractMonths = function (months) {
        var month = (12 + ((this.month - months) % 12)) % 12;
        var year = this.year + Math.floor((this.month - months) / 12);
        return new FinancialMonth(month, year);
    };
    return FinancialMonth;
}());
exports.FinancialMonth = FinancialMonth;
var MonthRange = /** @class */ (function () {
    function MonthRange(from, to) {
        this.from = from;
        this.to = to;
    }
    MonthRange.fromMonth = function (firstDay, financialMonth) {
        var date = (0, dayjs_1.default)().utc().startOf('day').date(firstDay).month(financialMonth.month).year(financialMonth.year);
        var from = date.date() === firstDay ? date : date.add(1, 'day');
        var nextMonth = (financialMonth.month + 1) % 12;
        var nextYear = financialMonth.year + (financialMonth.month === 11 ? 1 : 0);
        date = (0, dayjs_1.default)().utc().startOf('day').date(firstDay).month(nextMonth).year(nextYear);
        var to = date.date() === firstDay ? date.subtract(1, 'day') : date;
        return new MonthRange(from, to);
    };
    MonthRange.fromDate = function (firstDay, date) {
        return this.fromMonth(firstDay, FinancialMonth.fromDate(firstDay, date));
    };
    MonthRange.prototype.toArray = function () {
        return [this.from, this.to];
    };
    MonthRange.prototype.toDateArray = function () {
        return [this.from.toDate(), this.to.toDate()];
    };
    return MonthRange;
}());
exports.MonthRange = MonthRange;
var monthSeries = function (firstDay, from, to) {
    if (to === void 0) { to = dayjs_1.default.utc(); }
    var dates = [];
    var financialMonth = FinancialMonth.fromDate(firstDay, from);
    var financialRange = MonthRange.fromMonth(firstDay, financialMonth);
    while (financialRange.from.isBefore(to)) {
        dates.push(financialRange);
        financialMonth = financialMonth.addMonths(1);
        financialRange = MonthRange.fromMonth(firstDay, financialMonth);
    }
    return dates;
};
exports.monthSeries = monthSeries;
var dbMonthSeries = function (firstDay, from, to) {
    if (to === void 0) { to = dayjs_1.default.utc(); }
    var months = (0, exports.monthSeries)(firstDay, from, to);
    var financialMonths = months.map(function (month) { return FinancialMonth.fromDate(firstDay, month.from); });
    return db_client_1.default.raw("\n    unnest(\n      ARRAY [".concat(months.map(function (date) { return "'".concat(date.from.format('YYYY-MM-DD'), "'::timestamp"); }).join(','), "]::timestamp[],\n      ARRAY [").concat(months.map(function (date) { return "'".concat(date.to.format('YYYY-MM-DD'), "'::timestamp"); }).join(','), "]::timestamp[],\n      ARRAY [").concat(financialMonths.map(function (month) { return "".concat(month.month); }).join(','), "]::integer[],\n      ARRAY [").concat(financialMonths.map(function (month) { return "".concat(month.year); }).join(','), "]::integer[]\n      ) as month(\"from\", \"to\", \"month\", \"year\")\n  "));
};
exports.dbMonthSeries = dbMonthSeries;
//# sourceMappingURL=dates.js.map