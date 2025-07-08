// src/components/TaskTracker/TaskItem.js
import { useState } from "react";
// import { ExternalLink } from "lucide-react";

export default function TaskItem({
  task,
  updateTask,
  saveCompletion,
  completeTask,
  editingTaskId,
  setEditingTaskId
}) {
  const [entryType, setEntryType] = useState("note");
  const [entryValue, setEntryValue] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(task.title);
  const [showDetails, setShowDetails] = useState(false);

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

  const saveTitle = () => {
    updateTask(task.id, { title: titleDraft });
    setIsEditingTitle(false);
  };

  const renderDetails = () => (
    <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-2 shadow-inner">
      <p><strong>Status:</strong> {task.status}</p>
      {task.description && <p><strong>Description:</strong> {task.description}</p>}
      {task.jobId && <p><strong>Job ID:</strong> {task.jobId}</p>}
      {task.executionLink && (
        <p>
          <strong>Link:</strong>{" "}
          <a href={task.executionLink} className="text-blue-600 underline" target="_blank" rel="noreferrer">
            {task.linkTitle || task.executionLink}
          </a>
        </p>
      )}
      {task.completionNotes && <p><strong>Note:</strong> {task.completionNotes}</p>}
      {task.codeSnippet && (
        <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">{task.codeSnippet}</pre>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-xl">
      {isEditingTitle ? (
        <input
          type="text"
          value={titleDraft}
          onChange={(e) => setTitleDraft(e.target.value)}
          onBlur={saveTitle}
          className="w-full mb-2 px-2 py-1 border border-gray-300 rounded"
        />
      ) : (
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h2>
      )}

      {editingTaskId === task.id ? (
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
                const payload = { status: 'completed' };
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
                setEditingTaskId(null);
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
        <div className="flex flex-wrap gap-2 mt-3">
          {task.status !== 'completed' && (
            <>
              <button
                onClick={() => setEditingTaskId(task.id)}
                className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
              >
                ✅ Complete
              </button>
              <button
                onClick={() => updateTask(task.id, { status: 'in-progress' })}
                className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
              >
                🚧 In Progress
              </button>
            </>
          )}

          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            {showDetails ? '🙈 Hide' : '👁️ View'}
          </button>
          <button
            onClick={() => setIsEditingTitle(true)}
            className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition"
          >
            ✏️ Edit Title
          </button>
        </div>
      )}

      {showDetails && renderDetails()}
    </div>
  );
}
