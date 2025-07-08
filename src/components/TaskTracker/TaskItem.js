// src/components/TaskTracker/TaskItem.js
import { useState } from 'react';
// import { ExternalLink } from 'lucide-react';

export default function TaskItem({
  task,
  updateTask,
  saveCompletion,
  completeTask,
  editingTaskId,
  setEditingTaskId,
  pauseTask
}) {
  const [entryType, setEntryType] = useState("note");
  const [entryValue, setEntryValue] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(task.title);
  const [showDetails, setShowDetails] = useState(false);

  const saveTitle = () => {
    updateTask(task.id, { title: titleDraft });
    setIsEditingTitle(false);
  };

  const renderDetails = () => (
    <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm text-gray-700 dark:text-gray-300 space-y-2">
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
        <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded whitespace-pre-wrap">{task.codeSnippet}</pre>
      )}
    </div>
  );

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
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Paste Link"
              value={entryValue}
              onChange={(e) => setEntryValue(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white mt-2"
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
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
          />
        );
      case "code":
        return (
          <textarea
            placeholder="Paste Code"
            value={entryValue}
            onChange={(e) => setEntryValue(e.target.value)}
            className="w-full px-3 py-2 font-mono border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
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
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
            rows={2}
          />
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-xl p-6 transition duration-300 text-gray-900 dark:text-white">
      {isEditingTitle ? (
        <input
          type="text"
          value={titleDraft}
          onChange={(e) => setTitleDraft(e.target.value)}
          onBlur={saveTitle}
          className="w-full mb-2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      ) : (
        <h2 className="text-xl font-semibold">{task.title}</h2>
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
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
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
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setEditingTaskId(null)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 text-gray-800 dark:text-white rounded-md"
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
                className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white hover:bg-blue-200 transition"
              >
                ✅ Complete
              </button>
              <button
                onClick={() => updateTask(task.id, { status: 'in-progress' })}
                className="px-3 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-white hover:bg-yellow-200 transition"
              >
                🚧 In Progress
              </button>
              {pauseTask && (
                <button
                  onClick={() => pauseTask(task.id)}
                  className="px-3 py-1 text-xs rounded-full bg-red-100 dark:bg-red-700 text-red-800 dark:text-white hover:bg-red-200 transition"
                >
                  ⏸ Pause
                </button>
              )}
            </>
          )}
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 transition"
          >
            {showDetails ? '🙈 Hide' : '👁️ View'}
          </button>
          <button
            onClick={() => setIsEditingTitle(true)}
            className="px-3 py-1 text-xs rounded-full bg-green-100 dark:bg-green-700 text-green-800 dark:text-white hover:bg-green-200 transition"
          >
            ✏️ Edit
          </button>
        </div>
      )}

      {showDetails && renderDetails()}
    </div>
  );
}
