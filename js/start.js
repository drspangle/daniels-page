document.addEventListener("DOMContentLoaded", function () {
  setupTabs();
  setupSortableTables();
  applyListEdgeClasses();
});

function setupTabs() {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('ul.tabs a[href^="#"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".tab-content"));

  if (!tabs.length || !panels.length) {
    return;
  }

  function panelFor(tab) {
    return document.getElementById(tab.getAttribute("href").slice(1));
  }

  function activateTab(tab, updateHistory) {
    var panel = panelFor(tab);

    if (!panel) {
      return;
    }

    tabs.forEach(function (candidate) {
      var isSelected = candidate === tab;
      var item = candidate.parentElement;
      candidate.setAttribute("aria-selected", String(isSelected));
      candidate.setAttribute("tabindex", isSelected ? "0" : "-1");
      if (item) {
        item.classList.toggle("current", isSelected);
      }
    });

    panels.forEach(function (candidate) {
      candidate.hidden = candidate !== panel;
    });

    if (updateHistory && history.pushState) {
      history.pushState(null, "", tab.getAttribute("href"));
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function (event) {
      event.preventDefault();
      activateTab(tab, true);
    });

    tab.addEventListener("keydown", function (event) {
      var index = tabs.indexOf(tab);
      var nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex], true);
    });
  });

  window.addEventListener("hashchange", function () {
    var requestedTab = tabs.filter(function (tab) {
      return tab.getAttribute("href") === window.location.hash;
    })[0];

    if (requestedTab) {
      activateTab(requestedTab, false);
    }
  });

  var initialTab = tabs.filter(function (tab) {
    return tab.getAttribute("href") === window.location.hash;
  })[0] || tabs[0];

  activateTab(initialTab, false);
}

function setupSortableTables() {
  var tables = Array.prototype.slice.call(document.querySelectorAll("table.sortable"));

  tables.forEach(function (table) {
    var headers = Array.prototype.slice.call(table.querySelectorAll("thead th"));

    headers.forEach(function (header, columnIndex) {
      header.setAttribute("tabindex", "0");
      header.setAttribute("aria-sort", "none");

      function sort() {
        var tbody = table.tBodies[0];
        var rows = Array.prototype.slice.call(tbody.rows);
        var currentSort = header.getAttribute("aria-sort");
        var sortDirection = currentSort === "ascending" ? "descending" : "ascending";
        var direction = sortDirection === "ascending" ? 1 : -1;

        rows.sort(function (left, right) {
          return direction * left.cells[columnIndex].textContent.trim().localeCompare(
            right.cells[columnIndex].textContent.trim(),
            undefined,
            { numeric: true, sensitivity: "base" }
          );
        });

        headers.forEach(function (candidate) {
          candidate.setAttribute("aria-sort", "none");
        });

        header.setAttribute("aria-sort", sortDirection);
        rows.forEach(function (row) {
          tbody.appendChild(row);
        });
        markEdgeRows(table);
      }

      header.addEventListener("click", sort);
      header.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          sort();
        }
      });
    });
  });
}

function applyListEdgeClasses() {
  Array.prototype.slice.call(document.querySelectorAll("table")).forEach(markEdgeRows);
  Array.prototype.slice.call(document.querySelectorAll("ul")).forEach(function (list) {
    markEdgeItems(Array.prototype.slice.call(list.children));
  });
}

function markEdgeRows(table) {
  markEdgeItems(Array.prototype.slice.call(table.querySelectorAll("tr")));
}

function markEdgeItems(items) {
  items.forEach(function (item, index) {
    item.classList.toggle("first", index === 0);
    item.classList.toggle("last", index === items.length - 1);
    item.classList.toggle("alt", index % 2 === 0);
  });
}
