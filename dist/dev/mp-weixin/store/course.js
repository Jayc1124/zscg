"use strict";
var common_vendor = require("../common/vendor.js");
require("../modules/pinia.js");
const weekTitle = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"];
const courseTimeList = [
  { s: "08:30", e: "08:50" },
  { s: "08:55", e: "10:05" },
  { s: "10:15", e: "11:05" },
  { s: "11:10", e: "11:55" },
  { s: "14:00", e: "14:50" },
  { s: "14:55", e: "15:45" },
  { s: "16:15", e: "17:05" },
  { s: "17:10", e: "18:00" },
  { s: "19:00", e: "19:50" },
  { s: "19:55", e: "20:45" }
];
const colorMap = /* @__PURE__ */ new Map();
const colorArrayList = [
  ["#CE7CF4", "#FF7171", "#66CC99", "#FF9966", "#66CCCC", "#6699CC", "#99CC99", "#669966", "#66CCFF", "#99CC66", "#FF9999", "#81CC74"],
  ["#99CCFF", "#FFCC99", "#CCCCFF", "#99CCCC", "#A1D699", "#7397db", "#ff9983", "#87D7EB", "#99CC99"]
];
const conflictCourseMap = /* @__PURE__ */ new Map();
const useCourseStore = common_vendor.defineStore("course", () => {
  const startDate = common_vendor.ref(new Date());
  const weekNum = common_vendor.ref(20);
  const courseList = common_vendor.ref([]);
  const currentMonth = common_vendor.ref(0);
  const originalWeekIndex = common_vendor.ref(0);
  const currentWeekIndex = common_vendor.ref(0);
  const originalWeekWeekIndex = common_vendor.ref(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const colorArrayIndex = common_vendor.ref(0);
  function setCourseList(newCourseList) {
    conflictCourseMap.clear();
    courseList.value = newCourseList;
    resetCourseBgColor();
  }
  const weekCourseList = common_vendor.computed$1(() => courseList.value && courseList.value.filter((item) => item.weeks.includes(currentWeekIndex.value + 1)));
  const parsedCourseList = common_vendor.computed$1(() => {
    const pCourseList = Array.from({ length: weekNum.value }, () => Array.from({ length: 7 }, () => Array.from({ length: 5 }, () => 0)));
    if (courseList.value) {
      for (const courseItem of courseList.value) {
        const { start, duration, week, weeks } = courseItem;
        for (const w of weeks) {
          const dayCourseList = pCourseList[w - 1][week - 1];
          dayCourseList[Math.floor(start / 2)]++;
          if (duration > 2)
            dayCourseList[Math.floor(start / 2 + 1)]++;
        }
      }
    }
    return pCourseList;
  });
  const currentWeekDayArray = common_vendor.computed$1(() => {
    const weekIndex = currentWeekIndex.value;
    const someDate = new Date(startDate.value);
    someDate.setDate(someDate.getDate() + weekIndex * 7);
    const dayArray = [];
    dayArray.push(someDate.getDate());
    for (let i = 0; i < 6; i++) {
      someDate.setDate(someDate.getDate() + 1);
      dayArray.push(someDate.getDate());
    }
    return dayArray;
  });
  function getConflictCourse(courseItem) {
    if (!courseItem)
      return [];
    const { week, start } = courseItem;
    return courseList.value.filter((item) => {
      return item.weeks.includes(currentWeekIndex.value + 1) && item.week === week && item.start === start;
    });
  }
  function hasConflictCourseByMap(courseItem) {
    if (!conflictCourseMap.has(courseItem))
      conflictCourseMap.set(courseItem, getConflictCourse(courseItem));
    return conflictCourseMap.get(courseItem) || [];
  }
  function setStartDay(someDate) {
    startDate.value = new Date(someDate);
    const days = new Date().getTime() - startDate.value.getTime();
    originalWeekIndex.value = Math.floor(days / (1e3 * 60 * 60 * 24) / 7);
    setCurrentWeekIndex(originalWeekIndex.value);
  }
  function setCurrentWeekIndex(weekIndex) {
    conflictCourseMap.clear();
    currentWeekIndex.value = weekIndex;
    const someDate = new Date(startDate.value);
    someDate.setDate(someDate.getDate() + weekIndex * 7);
    currentMonth.value = someDate.getMonth() + 1;
  }
  function resetCourseBgColor() {
    colorMap.clear();
    if (courseList.value) {
      courseList.value.map((courseItem) => Object.assign(courseItem, { bgColor: getCourseBgColor(courseItem) }));
    }
  }
  function getCourseBgColor(courseItem) {
    const colorArray = colorArrayList[colorArrayIndex.value];
    const { title } = courseItem;
    if (!colorMap.has(title))
      colorMap.set(title, colorArray[colorMap.size % colorArray.length]);
    return colorMap.get(title) || "#FFFFFF";
  }
  common_vendor.watch(() => colorArrayIndex.value, () => resetCourseBgColor());
  function setCourseItemTop(courseItem) {
    deleteCourseItem(courseItem);
    courseList.value.unshift(courseItem);
  }
  function deleteCourseItem(courseItem) {
    conflictCourseMap.clear();
    const { title, week, start } = courseItem;
    for (let i = 0; i < courseList.value.length; i++) {
      const item = courseList.value[i];
      if (item.title === title && item.week === week && item.start === start)
        courseList.value.splice(i, 1);
    }
  }
  function deleteCourseItemByTitle(courseTitle) {
    conflictCourseMap.clear();
    for (let i = 0; i < courseList.value.length; i++) {
      const item = courseList.value[i];
      if (item.title === courseTitle)
        courseList.value.splice(i, 1);
    }
  }
  return {
    startDate,
    currentMonth,
    courseList,
    setCourseList,
    weekCourseList,
    parsedCourseList,
    originalWeekIndex,
    currentWeekIndex,
    originalWeekWeekIndex,
    currentWeekDayArray,
    colorArrayIndex,
    setStartDay,
    setCurrentWeekIndex,
    getConflictCourse,
    hasConflictCourseByMap,
    setCourseItemTop,
    deleteCourseItem,
    deleteCourseItemByTitle
  };
});
exports.colorArrayList = colorArrayList;
exports.courseTimeList = courseTimeList;
exports.useCourseStore = useCourseStore;
exports.weekTitle = weekTitle;
