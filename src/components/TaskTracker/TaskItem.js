// src/components/TaskTracker/TaskItem.js
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

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
  const [showDetails, setShowDetails] = useState(false);

  const renderBadge = () => {
    const map = {
      'to-do': 'bg-gray-300 text-gray-800',
      'in-progress': 'bg-yellow-400 text-yellow-900',
      'completed': 'bg-green-500 text-white',
      'paused': 'bg-red-500 text-white'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${map[task.status] || 'bg-gray-500 text-white'}`}>
        {task.status.replace('-', ' ')}
      </span>
    );
  };

  const renderDetails = () => (
    <div className="text-sm space-y-2 text-gray-100 mt-4">
      {task.description && <p><strong>Description:</strong> {task.description}</p>}
      {task.jobId && <p><strong>Job ID:</strong> {task.jobId}</p>}
      {task.executionLink && (
        <p>
          <strong>Link:</strong>{' '}
          <a href={task.executionLink} className="text-blue-400 underline" target="_blank" rel="noreferrer">
            {task.linkTitle || task.executionLink}
          </a>
        </p>
      )}
      {task.completionNotes && <p><strong>Note:</strong> {task.completionNotes}</p>}
      {task.codeSnippet && (
        <pre className="bg-gray-800 rounded p-2 overflow-x-auto whitespace-pre-wrap">{task.codeSnippet}</pre>
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
              className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
            />
            <input
              type="text"
              placeholder="Paste Link"
              value={entryValue}
              onChange={(e) => setEntryValue(e.target.value)}
              className="w-full mt-2 px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
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
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
          />
        );
      case "code":
        return (
          <textarea
            placeholder="Paste Code"
            value={entryValue}
            onChange={(e) => setEntryValue(e.target.value)}
            className="w-full px-3 py-2 font-mono bg-gray-800 rounded border border-gray-600 text-white"
            rows={4}
          />
        );
      default:
        return (
          <textarea
            placeholder="Write a note"
            value={entryValue}
            onChange={(e) => setEntryValue(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 text-white"
            rows={2}
          />
        );
    }
  };

  return (
    <div className="mb-6 rounded-2xl bg-glass border border-white/10 shadow-xl backdrop-blur-md p-6 transition hover:shadow-2xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">{task.title}</h2>
        {renderBadge()}
      </div>

      {editingTaskId === task.id ? (
        <div className="space-y-4 mt-3">
          <select
            value={entryType}
            onChange={(e) => {
              setEntryType(e.target.value);
              setEntryValue("");
              setLinkTitle("");
            }}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="note">Note</option>
            <option value="jobId">Job ID</option>
            <option value="link">Link</option>
            <option value="code">Code</option>
          </select>

          {renderDynamicInput()}

          <div className="flex justify-end gap-3">
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
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-4">
          {task.status !== 'completed' && (
            <>
              <button
                onClick={() => completeTask(task.id)}
                className="px-4 py-1 bg-blue-600 text-white rounded-full text-xs hover:bg-blue-700"
              >
                ✅ Complete
              </button>
              <button
                onClick={() => updateTask(task.id, { status: 'in-progress' })}
                className="px-4 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs hover:bg-yellow-300"
              >
                🚧 In Progress
              </button>
              {pauseTask && (
                <button
                  onClick={() => pauseTask(task.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                >
                  ⏸ Pause
                </button>
              )}
            </>
          )}
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="px-4 py-1 bg-gray-600 text-white rounded-full text-xs hover:bg-gray-500"
          >
            {showDetails ? '🙈 Hide' : '👁 View'}
          </button>
        </div>
      )}

      {showDetails && renderDetails()}
    </div>
  );
}
