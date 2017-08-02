import { Injectable } from '@angular/core';
import { getMonthView, getWeekViewHeader, getWeekView, getDayView, getDayViewHourGrid } from 'calendar-utils';
var CalendarUtils = (function () {
    function CalendarUtils() {
    }
    CalendarUtils.prototype.getMonthView = function (args) {
        return getMonthView(args);
    };
    CalendarUtils.prototype.getWeekViewHeader = function (args) {
        return getWeekViewHeader(args);
    };
    CalendarUtils.prototype.getWeekView = function (args) {
        return getWeekView(args);
    };
    CalendarUtils.prototype.getDayView = function (args) {
        return getDayView(args);
    };
    CalendarUtils.prototype.getDayViewHourGrid = function (args) {
        return getDayViewHourGrid(args);
    };
    return CalendarUtils;
}());
export { CalendarUtils };
CalendarUtils.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CalendarUtils.ctorParameters = function () { return []; };
//# sourceMappingURL=calendarUtils.provider.js.map