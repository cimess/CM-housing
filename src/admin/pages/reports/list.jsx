import React from "react";
import { useTable, useUpdate, useDelete } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Trash2, CheckCircle, XCircle, AlertTriangle, ExternalLink } from "lucide-react";

export const ReportList = () => {
  const { tableQueryResult, current, setCurrent, pageCount, pageSize, setPageSize } = useTable({
    resource: "reports",
    syncWithLocation: true,
  });

  const reports = tableQueryResult?.data?.data || [];
  const { mutate: updateReport } = useUpdate();
  const { mutate: deleteReport } = useDelete();
  const navigate = useNavigate();


  const handleStatusChange = (id, status) => {
    updateReport({
      resource: "reports",
      id,
      values: { status },
      successNotification: {
        message: `Report marked as ${status}`,
        type: "success",
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">Manage user reports and flags.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-6 py-4">Reporter</th>
                <th className="px-6 py-4">Target</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.map((report) => (
                <tr
                    key={report._id}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => navigate(report._id)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {report.reporter?.firstname} {report.reporter?.lastname}
                    </div>
                    <div className="text-xs text-gray-500">{report.reporter?.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            report.targetType === 'House' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                            {report.targetType}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                            {report.targetId?._id || report.targetId}
                        </span>
                        {/* Link to view target if possible */}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{report.reason}</div>
                    {report.description && (
                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate" title={report.description}>
                            {report.description}
                        </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${
                      report.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      report.status === 'dismissed' ? 'bg-gray-100 text-gray-600' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      {report.status === 'pending' && (
                          <>
                            <button
                                onClick={() => handleStatusChange(report._id, 'resolved')}
                                className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                                title="Mark Resolved"
                            >
                                <CheckCircle size={16} />
                            </button>
                            <button
                                onClick={() => handleStatusChange(report._id, 'dismissed')}
                                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                                title="Dismiss"
                            >
                                <XCircle size={16} />
                            </button>
                          </>
                      )}
                      <button
                        onClick={() => {
                            if(window.confirm("Delete this report?")) {
                                deleteReport({ resource: "reports", id: report._id });
                            }
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                        title="Delete Report"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!reports.length && (
            <div className="p-12 text-center text-gray-400">
                <AlertTriangle size={48} className="mx-auto mb-4 opacity-20" />
                <p>No reports found.</p>
            </div>
          )}
        </div>


        {/* Pagination */}
        {reports.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Page <span className="font-bold text-gray-700">{current}</span> of <span className="font-bold text-gray-700">{pageCount}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrent(prev => Math.max(prev - 1, 1))}
                        disabled={current === 1}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrent(prev => Math.min(prev + 1, pageCount))}
                        disabled={current === pageCount}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                        Next
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
