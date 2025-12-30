'use client'

import { useState, useEffect } from 'react'
import { Building2, Users, Plus, Edit2, Trash2, X } from 'lucide-react'

interface Department {
  id: number
  name: string
  code: string
  location: string
  manager: string
  employeeCount: number
  budget: number
  createdAt: string
}

export default function Home() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    location: '',
    manager: '',
    employeeCount: 0,
    budget: 0
  })

  useEffect(() => {
    const stored = localStorage.getItem('departments')
    if (stored) {
      setDepartments(JSON.parse(stored))
    } else {
      const initial: Department[] = [
        {
          id: 1,
          name: 'Engineering',
          code: 'ENG',
          location: 'Building A',
          manager: 'John Smith',
          employeeCount: 45,
          budget: 500000,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Human Resources',
          code: 'HR',
          location: 'Building B',
          manager: 'Sarah Johnson',
          employeeCount: 12,
          budget: 150000,
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Sales',
          code: 'SAL',
          location: 'Building C',
          manager: 'Mike Davis',
          employeeCount: 28,
          budget: 300000,
          createdAt: new Date().toISOString()
        }
      ]
      setDepartments(initial)
      localStorage.setItem('departments', JSON.stringify(initial))
    }
  }, [])

  const saveDepartments = (deps: Department[]) => {
    setDepartments(deps)
    localStorage.setItem('departments', JSON.stringify(deps))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      const updated = departments.map(dept =>
        dept.id === editingId
          ? { ...dept, ...formData }
          : dept
      )
      saveDepartments(updated)
    } else {
      const newDept: Department = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      }
      saveDepartments([...departments, newDept])
    }

    resetForm()
  }

  const handleEdit = (dept: Department) => {
    setFormData({
      name: dept.name,
      code: dept.code,
      location: dept.location,
      manager: dept.manager,
      employeeCount: dept.employeeCount,
      budget: dept.budget
    })
    setEditingId(dept.id)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this department?')) {
      saveDepartments(departments.filter(dept => dept.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      location: '',
      manager: '',
      employeeCount: 0,
      budget: 0
    })
    setEditingId(null)
    setShowModal(false)
  }

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0)
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Building2 className="w-10 h-10 text-indigo-600" />
              <h1 className="text-4xl font-bold text-gray-800">Department Management System</h1>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Department
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Departments</p>
                  <p className="text-4xl font-bold mt-2">{departments.length}</p>
                </div>
                <Building2 className="w-12 h-12 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Employees</p>
                  <p className="text-4xl font-bold mt-2">{totalEmployees}</p>
                </div>
                <Users className="w-12 h-12 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Budget</p>
                  <p className="text-4xl font-bold mt-2">${(totalBudget / 1000000).toFixed(1)}M</p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Code</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Manager</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Employees</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Budget</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {dept.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{dept.name}</td>
                    <td className="px-6 py-4 text-gray-600">{dept.location}</td>
                    <td className="px-6 py-4 text-gray-600">{dept.manager}</td>
                    <td className="px-6 py-4 text-gray-600">{dept.employeeCount}</td>
                    <td className="px-6 py-4 text-gray-600">${dept.budget.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(dept)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(dept.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? 'Edit Department' : 'Add New Department'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Engineering"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., ENG"
                    maxLength={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Building A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manager Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee Count *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., 45"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., 500000"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  {editingId ? 'Update Department' : 'Create Department'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
