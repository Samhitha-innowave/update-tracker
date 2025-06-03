import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { useTaskManager } from "../../hooks/useTaskManager"; // ✅ Added

export default function TaskItem({ task, updateTask, saveCompletion, editingTaskId, setEditingTaskId }) {
  const [entryType, setEntryType] = useState("note");
  const [entryValue, setEntryValue] = useState("");
  const [linkTitle, setLinkTitle] = useState("");

  const { completeTask } = useTaskManager(); // ✅ Now you have access to completeTask

  const renderDynamicInput = () => {
    switch (entryType) {
      case "link":
        return (
          <>
            <input
              type="text"
              placeholder="Link Title"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Paste Link"
              value={entryValue}
              onChange={(e) => setEntryValue(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-2"
            />
          </>
        );
      case "jobId":
        return (
          <input
            type="text"
            placeholder="Enter Job ID"
            value={entryValue}
            onChange={(e) => setEntryValue(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        );
      case "code":
        return (
          <textarea
            placeholder="Paste Code"
            value={entryValue}
            onChange={(e) => setEntryValue(e.target.value)}
            className="w-full px-3 py-2 font-mono border rounded bg-gray-100"
            rows={4}
          />
        );
      case "note":
      default:
        return (
          <textarea
            placeholder="Write a note"
            value={entryValue}
            onChange={(e) => setEntryValue(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={2}
          />
        );
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">{task.title}</h2>

      {task.completed ? (
        <div className="space-y-2">
          {task.jobId && (
            <div>
              <span className="text-xs text-gray-500">Job ID:</span>
              <p className="text-sm">{task.jobId}</p>
            </div>
          )}

          {task.executionLink && (
            <div>
              <span className="text-xs text-gray-500">Link:</span>
              <a
                href={task.executionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                {task.linkTitle || "Open Link"} <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          )}

          {task.codeSnippet && (
            <div>
              <span className="text-xs text-gray-500">Code:</span>
              <pre className="text-sm bg-gray-100 p-2 rounded whitespace-pre-wrap overflow-auto">
                {task.codeSnippet}
              </pre>
            </div>
          )}

          {task.completionNotes && (
            <div>
              <span className="text-xs text-gray-500">Note:</span>
              <p className="text-sm">{task.completionNotes}</p>
            </div>
          )}
        </div>
      ) : editingTaskId === task.id ? (
        <div className="mt-3 space-y-3 w-full">
          <select
            value={entryType}
            onChange={(e) => {
              setEntryType(e.target.value);
              setEntryValue("");
              setLinkTitle("");
            }}
            className="w-full px-3 py-2 border rounded bg-white"
          >
            <option value="note">Note</option>
            <option value="jobId">Job ID</option>
            <option value="link">Link</option>
            <option value="code">Code</option>
          </select>

          {renderDynamicInput()}

          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                const payload = {};
                if (entryType === "link") {
                  payload.executionLink = entryValue;
                  payload.linkTitle = linkTitle;
                } else if (entryType === "jobId") {
                  payload.jobId = entryValue;
                } else if (entryType === "code") {
                  payload.codeSnippet = entryValue;
                } else {
                  payload.completionNotes = entryValue;
                }

                updateTask(task.id, payload);
                saveCompletion(task.id);
                setEditingTaskId(null);
                setEntryValue("");
                setLinkTitle("");
              }}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Completion
            </button>
            <button
              onClick={() => setEditingTaskId(null)}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => completeTask(task.id)}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Complete Task
        </button>
      )}
    </div>
  );
}
