import { SUMMARY_DECISIONS } from '../constants/summaryConstants';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

//Upload and process a document (PDF or TXT) to generate a summary
export const uploadAndProcessDocument = async (file) => {
  const formData = new FormData();
  formData.append('document', file);
  
  const response = await fetch(`${backendUrl}/api/upload/load-document`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

//Submit feedback (accept/reject) for a generated summary
export const submitSummaryFeedback = async (threadId, accepted) => {
  const response = await fetch(`${backendUrl}/api/upload/save-summary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      threadId: threadId,
      decision: accepted ? SUMMARY_DECISIONS.APPROVE : SUMMARY_DECISIONS.REJECT
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return await response.json();
}; 