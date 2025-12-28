import React, { useState, useEffect } from "react";
import { useShow, useOne, useUpdate, useDelete } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import {
    User, Home, Shield, AlertTriangle, CheckCircle, XCircle,
    Trash2, Ban, Lock, Unlock, ArrowLeft, Mail, Phone, MapPin
} from "lucide-react";

export const ReportShow = () => {
  const { id } = useParams();
  const { queryResult } = useShow({ resource: "reports", id });
  const { data, isLoading } = queryResult;
  const report = data?.data;

  const navigate = useNavigate();
  const { mutate: updateReport } = useUpdate();
  const { mutate: deleteReport } = useDelete();
  const { mutate: deleteHouse } = useDelete();
  const { mutate: updateUser } = useUpdate();
  const { mutate: deleteUser } = useDelete();

  // Fetch target details if available
  const { data: targetData, isLoading: targetLoading } = useOne({
    resource: report?.targetType === "House" ? "houses" : "users",
    id: report?.targetId?._id || report?.targetId,
    queryOptions: {
      enabled: !!report?.targetId,
    },
  });

  const target = targetData?.data;

  if (isLoading) return <div className="p-8">Loading report details...</div>;
  if (!report) return <div className="p-8 text-red-500">Report not found</div>;

  const handleStatusChange = (status) => {
    updateReport({
      resource: "reports",
      id: report._id,
      values: { status },
      successNotification: {
        message: `Report marked as ${status}`,
        type: "success",
      },
    });
  };

  const handleDeleteTarget = () => {
      if(!window.confirm(`Are you sure you want to delete this ${report.targetType}?`)) return;

      if(report.targetType === "House") {
          deleteHouse({
              resource: "houses",
              id: target._id,
              successNotification: { message: "House deleted", type: "success" }
          });
      } else {
          deleteUser({
              resource: "users",
              id: target._id,
              successNotification: { message: "User deleted", type: "success" }
          });
      }
  };

  const handleBanUser = () => {
      if(!target) return;
      updateUser({
          resource: "users",
          id: target._id,
          values: { isBanned: !target.isBanned },
          successNotification: { message: `User ${!target.isBanned ? 'Banned' : 'Unbanned'}`, type: "success" }
      });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Reports
      </button>

      {/* Report Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
        <div>
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Report Details</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                      report.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      report.status === 'dismissed' ? 'bg-gray-100 text-gray-600' :
                      'bg-yellow-100 text-yellow-700'
                }`}>
                    {report.status}
                </span>
            </div>
            <p className="text-gray-500">Submitted on {new Date(report.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
            {report.status === 'pending' && (
                <>
                    <button onClick={() => handleStatusChange('resolved')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm">
                        Mark Resolved
                    </button>
                    <button onClick={() => handleStatusChange('dismissed')} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm">
                        Dismiss
                    </button>
                </>
            )}
            <button
                onClick={() => {
                    if(window.confirm("Delete this report?")) {
                        deleteReport({ resource: "reports", id: report._id });
                        navigate('/cimessadmin/reports');
                    }
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
                <Trash2 size={20} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reporter Info */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={20} className="text-blue-500" />
                  Reporter Information
              </h2>
              <div className="space-y-4">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                          {report.reporter?.firstname?.[0]}
                      </div>
                      <div>
                          <div className="font-bold text-gray-900">{report.reporter?.firstname} {report.reporter?.lastname}</div>
                          <div className="text-sm text-gray-500">{report.reporter?.email}</div>
                      </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-xs font-bold text-gray-400 uppercase mb-1">Reason</div>
                      <div className="font-medium text-gray-900">{report.reason}</div>
                  </div>
                  {report.description && (
                      <div className="p-4 bg-gray-50 rounded-xl">
                          <div className="text-xs font-bold text-gray-400 uppercase mb-1">Description</div>
                          <p className="text-gray-700 text-sm">{report.description}</p>
                      </div>
                  )}
              </div>
          </div>

          {/* Target Info */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-orange-500" />
                  Reported {report.targetType}
              </h2>

              {targetLoading ? (
                  <div className="animate-pulse space-y-4">
                      <div className="h-20 bg-gray-100 rounded-xl"></div>
                      <div className="h-8 bg-gray-100 rounded w-1/2"></div>
                  </div>
              ) : target ? (
                  <div className="space-y-6">
                      {report.targetType === 'House' ? (
                          <div className="space-y-4">
                              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 relative">
                                  {target.images?.[0] ? (
                                      <img src={target.images[0]} alt="House" className="w-full h-full object-cover" />
                                  ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-400"><Home size={32} /></div>
                                  )}
                                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-md">
                                      {target.houseType}
                                  </div>
                              </div>
                              <div>
                                  <div className="font-bold text-lg text-gray-900">{target.location?.state}, {target.location?.town}</div>
                                  <div className="text-sm text-gray-500">{target.description?.substring(0, 100)}...</div>
                              </div>
                              <div className="flex gap-2 pt-2">
                                  <button
                                    onClick={handleDeleteTarget}
                                    className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                  >
                                      <Trash2 size={16} /> Delete House
                                  </button>
                              </div>
                          </div>
                      ) : (
                          <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-2xl">
                                      {target.firstname?.[0]}
                                  </div>
                                  <div>
                                      <div className="font-bold text-xl text-gray-900">{target.firstname} {target.lastname}</div>
                                      <div className="flex items-center gap-1 text-sm text-gray-500"><Mail size={12}/> {target.email}</div>
                                      <div className="flex items-center gap-1 text-sm text-gray-500"><Phone size={12}/> {target.phone}</div>
                                  </div>
                              </div>
                              <div className="flex gap-2">
                                  {target.isBanned && <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold">Banned</span>}
                                  {target.isRestricted && <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs font-bold">Restricted</span>}
                              </div>
                              <div className="grid grid-cols-2 gap-2 pt-2">
                                  <button
                                    onClick={handleBanUser}
                                    className={`py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${target.isBanned ? 'bg-gray-100 text-gray-600' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                                  >
                                      <Ban size={16} /> {target.isBanned ? 'Unban User' : 'Ban User'}
                                  </button>
                                  <button
                                    onClick={handleDeleteTarget}
                                    className="py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                  >
                                      <Trash2 size={16} /> Delete User
                                  </button>
                              </div>
                          </div>
                      )}
                  </div>
              ) : (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center">
                      Target not found (might have been deleted)
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
