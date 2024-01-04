function processDate(taskDate) {
  const todoDate = new Date(taskDate);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  if (
    `${currentDay}-${currentMonth}-${currentYear}` ===
    `${todoDate.getDate()}-${todoDate.getMonth()}-${todoDate.getFullYear()}`
  ) {
    return "today";
  } else if (
    `${currentDay + 1}-${currentMonth}-${currentYear}` ===
    `${todoDate.getDate()}-${todoDate.getMonth()}-${todoDate.getFullYear()}`
  ) {
    return "tommorow";
  } else if (
    `${currentDay}-${currentMonth}-${currentYear}` >
    `${todoDate.getDate()}-${todoDate.getMonth()}-${todoDate.getFullYear()}`
  ) {
    return "previous";
  }
  return "later";
}

function prioritySort(todoList) {
  // Define the priority order (higher priority first)
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  // Sort the list using the priorityOrder and category
  return todoList.sort((a, b) => {
    const priorityA = priorityOrder[a.priority] || 3; // Default to lowest priority if not specified
    const priorityB = priorityOrder[b.priority] || 3;

    // If priorities are equal, sort by category alphabetically
    if (priorityA === priorityB) {
      const categoryA = a.category || ""; // Default to empty string for missing categories
      const categoryB = b.category || "";
      return categoryA.localeCompare(categoryB);
    }

    // Ensure empty string priority is treated differently from "Low"
    return priorityA !== priorityB ? priorityA - priorityB : -1; // Place empty string priorities before "Low"
  });
}
function sortByDueDate(todos) {
  return todos.sort((a, b) => {
    // Handle missing due dates by placing them at the end
    const dueDateA = a.dueDate || Infinity;
    const dueDateB = b.dueDate || Infinity;

    // Parse dates as Date objects for accurate comparison
    const parsedDateA = new Date(dueDateA);
    const parsedDateB = new Date(dueDateB);

    return parsedDateA - parsedDateB;
  });
}

export function sortTask(tasks) {
  let sortedTask = {
    today: [],
    tommorow: [],
    later: [],
    previous: [],
  };

  tasks.forEach((task) => {
    let status = processDate(task.dueDate);
    if (status === "today") {
      sortedTask.today.push(task);
    } else if (status === "tommorow") {
      sortedTask.tommorow.push(task);
    } else if (status === "previous") {
      sortedTask.previous.push(task);
    } else {
      sortedTask.later.push(task);
    }
  });

  sortedTask.today = prioritySort(sortedTask.today);
  sortedTask.tommorow = prioritySort(sortedTask.tommorow);
  sortedTask.later = sortByDueDate(sortedTask.later);
  return sortedTask;
}
