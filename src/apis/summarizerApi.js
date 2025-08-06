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

//Submit feedback (accept/reject/regenerate) for a generated summary
export const submitSummaryFeedback = async (threadId, decision) => {
  let finalDecision;
  
  // Handle boolean values for backward compatibility
  if (typeof decision === 'boolean') {
    finalDecision = decision ? SUMMARY_DECISIONS.APPROVE : SUMMARY_DECISIONS.REJECT;
  } else {
    // Handle string values (regenerate, approve, reject)
    finalDecision = decision;
  }

  const response = await fetch(`${backendUrl}/api/upload/save-summary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      threadId: threadId,
      decision: finalDecision
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
}; 