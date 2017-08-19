// Generated by typings
// Source: node_modules/ionic2-calendar/calendar.d.ts
declare module '~MonthViewComponent/calendar' {
import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { CalendarService } from '~MonthViewComponent/calendar.service';
export interface IEvent {
    allDay: boolean;
    endTime: Date;
    startTime: Date;
    title: string;
}
export interface IRange {
    startTime: Date;
    endTime: Date;
}
export interface IView {
}
export interface IDayView extends IView {
    allDayEvents: IDisplayAllDayEvent[];
    rows: IDayViewRow[];
}
export interface IDayViewRow {
    events: IDisplayEvent[];
    time: Date;
}
export interface IMonthView extends IView {
    dates: IMonthViewRow[];
    dayHeaders: string[];
}
export interface IMonthViewRow {
    current?: boolean;
    date: Date;
    events: IEvent[];
    hasEvent?: boolean;
    label: string;
    secondary: boolean;
    selected?: boolean;
    disabled: boolean;
}
export interface IWeekView extends IView {
    dates: IWeekViewDateRow[];
    rows: IWeekViewRow[][];
    dayHeaders: string[];
}
export interface IWeekViewDateRow {
    date: Date;
    events: IDisplayEvent[];
}
export interface IWeekViewRow {
    events: IDisplayEvent[];
    time: Date;
}
export interface IDisplayEvent {
    endIndex: number;
    endOffset?: number;
    event: IEvent;
    startIndex: number;
    startOffset?: number;
    overlapNumber?: number;
    position?: number;
}
export interface IDisplayAllDayEvent {
    event: IEvent;
}
export interface ICalendarComponent {
    currentViewIndex: number;
    direction: number;
    eventSource: IEvent[];
    getRange: {
        (date: Date): IRange;
    };
    getViewData: {
        (date: Date): IView;
    };
    mode: CalendarMode;
    range: IRange;
    views: IView[];
    onDataLoaded: {
        (): void;
    };
    onRangeChanged: EventEmitter<IRange>;
}
export interface ITimeSelected {
    events: IEvent[];
    selectedTime: Date;
    disabled: boolean;
}
export interface IMonthViewDisplayEventTemplateContext {
    view: IView;
    row: number;
    col: number;
}
export interface IMonthViewEventDetailTemplateContext {
    selectedDate: ITimeSelected;
    noEventsLabel: string;
}
export interface IDateFormatter {
    formatMonthViewDay?: {
        (date: Date): string;
    };
    formatMonthViewDayHeader?: {
        (date: Date): string;
    };
    formatMonthViewTitle?: {
        (date: Date): string;
    };
    formatWeekViewDayHeader?: {
        (date: Date): string;
    };
    formatWeekViewTitle?: {
        (date: Date): string;
    };
    formatWeekViewHourColumn?: {
        (date: Date): string;
    };
    formatDayViewTitle?: {
        (date: Date): string;
    };
    formatDayViewHourColumn?: {
        (date: Date): string;
    };
}
export type CalendarMode = 'day' | 'month' | 'week';
export type QueryMode = 'local' | 'remote';
export enum Step {
    QuarterHour = 15,
    HalfHour = 30,
    Hour = 60,
}
export class CalendarComponent implements OnInit {
    private calendarService;
    private locale;
    currentDate: Date;
    eventSource: IEvent[];
    calendarMode: CalendarMode;
    formatDay: string;
    formatDayHeader: string;
    formatDayTitle: string;
    formatWeekTitle: string;
    formatMonthTitle: string;
    formatWeekViewDayHeader: string;
    formatHourColumn: string;
    showEventDetail: boolean;
    startingDayMonth: number;
    startingDayWeek: number;
    allDayLabel: string;
    noEventsLabel: string;
    queryMode: QueryMode;
    step: Step;
    autoSelect: boolean;
    markDisabled: (date: Date) => boolean;
    monthviewDisplayEventTemplate: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    monthviewInactiveDisplayEventTemplate: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    monthviewEventDetailTemplate: TemplateRef<IMonthViewEventDetailTemplateContext>;
    weekviewAllDayEventTemplate: TemplateRef<IDisplayAllDayEvent>;
    weekviewNormalEventTemplate: TemplateRef<IDisplayEvent>;
    dayviewAllDayEventTemplate: TemplateRef<IDisplayAllDayEvent>;
    dayviewNormalEventTemplate: TemplateRef<IDisplayEvent>;
    dateFormatter: IDateFormatter;
    dir: string;
    scrollToHour: number;
    preserveScrollPosition: boolean;
    lockSwipeToPrev: boolean;
    lockSwipes: boolean;
    onCurrentDateChanged: EventEmitter<Date>;
    onRangeChanged: EventEmitter<IRange>;
    onEventSelected: EventEmitter<IEvent>;
    onTimeSelected: EventEmitter<ITimeSelected>;
    onTitleChanged: EventEmitter<string>;
    private _currentDate;
    private hourParts;
    private currentDateChangedFromChildrenSubscription;
    constructor(calendarService: CalendarService, locale: string);
    ngOnInit(): void;
    ngOnDestroy(): void;
    rangeChanged(range: IRange): void;
    eventSelected(event: IEvent): void;
    timeSelected(timeSelected: ITimeSelected): void;
    titleChanged(title: string): void;
    loadEvents(): void;
}
}
declare module 'MonthViewComponent/calendar' {
export * from '~MonthViewComponent/calendar';
}

// Generated by typings
// Source: node_modules/ionic2-calendar/calendar.service.d.ts
declare module '~MonthViewComponent/calendar.service' {
import { Observable } from 'rxjs/Observable';
import { ICalendarComponent, CalendarMode, QueryMode } from '~MonthViewComponent/calendar';
export class CalendarService {
    queryMode: QueryMode;
    currentDateChangedFromParent$: Observable<Date>;
    currentDateChangedFromChildren$: Observable<Date>;
    eventSourceChanged$: Observable<void>;
    private _currentDate;
    private currentDateChangedFromParent;
    private currentDateChangedFromChildren;
    private eventSourceChanged;
    constructor();
    setCurrentDate(val: Date, fromParent?: boolean): void;
    readonly currentDate: Date;
    rangeChanged(component: ICalendarComponent): void;
    private getStep(mode);
    getAdjacentCalendarDate(mode: CalendarMode, direction: number): Date;
    getAdjacentViewStartTime(component: ICalendarComponent, direction: number): Date;
    populateAdjacentViews(component: ICalendarComponent): void;
    loadEvents(): void;
}
}
declare module 'MonthViewComponent/calendar.service' {
export * from '~MonthViewComponent/calendar.service';
}

// Generated by typings
// Source: node_modules/ionic2-calendar/monthview.d.ts
declare module '~MonthViewComponent/monthview' {
import { OnInit, OnChanges, EventEmitter, SimpleChanges, TemplateRef } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ICalendarComponent, IEvent, IMonthView, IMonthViewRow, ITimeSelected, IRange, CalendarMode, IDateFormatter } from '~MonthViewComponent/calendar';
import { CalendarService } from '~MonthViewComponent/calendar.service';
import { IMonthViewDisplayEventTemplateContext } from '~MonthViewComponent/calendar';
export class MonthViewComponent implements ICalendarComponent, OnInit, OnChanges {
    private calendarService;
    slider: Slides;
    monthviewDisplayEventTemplate: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    monthviewInactiveDisplayEventTemplate: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    monthviewEventDetailTemplate: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    formatDay: string;
    formatDayHeader: string;
    formatMonthTitle: string;
    eventSource: IEvent[];
    startingDayMonth: number;
    showEventDetail: boolean;
    noEventsLabel: string;
    autoSelect: boolean;
    markDisabled: (date: Date) => boolean;
    locale: string;
    dateFormatter: IDateFormatter;
    dir: string;
    lockSwipeToPrev: boolean;
    lockSwipes: boolean;
    onRangeChanged: EventEmitter<IRange>;
    onEventSelected: EventEmitter<IEvent>;
    onTimeSelected: EventEmitter<ITimeSelected>;
    onTitleChanged: EventEmitter<string>;
    views: IMonthView[];
    currentViewIndex: number;
    selectedDate: IMonthViewRow;
    range: IRange;
    mode: CalendarMode;
    direction: number;
    private moveOnSelected;
    private inited;
    private callbackOnInit;
    private currentDateChangedFromParentSubscription;
    private eventSourceChangedSubscription;
    private formatDayLabel;
    private formatDayHeaderLabel;
    private formatTitle;
    constructor(calendarService: CalendarService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    onSlideChanged(): void;
    move(direction: number): void;
    createDateObject(date: Date): IMonthViewRow;
    static getDates(startDate: Date, n: number): Date[];
    getViewData(startTime: Date): IMonthView;
    getHighlightClass(date: IMonthViewRow): string;
    getRange(currentDate: Date): IRange;
    onDataLoaded(): void;
    refreshView(): void;
    getTitle(): string;
    private compareEvent(event1, event2);
    select(viewDate: IMonthViewRow): void;
    slideView(direction: number): void;
    updateCurrentView(currentViewStartDate: Date, view: IMonthView): void;
    eventSelected(event: IEvent): void;
}
}
declare module 'MonthViewComponent/monthview' {
export * from '~MonthViewComponent/monthview';
}
declare module 'MonthViewComponent' {
export * from '~MonthViewComponent/monthview';
}