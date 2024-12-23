"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useStore } from "@/lib/store";

export function StudentModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const { addStudent, courses, academicYear, selectedClass, fetchStudents } =
    useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!name.trim()) {
        alert("Please enter a student name");
        return;
      }

      if (selectedCourses.length === 0) {
        alert("Please select at least one course");
        return;
      }

      await addStudent({
        name: name.trim(),
        cohort: academicYear,
        class: selectedClass,
        courses: selectedCourses,
        status: true,
      });

      setOpen(false);
      setName("");
      setSelectedCourses([]);
      fetchStudents();
    } catch (error) {
      console.error("Failed to add student:", error);
      alert("Failed to add student");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add new Student
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Add New Student
          </h2>
          <DialogClose className="h-6 w-6 p-0 hover:bg-transparent">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Student Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Selected Academic Details
            </label>
            <div className="grid grid-cols-2 gap-4 pointer-events-none">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Academic Year</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {academicYear}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Class</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {selectedClass}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Courses</label>
            <div className="space-y-3 bg-gray-50 p-4 rounded">
              {courses.map((course) => (
                <label
                  key={course.id}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCourses([...selectedCourses, course.id]);
                      } else {
                        setSelectedCourses(
                          selectedCourses.filter((id) => id !== course.id)
                        );
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm ${
                        course.iconType === "math"
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      {course.iconType === "math" ? "📐" : "🧪"}
                    </span>
                    <span className="text-sm text-gray-600">{course.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="bg-white">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-[#4A4A4A] hover:bg-[#3A3A3A] text-white"
            >
              Add Student
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
