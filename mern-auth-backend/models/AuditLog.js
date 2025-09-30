const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  ip: String,
  meta: Object,
  createdAt: { type: Date, default: Date.now }
});

const AuditLog = mongoose.model('AuditLog', auditSchema);

// ✅ Function to create an audit log and also log to console
function addAudit(userId, action, ip, meta = {}) {
  const doc = new AuditLog({ user: userId, action, ip, meta });

  doc.save()
    .then(() => {
      console.log(`Audit log saved: user=${userId}, action=${action}, ip=${ip}`, meta);
    })
    .catch(err => {
      console.error('Failed to save audit log:', err);
    });
}

module.exports = { AuditLog, addAudit };
