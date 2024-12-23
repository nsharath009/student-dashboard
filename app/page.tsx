"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentModal } from "@/components/student-modal";

export default function StudentDashboard() {
  const {
    students,
    loading,
    error,
    academicYear,
    selectedClass,
    setAcademicYear,
    setSelectedClass,
    fetchStudents,
    fetchCourses,
    updateStudentStatus,
  } = useStore();

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, [fetchStudents, fetchCourses]);

  const handleStatusChange = async (id: string, status: boolean) => {
    try {
      await updateStudentStatus(id, status);
    } catch (error) {
      console.error("Failed to update student status:", error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader userName="Adeline H. Dancy" />

      <main className="flex-1 p-6 bg-[#F8F9FC]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <Select value={academicYear} onValueChange={setAcademicYear}>
              <SelectTrigger className="w-[140px] bg-white border-gray-200 text-sm">
                <SelectValue placeholder="AY 2024-25" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
                <SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[140px] bg-white border-gray-200 text-sm">
                <SelectValue placeholder="CBSE 9" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CBSE 9">CBSE 9</SelectItem>
                <SelectItem value="CBSE 10">CBSE 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <StudentModal />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 bg-white rounded-lg p-4">
            {error}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Cohort
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Courses
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Date Joined
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-600 w-20">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.cohort}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {student.courses.map((enrollment) => (
                          <div
                            key={enrollment.id}
                            className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded"
                          >
                            {enrollment.course.iconType === "math" ? (
                              <span
                                role="img"
                                aria-label="math"
                                className="text-blue-600"
                              >
                                📐
                              </span>
                            ) : (
                              <span
                                role="img"
                                aria-label="science"
                                className="text-red-600"
                              >
                                🧪
                              </span>
                            )}
                            <span className="text-sm text-gray-600">
                              {enrollment.course.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(student.dateJoined)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatTime(student.lastLogin)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            handleStatusChange(student.id, !student.status)
                          }
                          className={`w-2 h-2 rounded-full ${
                            student.status ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
