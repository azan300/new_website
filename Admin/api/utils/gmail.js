function extractPlainTextBody(payload) {
  if (!payload.parts) {
    return Buffer.from(payload.body.data || '', 'base64').toString('utf-8');
  }

  const part = payload.parts.find(
    p => p.mimeType === 'text/plain' && p.body?.data
  );

  if (part) {
    return Buffer.from(part.body.data, 'base64').toString('utf-8');
  }

  return '';
}

function extractAttachments(payload) {
  const attachments = [];
  if (!payload.parts) return attachments;

  payload.parts.forEach(part => {
    if (part.filename && part.body && part.body.attachmentId) {
      attachments.push({
        filename: part.filename,
        mimeType: part.mimeType,
        attachmentId: part.body.attachmentId,
        partId: part.partId,
      });
    }
  });

  return attachments;
}

module.exports = {
  extractPlainTextBody,
  extractAttachments,
};