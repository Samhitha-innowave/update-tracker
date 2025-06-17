// ✅ Fixed TaskItem.js
import { useState } from "react";
import { ExternalLink } from "lucide-react";

export default function TaskItem({ task, updateTask, saveCompletion, completeTask, editingTaskId, setEditingTaskId }) {
  const [entryType, setEntryType] = useState("note");
  const [entryValue, setEntryValue] = useState("");
  const [linkTitle, setLinkTitle] = useState("");

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
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Paste Link"
              value={entryValue}
              onChange={(e) => setEntryValue(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mt-2"
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
            className="w-full px-3 py-2 border rounded-md"
          />
        );
      case "code":
        return (
          <textarea
            placeholder="Paste Code"
            value={entryValue}
            onChange={(e) => setEntryValue(e.target.value)}
            className="w-full px-3 py-2 font-mono border rounded-md bg-gray-100"
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
            className="w-full px-3 py-2 border rounded-md"
            rows={2}
          />
        );
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-6 transition hover:shadow-2xl">
      <h2 className="text-xl font-medium text-gray-800 mb-3">{task.title}</h2>

      {task.status === 'completed' ? (
        <div className="space-y-3 text-sm text-gray-700">
          {task.jobId && (
            <div>
              <span className="font-semibold text-xs text-gray-500">Job ID:</span>
              <p>{task.jobId}</p>
            </div>
          )}

          {task.executionLink && (
            <div>
              <span className="font-semibold text-xs text-gray-500">Link:</span>
              <a
                href={task.executionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                {task.linkTitle || "Open Link"} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {task.codeSnippet && (
            <div>
              <span className="font-semibold text-xs text-gray-500">Code:</span>
              <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap overflow-auto text-xs">
                {task.codeSnippet}
              </pre>
            </div>
          )}

          {task.completionNotes && (
            <div>
              <span className="font-semibold text-xs text-gray-500">Note:</span>
              <p>{task.completionNotes}</p>
            </div>
          )}
        </div>
      ) : editingTaskId === task.id ? (
        <div className="mt-4 space-y-3">
          <select
            value={entryType}
            onChange={(e) => {
              setEntryType(e.target.value);
              setEntryValue("");
              setLinkTitle("");
            }}
            className="w-full px-3 py-2 border rounded-md bg-white"
          >
            <option value="note">Note</option>
            <option value="jobId">Job ID</option>
            <option value="link">Link</option>
            <option value="code">Code</option>
          </select>

          {renderDynamicInput()}

          <div className="flex justify-end gap-2 pt-2">
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
              className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setEditingTaskId(null)}
              className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => completeTask(task.id)}
          className="mt-3 text-sm text-blue-600 hover:underline"
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
}
