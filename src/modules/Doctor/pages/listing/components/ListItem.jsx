import { Eye, Edit, Trash2, User, Phone } from "lucide-react";

export default function ListItem({ doctor, onView, onEdit, onDelete, getStatusColor }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="ml-4">
            {/* <div className="text-sm text-gray-500">{doctor.id}</div> */}
            <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.specialty}</td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.department}</td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-500">
          <Phone className="h-4 w-4 mr-1" />
          {doctor.contact}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
          {doctor.status}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => onView(doctor)}
            className="text-blue-600 hover:text-blue-900 transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(doctor)}
            className="text-green-600 hover:text-green-900 transition-colors"
            title="Edit Doctor"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(doctor.id)}
            className="text-red-600 hover:text-red-900 transition-colors"
            title="Delete Doctor"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}