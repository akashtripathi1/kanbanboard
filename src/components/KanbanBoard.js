import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Filter from "./Filter";

const KanbanBoard = () => {
  const tasks = useSelector((state) => state.tasks.data);
  const users = useSelector((state) => state.users.data);
  const groupBy = useSelector((state) => state.filters.groupBy);
  const sortBy = useSelector((state) => state.filters.sortBy);
  const statuses = ["Todo", "In progress", "Done", "Backlog", "Cancelled"];

  const getPriorityLabel = (priority) => {
    const labels = ["No priority", "Low", "Medium", "High", "Urgent"];
    return labels[priority] || "Unknown";
  };

  const groupTasks = (tasks, groupBy) =>
    tasks.reduce((groups, task) => {
      const group = task[groupBy] || "Uncategorized";
      groups[group] = groups[group] || [];
      groups[group].push(task);
      return groups;
    }, {});

  const sortTasks = (tasks, sortBy) =>
    tasks.sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const renderGroupedTasks = () => {
    const groupedTasks = groupTasks(tasks, groupBy);
    if (groupBy === "status") {
      return statuses.map(status => ({
        group: status,
        tasks: sortTasks(groupedTasks[status] || [], sortBy),
      }));
    } else if (groupBy === "userId") {
      return users.map(user => ({
        group: user.name,
        tasks: sortTasks(groupedTasks[user.id] || [], sortBy),
      }));
    } else if (groupBy === "priority") {
      return [4, 3, 2, 1, 0].map(priority => ({
        group: getPriorityLabel(priority),
        tasks: sortTasks(groupedTasks[priority] || [], sortBy),
      }));
    }
    return [];
  };

  // Tooltip visibility state
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null); // Ref for the tooltip

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    const eventHandler = showTooltip ? "addEventListener" : "removeEventListener";
    document[eventHandler]("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <div className="kanban-board">
      <Filter
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
        tooltipRef={tooltipRef}
      />

      <div className="kanban-columns">
        {renderGroupedTasks().map((group, index) => (
          <div key={index} className="kanban-column">
            <div className="flex">
              <h3 style={{ textAlign: "left" }}>
                <img
                  style={{ marginRight: "0.5rem", borderRadius: "50%", width: "1.5rem", height: "1.5rem" }}
                  src={`assets/${groupBy === "userId" ? "avatar" : group.group}.svg`}
                  alt={group.group}
                />
                {group.group}
                <span className="greyish" style={{ marginLeft: "0.5rem" }}>{group.tasks.length}</span>
              </h3>
            </div>

            {group.tasks.map(task => (
              <div key={task.id} className="kanban-card">
                <h4 className="greyish">{task.id}</h4>
                <div style={{ maxWidth: "92%", display: "flex" }}>
                  <img
                    style={{ height: "0.84rem", width: "0.84rem", marginTop: "0.2rem", marginRight: "0.4rem" }}
                    src={`assets/${task.status}.svg`}
                    alt={task.status}
                  />
                  <h4 className="truncate" style={{ textAlign: "left" }}>{task.title}</h4>
                </div>
                <div className="flex">
                  <div
                    className="priority flex"
                    style={{ marginRight: "0.5rem" }}
                  >
                    <img
                      style={{ height: "1.0rem", width: "1.0rem" }}
                      src={`assets/${getPriorityLabel(task.priority)}.svg`}
                      alt={getPriorityLabel(task.priority)}
                    />
                  </div>

                  {task.tag && (
                    <div className="tags">
                      {task.tag.map((tag, index) => (
                        <span key={index} className="tag flex">
                          <span className="greycircle"></span> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
